import axiosInstance from "../lib/axios";

// TODO : Add relevant Params Here
export interface SignupParams {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobilePhone: string;
  password: string;
  eircode: string;
}

export interface LoginParams {
  mobilePhone: string;
  password: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      mobilePhone: string;
      eircode: string;
    };
  };
}

export const login = async (data: LoginParams): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auths/login", data);
  return response.data;
};

export const signup = async (data: SignupParams): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auths/signup", data);
  return response.data;
};
