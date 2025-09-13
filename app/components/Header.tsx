import { FaUser } from "react-icons/fa6";
import { NavLink } from "react-router";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import type { House } from "~/hooks/useMain";

interface FilteredHouses {
	id: number;
	name: string;
}

export default function Header({ houses }: { houses: House[] }) {
	const [visible, setVisible] = useState(false);
	const [houseList, setHouseList] = useState<any>(houses);
	const [filteredHouses, setFilteredHouses] = useState<FilteredHouses[]>([]);

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

	return (
		<header className="pb-3">
			<nav aria-label="Global" className="flex items-center px-3 justify-between shadow-neutral-400-500 bg-transparent">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img src="/houseinfologo.png" alt="House-Info logo" className="h-15 p-0 w-auto" />
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							data-slot="icon"
							aria-hidden="true"
							className="size-6"
						>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-8">
					{houseList && houseList.length <= 3 ? (
						houseList.map((house: House) => (
							<NavLink key={house.id} to="/" className="text-sm/6 font-semibold text-dark">
								{house.name}
							</NavLink>
						))
					) : (
						<>
							{houseList &&
								houseList.slice(0, 3).map((house: House) => (
									<NavLink key={house.id} to="/main" className="text-sm/6 font-semibold text-dark">
										{house.name}
									</NavLink>
								))}
							{houseList && (
								<span className="text-sm/6 font-semibold text-dark" onClick={() => setVisible(true)}>
									...
								</span>
							)}
						</>
					)}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end px-3 gap-4">
					<a href="#" className="text-sm/6 font-semibold text-dark justify-items-center flex gap-4">
						UserName
						<FaUser className="my-auto" />
					</a>
				</div>
			</nav>

			<Dialog
				header="Houses"
				headerStyle={{ textAlign: "center" }}
				className="w-2xl"
				visible={visible}
				onHide={() => {
					setVisible(false);
					setFilteredHouses([]);
				}}
			>
				<div className="flex flex-row justify-center p-4 gap-1 border-bottom-1 border-amber-400">
					<IconField iconPosition="left" className="w-96">
						<InputIcon className="pi pi-search" />
						<InputText
							placeholder="Search"
							className="w-full"
							onChange={(e) => houseFiltering(e.target.value)}
						/>
					</IconField>
				</div>

				<div className="flex flex-row justify-center flex-wrap p-4 gap-4">
					{filteredHouses.length !== 0
						? filteredHouses.map((house: House) => (
								<NavLink key={house.id} to="/" className="text-sm/6 font-semibold text-dark block my-2">
									{house.name}
								</NavLink>
							))
						: houseList &&
							houseList.map((house: House) => (
								<NavLink key={house.id} to="/" className="text-sm/6 font-semibold text-dark block my-2">
									{house.name}
								</NavLink>
							))}
				</div>
			</Dialog>
		</header>
	);
}
