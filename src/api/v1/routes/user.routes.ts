import { NextFunction, Request, Response, Router } from "express";
import { EndPoints } from "../constants";

export const userRouter = Router();

userRouter.post(
  `/${EndPoints.User.Post.Login}`,
  (req: Request, res: Response, next: NextFunction) => {
    res.send(req.body)
  }
);
