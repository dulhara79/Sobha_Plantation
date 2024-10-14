// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AnalyticsBalanceSheet = () => {
//   const [balanceSheet, setBalanceSheet] = useState({ assets: [], liabilities: [], equity: 0 });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/salesAndFinance/finance/valuation/valuation/balancesheet')
//       .then(response => {
//         setBalanceSheet(response.data);
//         console.log(response.data);  // For debugging
//       })
//       .catch(error => console.error('Error fetching balance sheet:', error));
//   }, []);

//   return (
//     <div className="p-4 mt-4 bg-white rounded shadow">
//       <h3 className="mb-4 text-lg font-semibold ">Balance Sheet</h3>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="font-semibold text-blue-600">Assets</h4>
//           <ul>
//             {balanceSheet.assets?.map(asset => (
//               <li key={asset._id}>{asset.description}: LKR. {(asset.price || 0).toLocaleString()}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold text-blue-600">Liabilities</h4>
//           <ul>
//             {balanceSheet.liabilities?.map(liability => (
//               <li key={liability._id}>{liability.description}: LKR. {(liability.price || 0).toLocaleString()}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h4 className="font-semibold text-blue-600">Equity</h4>
//         <p className="text-2xl">LKR. {(balanceSheet.equity || 0).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsBalanceSheet;

/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const AnalyticsBalanceSheet = () => {
  const [balanceSheet, setBalanceSheet] = useState({ date: '', assets: [], liabilities: [], equity: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/valuation/valuation/balancesheet')
      .then(response => {
        setBalanceSheet(response.data);
        console.log("BALANCE SHEET", response.data);  // For debugging
      })
      .catch(error => console.error('Error fetching balance sheet:', error));
  }, []);

  // Calculate totals for assets and liabilities
  const assetsTotal = balanceSheet.assets?.reduce((sum, asset) => sum + (asset.price || 0), 0) || 0;
  const liabilitiesTotal = balanceSheet.liabilities?.reduce((sum, liability) => sum + (liability.price || 0), 0) || 0;
  const totalEquityAndLiabilities = liabilitiesTotal + (balanceSheet.equity || 0);

  return (
    <div className="p-6 mt-6 bg-white rounded shadow">
      {/* Balance Sheet Date */
// <div className="mb-4 text-center">
//   <h3 className="text-lg font-semibold">Balance Sheet</h3>
//   <p className="text-gray-500">As of: {moment().toISOString().split("T")[0]}</p>
// </div>

// <div className="grid grid-cols-2 gap-8 pb-4 border-b">

{
  /* Assets Section */
}
// <div>
//   <h4 className="mb-2 font-semibold text-blue-600">Assets</h4>
//   <table className="w-full text-left">
//     <thead>
//       <tr>
//         <th className="font-medium">Description</th>
//         <th className="font-medium text-right">Amount (LKR)</th>
//         <th className="font-medium text-right">Notes</th>
//       </tr>
//     </thead>
//     <tbody>
//       {balanceSheet.assets?.map(asset => (
//         <tr key={asset._id}>
//           <td>{asset.description}</td>
//           <td className="text-right">{(asset.price || 0).toLocaleString()}</td>
//           <td className="text-right">{asset.notes || '-'}</td>
//         </tr>
//       ))}
//       <tr className="font-semibold">
//         <td>Total Assets</td>
//         <td className="text-right">LKR. {assetsTotal.toLocaleString()}</td>
//         <td></td>
//       </tr>
//     </tbody>
//   </table>
// </div>

{
  /* Liabilities Section */
}
// <div>
//   <h4 className="mb-2 font-semibold text-blue-600">Liabilities</h4>
//   <table className="w-full text-left">
//     <thead>
//       <tr>
//         <th className="font-medium">Description</th>
//         <th className="font-medium text-right">Amount (LKR)</th>
//         <th className="font-medium text-right">Notes</th>
//       </tr>
//     </thead>
//     <tbody>
//       {balanceSheet.liabilities?.map(liability => (
//         <tr key={liability._id}>
//           <td>{liability.description}</td>
//           <td className="text-right">{(liability.price || 0).toLocaleString()}</td>
//           <td className="text-right">{liability.notes || '-'}</td>
//         </tr>
//       ))}
//       <tr className="font-semibold">
//         <td>Total Liabilities</td>
//         <td className="text-right">LKR. {liabilitiesTotal.toLocaleString()}</td>
//         <td></td>
//       </tr>
//     </tbody>
//   </table>

{
  /* Equity Section */
}
//           <h4 className="mt-4 font-semibold text-blue-600">Equity</h4>
//           <p className="text-xl text-right">LKR. {(balanceSheet.equity || 0).toLocaleString()}</p>
//           <div className="pt-2 mt-2 font-semibold text-right border-t">
//             <span>Total Liabilities & Equity:</span> LKR. {totalEquityAndLiabilities.toLocaleString()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsBalanceSheet;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const BalanceSheet = () => {
  const [balanceSheetData, setBalanceSheetData] = useState({
    assets: [],
    liabilities: [],
    equity: 0
  });

  useEffect(() => {
    fetchBalanceSheetData();
  }, []);

  const fetchBalanceSheetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/valuation/valuation/balancesheet');
      setBalanceSheetData(response.data);
    } catch (error) {
      console.error('Error fetching balance sheet data:', error);
    }
  };

  const formatCurrency = (amount) => `LKR. ${amount.toLocaleString()}`;

  const calculateTotal = (items) => items.reduce((sum, item) => sum + (item.price || 0), 0);

  const totalAssets = calculateTotal(balanceSheetData.assets);
  const totalLiabilities = calculateTotal(balanceSheetData.liabilities);
  const totalLiabilitiesAndEquity = totalLiabilities + balanceSheetData.equity;

  const columns = [
    {
      title: 'Particulars',
      dataIndex: 'subtype',
      key: 'subtype',
    },
    {
      title: 'Amount',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (text) => formatCurrency(text || 0),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (text, record, index) => {
        if (record.isTotal) {
          return formatCurrency(record.total);
        }
        return null;
      },
    },
  ];

  const data = [
    { key: 'assets-header', subtype: 'Assets', isHeader: true },
    ...balanceSheetData.assets,
    { key: 'assets-total', subtype: 'Total Assets', total: totalAssets, isTotal: true },
    { key: 'liabilities-header', subtype: 'Liabilities', isHeader: true },
    ...balanceSheetData.liabilities,
    { key: 'liabilities-total', subtype: 'Total Liabilities', total: totalLiabilities, isTotal: true },
    { key: 'equity-header', subtype: 'Equity', isHeader: true },
    { key: 'equity-value', subtype: 'Owner\'s Equity', price: balanceSheetData.equity },
    { key: 'total-liabilities-equity', subtype: 'Total Liabilities and Equity', total: totalLiabilitiesAndEquity, isTotal: true },
  ];

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-slate-100">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Balance Sheet</h2>
      <p className="mb-6 text-center text-gray-600">As of {new Date().toLocaleDateString()}</p>

      <Table
        className='text-gray-800'
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => {
          if (record.isHeader) return 'font-bold bg-gray-100';
          if (record.isTotal) return 'font-bold';
          return '';
        }}
      />

      {totalAssets === totalLiabilitiesAndEquity ? (
        <p className="mt-4 text-center text-green-600">The balance sheet is balanced.</p>
      ) : (
        <p className="mt-4 text-center text-red-600">The balance sheet is not balanced.</p>
      )}
    </div>
  );
};

export default BalanceSheet;