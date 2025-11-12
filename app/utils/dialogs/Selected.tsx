import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import Announcements from "~/components/Announcements";
import type { Maintence, News } from "~/interfaces/Dashboard";

interface Selected {
	title: string;
	onViewDialogOpened: boolean;
	setOnViewDialogOpened: (onViewDialogOpened: boolean) => void;
	selectedItem: News | Maintence | null;
	setSelectedItem: (selectedItem: News | Maintence | null) => void;
	isNews: (item: News | Maintence) => item is News;
	buildingId: number;
}

export default function Selected({
	title,
	onViewDialogOpened,
	setOnViewDialogOpened,
	selectedItem,
	setSelectedItem,
	isNews,
	buildingId
}: Selected) {
	return (
		<Dialog
			header={title}
			headerStyle={{ marginLeft: "0.65rem" }}
			visible={onViewDialogOpened}
			onHide={() => {
				setOnViewDialogOpened(false);
				setSelectedItem(null);
			}}
			className="min-h-[60vh] w-[30vw] !bg-[#343d4a] text-gray-300 overflow-hidden"
			contentClassName="h-full p-0 !bg-[#343d4a] text-gray-300"
			headerClassName="!bg-[#343d4a] text-gray-300"
			draggable={false}
			resizable={false}
		>
			<div className="grid grid-cols-1">
				<div className="bg-[#343d4a] rounded-lg">
					{selectedItem && isNews(selectedItem) ? (
						<Announcements
							title={selectedItem.title}
							content={selectedItem.content}
							author={selectedItem.author}
							authorId={selectedItem.authorId ? selectedItem.authorId : ""}
							date={selectedItem.publishedAt}
							buildingId={buildingId}
						/>
					) : selectedItem ? (
						<Maintences
							title={selectedItem.title}
							description={selectedItem.description}
							reportedBy={selectedItem.reportedBy}
							reportedById={parseInt(selectedItem.reportedById)}
							priority={selectedItem.priority}
							status={selectedItem.status}
							buildingId={buildingId}
						/>
					) : null}
				</div>
			</div>
		</Dialog>
	);
}
