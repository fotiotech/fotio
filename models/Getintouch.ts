import mongoose, { Document, Schema } from "mongoose";

export interface IGetInTouch extends Document {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  message: string; // added
}

const GetInTouchSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contact: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true }, // added
  },
  {
    timestamps: true,
  },
);

const GetInTouch =
  mongoose.models.GetInTouch ||
  mongoose.model<IGetInTouch>("GetInTouch", GetInTouchSchema);
export default GetInTouch;
