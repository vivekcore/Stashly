import mongoose, { InferSchemaType,Schema,model,Document } from "mongoose";
import { Types } from "mongoose";


export const contentTypes = ["image", "video", "article", "audio"];
export interface Icontent extends Document {
    link: string,
    linkType: string,
    type: string,
    title:string,
    description: string,
    tags: string[],
    userId: mongoose.Types.ObjectId
}
const ContentSchema = new Schema<Icontent>({
  link: { type: String, required: true },
  linkType: { type: String },
  type: { type: String,enum:contentTypes, required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export const contentModel = model<Icontent>("contents",ContentSchema)