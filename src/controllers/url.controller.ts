import { Request, Response } from "express";
import { createUrlSchema } from "../validators/url.validator.js";
import {
  createShortUrl,
  getOriginalUrl,
  getUrls,
} from "../services/url.service.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUrl = asyncHandler(async (req: Request, res: Response): Promise<Response> => {

    const validatedData = createUrlSchema.parse(req.body);
         
    const data = await createShortUrl(validatedData.url);

    return res.status(201).json({
      success: true,
      data: {
        ...data,
        shortUrl: `${req.protocol}://${req.get("host")}/${data.code}`,
      },
    });
  
});

export const redirectToUrl = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params;

  const originalUrl = await getOriginalUrl(
    code as string,
    req.headers["user-agent"] || "unknown",
    req.get("referer") || "direct",
  );

  if (!originalUrl) {
    throw new AppError("URL Invalid", 404); 
  }

      return res.redirect(302, originalUrl);
});

export const getAllUrls = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const urls = await getUrls();

  return res.status(200).json({
    success: true,
    data: urls,
  });

});
