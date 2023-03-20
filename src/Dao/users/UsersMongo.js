import { MongoDBContainer } from "../../Containers/index.js";
import { UserModel } from "../../models/index.js";
import bcrypt from 'bcrypt'

export class UsersMongo extends MongoDBContainer {
  constructor() {
    super({
      name: UserModel.UserCollection,
      schema: UserModel.UserSchema,
    });
  }

  async matchPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }


}