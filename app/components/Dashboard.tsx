import { use, useEffect, useRef, useState } from "react";
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
	const [applicationRegistered, setApplicationRegistered] = useState(0);
	const [chartData, setChartData] = useState<ChartData>();
	const [financeReports, setFinanceReports] = useState<FinanceReports>();

	useEffect(() => {
		if (selectedHouse !== null && selectedHouse !== undefined) {
			DashboardService.getDashboardData(selectedHouse?.id).then((response) => {
				setNews(response.data.selectedBuilding.announcements);
				setParkingData(response.data.selectedBuilding.parkingData)
				setMaintence(response.data.selectedBuilding.maintenanceRequest);
				setDocuments(response.data.selectedBuilding.document);
				setEvents(response.data.selectedBuilding.events);
				setFinanceTotal(response.data.selectedBuilding.finances);
				setMaintenancesCount(response.data.selectedBuilding.maintenancesCount);
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
		<div className="flex flex-col min-h-screen px-3 md:px-6">
			<Toast ref={toast} />
			
			{/* Dashboard Header */}
			<DashboardHeader 
				financeTotal={financeTotal} 
				maintenancesCount={maintenancesCount} 
				expenseTotal={expenseTotal} 
			/>
			
			{/* RESPONSIVE GRID - 1 oszlop mobilon, 2 oszlop md: felett */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-4 my-4">
				
				{/* BAL OLDALI OSZLOP */}
				<div className="flex flex-col gap-4 md:gap-6">
					{/* Parkings + EventCalendar - desktop layout marad */}
					<div className="flex flex-col md:flex-row gap-3">
						<Parkings 
							parkingData={parkingData} 
							parkings={chartData?.parkings} 
							freeNormal={chartData?.freeNormal} 
							freeElectric={chartData?.freeElectric} 
							occupiedElectric={chartData?.occupiedElectric} 
							occupiedNormal={chartData?.occupiedNormal} 
							buildingId={selectedHouse?.id} 
						/>
						<EventCalendar 
							events={events} 
							buildingId={selectedHouse?.id} 
						/>
					</div>
					
					{/* Diagrams */}
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

				{/* JOBB OLDALI OSZLOP */}
				<div className="flex flex-col gap-4 md:gap-6">
					{/* Hírek */}
					<div className="surface-card shadow-2xl rounded-md h-96 overflow-hidden">
						<DataScrollerSchema
							dataTableValue={news}
							title={"Hírek"}
							type="news"
							buildingId={selectedHouse?.id}
						/>
					</div>
					
					{/* Feladatok */}
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

			{/* DOKUMENTUMOK - teljes szélesség */}
			<div className="px-2 md:px-4 my-4">
				<div className="gap-6 surface-card shadow-2xl rounded-md h-96 overflow-hidden">
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