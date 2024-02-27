import { USER_EMAIL, USER_PASSWORD } from '../env.config';
import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};
