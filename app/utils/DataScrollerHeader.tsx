import { Button } from "primereact/button";
import SearchBar from "./SearchBar";

export interface HeaderInterface {
	title?: string;
	type?: string;
	filter?: (searchTerm: string) => void;
	onDialogOpened?: boolean;
	setOnDialogOpened?: (onDialogOpened: boolean) => void;
	setCreateNews?: (item: boolean) => void;
	setCreateTask?: (item: boolean) => void;
}

const header = ({ title, filter, onDialogOpened, setOnDialogOpened }: HeaderInterface) => {
	return (
		<div className="w-full flex flex-row justify-between items-center">
			<p className="mx-4 text-dark-200 font-black">{title}</p>
			<div className="flex flex-row items-center justify-around gap-2">
				{filter && <SearchBar filterFunction={filter} />}
				{setOnDialogOpened !== undefined && (
					<span
						className="pi pi-window-maximize cursor-pointer hover:text-blue-500"
						onClick={() => setOnDialogOpened(!onDialogOpened)}
					></span>
				)}
			</div>
		</div>
	);
};

const headerMaximalized = ({ type, filter, setCreateNews, setCreateTask }: HeaderInterface) => {
	return (
		<div className="flex flex-row items-center justify-between gap-2">
			{filter && <SearchBar filterFunction={filter} />}

			{type === "news" && setCreateNews && (
				<Button
					icon="pi pi-plus"
					tooltip="Új hír létrehozása"
					onClick={() => setCreateNews(true)}
					className="!p-2 !bg-teal-400  !text-white !font-semibold !rounded-md !shadow-md"
				/>
			)}

			{type === "maintence" && setCreateTask && (
				<Button
					icon="pi pi-plus"
					tooltip="Új feladat létrehozása"
					onClick={() => setCreateTask(true)}
					className="!p-2 !bg-teal-400  !text-white !font-semibold !rounded-md !shadow-md"
				/>
			)}
		</div>
	);
};

const DataScrollerHeader = {
	header,
	headerMaximalized,
};

export default DataScrollerHeader;
