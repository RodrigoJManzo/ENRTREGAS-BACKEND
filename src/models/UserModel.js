import { Schema } from "mongoose";

const UserCollection = "users";

const UserSchema = new Schema(
  {

    name: { type: String, required: true, max: 100 },
    lastname:{type: String, required: true, max: 100 },
    email: {type: String, required: true, unique:true},
    password: { type: String, required: true, max: 150 },
    cart: {type: Schema.Types.ObjectId, ref: "carts"},
  },
  {
    virtuals: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const UserModel = { UserCollection, UserSchema };