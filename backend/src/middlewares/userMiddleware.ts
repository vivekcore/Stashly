import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import mongoose from "mongoose";
import { authInstance } from "../auth/auth.js";

export const UserAuth = async (req: Request, res: Response, next: NextFunction) => {
  const session = await authInstance.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = new mongoose.Types.ObjectId(session.user.id);
  next();
};
