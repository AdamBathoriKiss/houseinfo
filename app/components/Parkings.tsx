import { Button } from "primereact/button";
import DoughnutChart from "./DoughnutChart";
import { useState } from "react";
import CreateParking from "~/utils/dialogs/CreateParking";
import type { Parking } from "~/interfaces/Dashboard";
import DataTableSchema from "./DataTableSchema";
import { Dialog } from "primereact/dialog";

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
	const [selectedParking, setSelectedParking] = useState<any>(undefined);

	const handleCreate = () => {
		setSelectedParking(undefined);
		setVisible(true);
	};

	return (
		<div className="flex flex-col h-full p-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<p className="text-sm">
					Összes parkoló száma: <strong>{parkings ?? 0}</strong>
				</p>
				<Button
					icon="pi pi-window-maximize"
					tooltip="Új parkoló létrehozása"
					onClick={handleCreate}
					className="!text-white !bg-transparent hover:!bg-gray-600/30"
				/>
			</div>

			{/* Doughnut Charts - Egymás mellett */}
			<div className="flex flex-row justify-center items-center gap-4 flex-1 max-h-[300px]">
				<div className="flex-1 max-w-[50%] h-full flex items-center">
					<DoughnutChart
						title="Normál"
						free={freeNormal ?? 0}
						occupied={occupiedNormal ?? 0}
						onClick={() => setParkingList(true)}
						type="normal"
					/>
				</div>

				<div className="flex-1 max-w-[50%] h-full flex items-center">
					<DoughnutChart
						title="Elektromos"
						free={freeElectric ?? 0}
						occupied={occupiedElectric ?? 0}
						onClick={() => setParkingList(true)}
						type="electric"
					/>
				</div>
			</div>

			{visible && (
				<Dialog
					visible={visible}
					contentClassName="!bg-[#343d4a]"
					headerClassName="!bg-[#343d4a]"
					style={{ width: "80%", maxWidth: "900px" }}
					onHide={() => setVisible(false)}
				>
					<DataTableSchema
						dataTableValue={parkingData}
						title="Parkolás"
						type="parking"
						buildingId={buildingId}
					/>
				</Dialog>
			)}
		</div>
	);
}