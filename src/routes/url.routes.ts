import { Router } from "express";
import { createUrl } from "../controllers/url.controller.js";
import { createUrlLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/", createUrlLimiter, createUrl);

export default router;
