import RequestCountNextModel from '@/lib/mongoose';

async function delayMiddleware() {
  const twoSecondsAgo = new Date(Date.now() - 2000);
  const fifteenSecondsAgo = new Date(Date.now() - 15000);
  const oneMinuteAgo = new Date(Date.now() - 60000);

  const RequestCountNext = await RequestCountNextModel();
  if (!RequestCountNext) return 1000;

  const countTwoSeconds = await RequestCountNext.countDocuments({ updatedAt: { $gte: twoSecondsAgo } });
  const countFifteenSeconds = await RequestCountNext.countDocuments({ updatedAt: { $gte: fifteenSecondsAgo } });
  const countOneMinute = await RequestCountNext.countDocuments({ updatedAt: { $gte: oneMinuteAgo } });

  let delay = 1000;

  if (countOneMinute >= 100) delay = 60000;
  if (countFifteenSeconds >= 10) delay = 15000;
  if (countTwoSeconds >= 2) delay = 2000;
  
  return delay;
}

export default delayMiddleware;