import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { hu } from "date-fns/locale";

export default function Diagrams({
    financeReports,
    selectedPeriod,
    onPeriodChange,
}: {
    financeReports: {
        financeIncomes: Array<{ dueDate: string; amount: string }>; // ← DUEDATE!
        financeOutcomes: Array<{ dueDate: string; amount: string }>; // ← DUEDATE!
    };
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	// Időszak opciók generálása
	const periodOptions = [
		{ label: "Aktuális hónap", value: "current" },
		{ label: "Utolsó 12 hónap", value: "last12" },
		...Array.from({ length: 12 }, (_, i) => {
			const date = subMonths(new Date(), i);
			return {
				label: format(date, "yyyy. MMMM", { locale: hu }),
				value: format(date, "yyyy-MM"),
			};
		}),
	];

	useEffect(() => {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue("--text-color");
		const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
		const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

		let labels: string[] = [];
		const incomeData: { [date: string]: number } = {};
		const outcomeData: { [date: string]: number } = {};

		// ═══ IDŐSZAK MEGHATÁROZÁS ═══
		const now = new Date();

		if (selectedPeriod === "last12") {
			// ✅ 12 hónap: hónaponkénti aggregálás
			for (let i = 11; i >= 0; i--) {
				const monthDate = subMonths(now, i);
				const monthKey = format(monthDate, "yyyy-MM");
				incomeData[monthKey] = 0;
				outcomeData[monthKey] = 0;
			}

			// Bevételek hozzáadása - JAVÍTVA!
			financeReports.financeIncomes?.forEach((income) => {
				const monthKey = format(new Date(income.dueDate), "yyyy-MM"); // ← DUEDATE!
				if (incomeData.hasOwnProperty(monthKey)) {
					incomeData[monthKey] += Number(income.amount);
				}
			});

			// Kiadások hozzáadása - JAVÍTVA!
			financeReports.financeOutcomes?.forEach((outcome) => {
				const monthKey = format(new Date(outcome.dueDate), "yyyy-MM"); // ← DUEDATE!
				if (outcomeData.hasOwnProperty(monthKey)) {
					outcomeData[monthKey] += Math.abs(Number(outcome.amount));
				}
			});

			// Labelek: "2024. jan", "2024. feb", ...
			labels = Object.keys(incomeData)
				.sort()
				.map((monthKey) => format(new Date(monthKey + "-01"), "yyyy. MMM", { locale: hu }));
		} else {
			// ✅ Egy hónap: napokra bontva
			let targetDate: Date;

			if (selectedPeriod === "current") {
				targetDate = now;
			} else {
				// Konkrét hónap (pl. "2024-11")
				const [year, month] = selectedPeriod.split("-").map(Number);
				targetDate = new Date(year, month - 1, 1);
			}

			const startDate = startOfMonth(targetDate);
			const endDate = endOfMonth(targetDate);

			// Inicializálás minden napra
			const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
			daysArray.forEach((day) => {
				const dateKey = format(day, "yyyy-MM-dd");
				incomeData[dateKey] = 0;
				outcomeData[dateKey] = 0;
			});

			// Bevételek
			financeReports.financeIncomes?.forEach((income) => {
				const dateKey = format(new Date(income.dueDate), "yyyy-MM-dd");
				if (incomeData.hasOwnProperty(dateKey)) {
					incomeData[dateKey] += Number(income.amount);
				}
			});

			// Kiadások (abszolút érték!)
			financeReports.financeOutcomes?.forEach((outcome) => {
				const dateKey = format(new Date(outcome.dueDate), "yyyy-MM-dd");
				if (outcomeData.hasOwnProperty(dateKey)) {
					outcomeData[dateKey] += Math.abs(Number(outcome.amount));
				}
			});

			// Labelek: "01", "02", "03", ...
			labels = Object.keys(incomeData)
				.sort()
				.map((date) => format(new Date(date), "dd"));
		}

		// ═══ CHART DATA ═══
		const amounts = Object.keys(incomeData)
			.sort()
			.map((key) => incomeData[key]);
		const amountsOut = Object.keys(outcomeData)
			.sort()
			.map((key) => outcomeData[key]);

		const data = {
			labels: labels,
			datasets: [
				{
					label: "Bevétel",
					fill: true,
					borderColor: documentStyle.getPropertyValue("--teal-500"),
					backgroundColor: "rgba(0,204,153,0.2)",
					tension: 0.4,
					data: amounts,
				},
				{
					label: "Kiadás",
					fill: true,
					borderColor: documentStyle.getPropertyValue("--red-500"),
					backgroundColor: "rgba(239,68,68,0.2)",
					tension: 0.4,
					data: amountsOut,
				},
			],
		};

		const options = {
			maintainAspectRatio: false,
			aspectRatio: 0.3,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
				},
				y: {
					beginAtZero: true,
					display: true,
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
				},
			},
		};

		setChartData(data);
		setChartOptions(options);
	}, [financeReports, selectedPeriod]);

	return (
		<div className="flex flex-col h-full w-full">
			{/* HEADER DROPDOWN */}
			<div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
				<h3 className="text-base font-semibold text-gray-100">Pénzügyi áttekintés</h3>
				<Dropdown
					unstyled
					value={selectedPeriod}
					options={periodOptions}
					onChange={(e) => onPeriodChange(e.value)}
					placeholder="Válasszon időszakot"
					className="!w-44 flex flex-row justify-between px-2 py-1.5 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
					panelClassName="!w-44 max-h-60 overflow-y-auto px-2 !rounded !border-1 !bg-[#2a3441] !text-start !text-xs"
				/>
			</div>

			{/* CHART */}
			<div className="flex-1 p-2 overflow-hidden">
				<Chart className="w-full h-full" type="line" data={chartData} options={chartOptions} />
			</div>
		</div>
	);
}
