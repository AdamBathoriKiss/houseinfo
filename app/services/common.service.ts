import axiosInstance from "~/api/axiosInstance";

const create = async (type: string, body: any) => {
    const response = await axiosInstance.post(`/${type}`, body);
    return response.data;
};

const update = async (type: string, id: number | string, body: any) => {
    const response = await axiosInstance.put(`/${type}/${id}`, body);
    return response.data;
};

const remove = async (type: string, id: number | string) => {
    const response = await axiosInstance.delete(`/${type}/${id}`);
    return response.data;
};

const getAll = async (type: string, userId?: string) => {
    const url = userId ? `/${type}/${userId}` : `/${type}`;
    const response = await axiosInstance.get(url);
    return response.data;
};

const getById = async (type: string, id: number | string) => {
    const response = await axiosInstance.get(`/${type}/${id}`);
    return response.data;
};

// Exportálható generikus service
const CommonService = {
    create,
    update,
    remove,
    getAll,
    getById
};

export default CommonService;