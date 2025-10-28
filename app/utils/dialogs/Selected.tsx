import { Dialog } from "primereact/dialog";
import Maintences from "~/components/Maintences";
import NewsPage from "~/components/NewsPage";
import type { Maintence, News } from "~/interfaces/Dashboard";

interface Selected {
	title: string;
	onViewDialogOpened: boolean;
	setOnViewDialogOpened: (onViewDialogOpened: boolean) => void;
	selectedItem: News | Maintence | null;
	setSelectedItem: (selectedItem: News | Maintence | null) => void;
	isNews: (item: News | Maintence) => item is News;
}

export default function Selected({
	title,
	onViewDialogOpened,
	setOnViewDialogOpened,
	selectedItem,
	setSelectedItem,
	isNews,
}: Selected) {
	return (
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
					{selectedItem && isNews(selectedItem) ? (
						<NewsPage
							title={selectedItem.title}
							content={selectedItem.content}
							createdBy={selectedItem.createdBy}
							date={selectedItem.publishedAt}
						/>
					) : selectedItem ? (
						<Maintences
							title={selectedItem.title}
							description={selectedItem.description}
							responsible={selectedItem.responsible || ""}
							status={selectedItem.status}
						/>
					) : null}
				</div>
			</div>
		</Dialog>
	);
}
