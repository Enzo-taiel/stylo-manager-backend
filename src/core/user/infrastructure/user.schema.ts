import mongoose, { Schema } from "mongoose";
import { IUserDocument, IUserModel } from "../domain/user.type";
import bcrypt from "bcrypt"

export const UserSchema = new Schema<IUserDocument, IUserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  business: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
      required: false,
    }
  ],
  expoPushToken: {
    type: String,
    required: false
  }
})

UserSchema.pre("save", async function (next: (err?: NativeError | null | undefined) => void) {
  if (!this?.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const stringEncrypting = await bcrypt.hash(this.password, salt);
  this.password = stringEncrypting;
  next();
}
);