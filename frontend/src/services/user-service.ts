import { apiClient } from "./api-client";
import { UserType } from "../types/types";
const PORT = import.meta.env.PORT_US || 3001;

// Sign up new user
export const signup = async (body: Omit<UserType, "_id">) => {
  try {
    return await apiClient<UserType>(PORT, "user/signup", "POST", body);
  } catch (error) {
    console.error(error);
  }
};

// log in existing user
export const login = async (body: Omit<UserType, "_id">) => {
  try {
    const resUser = await apiClient<UserType>(PORT, "user/login", "POST", body);
    console.log({ resUser });
    return resUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
