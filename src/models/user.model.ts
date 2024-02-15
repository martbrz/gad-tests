export interface RegisterUser {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
