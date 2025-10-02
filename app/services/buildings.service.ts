import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const getBuildings =  () => {
  const response =  instance.get("/buildings");
  return response;
};

const BuildingService = {
  getBuildings,
};

export default BuildingService;

