import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart({title, data, datasetTitle}) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    return <Bar options={options} height={'500'} data={{
        labels: data.map((d)=> d.date),
        datasets: [
            {
                label: datasetTitle,
                data: data.map((d)=> d.time),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }} />;
}
