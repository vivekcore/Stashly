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
      const content = await contentModel.create({
        ...data,
        userId,
        slug: data.slug || (await this.generateSlug(data.title)).toString(),
      });
      const populatedContent = await contentModel
        .findById(content._id)
        .populate("userId", "username email");
      return this.toContentResponse(populatedContent!);
    } catch (error) {
      throw new ApiError(400, JSON.stringify(error));
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
          .populate("userId", "username email")
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
      throw new ApiError(400, JSON.stringify(error));
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
          .populate("userId", "username email")
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
      throw new ApiError(400, JSON.stringify(error));
    }
  }

  async deleteContent(
    userId: mongoose.Types.ObjectId,
    contentId: string,
  ): Promise<{contentId:string}> {
    try {
      const content = await contentModel.findByIdAndDelete(new mongoose.Types.ObjectId(contentId));
      if (!content) {
        throw new ApiError(400, "Content does not exist");
      }

      return{
        contentId: content._id.toString()
      }
       
    } catch (error) {
      throw new ApiError(400, JSON.stringify(error));
    }
  }
  async shareContent(slug:string):Promise<IContentResponse>{

    const content = await contentModel.findOne({
      slug: slug.toLowerCase().trim()
    }).populate('userId','email username')
    if(!content){
      throw new ApiError(400,"Link does not exist");
    }
    const contentResponse = this.toContentResponse(content);
    return contentResponse;
  }
  private async generateSlug(title: string): Promise<string> {
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existingslug = await contentModel.findOne({ slug: finalSlug });
      if (!existingslug) {
        return finalSlug;
      }
      finalSlug = finalSlug + "-" + counter.toString();
      counter++;
    }
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
        name: content.userId.username,
        email: content.userId.email,
      },
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}

export const contenetServices = new ContentServices();
