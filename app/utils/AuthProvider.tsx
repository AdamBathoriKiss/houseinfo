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

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _skipAuthRefresh?: boolean; // ✅ Új flag a refresh kérések jelölésére
}

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: any;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Oldal betöltésekor próbáld meg helyreállítani a sessiont
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const response = await AuthService.refreshToken();
                setToken(response.accessToken);
            } catch (error: any) {
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    // Request interceptor - Token hozzáadása
    useLayoutEffect(() => {
        const authInterceptor = axiosInstance.interceptors.request.use(
            (config: CustomAxiosRequestConfig) => {
                if (!config._retry && token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );
        
        return () => {
            axiosInstance.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    // Response interceptor - 401 kezelés
    useLayoutEffect(() => {
        const refreshInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest: CustomAxiosRequestConfig = error.config;

                // ✅ Ha ez egy refresh kérés volt, NE próbáld újra
                if (originalRequest._skipAuthRefresh) {
                    return Promise.reject(error);
                }

                // ✅ 401 hiba és még nem próbáltuk újra
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    try {
                        const response = await AuthService.refreshToken();
                        const newToken = response.accessToken;

                        setToken(newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        setToken(null);
                        setUser(null);
                        return Promise.reject(refreshError);
                    }
                }
                
                return Promise.reject(error);
            }
        );
        
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
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}