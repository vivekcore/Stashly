import mongoose from "mongoose";
import {
  contentModel,
  ContentFilter,
  websiteTypes,
} from "../models/contentModel.js";
import ApiError from "../utils/apiError.js";

export interface IaddContent {
  link: string;
  type: ContentFilter;
  slug: string;
  title: string;
  description?: string;
  website: websiteTypes;
  tags?: string[];
}
export interface IContentResponse {
  id: string;
  link: string;
  website: websiteTypes;
  slug: string;
  type: ContentFilter;
  title: string;
  description?: string;
  tags?: string[];
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentListResponse {
  content: IContentResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    tototal: number;
  };
}
class ContentServices {
  async addContent(
    data: IaddContent,
    userId: mongoose.Types.ObjectId,
  ): Promise<IContentResponse> {
    try {
      const slug = data.slug && data.slug.trim() !== "" 
        ? data.slug 
        : await this.generateSlug(data.title);

      const content = await contentModel.create({
        ...data,
        userId,
        slug,
      });

      const populatedContent = await contentModel
        .findById(content._id)
        .populate("userId", "name email");

      if (!populatedContent) {
        throw new ApiError(500, "Failed to retrieve content after creation");
      }

      return this.toContentResponse(populatedContent);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, error instanceof Error ? error.message : "Failed to add content");
    }
  }

  async getMyContent(
    userId: mongoose.Types.ObjectId,
    page: number,
    limit: number,
  ): Promise<IContentListResponse> {
    try {
      const skip = (page - 1) * limit;
      const [content, total] = await Promise.all([
        contentModel
          .find({ userId })
          .populate("userId", "name email")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        contentModel.countDocuments({ userId }),
      ]);
      const contentResponse = content.map((c) => this.toContentResponse(c));
      return {
        content: contentResponse,
        pagination: {
          total,
          page,
          limit,
          tototal: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new ApiError(400, error instanceof Error ? error.message : "Failed to fetch content");
    }
  }

  async getContentWithWebsiteType(
    userId: mongoose.Types.ObjectId,
    website: websiteTypes,
    page: number,
    limit: number,
  ): Promise<IContentListResponse> {
    try {
      const skip = (page - 1) * limit;
      const [content, total] = await Promise.all([
        contentModel
          .find({ userId , website})
          .populate("userId", "name email")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        contentModel.countDocuments({ userId, website }),
      ]);
      const contentResponse = content.map((c) => this.toContentResponse(c));
      return {
        content: contentResponse,
        pagination: {
          total,
          page,
          limit,
          tototal: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new ApiError(400, error instanceof Error ? error.message : "Failed to fetch content by type");
    }
  }

  async deleteContent(
    userId: mongoose.Types.ObjectId,
    contentId: string,
  ): Promise<{contentId:string}> {
    try {
      const content = await contentModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(contentId),
        userId: userId
      });

      if (!content) {
        throw new ApiError(400, "Content does not exist or you don't have permission to delete it");
      }

      return{
        contentId: content._id.toString()
      }
       
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, error instanceof Error ? error.message : "Failed to delete content");
    }
  }

  async shareContent(slug:string):Promise<IContentResponse>{
    try {
      const content = await contentModel.findOne({
        slug: slug.toLowerCase().trim()
      }).populate('userId','email name')

      if(!content){
        throw new ApiError(404, "Content not found");
      }

      return this.toContentResponse(content);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, error instanceof Error ? error.message : "Failed to share content");
    }
  }

  private async generateSlug(title: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "content";

    let finalSlug = baseSlug;
    let counter = 1;
    
    while (await contentModel.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return finalSlug;
  }

  private toContentResponse(content: any): IContentResponse {
    return {
      id: content._id.toString(),
      link: content.link,
      website: content.website,
      slug: content.slug,
      type: content.type,
      title: content.title,
      description: content.description || "",
      tags: content.tags || [],
      user: {
        id: content.userId._id.toString(),
        name: content.userId.name,
        email: content.userId.email,
      },
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}

export const contentServices = new ContentServices();

