import { Button } from "primereact/button";
import SearchBar from "./SearchBar";
import FileUploader from "~/components/FileUploader";
import { useAuth } from "./AuthProvider";

export interface HeaderInterface {
	title?: string;
	type?: string;
	filter?: (searchTerm: string) => void;
	onMaximizedOpened?: boolean;
	setOnMaximizedOpened?: (onDialogOpened: boolean) => void;
	setCreateNews?: (item: boolean) => void;
	setCreateTask?: (item: boolean) => void;
	setCreateParking?: (item: boolean) => void;
	fileUpdateDialog?: boolean;
	buildingId?: number;
}

const header = ({
	title,
	filter,
	onMaximizedOpened,
	setOnMaximizedOpened,
	fileUpdateDialog,
	setCreateNews,
	setCreateTask,
	setCreateParking,
	type,
	buildingId,
}: HeaderInterface) => {
	const { user } = useAuth();
	return (
		<div className="w-full flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center">
			<p className="mx-4 text-dark-200 font-black">{title}</p>
			<div className="flex flex-row items-center gap-2 px-4 md:px-0">
				{filter && (
					<div className="flex-1 md:flex-none">
						<SearchBar filterFunction={filter} />
					</div>
				)}

				<div className="flex flex-row items-center gap-2 flex-shrink-0">
					{type === "news" && setCreateNews && (
						<Button
							icon="pi pi-plus"
							tooltip="Új hír létrehozása"
							onClick={() => setCreateNews(true)}
							className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
						/>
					)}

					{type === "maintence" && setCreateTask && (
						<Button
							icon="pi pi-plus"
							tooltip="Új feladat létrehozása"
							onClick={() => setCreateTask(true)}
							className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
						/>
					)}

					{type === "parking" && setCreateParking && (
						<Button
							icon="pi pi-plus"
							tooltip="Új feladat létrehozása"
							onClick={() => setCreateParking(true)}
							className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
						/>
					)}
					
					{setOnMaximizedOpened !== undefined && (
						<div className="hidden md:block">
							<span
								className="pi pi-window-maximize cursor-pointer hover:text-blue-500"
								onClick={() => setOnMaximizedOpened(!onMaximizedOpened)}
							/>
						</div>
					)}

					{fileUpdateDialog && (
						<FileUploader buildingId={buildingId ? buildingId : null} uploadedBy={user.userId} />
					)}
				</div>
			</div>
		</div>
	);
};

const headerMaximalized = ({ type, filter, setCreateNews, setCreateTask }: HeaderInterface) => {
	return (
		<div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
			{filter && (
				<div className="flex-1">
					<SearchBar filterFunction={filter} />
				</div>
			)}

			<div className="flex flex-row gap-2 justify-end">
				{type === "news" && setCreateNews && (
					<Button
						icon="pi pi-plus"
						tooltip="Új hír létrehozása"
						onClick={() => setCreateNews(true)}
						className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
					/>
				)}

				{type === "maintence" && setCreateTask && (
					<Button
						icon="pi pi-plus"
						tooltip="Új feladat létrehozása"
						onClick={() => setCreateTask(true)}
						className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
					/>
				)}
			</div>
		</div>
	);
};

const DataHeader = {
	header,
	headerMaximalized,
};

export default DataHeader;