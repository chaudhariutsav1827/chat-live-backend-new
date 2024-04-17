import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { accessLogStream } from "./config";
import {errorMiddleware} from "./api/v1/middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", (req: Request, response: Response, next: NextFunction) => {
  response.send({
    msg: "hello",
  });
});

app.use(errorMiddleware);

export default app;
