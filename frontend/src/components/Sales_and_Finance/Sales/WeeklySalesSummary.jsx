import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeeklySalesSummary = () => {
  const [summary, setSummary] = useState({
    totalSales: 0,
    mostSellingProduct: { name: 'N/A', totalQuantity: 0, totalRevenue: 0 },
    leastSellingProduct: { name: 'N/A', totalQuantity: 0, totalRevenue: 0 },
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/salesAndFinance/sales/tracking/weekly-summary'
        );
        setSummary(response.data.data);
      } catch (error) {
        console.error('Error fetching sales summary:', error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Weekly Sales Summary</h3>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-500">Total Sales</p>
          <h4 className="text-xl">LKR.{summary.totalSales.toFixed(2)}</h4>
        </div>
        <div>
          <p className="text-gray-500">Most Selling Product</p>
          <h4 className="text-xl">{summary.mostSellingProduct.name}</h4>
          <p>Total Quantity: {summary.mostSellingProduct.totalQuantity}</p>
          <p>Total Revenue: LKR.{summary.mostSellingProduct.totalRevenue.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Least Selling Product</p>
          <h4 className="text-xl">{summary.leastSellingProduct.name}</h4>
          <p>Total Quantity: {summary.leastSellingProduct.totalQuantity}</p>
          <p>Total Revenue: LKR.{summary.leastSellingProduct.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySalesSummary;
