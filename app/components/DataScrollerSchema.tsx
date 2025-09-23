import { DataScroller } from "primereact/datascroller";
import type { News, Tasks } from "./MainPage";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import NewsPage from "./NewsPage";
import TasksPage from "./TasksPage";
import SearchBar from "./SearchBar";

export interface DataScrollerSchemaProps<T = News | Tasks> {
	dataTableValue: T[];
	title: string;
	type: "news" | "tasks";
}

export default function DataScrollerSchema<T extends News | Tasks>({
	dataTableValue,
	title,
	type,
}: DataScrollerSchemaProps<T>) {
	const [onDialogOpened, setOnDialogOpened] = useState<boolean>(false);
	const [onViewDialogOpened, setOnViewDialogOpened] = useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = useState<News | Tasks | null>(null);
	const [selectedItem, setSelectedItem] = useState<News | Tasks | null>(null); // Új state a kiválasztott elemhez
	const [createNews, setCreateNews] = useState<boolean>(false);
	const [createTask, setCreateTask] = useState<boolean>(false);
	const [filteredItem, setFilteredItem] = useState<typeof dataTableValue>(dataTableValue);

	const filter = (searchTerm: string) => {
		let filtered: typeof dataTableValue = [];

		if (searchTerm.length >= 3) {
			filtered = dataTableValue.filter((item) => {
				return Object.entries(item).some(([key, value]) => {
					if (typeof value === "string") {
						return value.toLowerCase().includes(searchTerm.toLowerCase());
					}
					return false;
				});
			}) as typeof dataTableValue;
		} else {
			filtered = dataTableValue;
		}

		setFilteredItem(filtered);
	};

	// Type guard függvények
	const isNews = (item: News | Tasks): item is News => {
		return type === "news";
	};

	const isTasks = (item: News | Tasks): item is Tasks => {
		return type === "tasks";
	};

	const renderNewsTemplate = (news: News, isHoverable = false) => {
		const hoverProps = isHoverable
			? {
					onMouseEnter: () => setHoveredItem(news),
					//onMouseLeave: () => setHoveredItem(null),
					style: { cursor: "pointer" },
				}
			: {};

		return (
			<div
				className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
				{...hoverProps}
			>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-bold text-gray-100">{news.title}</div>
						<div className="text-sm text-gray-300">{news.content}</div>
						<div className="text-xs text-gray-400">
							<i className="pi pi-user mr-2"></i>
							{news.createdBy}
						</div>
					</div>
					<div className="flex flex-col items-end gap-2">
						<span className="text-sm font-semibold text-gray-100">{news.date}</span>
						{isHoverable && (
							<Button
								icon="pi pi-trash"
								tooltip="Hír törlése"
								className="p-button-rounded p-button-sm !bg-red-500  !text-white"
							/>
						)}
						{!isHoverable && (
							<div className="flex justify-center items-center gap-3">
								<Button
									icon="pi pi-eye"
									className="p-button-rounded p-button-sm"
									onClick={() => {
										setSelectedItem(news);
										setOnViewDialogOpened(true);
									}}
								/>
								<Button
									icon="pi pi-trash"
									tooltip="Hír törlése"
									className="p-button-rounded p-button-sm !bg-red-500  !text-white"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	const renderTasksTemplate = (tasks: Tasks, isHoverable = false) => {
		const hoverProps = isHoverable
			? {
					onMouseEnter: () => setHoveredItem(tasks),
					//onMouseLeave: () => setHoveredItem(null),
					style: { cursor: "pointer" },
				}
			: {};

		return (
			<div
				className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
				{...hoverProps}
			>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-bold text-gray-100">{tasks.title}</div>
						<div className="text-sm text-gray-300">{tasks.description}</div>
						{tasks.responsible && (
							<div className="text-xs text-green-400">
								<i className="pi pi-user-plus mr-2"></i>
								Felelős: {tasks.responsible}
							</div>
						)}
					</div>
					<div className="flex flex-col justify-center items-end">
						{isHoverable && (
							<Button
								icon="pi pi-trash"
								tooltip="Feladat törlése"
								className="p-button-rounded p-button-sm !bg-red-500  !text-white"
							/>
						)}
						{!isHoverable && (
							<div className="flex justify-center items-center gap-3">
								<Button
									icon="pi pi-eye"
									className="p-button-rounded p-button-sm"
									onClick={() => {
										setSelectedItem(tasks);
										setOnViewDialogOpened(true);
									}}
								/>
								<Button
									icon="pi pi-trash"
									tooltip="Feladat törlése"
									className="p-button-rounded p-button-sm !bg-red-500  !text-white"
								/>
							</div>
						)}
						<div className="text-xs my-3 text-gray-400">
							<i className="pi pi-wave-pulse mr-2"></i>
							{tasks.status}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const itemTemplate = (item: News | Tasks, isHoverable = false) => {
		if (isNews(item)) {
			return renderNewsTemplate(item, isHoverable);
		} else if (isTasks(item)) {
			return renderTasksTemplate(item, isHoverable);
		}
	};

	// Külön template a dialog-ban lévő DataScroller-hez (hover funkcionalitással)
	const hoverableItemTemplate = (item: News | Tasks) => {
		return itemTemplate(item, true);
	};

	// Komponens a jobb oldali részletekhez
	const renderItemDetails = () => {
		if (!hoveredItem && !createNews && !createTask) {
			return (
				<div className="flex items-center justify-center h-full text-gray-400">
					<div className="text-center">
						<i className="pi pi-info-circle text-4xl mb-4"></i>
						<p>Vigye az egeret egy elem fölé a részletek megtekintéséhez</p>
					</div>
				</div>
			);
		}

		if (createNews) {
			return (
				<div className="p-4  rounded-lg h-fit">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-bold text-gray-100 mb-4">Új hír létrehozása</h3>
						<i
							className="pi pi-times cursor-pointer"
							style={{ fontSize: "2rem" }}
							onClick={() => setCreateNews(false)}
						></i>
					</div>
					<NewsPage title="" content="" createdBy="" date="" />
				</div>
			);
		}

		if (createTask) {
			return (
				<div className="p-4  rounded-lg h-fit">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-bold text-gray-100 mb-4">Új feladat létrehozása</h3>
						<i
							className="pi pi-times cursor-pointer"
							style={{ fontSize: "2rem" }}
							onClick={() => setCreateTask(false)}
						></i>
					</div>
					<TasksPage title="" description="" responsible="" status="" />
				</div>
			);
		}

		if (hoveredItem) {
			return (
				<div className="p-4  rounded-lg h-fit">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl font-bold text-gray-100 mb-4">Részletek</h3>
						<i
							className="pi pi-times cursor-pointer"
							style={{ fontSize: "2rem" }}
							onClick={() => setHoveredItem(null)}
						></i>
					</div>
					{isNews(hoveredItem) ? (
						<div className="space-y-3">
							<NewsPage
								title={hoveredItem.title}
								content={hoveredItem.content}
								createdBy={hoveredItem.createdBy}
								date={hoveredItem.date}
							/>
						</div>
					) : (
						<div className="space-y-3">
							<TasksPage
								title={hoveredItem.title}
								description={hoveredItem.description}
								responsible={hoveredItem.responsible || ""}
								status={hoveredItem.status}
							/>
						</div>
					)}
				</div>
			);
		}
	};

	const header = () => {
		return (
			<div className="w-full flex flex-row justify-between items-center">
				<p className="mx-4 text-dark-200 font-black">{title}</p>
				<div className="flex flex-row items-center justify-around gap-2">
					<SearchBar filterFunction={filter} />
					<span
						className="pi pi-window-maximize cursor-pointer hover:text-blue-500"
						onClick={() => setOnDialogOpened(!onDialogOpened)}
					></span>
				</div>
			</div>
		);
	};

	const headerMaximalized = () => {
		return (
			<div className="flex flex-row items-center justify-between gap-2">
				<SearchBar filterFunction={filter} />

				{type === "news" && (
					<Button
						icon="pi pi-plus"
						tooltip="Új hír létrehozása"
						onClick={() => setCreateNews(true)}
						className="!p-2 !bg-teal-400  !text-white !font-semibold !rounded-md !shadow-md"
					/>
				)}

				{type === "tasks" && (
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

	return (
		<div>
			<DataScroller
				value={filteredItem}
				itemTemplate={itemTemplate}
				rows={5}
				inline
				scrollHeight="310px"
				header={header()}
				className="!bg-[#343d4a]"
			/>

			{/* Dialog */}
			{onDialogOpened && (
				<Dialog
					header={title}
					headerStyle={{ marginLeft: "1.5rem" }}
					visible={onDialogOpened}
					onHide={() => {
						setOnDialogOpened(false);
						setHoveredItem(null); // Reset hover state when closing
						setFilteredItem(dataTableValue);
					}}
					className="min-h-[96vh] w-[96vw] !bg-[#343d4a] text-gray-300 px-3 overflow-hidden"
					contentClassName="h-full p-0 !bg-[#343d4a] text-gray-300 px-3"
					headerClassName="!bg-[#343d4a] text-gray-300 px-3"
					draggable={false}
					resizable={false}
				>
					<div className="grid grid-cols-2 gap-4">
						<DataScroller
							value={filteredItem}
							itemTemplate={hoverableItemTemplate}
							rows={15}
							inline
							scrollHeight="510px"
							header={headerMaximalized()}
							className="!bg-[#343d4a]"
						/>

						{/* Jobb oldali részletek panel */}
						<div className="bg-[#343d4a] p-4 rounded-lg">{renderItemDetails()}</div>
					</div>
				</Dialog>
			)}

			{onViewDialogOpened && selectedItem && (
				<Dialog
					header={title}
					headerStyle={{ marginLeft: "1.5rem" }}
					visible={onViewDialogOpened}
					onHide={() => {
						setOnViewDialogOpened(false);
						setSelectedItem(null);
					}}
					className="min-h-[96vh] w-[46vw] !bg-[#343d4a] text-gray-300 px-3 overflow-hidden"
					contentClassName="h-full p-0 !bg-[#343d4a] text-gray-300 px-3"
					headerClassName="!bg-[#343d4a] text-gray-300 px-3"
					draggable={false}
					resizable={false}
				>
					<div className="grid grid-cols-1 gap-4">
						<div className="bg-[#343d4a] p-4 rounded-lg">
							{isNews(selectedItem) ? (
								<NewsPage
									title={selectedItem.title}
									content={selectedItem.content}
									createdBy={selectedItem.createdBy}
									date={selectedItem.date}
								/>
							) : (
								<TasksPage
									title={selectedItem.title}
									description={selectedItem.description}
									responsible={selectedItem.responsible || ""}
									status={selectedItem.status}
								/>
							)}
						</div>
					</div>
				</Dialog>
			)}
		</div>
	);
}
