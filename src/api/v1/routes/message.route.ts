import { Router } from "express";
import { EndPoints } from "../constants";
import { verifyToken } from "../middlewares";
import { allMessage, sendMessage } from "../controllers";

export const messageRouter = Router();

messageRouter.get(`/${EndPoints.Message.Get.All}`, verifyToken, allMessage);
messageRouter.post(`/${EndPoints.Message.Post.Send}`, verifyToken, sendMessage);
