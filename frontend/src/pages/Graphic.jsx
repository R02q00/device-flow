import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../configApi/configs';

ChartJS.register(ArcElement, Tooltip, Legend);

function Graphic({reload = false}){
    const [min, setMin]=useState(15);
    const [max, setMax]=useState(10);
    const [avg, setAvg]=useState(5);

    const data= {
      labels: ["total", "en attente", "panne"],
      datasets: [
        {
          data: [min, avg, max],
          backgroundColor: [
            'rgba(173, 66, 105, 0.7)',
            'rgba(33, 63, 104, 0.8)',
            'rgba(17, 94, 89, 0.7)',
          ]
        }
      ]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };

    return (
        <Pie data={data} options={options} />
    );

}
export default Graphic