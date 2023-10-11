import type { NextApiRequest, NextApiResponse } from 'next';
import { translate } from '@vitalets/google-translate-api';
import enableCorsMiddleware from '@/lib/cors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method == 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  await enableCorsMiddleware(req, res);

  try {
    const { text, from, to, fetchOptions } = req.body;
    const translation = await translate(text as string, { from, to, fetchOptions });
    return res.status(200).json(JSON.stringify(translation));
  } catch (e) {
    console.error(e);
    return res.status(500).json(JSON.stringify(e));
  }
}
