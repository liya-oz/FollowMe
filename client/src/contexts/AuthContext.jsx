import { createContext } from "react";

export const AuthContext = createContext({
  authToken: null,
  login: async () => false,
  logout: () => {},
  user: null,
  setAuthToken: () => {},
});
