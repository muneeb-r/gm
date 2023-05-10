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
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart({ title, data, datasetTitle }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: true,
                labels: {
                    fontColor: 'black',
                },
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const tin = data.filter((d) => d.date === context.label)[0].tin
                        const tout = data.filter((d) => d.date === context.label)[0].tout
                        return [`Time in: ${moment(tin).format('LT')}`, `Time out: ${moment(tout).format('LT')}`, `Hours: ${context.raw.toFixed(2)}`];
                    }
                }
            }
        },
    };
    return <Bar options={options} height={'500'} data={{
        labels: data.map((d) => d.date),
        datasets: [
            {
                label: datasetTitle,
                data: data.map((d) => d.time),
                backgroundColor: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value >= 6 ? 'rgb(3, 90, 252)' : value <= 2.5&&'rgb(247, 45, 45)';
                },
            }
        ],
    }} />;
}
