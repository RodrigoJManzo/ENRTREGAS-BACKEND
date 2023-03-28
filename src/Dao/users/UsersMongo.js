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

/**
 *@UsersMongo extends MongoDBContainer and gives us all the methods to be used for handling the data
 *@matchPassword compares the password given to the stored and gets if its the same 
 */

}