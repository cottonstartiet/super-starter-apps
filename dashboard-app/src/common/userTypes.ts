export interface IUser {
  uid: string;
  email: string;
  name: string;
  picture: string;
  user_id: string;
  getIdToken: (forceRefreshToken: boolean) => Promise<string>;
}