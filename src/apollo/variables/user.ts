import { makeVar, useReactiveVar } from "@apollo/client";
import { User } from "../../types/user";

export const userVar = makeVar<User | null>(null);

const useUserVar = () => {
  return useReactiveVar(userVar);
};

export const userReactiveVar = {
  set: (v: User) => userVar(v),
  get: () => userVar(),
  reset: () => userVar(null),
  use: useUserVar,
};
