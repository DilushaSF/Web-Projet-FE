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
