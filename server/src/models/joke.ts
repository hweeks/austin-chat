import { Document, Schema, Model, model, Types } from "mongoose";

export type joke_raw = {
  author: Types.ObjectId;
  joke: string;
};

export const joke_schema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  joke: {
    type: String,
    required: true,
    unique: true,
  },
});

export type joke_document = Document<joke_raw>;

export const joke_model = model<joke_raw, Model<joke_raw>>("Joke", joke_schema);
