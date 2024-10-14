import { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
// SCHEMAS
import { UserSchema } from '../schemas'
// INTERFACE DATABASE
import { IUser } from '../interface'

const Users_Schema = new Schema(UserSchema, { timestamps: true });

Users_Schema.pre<IUser>(
  "save",
  async function (next: (err?: NativeError | null | undefined) => void) {
    if (!this?.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const stringEncrypting = await bcrypt.hash(this.password, salt);
    this.password = stringEncrypting;
    next();
  }
);

export { Users_Schema }