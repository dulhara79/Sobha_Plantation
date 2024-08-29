// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const WeeklySalesSummary = () => {
//   const [weeklySummary, setWeeklySummary] = useState({
//     totalSales: 0,
//     mostSellingProduct: '',
//     leastSellingProduct: '',
//   });

//   useEffect(() => {
//     fetchWeeklySummary();
//   }, []);

//   const fetchWeeklySummary = async () => {
//     try {
//       const response = await axios.get('/api/salesAndFinance/sales/analytics');
//       const analyticsData = response.data.data;
//       const mostSelling = analyticsData.sort((a, b) => b.totalUnitsSold - a.totalUnitsSold)[0];
//       const leastSelling = analyticsData.sort((a, b) => a.totalUnitsSold - b.totalUnitsSold)[0];

//       setWeeklySummary({
//         totalSales: analyticsData.reduce((sum, sale) => sum + sale.performanceMetrics.totalRevenue, 0),
//         mostSellingProduct: mostSelling?.sale?.product?.name || 'N/A',
//         leastSellingProduct: leastSelling?.sale?.product?.name || 'N/A',
//       });
//     } catch (error) {
//       console.error('Error fetching weekly sales summary:', error);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="mb-2 text-xl font-semibold">Weekly Sales Summary</h2>
//       <p>Total Sales: ${weeklySummary.totalSales}</p>
//       <p>Most Selling Product: {weeklySummary.mostSellingProduct}</p>
//       <p>Least Selling Product: {weeklySummary.leastSellingProduct}</p>
//     </div>
//   );
// };

// export default WeeklySalesSummary;

// src/components/WeeklySalesSummaryCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeeklySalesSummaryCard = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/salesAndFinance/sales/analytics/weekly-summary"
        );
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching sales summary:", error);
      }
    };
    fetchSummary();
  }, []);

  return (
    // <div className="p-6 mb-4 bg-white rounded-lg shadow-lg">
    //   <h2 className="mb-2 text-xl font-bold">Weekly Sales Summary</h2>
    //   <p>Total Sales: LKR.{summary.totalSales}</p>
    //   <p>Most Selling Product: {summary.mostSellingProduct}</p>
    //   <p>Least Selling Product: {summary.leastSellingProduct}</p>

      <div className="p-4 mt-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold">Weekly Sales Summary</h3>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-500">Total Sales</p>
            <h4 className="text-xl">LKR.{summary.totalSales}</h4>
          </div>
          <div>
            <p className="text-gray-500">Most Selling Product</p>
            <h4 className="text-xl">{summary.mostSellingProduct}</h4>
          </div>
          <div>
            <p className="text-gray-500">Least Selling Product</p>
            <h4 className="text-xl">{summary.leastSellingProduct}</h4>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default WeeklySalesSummaryCard;
