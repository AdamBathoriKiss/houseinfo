import { DataScroller } from "primereact/datascroller";
import type { News } from "./MainPage";
import { Button } from "primereact/button";

// Javított interface - csak News típust fogad el
export interface ListSchemaProps {
	dataTableValue: News[];
	title: string;
	type: string;
}

export default function ListViewSchema({ dataTableValue, title, type }: ListSchemaProps) {
	const itemTemplate = (news: News) => {
		return (
			<div className="flex flex-row justify-between text-gray-100 !bg-[#343d4a] p-4 mb-2 rounded-lg">
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
						<Button icon="pi pi-eye" className="p-button-rounded p-button-sm" />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<DataScroller
				value={dataTableValue}
				itemTemplate={itemTemplate}
				rows={5}
				inline
				scrollHeight="500px"
				header={title}
				className="!bg-[#343d4a]"
			/>
		</div>
	);
}
