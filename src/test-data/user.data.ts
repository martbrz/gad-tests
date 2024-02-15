import { LoginUser } from '../models/user.model';

export const testUser1: LoginUser = {
  email: process.env.USER_EMAIL ?? '[NOT SET]',
  password: process.env.USER_PASSWORD ?? '[NOT SET]',
};
