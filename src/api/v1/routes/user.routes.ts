import { Router } from "express";
import { EndPoints } from "../constants";
import { allUsers, login, register } from "../controllers";
import { verifyToken } from "../middlewares";

export const userRouter = Router();

userRouter.post(`/${EndPoints.User.Post.Login}`, login);
userRouter.post(`/${EndPoints.User.Post.Register}`, register);
userRouter.get(`/${EndPoints.User.Get.All}`,verifyToken, allUsers);
