import { DataScroller } from "primereact/datascroller";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import Maintences from "~/components/Maintences";
import Announcements from "~/components/Announcements";
import type { Maintence, News } from "~/interfaces/Dashboard";
import DataScrollerHeader from "../DataHeader";
import Create from "./Create";
import { useAuth } from "../AuthProvider";

interface Maximalized<T = News | Maintence> {
	title: string;
	type: "news" | "maintence" | "newsDialog" | "maintenceDialog";
	buildingId: number;
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
	buildingId,
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
	const {user} = useAuth();
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
			return <Create type="newsDialog" visible={createNews} setVisible={setCreateNews} buildingId={buildingId} />;
		}

		if (createTask) {
			return (
				<Create
					type="maintenceDialog"
					visible={createTask}
					setVisible={setCreateTask}
					buildingId={buildingId}
				/>
			);
		}

		if (hoveredItem) {
			return (
				<div className="rounded-lg h-fit">
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
							<Announcements
								id={user.userId}
								title={hoveredItem.title}
								buildingId={buildingId}
								content={hoveredItem.content}
								author={hoveredItem.author}
								authorId={hoveredItem.authorId ? hoveredItem.authorId : ""}
								date={hoveredItem.publishedAt}
							/>
						</div>
					) : (
						<div className="space-y-3">
							<Maintences
								id={user.userId}
								title={hoveredItem.title}
								buildingId={buildingId}
								description={hoveredItem.description}
								status={hoveredItem.status}
								priority=""
								reportedBy={user.userId}
								reportedById={user.userId}
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
			contentClassName="h-full !p-0 !bg-[#343d4a] text-gray-300 px-3"
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
