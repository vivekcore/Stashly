import mongoose, {model,Schema,Document} from "mongoose";
import { Types } from "mongoose";
export interface  ILinks extends Document{
  hash: string,
  userId: mongoose.Types.ObjectId
}
const LinkSchema = new Schema<ILinks>({
  hash: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});

export const LinnkModel = model<ILinks>("links",LinkSchema);