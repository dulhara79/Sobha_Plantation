// src/components/Sales_and_Finance/Sales/YearlyRevenueChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const YearlyRevenueChart = () => {
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchYearlyRevenue = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking/yearly-revenue-summary');
      setYearlyRevenue(response.data.data);
      console.log("yearly revenue: ",response);
    } catch (error) {
      console.error('Error fetching yearly revenue:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchYearlyRevenue();
  }, []);

  if (loading) {
    return <div className="text-lg font-semibold text-center">Loading Yearly Revenue...</div>; // Customize loading
  }

  return (
    <div className="p-6 my-8 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">Yearly Revenue</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={yearlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
          <YAxis tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
          <Tooltip
            formatter={(value) => `LKR ${value.toLocaleString()}`}
            contentStyle={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyRevenueChart;
