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
				setFinanceReports(d.financeReports || { financeIncomes: [], financeOutcomes: [] });
			});
		}
	}, [selectedHouse, selectedPeriod]);

	return (
		<div className="flex flex-col min-h-screen bg-surface-ground px-2 sm:px-4 md:px-6 py-4">
			<Toast ref={toast} />

			<div className="hidden md:block mb-6">
				<DashboardHeader
					financeTotal={financeTotal}
					maintenancesCount={maintenancesCount}
					expenseTotal={expenseTotal}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6  px-4">
				<section className="order-1 lg:order-2 space-y-4">
					<article className="surface-card shadow-2xl rounded-xl p-1">
						<DataScrollerSchema
							dataTableValue={news}
							title={"Hírek"}
							type="news"
							buildingId={selectedHouse?.id}
						/>
					</article>

					<article className="surface-card shadow-2xl rounded-xl p-1">
						<DataScrollerSchema
							dataTableValue={maintence}
							title={"Feladatok"}
							type="maintence"
							buildingId={selectedHouse?.id}
						/>
					</article>
				</section>

				<section className="order-2 lg:order-1 space-y-1">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<article className="surface-card shadow-2xl rounded-xl p-1 ">
							<Parkings
								parkingData={parkingData}
								parkings={chartData?.parkings}
								freeNormal={chartData?.freeNormal}
								freeElectric={chartData?.freeElectric}
								occupiedElectric={chartData?.occupiedElectric}
								occupiedNormal={chartData?.occupiedNormal}
								buildingId={selectedHouse?.id}
							/>
						</article>

						<article className="surface-card shadow-2xl rounded-xl p-1 max-h-[47vh] overflow-hidden">
							<EventCalendar events={events} buildingId={selectedHouse?.id} />
						</article>
					</div>

					<article className="surface-card shadow-2xl rounded-xl p-1 max-h-[47vh] overflow-hidden">
						<Diagrams
							financeReports={financeReports ?? { financeIncomes: [], financeOutcomes: [] }}
							selectedPeriod={selectedPeriod}
							onPeriodChange={setSelectedPeriod}
						/>
					</article>
				</section>
			</div>

			<section className="w-full mt-6 px-4 rounded-2xl overflow-hidden">
				<article className="surface-card shadow-2xl p-1 h-[280px] sm:h-[300px] lg:h-[340px] overflow-y-auto rounded-2xl">
					<DataTableSchema
						dataTableValue={documents}
						title={"Dokumentumok"}
						type="documents"
						buildingId={selectedHouse?.id}
					/>
				</article>
			</section>
		</div>
	);
}
