
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DoughnutChart({title}: {title: string}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Aktív', 'Szabad'],
            datasets: [
                {
                    data: [150, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '70%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <h6>{title}</h6>
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-35 flex flex-col items-center justify-between" />
        </div>
    )
}
        