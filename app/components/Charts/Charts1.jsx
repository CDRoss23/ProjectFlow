import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, PointElement, LineElement, RadarController, RadialLinearScale } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(RadarController, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const generateRandomData = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
};

// Datos para el gráfico
const data = {
  labels: ['Oscar', 'Bernard', 'Charlie', 'Samantha', 'Douglas', 'Joseph', 'Edgar', 'Lois'],
  datasets: [
    {
      label: 'Colaboradores',
      data: generateRandomData(),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointHitRadius: 10,
      fill: true,
    },
  ],
};

export default function ZoomControlled() {
  return (
    <div style={{ width: 'auto', height: '320px' }}>
      <Radar
        data={data}
        width={600}
        height={400}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  // Omitir algunos puntos
                  if (context.dataIndex % 2 === 0) {
                    return null; // Omite los puntos con índice par
                  }
                  return context.dataset.label + ': ' + context.raw;
                },
              },
            },
          },
          scales: {
            r: {
              angleLines: {
                color: '#BABABA', // Cambia el color de las líneas de ángulo
              },
              grid: {
                color: '#BABABA', // Cambia el color de las líneas de la cuadrícula
              },
              ticks: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        }}
      />
    </div>
  );
}
