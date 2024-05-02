export enum DRAWER_TARGET {
  TASKS = "TASKS",
}

export type ISignIn = {
  email: string;
  password: string;
};

export type IProfile = {
  app_metadata: { provider?: string };
  aud: string;
  email?: string;
  id: string;
  phone?: string;
  role?: string;
};
