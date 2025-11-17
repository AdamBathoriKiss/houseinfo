import DoughnutChart from "./DoughnutChart";

interface ChartData{
   
    parkings: number | undefined;
    freeNormal: number | undefined;
    occupiedNormal: number | undefined;
    freeElectric:number | undefined;
    occupiedElectric:number | undefined;
}

export default function Parkings({ parkings,
    freeNormal,
    occupiedNormal,
    freeElectric,
    occupiedElectric}: ChartData) {
    return (
            <div className="shadow-2xl rounded-md w-[50%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
                                    <p className="col-start-1 col-end-12 text-center">
                                        Összes parkoló száma: {parkings ? parkings: 0}
                                    </p>
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
                                </div>
    )
}