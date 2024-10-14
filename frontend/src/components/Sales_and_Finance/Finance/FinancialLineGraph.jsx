import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinancialLineGraph = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/monthly-summary/incomeexpens');
        setMonthlyIncome(response.data.monthlyIncome);
        setMonthlyExpenses(response.data.monthlyExpenses);
        console.log("graph res: ", response);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Income',
        data: monthlyIncome,
        borderColor: '#84cc16',
        backgroundColor: 'rgba(163, 230, 53, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: monthlyExpenses,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income and Expenses',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='p-6 mt-10 mb-10'>
      <h2 className='mt-10 mb-8 text-center'>Financial Overview Year - {moment().format("YYYY")}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default FinancialLineGraph;
