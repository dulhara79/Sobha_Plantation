// src/components/Sales_and_Finance/Sales/WeeklySoldProductsChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklySoldProductsChart = () => {
  const [weeklySoldProducts, setWeeklySoldProducts] = useState([]);
  const [week, setWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeeklySoldProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking/weekly-summary');
      setWeeklySoldProducts(response.data.mostSoldProducts);
      setWeek(response.data.from);
      console.log("weekly sold products: ",response);
    } catch (error) {
      console.error('Error fetching weekly sold products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeeklySoldProducts();
  }, []);

  if (loading) {
    return <div className="text-lg font-semibold text-center">Loading Weekly Sold Products...</div>; // Customize loading
  }

  return (
    <div className="p-6 my-8 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">Weekly Sold Products <span className="mb-4 text-xl font-semibold text-gray-400">{week}</span></h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={weeklySoldProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '10px' }} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="quantitySold" fill="#82ca9d" barSize={40} />
          <Bar dataKey="revenueGenerated" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySoldProductsChart;
