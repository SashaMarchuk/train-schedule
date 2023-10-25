export interface IAuthData {
  accessToken: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    password: string;
  };
}
