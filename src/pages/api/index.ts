import type { NextApiRequest, NextApiResponse } from 'next';
import { translate } from '@vitalets/google-translate-api';
import enableCorsMiddleware from '@/lib/cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method == 'OPTIONS') {
    res.setHeader('Allow', 'POST');
    return res.status(202).json(JSON.stringify({}));
  }

  await enableCorsMiddleware(req, res);

  const { text, from, to, fetchOptions } = req.body;
  const translation = await translate(text as string, { from, to, fetchOptions });
  console.log(translation);
  return res.status(200).json(JSON.stringify(translation));
}
