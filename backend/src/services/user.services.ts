import { userModel } from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
import { compare, hash } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import getConfig from "../utils/config.js";
import { email } from "zod";
const env = getConfig();
export interface SignUpInput {
  username: string;
  email: string;
  password: string;
}
export interface SignInInput {
  username: string;
  password: string;
}
class UserService {
  async signUp(
    data: SignUpInput,
  ): Promise<{ userId: string; email: string; token: string }> {
    try {
      const { username, email, password } = data;
      const response = await userModel.findOne({ username });
      if (response) {
        throw new ApiError(400, "User already exist");
      }
      const result = await hash(password, 10);
      const user = await userModel.create({
        username,
        email,
        password: result,
      });
      const payload = { userId: user._id.toString() };
      const token = jwt.sign(payload, env.USER_SECRET_KEY);
      return { userId: user._id.toString(), email: user.email, token };
    } catch (error) {
      throw new ApiError(400, JSON.stringify(error));
    }
  }

  async signIn(data: SignInInput): Promise<{ token: string; user: any }> {
    try {
      const { username, password } = data;
      const user = await userModel.findOne({ username });
      if (!user || !user.password) {
        throw new ApiError(400, "incorrect username or password");
      }
      const result = await compare(password, user.password);
      if (!result) {
        throw new ApiError(400, "Incorrect password");
      }
      const payload = { userId: user._id.toString() };
      const token = jwt.sign(payload, env.USER_SECRET_KEY);
      return {
        token,
        user: { name: user.username, email: user.email },
      };
    } catch (error) {
      throw new ApiError(400, JSON.stringify(error));
    }
  }
}

export const userService = new UserService();
