import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'OPTIONS'],
});

function enableCorsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<string>,
  ) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default enableCorsMiddleware;
