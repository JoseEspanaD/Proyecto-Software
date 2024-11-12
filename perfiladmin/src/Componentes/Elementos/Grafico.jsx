import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '../Estilo.css';

// Registrar los elementos de Chart.js
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

  // Opciones para los gráficos
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Cambia el color del texto de la leyenda a blanco
          font: {
            size: 16 // Aumenta el tamaño de la fuente de las etiquetas
          }
        }
      },
      tooltip: {
        titleColor: 'white', // Cambia el color del texto del título del tooltip a blanco
        bodyColor: 'white' // Cambia el color del texto del cuerpo del tooltip a blanco
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white' // Cambia el color de las etiquetas del eje X a blanco
        }
      },
      y: {
        ticks: {
          color: 'white' // Cambia el color de las etiquetas del eje Y a blanco
        }
      }
    },
    maintainAspectRatio: false // Permite controlar el tamaño con CSS
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', flexWrap: 'wrap' }}>
      <h2 className="titulo-historial" style={{ marginRight: '20px', width: '100%' }}>Productos más Vendidos</h2>
      <div style={{ width: '300px', height: '300px', marginRight: '20px' }}>
        <Pie data={chartData} options={options} />
      </div>
      <div style={{ width: '300px', height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Grafico;
