import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { contentServices, IaddContent } from "../services/content.services.js";
import { websiteTypes } from "../models/contentModel.js";

export const contentController = {
  addContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: IaddContent = req.body;
      const response = await contentServices.addContent(data, req.userId);

      res.status(200).json({
        status: "success",
        message: "content added successfully",
        data: response,
      });
    },
  ),

  getMyContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const userId = req.userId;
      const response = await contentServices.getMyContent(userId, page, limit);
      res.status(200).json({
        status: "success",
        message: "My saved content",
        data: response,
      });
    },
  ),

  getContentWithWebsiteType: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const requestedWebsiteType =
        req.query.websiteType?.toString() || websiteTypes.OTHER;
      const websiteType = Object.values(websiteTypes).includes(
        requestedWebsiteType as websiteTypes,
      )
        ? (requestedWebsiteType as websiteTypes)
        : websiteTypes.OTHER;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const response = await contentServices.getContentWithWebsiteType(
        userId,
        websiteType,
        page,
        limit,
      );
      res.status(200).json({
        status: "success",
        message: "Fetched Documents",
        data: response,
      });
    },
  ),

  deleteContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const contentId = req.body.contentId;
      const response = await contentServices.deleteContent(userId, contentId);

      res.status(200).json({
        status: "success",
        message: "Content deleted successfully",
        data: response,
      });
    },
  ),
  shareContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const slug = req.params.slug as string;
      const response =await contentServices.shareContent(slug);
      res.status(200).json({
        status: "success",
        message: "Link found",
        data: response,
      });
    },
  ),
};
