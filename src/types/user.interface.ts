export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  password: string;
  isPasswordMatch(password: string): Promise<boolean>;
}
