"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { useProfile } from "@zone/hooks/useProfile";
import { IProfile } from "@zone/types/type";

interface AuthContextProps {
  access_token: string;
  refresh_token: string;
  user: IProfile | null;
  setUser: (value: IProfile) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    access_token: "",
    refresh_token: "",
    user: null,
  });

  const handleSetProfile = useCallback((value: IProfile) => {
    setState((state: any) => ({ ...state, user: value }));
  }, []);
  const {} = useProfile(!Boolean(state.user), handleSetProfile);

  return (
    <AuthContext.Provider value={{ ...state, setUser: handleSetProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("Not context auth");
  return context;
};
