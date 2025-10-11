import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { format } from "date-fns";
import type { FinanceIncome } from "./LoggedIn";

export default function Diagrams({ financialIncomes }: { financialIncomes: FinanceIncome[] }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        console.log("financialIncomes:", financialIncomes);
        
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
        
        // Bevételek hozzáadása a megfelelő napokhoz
        financialIncomes.forEach(income => {
            const dateKey = format(new Date(income.paidDate), "yyyy-MM-dd");
            if (allDaysData.hasOwnProperty(dateKey)) {
                allDaysData[dateKey] += Number(income.amount);
            }
        });
        
        // Rendezés és szétválasztás
        const sortedDates = Object.keys(allDaysData).sort();
        const amounts = sortedDates.map(date => allDaysData[date]);
        
        // Szebb formátum a labelekhez: "10-01", "10-02", ...
        const labels = sortedDates.map(date => format(new Date(date), "MM-dd"));
        
        console.log("Labels:", labels);
        console.log("Data:", amounts);
        
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Bevétel",
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--teal-500"),
                    backgroundColor: documentStyle.getPropertyValue("--teal-500"),
                    tension: 0.3,
                    data: amounts,
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
    }, [financialIncomes]);

    return <Chart className="h-96" type="line" data={chartData} options={chartOptions} />;
}