import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import type { House } from "~/hooks/useMain";
import SearchBar from "../utils/SearchBar";
import UserMenu from "./UserMenu";
import { Button } from "primereact/button";

interface FilteredHouses {
	id: number;
	name: string;
}

export default function Navbar({
	houses,
	setSelectedHouse,
}: {
	houses: House[];
	setSelectedHouse: (house: any) => void;
}) {
	const [visible, setVisible] = useState(false);
	const [houseList, setHouseList] = useState<any>(houses);
	const [filteredHouses, setFilteredHouses] = useState<FilteredHouses[]>([]);

	useEffect(() => {
		setHouseList(houses);
	}, [houses]);

	const houseFiltering = (searchTerm: string) => {
		let filtered: FilteredHouses[] = [];
		if (searchTerm.length >= 3) {
			filtered = houses
				.filter((house) => house.name.toLowerCase().includes(searchTerm.toLowerCase()))
				.map((house) => ({
					id: typeof house.id === "number" ? house.id : Number(house.id),
					name: house.name,
				}));
			if (filtered.length === 0) {
				filtered = [{ id: 0, name: "No results found" }];
			}
		}
		setFilteredHouses(filtered);
	};

	const onHouseSelect = (house: House) => {
		setSelectedHouse(house);
		setVisible(false);
	};

	return (
		<header className="pb-3 text-white fixed z-30 shadow-neutral-400-500 bg-dark-500/30  backdrop-blur-2xl">
			<nav aria-label="Global" className="flex flex-row min-w-screen px-8 items-center justify-between">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">HouseInfo</span>
						<img src="/houseinfologo.png" alt="House-Info logo" className="h-15 p-0 w-auto" />
					</a>
				</div>
				<div className="flex lg:hidden !px-6">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							data-slot="icon"
							aria-hidden="true"
							className="size-6"
						>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-8">
					{houseList && houseList.length <= 3 ? (
						houseList.map((house: House) => (
							<Button
								key={house.id}
								unstyled
								onClick={() => setSelectedHouse(house)}
								className="text-sm/6 font-semibold text-grey-50 block my-auto"
							>
								{house.name}
							</Button>
						))
					) : (
						<>
							{houseList &&
								houseList.slice(0, 3).map((house: House) => (
									<Button
										key={house.id}
										unstyled
										onClick={() => setSelectedHouse(house)}
										className="text-sm/6 font-semibold text-grey-50 block my-auto"
									>
										{house.name}
									</Button>
								))}
							{houseList && (
								<span className="text-sm/6 font-semibold text-grey-50 my-auto" onClick={() => setVisible(true)}>
									...
								</span>
							)}
						</>
					)}
				</div>
				<div className=" lg:flex lg:flex-1 lg:justify-end">
					<UserMenu />
				</div>
			</nav>

			<Dialog
				header="Házak"
				headerClassName="text-center !bg-[#343d4a]"
				className="w-2xl h-96"
				contentClassName="!bg-[#343d4a]"
				visible={visible}
				onHide={() => {
					setVisible(false);
					setFilteredHouses([]);
				}}
			>
				<div className="flex flex-row justify-center p-4 gap-1 border-bottom-1 border-amber-400">
					<SearchBar filterFunction={houseFiltering} />
				</div>

				<div className="flex flex-row justify-center flex-wrap p-4 gap-4">
					{filteredHouses.length !== 0
						? filteredHouses.map((house: House) => (
								<Button
									key={house.id}
									unstyled
									onClick={() => onHouseSelect(house)}
									className="text-sm/6 font-semibold text-grey-50 block my-auto"
								>
									{house.name}
								</Button>
							))
						: houseList.map((house: House) => (
								<Button
									key={house.id}
									unstyled
									onClick={() => onHouseSelect(house)}
									className="text-sm/6 font-semibold text-grey-50 block my-auto"
								>
									{house.name}
								</Button>
							))}
				</div>
			</Dialog>
		</header>
	);
}
