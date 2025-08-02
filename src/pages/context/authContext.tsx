import { createContext, useContext, useEffect, useState } from "react";
import type { LoginParams, SignupParams } from "../../services/authService";
import type { User } from "../../services/userService";

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
  };

  // Register function
  const register = async (userData: SignupParams) => {
    setIsLoading(true);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
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