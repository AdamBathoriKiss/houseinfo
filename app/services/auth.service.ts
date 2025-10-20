  import axios from "axios";

  const baseUrl = "http://localhost:3000/api";

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });


    const login = async (email: string, password: string ) => {
        const response = await instance.post("/auth/login", {email,password})
        return response
    }

  const AuthService = {
    login
  };

  export default AuthService;

