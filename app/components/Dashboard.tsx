import { useEffect, useRef, useState } from "react";
import DataTableSchema from "./DataTableSchema";
import DataScrollerSchema from "./DataScrollerSchema";
import Diagrams from "./Diagrams";
import DashboardHeader from "./DashboardHeader";
import EventCalendar from "./EventCalendar";
import DashboardService from "~/services/dashboard.service";
import type { ChartData, FinanceReports } from "~/interfaces/Dashboard";
import { Toast } from "primereact/toast";
import Parkings from "./Parkings";

export default function Dashboard({ selectedHouse }: { houses: any[]; selectedHouse: any }) {
	const toast = useRef<Toast | null>(null);
	const [news, setNews] = useState([]);
	const [parkingData, setParkingData] = useState([]);
	const [maintence, setMaintence] = useState([]);
	const [documents, setDocuments] = useState([]);
	const [events, setEvents] = useState([]);
	const [financeTotal, setFinanceTotal] = useState(0);
	const [maintenancesCount, setMaintenancesCount] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [selectedPeriod, setSelectedPeriod] = useState("current");
	const [chartData, setChartData] = useState<ChartData>();
	const [financeReports, setFinanceReports] = useState<FinanceReports>();

	useEffect(() => {
		if (selectedHouse) {
			DashboardService.getDashboardData(selectedHouse?.id, selectedPeriod).then((response) => {
				const d = response.data.selectedBuilding;
				setNews(d.announcements);
				setParkingData(d.parkingData);
				setMaintence(d.maintenanceRequest);
				setDocuments(d.document);
				setEvents(d.events);
				setFinanceTotal(d.finances);
				setMaintenancesCount(d.maintenancesCount);
				setExpenseTotal(d.expenseTotal);
				setChartData(d.chartData);
				setFinanceReports(
					d.financeReports || {
						financeIncomes: [],
						financeOutcomes: [],
					}
				);
			});
		}
	}, [selectedHouse, selectedPeriod]);

	return (
		<div className="flex flex-col min-h-screen bg-surface-ground px-2 sm:px-4 md:px-6 py-4 bg-dark-500">
			<Toast ref={toast} />

			<div className="hidden md:block mb-6">
				<DashboardHeader
					financeTotal={financeTotal}
					maintenancesCount={maintenancesCount}
					expenseTotal={expenseTotal}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3  gap-4 mb-6 px-4 min-h-screen">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 col-start-1 col-end-13 gap-4">
					<div className="shadow-2xl rounded-xl p-1">
						<Parkings
							parkingData={parkingData}
							parkings={chartData?.parkings}
							freeNormal={chartData?.freeNormal}
							freeElectric={chartData?.freeElectric}
							occupiedElectric={chartData?.occupiedElectric}
							occupiedNormal={chartData?.occupiedNormal}
							buildingId={selectedHouse?.id}
						/>
					</div>
					<div className="shadow-2xl rounded-xl p-1">
						<EventCalendar events={events} buildingId={selectedHouse?.id} />
					</div>
					<div className="shadow-2xl rounded-xl p-1 md:col-span-2">
						<Diagrams
							financeReports={
								financeReports ?? {
									financeIncomes: [],
									financeOutcomes: [],
								}
							}
							selectedPeriod={selectedPeriod}
							onPeriodChange={setSelectedPeriod}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 col-start-1 col-end-13 gap-4">
					<div className="shadow-2xl rounded-xl p-1">
						<DataScrollerSchema
							dataTableValue={news}
							title={"Hírek"}
							type="news"
							buildingId={selectedHouse?.id}
						/>
					</div>
					<div className="shadow-2xl rounded-xl p-1">
						<DataScrollerSchema
							dataTableValue={maintence}
							title={"Feladatok"}
							type="maintence"
							buildingId={selectedHouse?.id}
						/>
					</div>
				</div>

				<div className="col-start-1 col-end-13 row-start-3 h-[280px] sm:h-[300px] lg:h-[340px] shadow-2xl rounded-xl p-1 mb-4">
					<DataTableSchema
						dataTableValue={documents}
						title={"Dokumentumok"}
						type="documents"
						buildingId={selectedHouse?.id}
					/>
				</div>
			</div>
		</div>
	);
}
