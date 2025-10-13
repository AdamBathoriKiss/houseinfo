import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { format } from "date-fns";

export default function Diagrams({
    financeReports,
}: {
    financeReports: {
        financeIncomes: Array<{ paidDate: string; amount: string }>;
        financeOutcomes: Array<{ paidDate: string; amount: string }>;
    };
}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

        // Aktuális hónap napjainak generálása
        const currentDay = new Date();
        const year = currentDay.getFullYear();
        const month = currentDay.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Minden nap létrehozása 0-val
        const allDaysData: { [date: string]: number } = {};
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateKey = format(date, "yyyy-MM-dd");
            allDaysData[dateKey] = 0;
        }

        const allDaysDataOut: { [date: string]: number } = {};
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateKey = format(date, "yyyy-MM-dd");
            allDaysDataOut[dateKey] = 0;
        }

        // Bevételek hozzáadása a megfelelő napokhoz
        financeReports.financeIncomes?.forEach((income) => {
            const dateKey = format(new Date(income.paidDate), "yyyy-MM-dd");
            if (allDaysData.hasOwnProperty(dateKey)) {
                allDaysData[dateKey] += Number(income.amount);
            }
        });

        // Kiadások hozzáadása a megfelelő napokhoz
        financeReports.financeOutcomes?.forEach((outcome) => {
            const dateKey = format(new Date(outcome.paidDate), "yyyy-MM-dd");
            if (allDaysDataOut.hasOwnProperty(dateKey)) {
                allDaysDataOut[dateKey] += Number(outcome.amount);
            }
        });

        // Rendezés és szétválasztás
        const sortedDates = Object.keys(allDaysData).sort();
        const sortedDatesOut = Object.keys(allDaysDataOut).sort();
        const amounts = sortedDates.map((date) => allDaysData[date]);
        const amountsOut = sortedDatesOut.map((date) => allDaysDataOut[date]);

        // Szebb formátum a labelekhez: "10-01", "10-02", ...
        const labels = sortedDates.map((date) =>
            format(new Date(date), "MM-dd")
        );

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Bevétel",
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--teal-500"),
                    backgroundColor:
                        documentStyle.getPropertyValue("--teal-500"),
                    tension: 0.3,
                    data: amounts,
                },
                {
                    label: "Kiadás",
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--red-500"),
                    backgroundColor:
                        documentStyle.getPropertyValue("--red-500"),
                    tension: 0.3,
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
                        maxRotation: 45,
                        minRotation: 45,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    type: "linear" as const,
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
    }, [financeReports]);

    return (
        <Chart
            className="h-96"
            type="line"
            data={chartData}
            options={chartOptions}
        />
    );
}
