import { NextFunction, Request, Response } from "express";
import { string, z } from "zod"
import jwt from "jsonwebtoken"
import getConfig from "../config.js";
const env = getConfig();
export const  Uservalidation = (req:Request,res:Response,next:NextFunction) => {
    const zodValidaton = z.object({
        Username: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
        email: z.email()
    })
   const result = zodValidaton.safeParse(req.body);
   
   if (!result.success) {
       return res.status(400).json({
           msg : result.error.issues.map(val => ({
               Field: val.path,
               Message: val.message
           }))
       })
   }
   
   next();
}
export const UserAuth = (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers['authorization']
    try {
         if(!token){
        res.status(401).json({
            msg:"You are not Signed In"
        })
        return;
    }
    const result = jwt.verify(token as string,env.USER_SECRET_KEY)
    //@ts-ignore
    req.userId = result.userId;
    next();
    } catch (error) {
        res.status(401).json({
            msg:"You are not signed In",
        })
    }
   
    
}
