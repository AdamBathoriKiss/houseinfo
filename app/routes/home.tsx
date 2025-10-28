import Welcome from "~/components/Welcome";
import type { Route } from "./+types/home";
import useMain from "~/hooks/useMain";
import LoggedIn from "~/components/Dashboard";
import HouseRegistration from "~/components/HouseRegistration";
import { useEffect, useState } from "react";
import { useAuth } from "~/utils/AuthProvider";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
	return [{ title: "House-Info" }, { name: "description", content: "House-Info offical site." }];
}

export default function Home() {
	const { token } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [selectedHouse, setSelectedHouse] = useState<any>(null);
	const { houses } = useMain();

	useEffect(() => {
		token && token !== null ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, [token]);

	useEffect(() => {
		token && houses && selectedHouse === null && setSelectedHouse(houses[0]);
	}, [token, houses]);

	return (
		<>
			{isLoggedIn ? (
				<div className="flex flex-col min-h-screen surface-ground bg-dark-500">
					<Navbar houses={houses ?? []} setSelectedHouse={setSelectedHouse} />
					<div className="mt-[7vh]">
						{houses && houses.length > 0 ? (
							<LoggedIn houses={houses} selectedHouse={selectedHouse} />
						) : (
							<HouseRegistration />
						)}
					</div>
				</div>
			) : (
				<Welcome />
			)}
		</>
	);
}
