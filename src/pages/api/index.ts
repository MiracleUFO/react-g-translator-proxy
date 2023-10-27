import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

import { translate } from 'google-translate-api-x';
import { rateLimit } from 'express-rate-limit';

import enableCorsMiddleware from '@/lib/cors';
import RequestCountModel from '@/lib/mongoose';
import sleep from '@/utils/sleep';
import delayMiddleware from '@/utils/delayRequests';

import { EXPRESS_RATE_LIMITER_OPTS, TOO_MANY_REQUESTS } from '@/constants';

const router = createRouter<NextApiRequest, NextApiResponse>();
const limiter = rateLimit(EXPRESS_RATE_LIMITER_OPTS);

router.use(expressWrapper(limiter))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await enableCorsMiddleware(req, res);

  if (req.method == 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  if (req.method === 'POST') {
    const RequestCount = await RequestCountModel();
    if (!RequestCount) return;

    try {
      const delay = await delayMiddleware();

      //  delay applied across all users (irrespective of IP)
      //  as previous limiting by IP still hit Err `429` quickly
      //  if delay makes responses too slow for your use-case
      //  host server and reduce/remove delay
      await sleep(delay);

      const { text, from, to } = req.body;
      const translation =  await translate(
        text as string,
        {
          from,
          to,
          rejectOnPartialFail: false,
          requestFunction: fetch,
        }
      );

      await RequestCount.create({ });

      return res.status(200).json(JSON.stringify(translation));
    } catch (e) {
      const error = e as Error;
      console.log('ERROR', e);

      if (
        error.message.includes(TOO_MANY_REQUESTS)
        || error.message.includes(TOO_MANY_REQUESTS.replace(/ /g, ''))
        || error.message.includes('429')
      ) return res.status(429).json(JSON.stringify(error));

      return res.status(500).json(JSON.stringify(e));
    }
  } else return res.status(404).json('404 - RouteNotFound: You\'re falling off the earth 😵‍💫.');
}
