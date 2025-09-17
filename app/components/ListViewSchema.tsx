import { DataView } from "primereact/dataview";
import type { News } from "./MainPage";
import { Button } from "primereact/button";

// Javított interface - csak News típust fogad el
export interface ListSchemaProps {
	dataTableValue: News[];
	title: string;
	type: string;
}

export default function ListViewSchema({ dataTableValue, title, type }: ListSchemaProps) {
	const itemTemplate = (news: News, index: number) => {
		return (
			<div className="flex flex-row justify-between text-gray-100 !bg-[#343d4a]" key={news.id}>
				<div className="flex flex-row w-full my-2 justify-between items-center">
					<div className="flex flex-row sm:flex-row justify-between items-center xl:items-start flex-1 gap-4 text-gray-100">
						<div className="flex flex-row items-center sm:items-start gap-3 text-gray-100">
							<div className="text-2xl font-bold text-gray-100">{news.title}</div>
							<div className="flex items-center gap-3 text-gray-100">
								<span className="flex items-center gap-2 text-gray-100">
									<span className="font-semibold text-gray-100">{news.content}</span>
								</span>
							</div>
						</div>
						<div className="flex sm:flex-row items-center sm:items-end gap-3 sm:gap-2">
							<span className="text-2xl font-semibold text-gray-100">{news.date}</span>
							<Button icon="pi pi-eye" className="p-button-rounded" />
						</div>
					</div>
				</div>
			</div>
		);
	};

	const listTemplate = (items: News[]) => {
		if (!items || items.length === 0) return null;

		const list = items.map((news, index) => {
			return itemTemplate(news, index);
		});

		return <div className="grid grid-nogutter !bg-[#343d4a]">{list}</div>;
	};

	return (
		<div>
			<DataView header={title} value={dataTableValue} listTemplate={listTemplate} className="!bg-[#343d4a]" />
		</div>
	);
}
