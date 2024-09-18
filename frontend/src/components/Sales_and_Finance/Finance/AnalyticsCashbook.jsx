// src/components/AnalyticsCashbook.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsCashbook = () => {
  const [cashbook, setCashbook] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/analytics/cashbook')
      .then(response => setCashbook(response.data))
      .catch(error => console.error('Error fetching cashbook:', error));
  }, []);

  return (
    <div className="p-4 mt-4 bg-white rounded shadow">
      <h3 className="mb-4 text-lg font-semibold">AnalyticsCashbook</h3>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Balance</th>
          </tr>
        </thead>
        <tbody>
          {cashbook.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{entry.date}</td>
              <td className="px-4 py-2 border">{entry.type}</td>
              <td className="px-4 py-2 border">LKR. {entry.amount}</td>
              <td className="px-4 py-2 border">{entry.description}</td>
              <td className="px-4 py-2 border">LKR. {entry.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsCashbook;
