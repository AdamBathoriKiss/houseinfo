import axiosInstance from "~/api/axiosInstance";

const getBuildings =  (userId:string) => {
  const response =  axiosInstance.get(`/buildings/${userId}`);
  return response;
};

const createElement = async (type:string,body:any) => {
    const response = await axiosInstance.post(`/api/${type}`, { body });
    return response.data;
};

const editElement = async (type:string,body:any) => {
    const response = await axiosInstance.post(`/api/${type}`, { body });
    return response.data;
};

const deleteElement = async (type:string,id:number | string) => {
  console.log("type:",type, "id:", id)
    const response = await axiosInstance.post(`/api/${type}`, { id });
    return response.data;
};

const BuildingService = {
  getBuildings,
  createElement,
  editElement,
  deleteElement
};

export default BuildingService;

