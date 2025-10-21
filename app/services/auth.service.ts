import axiosInstance from "../api/axiosInstance";

const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response;
};

const AuthService = {
    login,
};

export default AuthService;
