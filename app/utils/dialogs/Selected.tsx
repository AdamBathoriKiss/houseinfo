import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import Announcements from "~/components/Announcements";
import type { Maintence, News } from "~/interfaces/Dashboard";

interface Selected {
	id: number | null;
	title: string;
	onViewDialogOpened: boolean;
	setOnViewDialogOpened: (onViewDialogOpened: boolean) => void;
	selectedItem: News | Maintence | null;
	setSelectedItem: (selectedItem: News | Maintence | null) => void;
	isNews: (item: News | Maintence) => item is News;
	buildingId: number;
}

export default function Selected({
	id,
	title,
	onViewDialogOpened,
	setOnViewDialogOpened,
	selectedItem,
	setSelectedItem,
	isNews,
	buildingId,
}: Selected) {
	return (
		<Dialog
			header={title}
			visible={onViewDialogOpened}
			onHide={() => {
				setOnViewDialogOpened(false);
				setSelectedItem(null);
			}}
			style={{
				width: "90vw",
				maxWidth: "800px",
				minHeight: "60vh",
				maxHeight: "90vh",
			}}
			modal
			className="!bg-[#2a3441] text-gray-200 shadow-2xl border-0"
			contentStyle={{
				height: "auto",
				maxHeight: "80vh",
				padding: 0,
				backgroundColor: "#2a3441",
			}}
			headerStyle={{
				backgroundColor: "#2a3441",
				color: "white",
				borderBottom: "1px solid #3a4759",
				padding: "1rem 1.5rem",
				fontWeight: 600,
				fontSize: "1.1rem",
			}}
			draggable={false}
			resizable={false}
			breakpoints={{
				"960px": "90vw",
				"640px": "95vw",
			}}
		>
			{/* ✅ SCROLLABLE CONTENT */}
			<div className="h-full overflow-y-auto p-4 md:p-6 max-h-[70vh]">
				<div className="space-y-4">
					{selectedItem && isNews(selectedItem) ? (
						<Announcements
							id={parseInt(selectedItem.id as string)}
							title={selectedItem.title}
							type="update"
							content={selectedItem.content}
							author={selectedItem.author ?? null}
							authorId={selectedItem.authorId ?? ""}
							date={selectedItem.publishedAt}
							buildingId={buildingId}
						/>
					) : selectedItem ? (
						<Maintences
							id={parseInt(selectedItem.id as string)}
							title={selectedItem.title}
							description={selectedItem.description}
							reportedBy={selectedItem.reportedBy}
							reportedById={parseInt(selectedItem.reportedById as string)}
							priority={selectedItem.priority}
							status={selectedItem.status}
							category={selectedItem.category}
							buildingId={buildingId}
						/>
					) : (
						<div className="flex items-center justify-center h-32 text-gray-400">
							<p className="text-sm">Válassz elemet a megtekintéshez</p>
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
}
