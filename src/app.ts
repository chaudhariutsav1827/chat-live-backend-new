import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { accessLogStream } from "./config";
import { errorMiddleware } from "./api/v1/middlewares";
import { EndPoints } from "./api/v1/constants";
import { userRouter } from "./api/v1/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: accessLogStream }));

// routes
app.use(`${EndPoints.V1}/${EndPoints.User.Path}`, userRouter);

app.use("/", (req: Request, response: Response, next: NextFunction) => {
  response.send({
    msg: "hello",
  });
});

app.use(errorMiddleware);

export default app;
