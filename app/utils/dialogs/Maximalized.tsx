import { DataScroller } from "primereact/datascroller";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import Maintences from "~/components/Maintences";
import NewsPage from "~/components/NewsPage";
import type { Maintence, News } from "~/interfaces/Dashboard";
import DataScrollerHeader from "../DataHeader";

interface Maximalized<T = News | Maintence> {
	title: string;
	type: "news" | "maintence";
	onMaximizedHide: () => void;
	onMaximizedOpened: boolean;
	filter?: (searchTerm: string) => void;
	filteredItem: T[];
	itemTemplate: (item: T, isHoverable: boolean) => React.ReactNode;
	hoveredItem: News | Maintence | null; // Új prop
	setHoveredItem: (item: News | Maintence | null) => void;
}

export default function Maximalized({
	title,
	type,
	onMaximizedHide,
	onMaximizedOpened,
	filter,
	filteredItem,
	itemTemplate,
	hoveredItem,
	setHoveredItem,
}: Maximalized) {
	const [createNews, setCreateNews] = useState<boolean>(false);
	const [createTask, setCreateTask] = useState<boolean>(false);
	// Type guard függvények
	const isNews = (item: News | Maintence): item is News => {
		return type === "news";
	};

	// Külön template a dialog-ban lévő DataScroller-hez (hover funkcionalitással)
	const hoverableItemTemplate = (item: News | Maintence) => {
		return itemTemplate(item, true);
	};

	const maximizedHeader = DataScrollerHeader.headerMaximalized({
		type,
		filter,
		setCreateNews,
		setCreateTask,
	});

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
					<Maintences title="" description="" responsible="" status="" />
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
								date={hoveredItem.publishedAt}
							/>
						</div>
					) : (
						<div className="space-y-3">
							<Maintences
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

	return (
		<Dialog
			header={title}
			headerStyle={{ marginLeft: "1.5rem" }}
			visible={onMaximizedOpened}
			onHide={onMaximizedHide}
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
					header={maximizedHeader}
					className="!bg-[#343d4a]"
				/>

				{/* Jobb oldali részletek panel */}
				<div className="bg-[#343d4a] p-4 rounded-lg">{renderItemDetails()}</div>
			</div>
		</Dialog>
	);
}
