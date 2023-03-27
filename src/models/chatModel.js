import {Schema} from "mongoose";

const MessageCollection = "messages" 

const chatSchema = new Schema( {
  sender: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},
{ versionKey: false }
);
  
  export const ChatModel = {MessageCollection, chatSchema};