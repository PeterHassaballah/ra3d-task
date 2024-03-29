import rateLimit = require('express-rate-limit');

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  skipSuccessfulRequests: true,
})

