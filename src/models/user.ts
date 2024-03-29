import mongoose from 'mongoose';
import bycrypt from "bcryptjs";
import { IUser } from '../types/user.interface';

const { compare, hash } = bycrypt;
const userSchema = new mongoose.Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value:string) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error("Password must contain at least one letter and one number");
          }
        }
      },
    },
    
  );
  userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await hash(user.password, 8);
    }
    next();
  });
  userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return compare(password, user.password);
  };
  
  
const User = mongoose.model<IUser>('User', userSchema);

export default User;