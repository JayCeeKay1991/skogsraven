import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react";
import { UserType } from "../types/types";
import { getProfile } from "../services/user-service";

type AuthContextType = {
  user: UserType;

  setUser: Dispatch<SetStateAction<UserType>>;
};

export const initialStateUser: UserType = {
  _id: "",
  email: "",
  password: "",
};

const initialAuthContext: AuthContextType = {
  user: initialStateUser,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(initialStateUser);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userProfile = await getProfile();
        setUser(userProfile);
      } catch (err) {
        alert(err);
      }
      checkLoggedIn();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
