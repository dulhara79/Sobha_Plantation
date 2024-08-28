import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionSummaryCard = () => {
  const [summary, setSummary] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
    profitLoss: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction');
        setSummary(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Failed to fetch transaction summary:', error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col items-start">
        <span className="text-gray-600">Total Transactions</span>
        <span className="text-2xl font-bold">{summary.totalTransactions}</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-gray-600">Total Income</span>
        <span className="text-2xl font-bold text-green-500">LKR {summary.totalIncome}</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-gray-600">Total Expenses</span>
        <span className="text-2xl font-bold text-red-500">LKR {summary.totalExpenses}</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-gray-600">Total Profit/Loss</span>
        <span className={`text-2xl font-bold ${summary.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          LKR {summary.profitLoss}
        </span>
      </div>
    </div>
  );
};

export default TransactionSummaryCard;
