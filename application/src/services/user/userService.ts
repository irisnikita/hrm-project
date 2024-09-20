import axiosInstance from "../api/axiosConfig";

// Schema
import { User, CreateUserDto } from "@/schemas/User";

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: CreateUserDto): Promise<User> => {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  },
};
