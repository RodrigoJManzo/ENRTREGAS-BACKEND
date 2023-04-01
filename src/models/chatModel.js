import { Schema } from "mongoose";

const MessageCollection = "messages";

const chatSchema = new Schema(
  {
    sender: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: String },
  },
  { versionKey: false }
);

export const ChatModel = { MessageCollection, chatSchema };
