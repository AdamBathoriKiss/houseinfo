import axiosInstance from "~/api/axiosInstance";

const getBuildings =  (userId:string) => {
  const response =  axiosInstance.get(`/buildings/${userId}`);
  return response;
};


const BuildingService = {
  getBuildings,
};

export default BuildingService;

