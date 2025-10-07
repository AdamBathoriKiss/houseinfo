import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function Diagrams() {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue("--text-color");
		const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
		const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
		const data = {
			labels: ["January", "February", "March", "April", "May", "June", "July", "August" , "September", "October", "November", "December"],
			datasets: [
				{
					label: "Bevétel",
					fill: false,
					borderColor: documentStyle.getPropertyValue("--teal-500"),
					yAxisID: "y",
					tension: 0.3,
					data: [65, 59, 80, 81, 56, 55, 10, 40, 19, 86, 27, 90],
				},
				{
					label: "Kiadás",
					fill: false,
					borderColor: documentStyle.getPropertyValue("--red-500"),
					yAxisID: "y1",
					tension: 0.4,
					data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55, 10],
				},
			
			],
		};
		const options = {
			stacked: false,
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
					type: "linear",
					display: true,
					position: "left",
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
				},
				y1: {
					type: "linear",
					display: true,
					position: "right",
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						drawOnChartArea: false,
						color: surfaceBorder,
					},
				},
			},
		};

		setChartData(data);
		setChartOptions(options);
	}, []);

	return <Chart className="h-96" type="line" data={chartData} options={chartOptions} />;
}
