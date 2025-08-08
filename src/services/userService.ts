import axiosInstance from "../lib/axios";

export interface User {
    [x: string]: any;
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobilePhone: string;
    eircode: string;
}

export interface UserUpdateParams {
  firstName: string;
  lastName: string;
  emailAddress: string;
  eircode: string;
  oldPassword?: string;
  password?: string;
}


// API functions
export const updateUser = async (data: UserUpdateParams): Promise<User> => {
  const response = await axiosInstance.put("/users/update", data);
  return response.data;
};
