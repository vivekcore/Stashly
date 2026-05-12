import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { SignInInput, SignUpInput, userService } from "../services/user.services.js";

export const userController = {
  signUp: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const input: SignUpInput = req.body;
      const response = await userService.signUp(input);
      res.status(200).json({
        status:"sucess",
        message:"SignUp sucessfully",
        data:response
      });
    },
  ),

  signIn: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const input: SignInInput = req.body;
        const response = await userService.signIn(input);
        res.status(200).json({
        status:"sucess",
        message:"SignIn sucessfully",
        data:response
      });
    },
  ),
};
