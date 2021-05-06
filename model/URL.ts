import { Schema, Model, model, Document } from "mongoose";

export interface UrlType {
  original_url: string;
  short_url: number;
}

export interface UrlDocument extends Document, UrlType {}

const urlSchema = new Schema({
  original_url: String,
  short_url: String,
});

const Url: Model<UrlDocument> = model<UrlDocument>("Url", urlSchema);

export { Url };
