// // src/components/AnalyticsSummaryCard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AnalyticsSummaryCard = () => {
//   // const [summary, setSummary] = useState({ totalTransactions: 0, totalIncome: 0, totalExpenses: 0 });
//   const [summaries, setSummaries] = useState({
//     weeklySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
//     monthlySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
//     yearlySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
//   });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/')
//       .then(response => setSummaries(response.data))
//       .catch(error => console.error('Error fetching summary:', error));
//   }, []);

//   // useEffect(() => {
//   //   axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/')
//   //   .then(response => setSummary(response.data)
//   //   )
//   //   .catch(error => console.error('Error fetching summary:', error));
//   // }, []);

//   return (
//     <div className='w-full'>
//     {/* <div className="grid grid-cols-3 gap-8 mb-8 shadow-lg">
//       <div className="p-4 bg-white rounded shadow">
//         <h3 className="text-lg font-semibold">Total Transactions</h3>
//         <p className="text-2xl">{summary.totalTransactions}</p>
//       </div>
//       <div className="p-4 bg-white rounded shadow">
//         <h3 className="text-lg font-semibold">Total Income</h3>
//         <p className="text-2xl">LKR. {summary.totalIncome}</p>
//       </div>
//       <div className="p-4 bg-white rounded shadow">
//         <h3 className="text-lg font-semibold">Total Expenses</h3>
//         <p className="text-2xl">LKR. {summary.totalExpenses}</p>
//       </div>
//     </div> */}
//      <div className="grid grid-cols-3 gap-8 mb-8 shadow-lg">
//      {/* Weekly Summary */}
//      <div className="p-4 bg-white rounded shadow">
//        <h3 className="text-lg font-semibold">Weekly Transactions</h3>
//        <p className="text-base">Transactions: {summaries.weeklySummary.totalTransactions}</p>
//        <p className="text-base">Income: LKR. {summaries.weeklySummary.totalIncome}</p>
//        <p className="text-base">Expenses: LKR. {summaries.weeklySummary.totalExpenses}</p>
//      </div>
//      {/* Monthly Summary */}
//      <div className="p-4 bg-white rounded shadow">
//        <h3 className="text-lg font-semibold">Monthly Transactions</h3>
//        <p className="text-base">Transactions: {summaries.monthlySummary.totalTransactions}</p>
//        <p className="text-base">Income: LKR. {summaries.monthlySummary.totalIncome}</p>
//        <p className="text-base">Expenses: LKR. {summaries.monthlySummary.totalExpenses}</p>
//      </div>
//      {/* Yearly Summary */}
//      <div className="p-4 bg-white rounded shadow">
//        <h3 className="text-lg font-semibold">Yearly Transactions</h3>
//        <p className="text-base">Transactions: {summaries.yearlySummary.totalTransactions}</p>
//        <p className="text-base">Income: LKR. {summaries.yearlySummary.totalIncome}</p>
//        <p className="text-base">Expenses: LKR. {summaries.yearlySummary.totalExpenses}</p>
//      </div>
//    </div>
//    </div>
//   );
// };

// export default AnalyticsSummaryCard;

// src/components/AnalyticsSummaryCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AnalyticsSummaryCard = () => {
  const [summaries, setSummaries] = useState({
    weeklySummary: {
      totalTransactions: 0,
      totalIncome: 0,
      totalExpenses: 0,
      revenue: 0,
    },
    monthlySummary: {
      totalTransactions: 0,
      totalIncome: 0,
      totalExpenses: 0,
      revenue: 0,
    },
    yearlySummary: {
      totalTransactions: 0,
      totalIncome: 0,
      totalExpenses: 0,
      revenue: 0,
    },
  });

  console.log(summaries);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/salesAndFinance/finance/transaction/allsummary/summary"
      )
      .then((response) => setSummaries(response.data))
      .catch((error) => console.error("Error fetching summary:", error));
  }, []);

  console.log(summaries);

  return (
    <div className="w-full p-4 shadow-lg bg-green-50 rougrnded">
      <h2 className="mb-4 font-bold text-center text-gray-800">
        Financial Summary Sheet
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {/* Weekly Summary */}
        <div className="p-6 rounded-lg shadow-inner bg-gray-50 ">
          <h3 className="mb-2 text-3xl font-semibold text-blue-600">
            Weekly Summary
          </h3>
          <p className="text-base text-gray-700">
            Transactions:{" "}
            {summaries.weeklySummary.totalTransactions
              ? summaries.weeklySummary.totalTransactions
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Income: LKR.{" "}
            {summaries.weeklySummary.totalIncome
              ? summaries.weeklySummary.totalIncome.toFixed(2)
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Expenses: LKR.{" "}
            {summaries.weeklySummary.totalExpenses
              ? summaries.weeklySummary.totalExpenses.toFixed(2)
              : 0}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Revenue: LKR.{" "}
            {summaries.weeklySummary.totalExpenses
              ? (
                  summaries.weeklySummary.totalIncome -
                  summaries.weeklySummary.totalExpenses
                ).toFixed(2)
              : 0}
          </p>
        </div>

        {/* Monthly Summary */}
        <div className="p-6 rounded-lg shadow-inner bg-gray-50">
          <h3 className="mb-2 text-3xl font-semibold text-blue-600">
            Monthly Summary
          </h3>
          <p className="text-base text-gray-700">
            Transactions:{" "}
            {summaries.monthlySummary.totalTransactions
              ? summaries.monthlySummary.totalTransactions
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Income: LKR.{" "}
            {summaries.monthlySummary.totalIncome
              ? summaries.monthlySummary.totalIncome.toFixed(2)
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Expenses: LKR.{" "}
            {summaries.monthlySummary.totalExpenses
              ? summaries.monthlySummary.totalExpenses.toFixed(2)
              : 0}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Revenue: LKR.{" "}
            {summaries.monthlySummary.totalExpenses
              ? (
                  summaries.monthlySummary.totalIncome -
                  summaries.monthlySummary.totalExpenses
                ).toFixed(2)
              : 0}
          </p>
        </div>

        {/* Yearly Summary */}
        <div className="p-6 rounded-lg shadow-inner bg-gray-50">
          <h3 className="mb-2 text-3xl font-semibold text-blue-600">
            Yearly Summary
          </h3>
          <p className="text-base text-gray-700">
            Transactions:{" "}
            {summaries.yearlySummary.totalTransactions
              ? summaries.yearlySummary.totalTransactions
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Income: LKR.{" "}
            {summaries.yearlySummary.totalIncome
              ? summaries.yearlySummary.totalIncome.toFixed(2)
              : 0}
          </p>
          <p className="text-base text-gray-700">
            Expenses: LKR.{" "}
            {summaries.yearlySummary.totalExpenses
              ? summaries.yearlySummary.totalExpenses.toFixed(2)
              : 0}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Revenue: LKR.{" "}
            {summaries.yearlySummary.totalExpenses
              ? (
                  summaries.yearlySummary.totalIncome -
                  summaries.yearlySummary.totalExpenses
                ).toFixed(2)
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummaryCard;
