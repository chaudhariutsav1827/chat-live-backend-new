import { Types } from "mongoose";

export interface IMessage {
  _id: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId;
  message: string;
  seen: boolean;
}
