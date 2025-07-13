import { apiClient } from "./api-client";
import { UserType } from "../types/types";
const PORT = import.meta.env.PORT_US || 3001;

// Sign up new user
export const signup = async (body: Omit<UserType, "_id">) => {
  return await apiClient<UserType>(PORT, "user/signup", "POST", body);
};

// log in existing user
export const login = async (body: Omit<UserType, "_id">) => {
  return await apiClient<UserType>(PORT, "user/login", "POST", body);
};

export const getUserById = async (id: string) => {
  return await apiClient<UserType>(PORT, `user/${id}`);
};

// Get profile from the session
export const getProfile = async () => {
  return await apiClient<UserType>(PORT, "user/me");
};

export const updateProfile = async (body: UserType) => {
  return await apiClient<UserType>(PORT, `user/${body._id}`, "PUT", body);
};

export const logout = async () => {
  return await apiClient(PORT, "user/logout", "POST");
};
