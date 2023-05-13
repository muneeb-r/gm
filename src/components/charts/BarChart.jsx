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
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                        const value = data.filter((d) => d.date === context.label)[0]
                        const tin = value.tin
                        const tout = value.tout
                        const day = new Date(value.fulldate).getDay();
                        if (days[day] ==='Sunday') {
                            return days[day]
                        } else if (value.time === 8.143) {
                            return 'Absent'
                        } else{
                            return [`Time in: ${moment(tin).format('LT')}`, `Time out: ${moment(tout).format('LT')}`, `Hours: ${context.raw.toFixed(2)}`];
                        }
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
                    const doc = data[context.dataIndex]
                    const day = new Date(doc?.fulldate).getDay()

                    if (days[day] === 'Sunday') {
                        return 'gray';
                    } else if (value === 8.143) {
                        return '#f72d2d'
                    } else if (value >= 5.5) {
                        return '#035afc'
                    } else if (value>=4.2) {
                        return '#BE6DB7'
                    }else if(value>=2){
                        return '#FF8400'
                    }
                },
            }
        ],
    }} />;
}
