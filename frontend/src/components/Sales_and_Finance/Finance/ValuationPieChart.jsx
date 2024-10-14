import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ValuationPieChart = () => {
  const [data, setData] = useState({ assets: 0, liabilities: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/valuation/valuation/balancesheet');
        const { assets, liabilities } = response.data;
        const totalAssets = assets.reduce((sum, asset) => sum + (asset.price || 0), 0);
        const totalLiabilities = liabilities.reduce((sum, liability) => sum + (liability.price || 0), 0);
        setData({ assets: totalAssets, liabilities: totalLiabilities });
      } catch (error) {
        console.error('Error fetching valuation data:', error);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ['Assets', 'Liabilities'],
    datasets: [
      {
        data: [data.assets, data.liabilities],
        backgroundColor: ['#84cc16', '#ef4444'],
        hoverBackgroundColor: ['#65a30d', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      
    },
  };

  return (
    <div className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">Assets & Liabilities</h2>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default ValuationPieChart;
