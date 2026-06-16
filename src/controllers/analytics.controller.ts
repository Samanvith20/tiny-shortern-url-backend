import { Request, Response } from "express";
import { getAnalytics } from "../services/analytics.service.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUrlAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const analytics = await getAnalytics(req.params.code as string);

  if (!analytics) {
    throw new AppError("URL Invalid", 404);
  }

  return res.status(200).json({
    success: true,
    data: analytics,
  });
});
