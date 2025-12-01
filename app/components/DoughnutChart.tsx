import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function DoughnutChart({
	title,
	occupied,
	free,
	type,
	onClick,
}: {
	title: string;
	occupied: number | undefined;
	free: number | undefined;
	type: string;
	onClick: () => void;
}) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const documentStyle = getComputedStyle(document.documentElement);
		const data = {
			labels: ["Aktív", "Szabad"],
			datasets: [
				{
					data: [free, occupied],
					backgroundColor: [
						documentStyle.getPropertyValue("--blue-500"),
						documentStyle.getPropertyValue("--green-500"),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue("--blue-400"),
						documentStyle.getPropertyValue("--green-400"),
					],
				},
			],
		};
		const options = {
			cutout: "70%",
			maintainAspectRatio: true,
			responsive: true,
			events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					enabled: true,
					events: ["click", "mousemove"],
					callbacks: {
						label: function (context: any) {
							const value = context.parsed || 0;
							return `${value}`;
						},
					},
				},
			},
			onClick: () => alert("Teszt"),
		};

		setChartData(data);
		setChartOptions(options);
	}, [free, occupied]);

	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<h6 className="text-xs mb-1 font-medium">{title}</h6>
			<div className="w-full h-full flex items-center justify-center">
				<Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-full max-h-[100px]" />
			</div>
		</div>
	);
}