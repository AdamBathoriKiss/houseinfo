import axiosInstance from "~/api/axiosInstance";

// ❌ CSAK ADOTT NAP TÖRLÉSE (többnapos esemény napja marad!)
const removeEventDay = async (eventId: number | string, occurrenceId: number | string) => {
    const response = await axiosInstance.delete(`/events/day/${eventId}/${occurrenceId}`);
    return response.data;
};

// ❌ EGÉSZ ESEMÉNY TÖRLÉSE (minden nappal együtt)
const removeEventCompletely = async (eventId: number | string) => {
    const response = await axiosInstance.delete(`/events/complete/${eventId}`);
    return response.data;
};

// 📊 ESEMÉNY INFO (törlés előtt ellenőrzéshez)
const getEventDetails = async (eventId: number | string) => {
    const response = await axiosInstance.get(`/events/${eventId}`);
    return response.data;
};

const EventService = {
    removeEventDay,        // csak 1 nap
    removeEventCompletely, // minden nap
    getEventDetails        // részletek
};

export default EventService;
