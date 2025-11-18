import { Button } from "primereact/button";
import DoughnutChart from "./DoughnutChart";
import { useState } from "react";
import CreateParking from "~/utils/dialogs/CreateParking";

interface ChartData {
	parkings: number | undefined;
	freeNormal: number | undefined;
	occupiedNormal: number | undefined;
	freeElectric: number | undefined;
	occupiedElectric: number | undefined;
}

export default function Parkings({ parkings, freeNormal, occupiedNormal, freeElectric, occupiedElectric }: ChartData) {
    const [visible, setVisible] = useState(false);
    const [selectedParking, setSelectedParking] = useState(undefined);

    const handleCreate = () => {
        setSelectedParking(undefined);
        setVisible(true);
    };

	return (
		<div className="shadow-2xl rounded-md w-[50%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
			<div className="col-start-1 col-end-12 flex flex-row items-center">
				<p className="!mx-auto">Összes parkoló száma: {parkings ? parkings : 0}</p>
				<Button
					icon="pi pi-plus"
					tooltip="Új parkoló létrehozása"
					onClick={handleCreate}
					className="!text-indigo-300 !bg-transparent hover:!bg-gray-600/30"
				/>
			</div>
			<DoughnutChart
				title="Normál"
				free={freeNormal ? freeNormal : 0}
				occupied={occupiedNormal ? occupiedNormal : 0}
			/>
			<DoughnutChart
				title="Elektromos"
				free={freeElectric ? freeElectric : 0}
				occupied={occupiedElectric ? occupiedElectric : 0}
			/>
            {visible && (
                <CreateParking 
                    visible={visible} 
                    setVisible={setVisible} 
                    buildingId={1}
                    parking={selectedParking}
                />
            )}
		</div>
	);
}