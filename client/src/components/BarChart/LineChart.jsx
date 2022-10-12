import React from 'react'
import { useMemo } from 'react';

import { Line } from 'react-chartjs-2'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


const scores = [6, 7, 4,5, 8, 6,3,6, 8]
const labels = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const options = {
    responsive: false,
}

export default function LineChart() {
   
    const data = useMemo(function() {
        return {
            datasets: [
                {
                    label: "Ventas",
                    data: scores,
                    transition: 0.3,
                    tension: 0.3
                },
            ],
            labels,
        }
    }, [])
   
    return <Line data={data} options={options}/>
}
