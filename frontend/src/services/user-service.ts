import { apiClient } from "./api-client";
import { UserType } from "../types/types";
const PORT = import.meta.env.PORT_US || 3001;

// Sign up new user
export const signup = async (body: Omit<UserType, "_id">) => {
  try {
    const user = await apiClient<UserType>(PORT, "user/signup", "POST", body);
    return user;
  } catch (error) {
    console.error(error);
  }
};

// log in existing user
export const login = async (body: Omit<UserType, "_id">) => {
  try {
    const user = await apiClient<UserType>(PORT, "user/login", "POST", body);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await apiClient<UserType>(PORT, `user/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// Get profile from the session
export const getProfile = async () => {
  try {
    return await apiClient<UserType>(PORT, "user/me");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfile = async (body: UserType) => {
  try {
    return await apiClient<UserType>(PORT, `user/${body._id}`, "PUT", body);
  } catch (error) {}
};

export const logout = async () => {
  try {
    return await apiClient(PORT, "user/logout", "POST");
  } catch (error) {
    console.error(error);
  }
};
