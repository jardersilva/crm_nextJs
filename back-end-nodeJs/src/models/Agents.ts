
import { Schema } from 'mongoose'
import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";
import { IAgentes } from '../interfaces/IAgentes';

const agentsSchema = new Schema({
  name: String,
  email: String,
  password: String,
  status: String,
},
{
  timestamps: true
})

agentsSchema.pre('save', async function (next) {
  const thisObj = this as unknown as IAgentes;

    if (!this.isModified('password')) {
        return next();
    }

    try {
        thisObj.password = await hash(thisObj.password, 8);
        return next();
    } catch (e: any) {
        return next(e);
    }
});


agentsSchema.methods = {
  validatePassword: async function (pass: string) {
    return compare(pass, this.password);
  }
}


export default mongoose.model<IAgentes>('Agents', agentsSchema)
