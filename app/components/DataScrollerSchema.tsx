import { DataScroller } from "primereact/datascroller";
import type { News, Maintence } from "../interfaces/Dashboard";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import DataScrollerHeader from "../utils/DataHeader";
import Maximalized from "~/utils/dialogs/Maximalized";
import Selected from "~/utils/dialogs/Selected";
import dayjs from "dayjs";
import Create from "~/utils/dialogs/Create";
import { useCommonProcesses } from "~/hooks/useCommonProcesses";
import { useAuth } from "~/utils/AuthProvider";

const categoryLabels: Record<string, string> = {
	PLUMBING: "Vízvezeték",
	ELECTRICAL: "Villany",
	HEATING: "Fűtés",
	ELEVATOR: "Lift",
	COMMON_AREA: "Közös területek",
	STRUCTURAL: "Szerkezeti",
	OTHER: "Egyéb",
};

export interface DataScrollerSchemaProps<T = News | Maintence> {
	dataTableValue: T[];
	title: string;
	id?: number;
	type: "news" | "maintence" | "newsDialog" | "maintenceDialog";
	buildingId: number;
}

export default function DataScrollerSchema<T extends News | Maintence>({
	dataTableValue,
	id,
	title,
	type,
	buildingId,
}: DataScrollerSchemaProps<T>) {
	const [onMaximizedOpened, setOnMaximizedOpened] = useState<boolean>(false);
	const [onViewDialogOpened, setOnViewDialogOpened] = useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = useState<News | Maintence | null>(null);
	const [selectedItem, setSelectedItem] = useState<News | Maintence | null>(null);
	const [createNews, setCreateNews] = useState(false);
	const [createTask, setCreateTask] = useState(false);
	const [filteredItem, setFilteredItem] = useState<typeof dataTableValue>([]);
	const { remove } = useCommonProcesses();
	const { user } = useAuth();

	useEffect(() => {
		setFilteredItem(dataTableValue);
	}, [dataTableValue, user]);

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

	const onMaximizedHide = () => {
		setOnMaximizedOpened(false);
		setHoveredItem(null);
		setFilteredItem(dataTableValue);
	};

	const isNews = (item: News | Maintence): item is News => {
		return type === "news";
	};

	const isMaintence = (item: News | Maintence): item is Maintence => {
		return type === "maintence";
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
				className="flex flex-row justify-between text-gray-100 !bg-transparent p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
				{...hoverProps}
			>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-bold text-gray-100">{news.title}</div>
						{/*<div className="text-sm text-gray-300">{news.content}</div>*/}
						<div className="text-xs text-gray-400">
							<i className="pi pi-user mr-2"></i>
							{`${news.author?.lastName} ${news.author?.firstName}`}
						</div>
					</div>
					<div className="flex flex-col items-end gap-2">
						<span className="text-sm font-semibold text-gray-100">
							{dayjs(news.publishedAt).format("YYYY-MM-DD HH:mm")}
						</span>
						{isHoverable && (
							<Button
								icon="pi pi-trash"
								tooltip="Hír törlése"
								onClick={() => remove("announcements", news.id)}
								className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
							/>
						)}
						{!isHoverable && (
							<div className="flex justify-center items-center gap-3">
								<Button
									icon="pi pi-eye"
									unstyled
									className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
									onClick={() => {
										setSelectedItem(news);
										setOnViewDialogOpened(true);
									}}
								/>
								<Button
									icon="pi pi-trash"
									tooltip="Hír törlése"
									onClick={() => remove("announcements", news.id)}
									className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	const renderMaintenceTemplate = (maintence: Maintence, isHoverable = false) => {
		const hoverProps = isHoverable
			? {
					onMouseEnter: () => setHoveredItem(maintence),
					style: { cursor: "pointer" },
				}
			: {};

		return (
			<div
				className="flex flex-row justify-between text-gray-100 !bg-transparent p-4 mb-2 rounded-lg hover:!bg-[#3d4651] transition-colors duration-200"
				{...hoverProps}
			>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-bold text-gray-100">{maintence.title}</div>

						{maintence.category && (
							<div className="text-sm text-blue-400">
								<i className="pi pi-tag mr-2"></i>
								Kategória: {categoryLabels[maintence.category] || maintence.category}
							</div>
						)}

						{maintence.reportedBy && (
							<div className="text-xs text-green-400">
								<i className="pi pi-user mr-2"></i>
								Bejelentő:{" "}
								{`${maintence.reportedBy?.lastName ?? ""} ${maintence.reportedBy?.firstName ?? ""}`}
							</div>
						)}
					</div>
					<div className="flex flex-col justify-center items-end">
						{isHoverable && (
							<Button
								icon="pi pi-trash"
								tooltip="Feladat törlése"
								onClick={() => remove("maintences", maintence.id)}
								className="p-button-rounded p-button-sm !bg-red-500  !text-white"
							/>
						)}
						{!isHoverable && (
							<div className="flex justify-center items-center gap-3">
								<Button
									icon="pi pi-eye"
									unstyled
									className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
									onClick={() => {
										setSelectedItem(maintence);
										setOnViewDialogOpened(true);
									}}
								/>
								<Button
									icon="pi pi-trash"
									tooltip="Feladat törlése"
									onClick={() => remove("maintences", maintence.id)}
									className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
								/>
							</div>
						)}
						<div className="text-xs my-3 text-gray-400">
							<i className="pi pi-wave-pulse mr-2"></i>
							{maintence.priority}
						</div>

						<div className="text-sm text-gray-300">{maintence.status}</div>
					</div>
				</div>
			</div>
		);
	};

	const itemTemplate = (item: News | Maintence, isHoverable = false) => {
		if (isNews(item)) {
			return renderNewsTemplate(item, isHoverable);
		} else if (isMaintence(item)) {
			return renderMaintenceTemplate(item, isHoverable);
		}
	};

	return (
		<div
  className="
    flex flex-col
    bg-transparent
    rounded-xl
    shadow-xl
    h-[55vh]      /* alap magasság */
    sm:h-[50vh]
    md:h-[45vh]
    lg:h-[43.5vh]
  "
>
			<DataScroller
				value={filteredItem}
				itemTemplate={itemTemplate}
				rows={5}
				scrollHeight="calc(100% - 4rem)"
				inline
				header={DataScrollerHeader.header({
					title,
					filter,
					onMaximizedOpened,
					setOnMaximizedOpened,
					type,
					setCreateNews,
					setCreateTask,
				})}
				className="flex-1 !bg-transparent overflow-hidden"
			/>

			{onMaximizedOpened && (
				<Maximalized
					title={title}
					type={type}
					buildingId={buildingId}
					onMaximizedHide={onMaximizedHide}
					onMaximizedOpened={onMaximizedOpened}
					filter={filter}
					filteredItem={filteredItem}
					itemTemplate={itemTemplate}
					hoveredItem={hoveredItem}
					setHoveredItem={setHoveredItem}
				/>
			)}

			{onViewDialogOpened &&
				selectedItem &&
				(console.log(selectedItem),
				(
					<Selected
						title={title}
						id={id ? id : null}
						onViewDialogOpened={onViewDialogOpened}
						setOnViewDialogOpened={setOnViewDialogOpened}
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						isNews={isNews}
						buildingId={buildingId}
					/>
				))}
			{type === "news" && createNews && (
				<Create
					type="newsDialog"
					visible={createNews}
					setVisible={setCreateNews}
					buildingId={buildingId}
					user={user}
				/>
			)}
			{type === "maintence" && createTask && (
				<Create
					type="maintenceDialog"
					visible={createTask}
					setVisible={setCreateTask}
					buildingId={buildingId}
					user={user}
				/>
			)}
		</div>
	);
}
