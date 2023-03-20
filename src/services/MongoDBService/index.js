import mongoose from "mongoose";
import { config } from "../../config/index.js";

const init = async () => {
  try {
    mongoose.connect("mongodb+srv://user:asd123@rmanzo.rgeyn6w.mongodb.net/?", {
      dbName: "entrega_coder",
    });
    console.log("Now you Are Connected To the Server");
  } catch (error) {
    console.log(error);
  }
};

export const MongoDBService = {
  init,
};
