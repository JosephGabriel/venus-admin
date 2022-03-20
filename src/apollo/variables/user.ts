import { makeVar, useReactiveVar } from "@apollo/client";
import { AuthPayload } from "../generated/schema";

export const userVar = makeVar<AuthPayload | null>(null);

const useUserVar = () => {
  return useReactiveVar(userVar);
};

export const userReactiveVar = {
  set: (v: AuthPayload) => userVar(v),
  get: () => userVar(),
  reset: () => userVar(null),
  use: useUserVar,
};
