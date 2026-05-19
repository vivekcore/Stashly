import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { contenetServices, IaddContent } from "../services/content.services.js";

export const contentController = {
  addContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: IaddContent = req.body;
      const response = await contenetServices.addContent(data, req.userId);

      res.status(200).json({
        status: "sucess",
        message: "content added sucessfully",
        data: response,
      });
    },
  ),

  getMyContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const userId = req.userId;
      const response = await contenetServices.getMyContent(userId, page, limit);
      res.status(200).json({
        status: "sucess",
        message: "My saved content",
        data: response,
      });
    },
  ),

  getContentWithWebsiteType: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const websiteType = req.query.websiteType?.toString() || "";
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const response = await contenetServices.getContentWithWebsiteType(
        userId,
        websiteType,
        page,
        limit,
      );
      res.status(200).json({
        status: "sucess",
        message: "Fetched Documents",
        data: response,
      });
    },
  ),

  deleteContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const contentId = req.body.contentId;
      const response = await contenetServices.deleteContent(userId, contentId);

      res.status(200).json({
        status: "sucess",
        message: "Contentent deleted sucessfully",
        data: response,
      });
    },
  ),
  shareContent: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const slug = req.params.slug as string;
      const response =await contenetServices.shareContent(slug);
      res.status(200).json({
        status: "sucess",
        message: "Link found",
        data: response,
      });
    },
  ),
};
