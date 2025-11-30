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
        // grid: mobil 1 oszlop, md+ 2 oszlop; kártya belül flex-col
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="md:col-span-2 flex items-center justify-between">
                    <p className="text-sm">Összes parkoló száma: <strong>{parkings ?? 0}</strong></p>
                    <div>
                        <Button
                            icon="pi pi-window-maximize"
                            tooltip="Új parkoló létrehozása"
                            onClick={handleCreate}
                            className="!text-white !bg-transparent hover:!bg-gray-600/30"
                        />
                    </div>
                </div>

                {/* Doughnuts */}
                <div className="flex justify-center items-center">
                    <div className="w-40 md:w-48">
                        <DoughnutChart
                            title="Normál"
                            free={freeNormal ?? 0}
                            occupied={occupiedNormal ?? 0}
                            onClick={() => setParkingList(true)}
                            type="normal"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="w-40 md:w-48">
                        <DoughnutChart
                            title="Elektromos"
                            free={freeElectric ?? 0}
                            occupied={occupiedElectric ?? 0}
                            onClick={() => setParkingList(true)}
                            type="electric"
                        />
                    </div>
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
                    <DataTableSchema dataTableValue={parkingData} title="Parkolás" type="parking" buildingId={buildingId} />
                </Dialog>
            )}
        </div>
    );
}
