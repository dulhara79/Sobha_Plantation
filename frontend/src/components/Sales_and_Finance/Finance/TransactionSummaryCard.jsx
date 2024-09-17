import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

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
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/');
        const data = response.data.data;
        console.log(data);        

        const totalTransactions = data.length;
        const totalIncome = data.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
        const totalExpenses = data.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
        const profitLoss = totalIncome - totalExpenses;

        setSummary({
          totalTransactions,
          totalIncome,
          totalExpenses,
          profitLoss,
        });
      } catch (error) {
        console.error('Failed to fetch transaction summary:', error);
      }
    };

    fetchSummary();

    // Set up the Socket.IO client
    const socket = io('http://localhost:5173'); // Make sure the URL matches your backend

    // Listen for transaction updates
    socket.on('transactionUpdate', (update) => {
      console.log('Received transaction update:', update);

      // Update the summary state with the new data
      setSummary(calculateSummary(update));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`flex items-center justify-between p-6 bg-white mt-8 mb-8 rounded-lg shadow-xl bg-gradient-to-r from-white from-10% via-[#e8ffee] via-50% to-[#fff0f0] to-90% pt-16 pb-10 pl-10 pr-10`}>
      <div className="flex flex-col items-start">
        <span className="pb-4 pl-4 text-3xl font-bold">{summary.totalTransactions}</span>
        <span className="pt-2 text-5xl font-bold text-black">Total Transactions</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="pb-4 pl-4 text-3xl font-bold text-green-500">LKR {summary.totalIncome.toFixed(2)}</span>
        <span className="pt-2 text-5xl font-bold text-black">Total Income</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="pb-4 pl-4 text-3xl font-bold text-red-500">LKR {summary.totalExpenses.toFixed(2)}</span>
        <span className="pt-2 text-5xl font-bold text-black">Total Expenses</span>
      </div>
      <div className="flex flex-col items-start">
        <span className={`text-3xl pb-4 pl-4 font-bold ${summary.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          LKR {summary.profitLoss.toFixed(2)}
        </span>
        <span className="pt-2 text-5xl font-bold text-black">Total Profit/Loss</span>
      </div>
    </div>
  );
};

export default TransactionSummaryCard;
