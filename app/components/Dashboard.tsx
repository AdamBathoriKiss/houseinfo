import { use, useEffect, useRef, useState } from "react";
import DataTableSchema from "./DataTableSchema";
import DataScrollerSchema from "./DataScrollerSchema";
import Diagrams from "./Diagrams";
import DoughnutChart from "./DoughnutChart";
import DashboardHeader from "./DashboardHeader";
import EventCalendar from "./EventCalendar";
import DashboardService from "~/services/dashboard.service";
import type { ChartData, FinanceReports } from "~/interfaces/Dashboard";
import { Toast } from "primereact/toast";

export default function Dashboard({ houses, selectedHouse }: { houses: any[]; selectedHouse: any }) {
	const toast = useRef<Toast | null>(null);
	const [news, setNews] = useState([]);
	const [maintence, setMaintence] = useState([]);
	const [documents, setDocuments] = useState([]);
	const [events, setEvents] = useState([]);
	const [financeTotal, setFinanceTotal] = useState(0);
	const [activeTasks, setActiveTasks] = useState(0);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [applicationRegistered, setApplicationRegistered] = useState(0);
	const [chartData, setChartData] = useState<ChartData>();
	const [financeReports, setFinanceReports] = useState<FinanceReports>();

	useEffect(() => {
		if (selectedHouse !== null && selectedHouse !== undefined) {
			DashboardService.getDashboardData(selectedHouse?.id).then((response) => {
				setNews(response.data.selectedBuilding.announcements);
				setMaintence(response.data.selectedBuilding.maintenanceRequest);
				setDocuments(response.data.selectedBuilding.document);
				setEvents(response.data.selectedBuilding.events);
				setFinanceTotal(response.data.selectedBuilding.finances);
				setActiveTasks(response.data.selectedBuilding.maintenances);
				setExpenseTotal(response.data.selectedBuilding.expenseTotal);
				setChartData(response.data.selectedBuilding.chartData);
				setFinanceReports(
					response.data.selectedBuilding.financeReports || {
						financeIncomes: [],
						financeOutcomes: [],
					}
				);
			});
		}
	}, [selectedHouse]);

	return (
		<div className="flex flex-col min-h-screen px-6 ">
			<Toast ref={toast} />
			<DashboardHeader financeTotal={financeTotal} activeTasks={activeTasks} expenseTotal={expenseTotal} />
			<div className="grid grid-cols-2 gap-6 px-4 my-4">
				{/* Bal oldali oszlop */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-row gap-3">
						<div className="shadow-2xl rounded-md w-[50%] h-96 overflow-hidden grid grid-cols-2 justify-between items-center">
							<p className="col-start-1 col-end-12 text-center">
								Összes parkoló száma: {chartData && chartData !== null ? chartData.parkings : 0}
							</p>
							<DoughnutChart
								title="Normál"
								free={chartData?.freeNormal}
								occupied={chartData?.occupiedNormal}
							/>
							<DoughnutChart
								title="Elektromos"
								free={chartData?.freeElectric}
								occupied={chartData?.occupiedElectric}
							/>
						</div>
						<EventCalendar events={events} buildingId={selectedHouse?.id} />
					</div>
					<div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden backdrop-blur-2xl">
						<Diagrams
							financeReports={
								financeReports ?? {
									financeIncomes: [],
									financeOutcomes: [],
								}
							}
						/>
					</div>
				</div>

				{/* Jobb oldali oszlop */}
				<div className="flex flex-col gap-6">
					<div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden">
						<DataScrollerSchema
							dataTableValue={news}
							title={"Hírek"}
							type="news"
							buildingId={selectedHouse?.id}
						/>
					</div>
					<div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden">
						<DataScrollerSchema
							dataTableValue={maintence}
							title={"Feladatok"}
							type="maintence"
							buildingId={selectedHouse?.id}
						/>
					</div>
				</div>
			</div>

			<div className="px-4 my-4">
				<div className=" gap-6 surface-card shadow-2xl rounded-md h-96 overflow-hidden">
					<DataTableSchema dataTableValue={documents} title={"Dokumentumok"} type="documents" />
				</div>
			</div>
		</div>
	);
}
