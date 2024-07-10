const TOO_MANY_REQUESTS = 'Too Many Requests';

const EXPRESS_RATE_LIMITER_OPTS = {
  windowMs: 30000,
  limit: 10,
  standardHeaders: true,
  skipFailedRequests: false,
};

export {
  TOO_MANY_REQUESTS,
  EXPRESS_RATE_LIMITER_OPTS,
};
