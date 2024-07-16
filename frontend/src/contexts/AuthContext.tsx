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

type AuthContext = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
};

export const initialStateUser = {
  _id: "",
  email: "",
  password: "",
};

const initialAuthContext = {
  user: initialStateUser,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContext>(initialAuthContext);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserType>(initialStateUser);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        // get user profile if there is a session
        const userProfile = await getProfile();
        if (userProfile._id) {
          console.log("💚", userProfile);
          setUser(userProfile);
        } else {
          console.log("No logged in user.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
