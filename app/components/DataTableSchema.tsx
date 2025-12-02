import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Residents, News, Maintence, Bills, Documents, Parking } from "../interfaces/Dashboard";
import dataTableColumns from "~/utils/dataTableColumns";
import "../app.css";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DataHeader from "../utils/DataHeader";
import CreateParking, { type ParkingData } from "~/utils/dialogs/CreateParking";
import { useCommonProcesses } from "~/hooks/useCommonProcesses";
import FileService from "~/services/file.service";
import { useIsMobile } from "~/hooks/useIsMobile";

export interface DataTableSchemaProps {
	dataTableValue: Residents[] | News[] | Maintence[] | Bills[] | Documents[] | Parking[];
	title: string;
	type: string;
	buildingId?: number | null;
}

export default function DataTableSchema({ dataTableValue, title, type, buildingId }: DataTableSchemaProps) {
	const [filteredItem, setFilteredItem] = useState<typeof dataTableValue>([]);
	const [createParking, setCreateParking] = useState<boolean>(false);
	const [parking, setParking] = useState<ParkingData>();
	const [buildId, setBuildId] = useState<number>();
	const isMobile = useIsMobile();
	const columnSet = isMobile ? dataTableColumns(type).mobileColumns : dataTableColumns(type).columns;
	const { remove } = useCommonProcesses();

	useEffect(() => {
		setFilteredItem(dataTableValue);
		buildingId && setBuildId(buildingId);
	}, [dataTableValue]);

	const onDelete = (type: string, rowData: any) => {
		switch (type) {
			case "parking":
				remove("parkings", rowData.id);
				break;
			case "documents":
				remove("documents", rowData.id);
				break;
		}
	};

	const onEdit = (type: string, rowData: any) => {
		setCreateParking(true);
		setParking({
			id: rowData.id,
			type: rowData.type,
			spotNumber: rowData.spotNumber,
			isOccupied: rowData.isOccupied,
		});
	};

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
					{type === "parking" ? (
						<>
							<Button
								icon="pi pi-pencil"
								unstyled
								tooltip="Szerkesztés"
								onClick={() => onEdit(type, rowData)}
								className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30 mx-2"
							/>
						</>
					) : (
						<>
							<Button
								icon="pi pi-download"
								unstyled
								tooltip="Letöltés"
								onClick={() => FileService.getDocument(rowData.id)}
								className="!bg-transparent !text-teal-500 border-none hover:!bg-gray-600/30 hover:text-gray-50 mx-2"
							/>
						</>
					)}
					<Button
						icon="pi pi-trash"
						unstyled
						tooltip="Törlés"
						onClick={() => onDelete(type, rowData)}
						className="!text-red-600 !bg-transparent hover:!bg-gray-600/30 mx-2"
					/>
				</div>
			);
		}
		if (field === "uploadedAt" || field === "createdAt") {
			return dayjs(rowData[field]).format("YYYY-MM-DD");
		}
		if (field === "type") {
			if (rowData[field] === "ELECTRIC") {
				return <span className="text-emerald-500">Elektromos</span>;
			} else {
				return <span>Normál</span>;
			}
		}
		if (field === "isOccupied") {
			if (rowData[field] === true) {
				return <span>Foglalt</span>;
			} else {
				return <span>Szabad</span>;
			}
		}
		if (field === "uploadedAt") {
			return dayjs(rowData[field]).format("YYYY-MM-DD");
		}
		return rowData[field];
	};

	const documentHeader = DataHeader.header({ title, filter, fileUpdateDialog: true, buildingId: buildId });
	const parkingHeader = DataHeader.header({ type, title, filter, fileUpdateDialog: false, setCreateParking });
	return (
		<div className="h-full flex flex-col flex-1 overflow-hidden">
			<DataTable
				header={type === "parking" ? parkingHeader : documentHeader}
				value={filteredItem}
				sortMode="multiple"
				unstyled
				className="h-full !w-full !bg-[#343d4a] backdrop-blur-lg shadow-sm text-gray-300 px-3 py-2"
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
						className: "hover:bg-gray-600/30 hover:text-gray-50 text-start border-b-1 border-solid",
					},
				}}
			>
				{columnSet?.map((col) => (
					<Column
						key={col.field}
						field={col.field}
						header={col.header}
						body={(rowData) => bodyTemplate(rowData, col.field)}
						bodyClassName="px-1 py-3 whitespace-nowrap"
					/>
				))}
			</DataTable>

			{createParking && (
				<CreateParking
					parking={parking ? parking : undefined}
					visible={createParking}
					setVisible={setCreateParking}
					buildingId={buildingId ? buildingId : null}
				/>
			)}
		</div>
	);
}
