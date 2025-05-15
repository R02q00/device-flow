import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../configApi/configs';

ChartJS.register(ArcElement, Tooltip, Legend);

function Graphic({reload = false}){
    const [min, setMin]=useState(0);
    const [max, setMax]=useState(0);
    const [avg, setAvg]=useState(0);
    const [admis, setAdmis]=useState(0);
    const [redoblant, setRedoublant]=useState(0);

    const getStats= async()=>{
        try {
            const response= await api.get("/etudiants/stats");
            setMin(response.data.min);
            setMax(response.data.max);
            setAvg(response.data.avg);
            setAdmis(response.data.admis);
            setRedoublant(response.data.redoblant);

        } catch (error) {
          toast.info("Une est survenu !");
          console.log(error);

        }
    }
    const data= {
      labels: ["Moyenne minimale", "Moyenne de classe", "Moyenne maximale"],
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

    useEffect(()=>{
      getStats();

    },[reload])
    return (
      <div className='flex justify-between'>
        <div>
          <h3 className='border-b-4 mb-5'>Statistiques</h3>
          <div className='w-100 flex flex-col gap-5'>
            <div className='flex justify-between'><span>Admis.......</span><span className='text-green-400'>{admis}</span></div>
            <div className='flex justify-between'><span>Redoublant.......</span><span className=''>{redoblant}</span></div>
            <div className='flex justify-between'><span>Moyenne minimale........</span><span>{min}</span></div>
            <div className='flex justify-between'><span>Moyenne maximale.......</span><span>{max}</span></div>
            <div className='flex justify-between'><span>Moyenne de classe.......</span><span>{avg}</span></div>


          </div>
        </div>
        <div className='w-100'>
          <Pie data={data} options={options} />
        </div>
      </div>
      
    );

}
export default Graphic