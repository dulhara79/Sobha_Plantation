// src/components/AnalyticsSummaryCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsSummaryCard = () => {
  const [summary, setSummary] = useState({ totalTransactions: 0, totalIncome: 0, totalExpenses: 0 });
  const [summaries, setSummaries] = useState({
    weeklySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
    monthlySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
    yearlySummary: { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 },
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/analytics/finance-summary')
      .then(response => setSummaries(response.data))
      .catch(error => console.error('Error fetching summary:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/analytics/summary')
    .then(response => setSummary(response.data)
    )
    .catch(error => console.error('Error fetching summary:', error));
  }, []);
  
  return (
    <div>
    <div className="grid grid-cols-3 gap-8 mb-8 shadow-lg">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Total Transactions</h3>
        <p className="text-2xl">{summary.totalTransactions}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Total Income</h3>
        <p className="text-2xl">LKR. {summary.totalIncome}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl">LKR. {summary.totalExpenses}</p>
      </div>
    </div>
     <div className="grid grid-cols-3 gap-8 mb-8 shadow-lg">
     {/* Weekly Summary */}
     <div className="p-4 bg-white rounded shadow">
       <h3 className="text-lg font-semibold">Weekly Transactions</h3>
       <p className="text-sm">Transactions: {summaries.weeklySummary.totalTransactions}</p>
       <p className="text-sm">Income: LKR. {summaries.weeklySummary.totalIncome}</p>
       <p className="text-sm">Expenses: LKR. {summaries.weeklySummary.totalExpenses}</p>
     </div>
     {/* Monthly Summary */}
     <div className="p-4 bg-white rounded shadow">
       <h3 className="text-lg font-semibold">Monthly Transactions</h3>
       <p className="text-sm">Transactions: {summaries.monthlySummary.totalTransactions}</p>
       <p className="text-sm">Income: LKR. {summaries.monthlySummary.totalIncome}</p>
       <p className="text-sm">Expenses: LKR. {summaries.monthlySummary.totalExpenses}</p>
     </div>
     {/* Yearly Summary */}
     <div className="p-4 bg-white rounded shadow">
       <h3 className="text-lg font-semibold">Yearly Transactions</h3>
       <p className="text-sm">Transactions: {summaries.yearlySummary.totalTransactions}</p>
       <p className="text-sm">Income: LKR. {summaries.yearlySummary.totalIncome}</p>
       <p className="text-sm">Expenses: LKR. {summaries.yearlySummary.totalExpenses}</p>
     </div>
   </div>
   </div>
  );
};

export default AnalyticsSummaryCard;
