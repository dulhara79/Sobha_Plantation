// src/components/AnalyticsTransactionTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/analytics/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className="p-4 mt-4 bg-white rounded shadow">
      <h3 className="mb-4 text-lg font-semibold">Transaction Records</h3>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Subtype</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Payer/Payee</th>
            <th className="px-4 py-2">Method</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td className="px-4 py-2 border">{transaction.date}</td>
              <td className="px-4 py-2 border">{transaction.type}</td>
              <td className="px-4 py-2 border">{transaction.subtype}</td>
              <td className="px-4 py-2 border">LKR. {transaction.amount}</td>
              <td className="px-4 py-2 border">{transaction.description}</td>
              <td className="px-4 py-2 border">{transaction.payer_payee}</td>
              <td className="px-4 py-2 border">{transaction.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTransactionTable;
