export type IDataLogin = {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
};
export type IDataInput = {
  username: string;
  password: string;
};

export type IUser = {
  id: number;
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  avatarPath: string;
};
export type IStateLogin = {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  user: IUser;
};
