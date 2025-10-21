import axiosInstance from "~/api/axiosInstance";

const getDashboardData = async (buildingId:string) => {
  const response = await axiosInstance.get(`/dashboard/${buildingId}`);
  return response;
};

const DashboardService = {
  getDashboardData,
};

export default DashboardService;

