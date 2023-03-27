import { Schema } from "mongoose";
import { logger } from "../services/index.js";
import bcrypt from 'bcrypt'

const UserCollection = "users";

const UserSchema = new Schema(
  {

    name: { type: String, required: true, max: 100 },
    lastname:{type: String, required: true, max: 100 },
    email: {type: String, required: true, unique:true},
    age:{type: Number, required:true, unique:true},
    number:{type: Number, required:true, unique:true},
    password: { type: String, required: true, max: 150 },
    cart: {type:Object, _id:{type:String}},
  },
  {
    virtuals: true,
  }
);

UserSchema.methods.encriptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});


export const UserModel = { UserCollection, UserSchema };