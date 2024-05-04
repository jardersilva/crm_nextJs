import { Document } from 'mongoose';
export interface IAgentes extends Document{
  id?: string;
  name: string;
  email: string;
  password: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  validatePassword: (pass: string) => Promise<boolean>;
}