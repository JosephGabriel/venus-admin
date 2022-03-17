export enum UserRole {
  ADMIN,
  USER,
}

export type UserGQL = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  avatar: string;
  password: string;
  passwordChangedAt: string;
  role: UserRole;
  active: boolean;
  verified: boolean;
};

export type User = {
  token: string;
  user: UserGQL;
};

export type LoginVariables = {
  data: {
    email: string;
    password: string;
  };
};
