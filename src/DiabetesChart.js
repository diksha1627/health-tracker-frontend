import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar,
  //  Doughnut, Line, Pie, PolarArea 
  } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto'
// import { Chart } from 'react-chartjs-2'

const DiabetesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
      .then((res) => {
        // Ensure that 'res.data' is an array before setting the state
        if (Array.isArray(res.data)) {
          console.log(res.data)
          setData(res.data);
        } else {
          console.error("Invalid data format received from the API");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const chartData = {
    labels: data?.map((entry) => {
      // Format date to a shorter and more readable format
      const formattedDate = new Date(entry.date).toLocaleDateString();
      return formattedDate;
    }),
    datasets: [
      {
        label: 'Blood Sugar Level',
        data: data?.map((entry) => entry.bloodSugarLevel),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='flex justify-center items-center flex-col w-[70%]'>
    <Bar data={chartData}  />
    </div>
  );
};

export default DiabetesChart;
