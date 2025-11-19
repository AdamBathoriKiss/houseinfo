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
import DataTableSchema from "./DataTableSchema";

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

	return (
		<div className="shadow-2xl rounded-md !w-[50%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
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
					style={{ width: "50%", height:'60%' }}
					onHide={() => setVisible(false)}
				>
					<DataTableSchema dataTableValue={parkingData} title="Parkolás" type="parking"/>
				</Dialog>
			)}
		</div>
	);
}
