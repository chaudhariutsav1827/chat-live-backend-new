import { NextFunction, Request, Response } from "express";
import { Messages } from "../constants";
import { AppError } from "../helpers";
import { User } from "../models";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError(Messages.AllFieldsRequired, 400));
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError(Messages.User.Error.UserExists, 400));
    }

    const capitalizedFirstName = name.charAt(0).toUpperCase() + name.slice(1);
    const user = await User.create({
      name: capitalizedFirstName,
      email,
      password,
    });

    if (!user) {
      return next(new AppError(Messages.User.Error.Registration, 400));
    }

    await user.save();

    const token = await user.generateJWTToken();

    res.status(200).json({
      success: true,
      message: Messages.User.Success.Registration,
      data: { token },
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(Messages.AllFieldsRequired, 400));
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return next(new AppError(Messages.User.Error.Login, 400));
    }

    const token = await user.generateJWTToken();

    res.status(200).json({
      success: true,
      message: Messages.User.Success.Login,
      data: { token },
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body.user;
  try {
    const users = await User.find({ _id: { $ne: userId } }).select('-password -email');

    res.status(200).json({
      success: true,
      message: Messages.User.Success.AllUsers,
      data: users,
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

export { login, register, allUsers };
