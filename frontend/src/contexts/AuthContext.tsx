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
import { login } from "../services/user-service";

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
        // get user profile if there is a session
        const userProfile = await getProfile();
        console.log("💚", userProfile);
        setUser(userProfile);
      } catch (error) {
        console.error("No user logged in.");
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
