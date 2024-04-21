import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConfig } from "../../../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  const jwtSecretKey = getConfig("jwtSecretKey") as string;
  try {
    const userDetail = jwt.verify(token, jwtSecretKey);
    req.body.user = userDetail;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
