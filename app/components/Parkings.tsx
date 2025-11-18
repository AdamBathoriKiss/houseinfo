import { Button } from "primereact/button";
import DoughnutChart from "./DoughnutChart";
import { useState } from "react";
import CreateParking from "~/utils/dialogs/CreateParking";
import type { Parking } from "~/interfaces/Dashboard";
import { DataTable } from "primereact/datatable";
import dataTableColumns from "~/utils/dataTableColumns";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import dayjs from "dayjs";

interface ChartData {
	parkingData: Parking[];
	parkings: number | undefined;
	freeNormal: number | undefined;
	occupiedNormal: number | undefined;
	freeElectric: number | undefined;
	occupiedElectric: number | undefined;
	buildingId: number;
}

export default function Parkings({
	parkingData,
	parkings,
	freeNormal,
	occupiedNormal,
	freeElectric,
	occupiedElectric,
	buildingId,
}: ChartData) {
	const [visible, setVisible] = useState(false);
	const [parkingList, setParkingList] = useState(false);
	const [selectedParking, setSelectedParking] = useState(undefined);

	const handleCreate = () => {
		setSelectedParking(undefined);
		setVisible(true);
	};

	const bodyTemplate = (rowData: any, field: string) => {
			if (field === "actions") {
				return (
					<div className="flex items-center text-start">
						<Button
							icon="pi pi-eye"
							unstyled
							tooltip="Szerkesztés"
							className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30 mx-2"
						/>
						<Button
							icon="pi pi-download"
							unstyled
							tooltip="Letöltés"
							className="!bg-transparent !text-teal-500 border-none hover:!bg-gray-600/30 hover:text-gray-50 mx-2"
						/>
						<Button
							icon="pi pi-trash"
							unstyled
							tooltip="Törlés"
							className="!text-red-600 !bg-transparent hover:!bg-gray-600/30 mx-2"
						/>
					</div>
				);
			}
			if(field === "uploadedAt" || field === "createdAt"){
				return (
					dayjs(rowData[field]).format('YYYY-MM-DD')
				)
			}
			if(field === "type"){
				if(rowData[field] === "ELECTRIC"){
					return (
						<span className="text-emerald-500">Elektromos</span>
					)
				}else {
					return (
						<span >Normál</span>
					)
				}
			}
			if(field === "isOccupied"){
				if(rowData[field] === true){
					return <span>Foglalt</span>
				}else {
					return <span>Szabad</span>
				}
			}
			return rowData[field];
		};

	return (
		<div className="shadow-2xl rounded-md w-[50%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
			<div className="col-start-1 col-end-12 flex flex-row items-center">
				<p className="!mx-auto">Összes parkoló száma: {parkings ? parkings : 0}</p>
				<Button
					icon="pi pi-window-maximize"
					tooltip="Új parkoló létrehozása"
					onClick={handleCreate}
					className="!text-white !bg-transparent hover:!bg-gray-600/30"
				/>
			</div>
			<DoughnutChart
				title="Normál"
				free={freeNormal ? freeNormal : 0}
				occupied={occupiedNormal ? occupiedNormal : 0}
				onClick={() => setParkingList(true)}
				type="normal"
			/>
			<DoughnutChart
				title="Elektromos"
				free={freeElectric ? freeElectric : 0}
				occupied={occupiedElectric ? occupiedElectric : 0}
				onClick={() => setParkingList(true)}
				type="electric"
			/>
			{visible && (
				<Dialog
					visible={visible}
					contentClassName="!bg-[#343d4a]"
					headerClassName="!bg-[#343d4a]"
					style={{ width: "fit" }}
					onHide={() => setVisible(false)}
				>
					<DataTable
						header="Parkolások"
						value={parkingData}
						unstyled
						className="h-[50vh] !bg-[#343d4a] backdrop-blur-lg shadow-sm text-gray-300 px-3 py-2"
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
						{dataTableColumns("parking").columns.map((col) => (
							<Column
								key={col.field}
								field={col.field}
								header={col.header}
								body={(rowData) => bodyTemplate(rowData, col.field)}
								bodyClassName="px-1 py-3 whitespace-nowrap"
							/>
						))}
					</DataTable>
				</Dialog>
			)}
		</div>
	);
}
