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
import { useLocalStorage } from "@mantine/hooks";

interface AuthContextProps {
  access_token: string;
  refresh_token: string;
  user: IProfile | null;
  setUser: (value: IProfile | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [storage] = useLocalStorage({
    key: `sb-${process.env.NEXT_PUBLIC_KEY_STORAGE_AUTH}-auth-token`,
    defaultValue: null,
  });

  const [state, setState] = useState({
    access_token: "",
    refresh_token: "",
    user: storage,
  });

  const handleSetProfile = useCallback((value: IProfile | null) => {
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
