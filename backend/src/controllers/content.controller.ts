import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";


export const contentController = {

    addContent: catchAsync(async(req:Request,res:Response,next:NextFunction) => {

    }),

    getContent: catchAsync(async(req:Request,res:Response,next:NextFunction) => {

    }),

    getContentWithType: catchAsync(async(req:Request,res:Response,next:NextFunction) => {

    }),

    deleteContent: catchAsync(async(req:Request,res:Response,next:NextFunction) => {

    }),
}