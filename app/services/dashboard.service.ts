import axiosInstance from "~/api/axiosInstance";

 const getDashboardData = async(buildingId: number, period: string = 'current') => {
       const response =  await axiosInstance.get(`/dashboard/${buildingId}?period=${period}`);
         return response;
    }
const DashboardService = {
  getDashboardData,
};

export default DashboardService;

