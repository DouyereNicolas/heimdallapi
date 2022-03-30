import "./DashboardEmployees.css";
import React, { useRef, useState } from "react";
import fulldata from "../../context/fulldata";
import { Bar, Line, Pie } from 'react-chartjs-2';

import { Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement,
  BarElement, Title,
  Tooltip, Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, ArcElement, Title, Tooltip, Legend
);

export default function DashboardEmployees() {
  const yearRef = useRef();
  const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'septembre', 'Octobre', 'Novembre', 'Décembre'];
  const [allData, setAllData] = useState({
    data: {
      labels,
      datasets: [
        {
          label: '2022',
          data: fulldata['2022'].chartChantier,
          backgroundColor: 'rgba(212, 142,	25, 0.7)',
        },
        {
          label: '2021',
          data: fulldata['2021'].chartChantier,
          backgroundColor: 'rgba(136, 152, 170, 0.7)',
        },
      ]
    },
    dataLine: {
      labels,
      datasets: [{
          label: '2022',
          data: fulldata['2022'].chartChiffre,
          borderColor: 'rgb(212, 142,	25)',
          backgroundColor: 'rgba(212, 142, 25, 0.7)',
        },
        {
          label: '2021',
          data: fulldata['2021'].chartChiffre,
          borderColor: 'rgb(136, 152, 170)',
          backgroundColor: 'rgba(136, 152, 170, 0.7)',
        },
      ],
    },
    dataPie: {
      labels: ['Electricité', 'Plomberie', 'Couverture', 'Maçonnerie', 'Menuiserie', 'Gros oeuvre'],
      datasets: [{
        label: 'Corps de métier par chantier',
        data: fulldata['2021'].chartJob,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }, ],
    }
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  function changeYear() {
    var year = yearRef.current.options[yearRef.current.selectedIndex].value;

    console.log(year);

    setAllData({
      data: {
        labels,
        datasets: [
          {
            label: '2022',
            data: fulldata[2022].chartChantier,
            backgroundColor: 'rgba(212, 142,	25, 0.7)',
          },
          {
            label: `${year}`,
            data: fulldata[year].chartChantier,
            backgroundColor: 'rgba(136, 152, 170, 0.7)',
          },
        ]
      },
      dataLine: {
        labels,
        datasets: [{
            label: '2022',
            data: fulldata[2022].chartChiffre,
            borderColor: 'rgb(212, 142,	25)',
            backgroundColor: 'rgba(212, 142, 25, 0.7)',
          },
          {
            label: `${year}`,
            data: fulldata[year].chartChiffre,
            borderColor: 'rgb(136, 152, 170)',
            backgroundColor: 'rgba(136, 152, 170, 0.7)',
          },
        ],
      },
      dataPie: {
        labels: ['Electricité', 'Plomberie', 'Couverture', 'Maçonnerie', 'Menuiserie', 'Gros oeuvre'],
        datasets: [{
          label: 'Corps de métier par chantier',
          data: fulldata[year].chartJob,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }, ],
      }
    });
  };

  return (
    <div className="container">
      <div className="global-container">
        <h1 className="h1v3">Les résultats de l 'année :</h1>
        <form>
          <label htmlFor="year"> Choisissez une date </label>
          <select onChange={changeYear} ref={yearRef} name='year'>
            <option disabled value="2022">2022</option> 
            <option selected value="2021">2021</option>
            <option value="2020">2020</option> 
            <option value="2019">2019</option> 
          </select> 
        </form> 
        <div className="chart-container">
          <h2>Nombre de chantiers par mois</h2> 
          <Bar options={options} data={allData.data}/>
        </div>
        <div className="chart-container">
          <h2>Chiffres d 'affaire</h2>
          <Line options={optionsLine} data={allData.dataLine}/>
        </div>
        <div className="chart-container-pies">
          <h2>Corps de métier par chantier</h2>
          <Pie data={allData.dataPie}/>
        </div>
      </div>
    </div>
  );
}