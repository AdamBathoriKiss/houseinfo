import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const getDashboardData = (buildingId:string) => {
  const response =  instance.get(`/dashboard/${buildingId}`);
  return response;
};

const DashboardService = {
  getDashboardData,
};

export default DashboardService;

