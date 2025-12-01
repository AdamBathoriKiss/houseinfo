import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

console.log(import.meta.env.VITE_API_URL)
// ✅ Külön axios instance auth műveletekhez (NINCS rajta interceptor!)
const authAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default authAxios;