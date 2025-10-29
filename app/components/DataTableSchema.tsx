import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Residents, News, Maintence, Bills, Documents } from "../interfaces/Dashboard";
import dataTableColumns from "~/utils/dataTableColumns";
import "../app.css";
import { Button } from "primereact/button";
import DataScrollerHeader from "../utils/DataHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export interface DataTableSchemaProps {
	dataTableValue: Residents[] | News[] | Maintence[] | Bills[] | Documents[];
	title: string;
	type: string;
}

export default function DataTableSchema({ dataTableValue, title, type }: DataTableSchemaProps) {
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

	const bodyTemplate = (rowData: any, field: string) => {
		if (field === "actions") {
			return (
				<div className="flex items-center text-start">
					<Button
						icon="pi pi-eye"
						unstyled
						tooltip="Szerkesztés"
						className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
					/>
					<Button
						icon="pi pi-download"
						tooltip="Letöltés"
						className="!bg-transparent !text-teal-500 border-none hover:!bg-gray-600/30 hover:text-gray-50"
					/>
					<Button
						icon="pi pi-trash"
						tooltip="Törlés"
						className="!text-red-600 !bg-transparent hover:!bg-gray-600/30"
					/>
				</div>
			);
		}
		if(field === "uploadedAt"){
			return (
				dayjs(rowData[field]).format('YYYY-MM-DD')
			)
		}
		return rowData[field];
	};

	return (
		<div className="h-full flex flex-col flex-1 overflow-hidden">
			<DataTable
				header={DataScrollerHeader.header({ title, filter, fileUpdateDialog: true })}
				value={filteredItem}
				unstyled
				className="h-full !bg-[#343d4a] backdrop-blur-lg shadow-sm text-gray-300 px-3 py-2"
				emptyMessage="Nincs megjelenítendő adat"
				pt={{
					wrapper: {
						className: "!px-1 !py-2  h-full overflow-auto backdrop-blur-3xl",
					},
					table: {
						className: "!px-1 !py-2 w-full text-start table-auto border-collapse",
					},
					thead: {
						className: "!px-1 !py-2 bg-transparent text-gray-50 text-left",
					},
					tbody: { className: "align-start" }, // tbody-ra alkalmazott stílus pl.
					bodyRow: {
						className: "hover:bg-gray-600/30 hover:text-gray-50 text-start border-b",
					},
				}}
			>
				{dataTableColumns(type).columns.map((col) => (
					<Column
						key={col.field}
						field={col.field}
						header={col.header}
						body={(rowData) => bodyTemplate(rowData, col.field)}
						bodyClassName="px-1 py-3 whitespace-nowrap"
					/>
				))}
			</DataTable>
		</div>
	);
}
