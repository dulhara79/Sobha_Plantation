// src/components/AnalyticsBalanceSheet.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsBalanceSheet = () => {
  const [balanceSheet, setBalanceSheet] = useState({ assets: [], liabilities: [], equity: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/analytics/balance-sheet')
      .then(response => setBalanceSheet(response.data))
      .catch(error => console.error('Error fetching balance sheet:', error));
  }, []);

  return (
    <div className="p-4 mt-4 bg-white rounded shadow">
      <h3 className="mb-4 text-lg font-semibold">Balance Sheet</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Assets</h4>
          <ul>
            {balanceSheet.assets.map(asset => (
              <li key={asset._id}>{asset.description}: LKR. {asset.amount}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Liabilities</h4>
          <ul>
            {balanceSheet.liabilities.map(liability => (
              <li key={liability._id}>{liability.description}: LKR. {liability.amount}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Equity</h4>
        <p className="text-2xl">LKR. {balanceSheet.equity}</p>
      </div>
    </div>
  );
};

export default AnalyticsBalanceSheet;
