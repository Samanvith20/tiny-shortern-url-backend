import rateLimit from "express-rate-limit";

export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many URL creation requests. Please try again later.",
  },
});