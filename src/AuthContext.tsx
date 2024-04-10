import { createContext } from "react";

export const anonymous = {
  name: "Anonymous",
};

export interface AuthInfo {
  user: {
    name: string;
  };
}
export const AuthContext = createContext<AuthInfo>({ user: anonymous });

