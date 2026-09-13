import { createContext } from "react";

type ContextType = {
  isAuth: boolean | null;
  userid:number
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export const AuthContext = createContext<ContextType | null>(null);
