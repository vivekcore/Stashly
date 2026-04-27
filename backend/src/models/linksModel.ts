import {model,Schema,InferSchemaType} from "mongoose";
import { Types } from "mongoose";

const LinkSchema = new Schema({
  hash: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});
type LinksDocument = InferSchemaType<typeof LinkSchema>
export const LinnkModel = model<LinksDocument>("links",LinkSchema);