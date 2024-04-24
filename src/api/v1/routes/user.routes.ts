import { NextFunction, Request, Response, Router } from "express";
import { EndPoints } from "../constants";
import { login, register } from "../controllers";

export const userRouter = Router();

userRouter.post(`/${EndPoints.User.Post.Login}`, login);
userRouter.post(`/${EndPoints.User.Post.Register}`, register);
