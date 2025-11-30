import axiosInstance from "~/api/axiosInstance";

// ✅ CREATE - Új esemény létrehozása
const create = async (eventData: any) => {
	const { buildingId, ...rest } = eventData;
	const response = await axiosInstance.post(`/events/${buildingId}`, rest);
	return response.data;
};

// ✅ UPDATE - Esemény frissítése
const update = async (eventId: number | string, eventData: any) => {
	const response = await axiosInstance.put(`/events/${eventId}`, eventData);
	return response.data;
};

// ✅ GET ALL - Összes esemény lekérése (épület szerint)
const getAllByBuilding = async (buildingId: number | string) => {
	const response = await axiosInstance.get(`/events/${buildingId}`);
	return response.data;
};

// ✅ GET ONE - Egy esemény részletei
const getEventDetails = async (eventId: number | string) => {
	const response = await axiosInstance.get(`/events/${eventId}`);
	return response.data;
};

// ❌ CSAK ADOTT NAP TÖRLÉSE (többnapos eseményből 1 nap)
const removeEventDay = async (eventId: number | string, occurrenceId: number | string) => {
	const response = await axiosInstance.delete(`/events/day/${eventId}/${occurrenceId}`);
	return response.data;
};

// ❌ EGÉSZ ESEMÉNY TÖRLÉSE (minden nappal együtt)
const removeEventCompletely = async (eventId: number | string) => {
	const response = await axiosInstance.delete(`/events/complete/${eventId}`);
	return response.data;
};

// ✅ CUSTOM DELETE - Nap törlése eseményből
const deleteEventDay = async (eventId: number | string, occurrenceId: number | string) => {
	try {
		const response = await axiosInstance.delete(`/events/day/${eventId}/${occurrenceId}`);
		return response.data;
	} catch (error) {
		console.error(`Delete event day error:`, error);
		throw error;
	}
};

// ✅ CUSTOM DELETE - Teljes esemény törlése
const deleteEventCompletely = async (eventId: number | string) => {
	try {
		const response = await axiosInstance.delete(`/events/complete/${eventId}`);
		return response.data;
	} catch (error) {
		console.error(`Delete event completely error:`, error);
		throw error;
	}
};

const EventService = {
	create, // Új esemény
	update, // Frissítés
	getAllByBuilding, // Összes esemény
	getEventDetails, // Részletek
	removeEventDay, // Csak 1 nap törlése
	removeEventCompletely, // Teljes törlés
    deleteEventDay,
    deleteEventCompletely
};

export default EventService;
