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
	
	{/*House[] | null = [
		{ id: 1, name: "Emerald Keep" },
		{ id: 2, name: "Shadowmere Manor" },
		{ id: 3, name: "Hársfaliget Ház" },
		{ id: 4, name: "Ironfang Hold" },
		{ id: 5, name: "Kőrisliget Kastély" },
		{ id: 6, name: "Whisperwind Lodge" },
		{ id: 7, name: "Vércse Torony" },
		{ id: 8, name: "Moonspire Hall" },
		{ id: 9, name: "Aranydomb Rezidencia" },
	];*/}

}

	return { houses };
}
