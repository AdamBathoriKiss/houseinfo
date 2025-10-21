import axiosInstance from "~/api/axiosInstance";

const getBuildings =  () => {
  const response =  axiosInstance.get("/buildings");
  return response;
};

const BuildingService = {
  getBuildings,
};

export default BuildingService;

