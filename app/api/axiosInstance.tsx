import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - hozzáadja az access token-t
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - kezeli a 401-es hibákat és refresh-eli a token-t
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Ha 401-es hiba és még nem próbáltuk újra
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Ha épp refresh-elünk, várjuk meg
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token endpoint hívása (NEM az axiosInstance-t használjuk!)
        const refreshResponse = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true, // HTTP-only cookie küldése
          }
        );

        const { accessToken } = refreshResponse.data;

        if (accessToken) {
          // Új access token mentése
          localStorage.setItem("accessToken", accessToken);
          
          // Eredeti request újrapróbálása új tokennel
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          processQueue(null);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError as Error);
        
        // Ha a refresh is sikertelen, kijelentkeztetjük a usert
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        
        // Átirányítás login oldalra
        window.location.href = "/login";
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;