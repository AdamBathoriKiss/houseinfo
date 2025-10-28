import { DataScroller } from "primereact/datascroller";
import type { News, Maintence } from "../interfaces/Dashboard";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import NewsPage from "./NewsPage";
import Maintences from "./Maintences";
import DataScrollerHeader from "../utils/DataScrollerHeader";
import Maximalized from "~/utils/dialogs/Maximalized";
import Selected from "~/utils/dialogs/Selected";

export interface DataScrollerSchemaProps<T = News | Maintence> {
	dataTableValue: T[];
	title: string;
	type: "news" | "maintence";
}

export default function DataScrollerSchema<T extends News | Maintence>({
	dataTableValue,
	title,
	type,
}: DataScrollerSchemaProps<T>) {
	const [onMaximizedOpened, setOnMaximizedOpened] = useState<boolean>(false);
	const [onViewDialogOpened, setOnViewDialogOpened] = useState<boolean>(false);
	const [hoveredItem, setHoveredItem] = useState<News | Maintence | null>(null);
	const [selectedItem, setSelectedItem] = useState<News | Maintence | null>(null);
	const [filteredItem, setFilteredItem] = useState<typeof dataTableValue>([]);

	useEffect(() => {
		setFilteredItem(dataTableValue);
	}, [dataTableValue]);

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
		setHoveredItem(null); // Reset hover state when closing
		setFilteredItem(dataTableValue);
	};

	// Type guard függvények
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
						<span className="text-sm font-semibold text-gray-100">{news.publishedAt}</span>
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

	const renderMaintenceTemplate = (Maintence: Maintence, isHoverable = false) => {
		const hoverProps = isHoverable
			? {
					onMouseEnter: () => setHoveredItem(Maintence),
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
						<div className="text-xl font-bold text-gray-100">{Maintence.title}</div>
						<div className="text-sm text-gray-300">{Maintence.description}</div>
						{Maintence.responsible && (
							<div className="text-xs text-green-400">
								<i className="pi pi-user-plus mr-2"></i>
								Felelős: {Maintence.responsible}
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
										setSelectedItem(Maintence);
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
							{Maintence.status}
						</div>
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
		<div>
			<DataScroller
				value={filteredItem}
				itemTemplate={itemTemplate}
				rows={5}
				inline
				scrollHeight="310px"
				header={DataScrollerHeader.header({ title, filter, onMaximizedOpened, setOnMaximizedOpened })}
				className="!bg-[#343d4a]"
			/>

			{/* Dialog */}
			{onMaximizedOpened && (
				<Maximalized
					title={title}
					type={type}
					onMaximizedHide={onMaximizedHide}
					onMaximizedOpened={onMaximizedOpened}
					filter={filter}
					filteredItem={filteredItem}
					itemTemplate={itemTemplate}
					hoveredItem={hoveredItem}
					setHoveredItem={setHoveredItem}
				/>
			)}

			{onViewDialogOpened && selectedItem && (
				<Selected
					title={title}
					onViewDialogOpened={onViewDialogOpened}
					setOnViewDialogOpened={setOnViewDialogOpened}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					isNews={isNews}
				/>
			)}
		</div>
	);
}
