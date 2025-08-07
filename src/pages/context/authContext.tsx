import React, { createContext, useContext, useState, useEffect } from "react";

import {
  login as loginService,
  signup as signupService,
  type LoginParams,
  type SignupParams,
} from "../../services/authService";
import type { User } from "../../services/userService";
import { useSnackbar } from "notistack";

// Auth Types
type AuthContextType = {
  user: User | null;
  login: (credentials: LoginParams) => Promise<void>;
  register: (userData: SignupParams) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token === "undefined" || storedUser === "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (credentials: LoginParams) => {
    setIsLoading(true);
    try {
      const data = await loginService(credentials);
      console.log("dataaa", data);
      enqueueSnackbar("Login successful", {
        variant: "success",
      });
      setUser(data?.data?.user);

      setIsAuthenticated(true);
      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      window.location.href = "/category-selection";
    } catch (error) {
      enqueueSnackbar("Invalid credentials", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: SignupParams) => {
    setIsLoading(true);
    try {
      await signupService(userData);
      console.log("userData", userData);
      enqueueSnackbar("Registration successful", {
        variant: "success",
      });
      window.location.href = "/login";
    } catch (error) {
      enqueueSnackbar("Registration failed", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
