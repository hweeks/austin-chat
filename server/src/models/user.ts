import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import { decodeToken } from "../routes/user";

export const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface IUserDoc extends Document {
  id?: string;
  username: string;
  password: string;
}

export const authenticate = async function (
  username: string,
  password: string
) {
  try {
    const foundUsers = (await User.find({ username })) as IUserDoc[];
    const [foundUser] = foundUsers;
    if (!foundUser || foundUser.username !== username) {
      const error =  new Error(`There's no one by the handle ${username} here. Odd...`)
      throw error
    }
    const isCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isCorrect) {
      const error = new Error("Looks like you may have forgotten your password...");
      throw error
    }
    return foundUser;
  } catch (error) {
    error.failed = true
    console.log(error)
    return error
  }
};

UserSchema.pre("save", function (this: IUserDoc, next) {
  const userModel = this;
  if (!userModel.isModified("password")) {
    next();
    return;
  }
  bcrypt.hash(userModel.password, 10).then((hash) => {
    userModel.password = hash;
    next();
  });
});

export const User = model<IUserDoc, Model<IUserDoc>>("User", UserSchema);
