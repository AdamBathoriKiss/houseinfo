// src/services/auth.service.ts
import axiosInstance from "../api/axiosInstance";

const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data; // ✅ Csak a data-t add vissza
};

const registration = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/registration", { email, password });
    return response.data; // ✅ Csak a data-t add vissza
};

const refreshToken = async () => {
    const response = await axiosInstance.post("/auth/refresh"); // ✅ POST, nem GET!
    return response.data;
};

const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

const AuthService = {
    login,
    registration,
    refreshToken,
    logout,
};

export default AuthService;