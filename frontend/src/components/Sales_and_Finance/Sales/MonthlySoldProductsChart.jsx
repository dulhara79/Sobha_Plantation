// src/components/Sales_and_Finance/Sales/MonthlySoldProductsChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const MonthlySoldProductsChart = () => {
  const [monthlySoldProducts, setMonthlySoldProducts] = useState([]);
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const thisMonth = moment().format('MMMM');

  const fetchMonthlySoldProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking/monthly-summary');
      setMonthlySoldProducts(response.data.monthlyProductSales[0].products || []);
      setMonth(response.data.monthlyProductSales[0].month);
      console.log("monthly product sale: ",response);
      console.log("monthly product sale: ",response.data.monthlyProductSales);
    } catch (error) {
      console.error('Error fetching monthly sold products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMonthlySoldProducts();
  }, []);

  if (loading) {
    return <div className="text-lg font-semibold text-center">Loading Monthly Sold Products...</div>; // Customize loading
  }

  return (
    <div className="p-6 my-8 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">Monthly Sold Products <span className="mb-4 text-xl font-semibold text-gray-400">{thisMonth}</span></h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={monthlySoldProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
          <YAxis dataKey="quantitySold" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}/>
          <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '10px' }} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="quantitySold" fill="#ffc658" barSize={40} />
          <Bar dataKey="revenueGenerated" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySoldProductsChart;
