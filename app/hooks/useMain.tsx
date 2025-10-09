import { useEffect, useState } from "react";
import BuildingService from "~/services/buildings.service";

export interface House {
	id: string | number;
	name: string;
}

export default function useMain () {
	const [houses, setHouses] = useState<House[] | null>(null);
	
	useEffect(() => {
		fetchHouses();
	}, []);
	
const fetchHouses = () => {

	BuildingService.getBuildings()
	.then((response) => {
		setHouses(response.data);
	}).catch((error) => {
		console.error("Error fetching buildings:", error);
	});
	

}

	return { houses };
}
