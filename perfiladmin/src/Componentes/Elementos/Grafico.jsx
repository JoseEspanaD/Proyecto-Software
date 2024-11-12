// PieChart.js o Grafico.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Grafico = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Veces Ordenado',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/grafica');
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const data = await response.json();
        if (data && data.length > 0) {
          const productNames = data.map(item => item.name);
          const vecesOrdenado = data.map(item => item.veces_ordenado);
          const backgroundColors = productNames.map(() => getRandomColor());

          setChartData({
            labels: productNames,
            datasets: [
              {
                label: 'Veces Ordenado',
                data: vecesOrdenado,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors
              }
            ]
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };

    fetchData();
  }, []);

  // Opciones para hacer el gráfico más pequeño y ajustar el tamaño de las etiquetas
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16 // Aumenta el tamaño de la fuente de las etiquetas
          }
        }
      }
    },
    maintainAspectRatio: false, // Permite controlar el tamaño con CSS
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <h2>Productos Más Ordenados</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default Grafico;
