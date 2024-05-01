import { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model";
import { Messages } from "../constants";
import { AppError } from "../helpers";
import { socketServer } from "../services/socket.service";

const allMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body.user;
  try {
    const messages = await Message.find({
      $or: [{ to: userId }, { from: userId }],
    })
      .sort({ createdAt: 1 })
      .exec();

    res.status(200).json({
      success: true,
      message: Messages.Message.Success.AllMessage,
      data: messages,
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body.user;
  const { to, message } = req.body;
  try {
    const newMessage = await Message.create({
      from: userId,
      to,
      message,
    });

    res.status(200).json({
      success: true,
      message: Messages.Message.Success.AllMessage,
      data: newMessage,
    });
    console.log(to);
    
    socketServer.sockets.in(to).emit('new-message',message)
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

export { allMessage, sendMessage };
