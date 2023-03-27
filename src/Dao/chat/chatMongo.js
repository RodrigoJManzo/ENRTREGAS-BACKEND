import { MongoDBContainer } from "../../Containers/index.js";
import { ChatModel } from "../../models/index.js";

export class ChatMongo extends MongoDBContainer {
  constructor() {
    super({
      name: ChatModel.MessageCollection,
      schema: ChatModel.chatSchema
    });
  }

}