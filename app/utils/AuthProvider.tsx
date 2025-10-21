import axiosInstance from "~/api/axiosInstance";
import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import type { InternalAxiosRequestConfig } from "axios";
import AuthService from "~/services/auth.service";

// TypeScript interface a custom _retry property-hez
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Context létrehozása
interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: any;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook a context használatához
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useLayoutEffect(() => {
        const authInterceptor = axiosInstance.interceptors.request.use(
            (config: CustomAxiosRequestConfig) => {
                config.headers.Authorization =
                    !config._retry && token
                        ? `Bearer ${token}`
                        : config.headers.Authorization;
                return config;
            }
        );
        // Cleanup: Interceptor eltávolítása, amikor a komponens unmount-ol
        return () => {
            axiosInstance.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await AuthService.refreshToken();
                        setToken(response.data.token);
                        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                        originalRequest._retry = true;
                        return axiosInstance(originalRequest);
                    } catch (err) {
                        setToken(null);
                        setUser(null); 
                    }
                }
                return Promise.reject(error);
            }
        );
        // Cleanup
        return () => {
            axiosInstance.interceptors.response.eject(refreshInterceptor);
        };
    }, []);


    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setToken(null);
            setUser(null);
        }
    };


    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
