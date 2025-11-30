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
        financeIncomes: Array<{ dueDate: string; amount: string }>;
        financeOutcomes: Array<{ dueDate: string; amount: string }>;
    };
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}) {
    const [chartData, setChartData] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});

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
        const textColor = documentStyle.getPropertyValue("--text-color") || "#e6eef7";
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary") || "#9aa3ad";
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border") || "rgba(255,255,255,0.04)";

        let labels: string[] = [];
        const incomeData: { [date: string]: number } = {};
        const outcomeData: { [date: string]: number } = {};

        const now = new Date();

        if (selectedPeriod === "last12") {
            for (let i = 11; i >= 0; i--) {
                const monthDate = subMonths(now, i);
                const monthKey = format(monthDate, "yyyy-MM");
                incomeData[monthKey] = 0;
                outcomeData[monthKey] = 0;
            }

            financeReports.financeIncomes?.forEach((income) => {
                const monthKey = format(new Date(income.dueDate), "yyyy-MM");
                if (incomeData.hasOwnProperty(monthKey)) {
                    incomeData[monthKey] += Number(income.amount);
                }
            });

            financeReports.financeOutcomes?.forEach((outcome) => {
                const monthKey = format(new Date(outcome.dueDate), "yyyy-MM");
                if (outcomeData.hasOwnProperty(monthKey)) {
                    outcomeData[monthKey] += Math.abs(Number(outcome.amount));
                }
            });

            labels = Object.keys(incomeData)
                .sort()
                .map((monthKey) => format(new Date(monthKey + "-01"), "yyyy. MMM", { locale: hu }));
        } else {
            let targetDate: Date;

            if (selectedPeriod === "current") {
                targetDate = now;
            } else {
                const [year, month] = selectedPeriod.split("-").map(Number);
                targetDate = new Date(year, month - 1, 1);
            }

            const startDate = startOfMonth(targetDate);
            const endDate = endOfMonth(targetDate);

            const daysArray = eachDayOfInterval({ start: startDate, end: endDate });
            daysArray.forEach((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                incomeData[dateKey] = 0;
                outcomeData[dateKey] = 0;
            });

            financeReports.financeIncomes?.forEach((income) => {
                const dateKey = format(new Date(income.dueDate), "yyyy-MM-dd");
                if (incomeData.hasOwnProperty(dateKey)) {
                    incomeData[dateKey] += Number(income.amount);
                }
            });

            financeReports.financeOutcomes?.forEach((outcome) => {
                const dateKey = format(new Date(outcome.dueDate), "yyyy-MM-dd");
                if (outcomeData.hasOwnProperty(dateKey)) {
                    outcomeData[dateKey] += Math.abs(Number(outcome.amount));
                }
            });

            labels = Object.keys(incomeData)
                .sort()
                .map((date) => format(new Date(date), "dd"));
        }

        const amounts = Object.keys(incomeData)
            .sort()
            .map((key) => incomeData[key]);
        const amountsOut = Object.keys(outcomeData)
            .sort()
            .map((key) => outcomeData[key]);

        const data = {
            labels,
            datasets: [
                {
                    label: "Bevétel",
                    fill: true,
                    borderColor: documentStyle.getPropertyValue("--teal-500") || "#00cc99",
                    backgroundColor: "rgba(0,204,153,0.12)",
                    tension: 0.4,
                    data: amounts,
                },
                {
                    label: "Kiadás",
                    fill: true,
                    borderColor: documentStyle.getPropertyValue("--red-500") || "#ef4444",
                    backgroundColor: "rgba(239,68,68,0.12)",
                    tension: 0.4,
                    data: amountsOut,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false, // KULCS: ne feszítse szét a layoutot
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
        <div className="flex flex-col w-full">
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

            {/* wrapper magasság reszponzív: mobil kisebb, desktop nagyobb */}
            <div className="p-2">
                <div className="w-full h-56 md:h-72 lg:h-96">
                    <Chart className="w-full h-full" type="line" data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}
