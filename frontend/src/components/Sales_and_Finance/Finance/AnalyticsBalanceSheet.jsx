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
import { Table, Input } from 'antd';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BalanceSheet = () => {
  const [searchText, setSearchText] = useState('');
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // const generatePDF = async () => {
  //   const doc = new jsPDF();
  //   const toDay = moment().format("YYYY-MM-DD");
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  
  //   // Load the logo image
  //   const logoUrl = "../../../../src/assets/logo.png";
  //   let logoDataURL;
  //   try {
  //     logoDataURL = await getImageDataURL(logoUrl);
  //   } catch (error) {
  //     console.error("Failed to load the logo image:", error);
  //   }
  
  //   // Function to draw header and footer
  //   const drawHeaderFooter = (data) => {
  //     // Header
  //     doc.setFontSize(14);
  //     doc.text("Sobha Plantation", 10, 10);
  //     doc.setFontSize(10);
  //     doc.text("317/23, Nikaweratiya,", 10, 15);
  //     doc.text("Kurunagala, Sri Lanka.", 10, 20);
  //     doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25);
  //     doc.text("Contact: 0112 751 757", 10, 30);
  //     doc.text(`Date: ${toDay}`, 10, 35);
  
  //     if (logoDataURL) {
  //       doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10);
  //     }
  
  //     doc.line(10, 37, pageWidth - 10, 37); // Header line
  
  //     // Footer
  //     doc.setFontSize(10);
  //     doc.text(
  //       `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
  //       pageWidth - 30,
  //       pageHeight - 10
  //     );
  //   };
  
  //   // Set margins
  //   const marginTop = 40;
  //   const marginBottom = 20;
  
  //   // Title
  //   doc.setFontSize(16);
  //   doc.text("Sobha Plantations - Balance Sheet", pageWidth / 2, 45, { align: "center" });
  //   doc.setFontSize(12);
  //   doc.text(`As of ${toDay}`, pageWidth / 2, 52, { align: "center" });
  
  //   // Table settings
  //   const startY = 60;
  
  //   // Prepare data for the table
  //   const assetData = balanceSheetData.assets.map(asset => [asset.subtype, formatCurrency(asset.price)]);
  //   const liabilityData = balanceSheetData.liabilities.map(liability => [liability.subtype, formatCurrency(liability.price)]);
    
  //   const totalAssets = calculateTotal(balanceSheetData.assets);
  //   const totalLiabilities = calculateTotal(balanceSheetData.liabilities);
  //   const totalLiabilitiesAndEquity = totalLiabilities + balanceSheetData.equity;
  
  //   // Create the table
  //   doc.autoTable({
  //     startY: startY,
  //     head: [['Assets', 'Amount (LKR)']],
  //     body: [
  //       ...assetData,
  //       ['Total Assets', formatCurrency(totalAssets)],
  //       ['', ''],
  //       ['Liabilities', ''],
  //       ...liabilityData,
  //       ['Total Liabilities', formatCurrency(totalLiabilities)],
  //       ['', ''],
  //       ['Equity', ''],
  //       ["Owner's Equity", formatCurrency(balanceSheetData.equity)],
  //       ['Total Liabilities and Equity', formatCurrency(totalLiabilitiesAndEquity)],
  //     ],
  //     margin: { top: marginTop, bottom: marginBottom, left: 10, right: 10 },
  //     styles: { fontSize: 10, cellPadding: 5 },
  //     headStyles: { fillColor: [64, 133, 126], textColor: [255, 255, 255], fontSize: 12 },
  //     columnStyles: {
  //       0: { cellWidth: 100 },
  //       1: { cellWidth: 'auto', halign: 'right' },
  //     },
  //     didDrawPage: drawHeaderFooter,
  //   });
  
  //   doc.save("BalanceSheet.pdf");
  // };

  // const generatePDF = async () => {
  //   const doc = new jsPDF();
  //   const toDay = moment().format("YYYY-MM-DD");
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  
  //   // Load the logo image
  //   const logoUrl = "../../../../src/assets/logo.png";
  //   let logoDataURL;
  //   try {
  //     logoDataURL = await getImageDataURL(logoUrl);
  //   } catch (error) {
  //     console.error("Failed to load the logo image:", error);
  //   }
  
  //   // Function to draw header and footer
  //   const drawHeaderFooter = (data) => {
  //     // Header
  //     doc.setFontSize(14);
  //     doc.text("Sobha Plantation", 10, 10);
  //     doc.setFontSize(10);
  //     doc.text("317/23, Nikaweratiya,", 10, 15);
  //     doc.text("Kurunagala, Sri Lanka.", 10, 20);
  //     doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25);
  //     doc.text("Contact: 0112 751 757", 10, 30);
  //     doc.text(`Date: ${toDay}`, 10, 35);
  //     if (logoDataURL) {
  //       doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10);
  //     }
  //     doc.line(10, 37, pageWidth - 10, 37); // Header line
  
  //     // Footer
  //     doc.setFontSize(10);
  //     doc.text(
  //       `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
  //       pageWidth - 30,
  //       pageHeight - 10
  //     );
  //   };
  
  //   // Set margins
  //   const marginTop = 40;
  //   const marginBottom = 20;
  
  //   // Title
  //   doc.setFontSize(16);
  //   doc.text("Sobha Plantations - Balance Sheet", pageWidth / 2, 45, {
  //     align: "center",
  //   });
  //   doc.setFontSize(12);
  //   doc.text(`As of ${toDay}`, pageWidth / 2, 52, { align: "center" });
  
  //   // Table settings
  //   const startY = 60;
  
  //   // Prepare data for the table
  //   const assetData = balanceSheetData.assets.map((asset) => [
  //     asset.subtype,
  //     "",
  //     formatCurrency(asset.price),
  //   ]);
  //   const liabilityData = balanceSheetData.liabilities.map((liability) => [
  //     liability.subtype,
  //     "",
  //     formatCurrency(liability.price),
  //   ]);
  //   const totalAssets = calculateTotal(balanceSheetData.assets);
  //   const totalLiabilities = calculateTotal(balanceSheetData.liabilities);
  //   const totalLiabilitiesAndEquity = totalLiabilities + balanceSheetData.equity;
  
  //   // Create the table
  //   doc.autoTable({
  //     startY: startY,
  //     head: [["Particulars", "Amount", "Total"]],
  //     body: [
  //       ["Assets", "", ""],
  //       ...assetData,
  //       ["Total Assets", "", formatCurrency(totalAssets)],
  //       ["", "", ""],
  //       ["Liabilities", "", ""],
  //       ...liabilityData,
  //       ["Total Liabilities", "", formatCurrency(totalLiabilities)],
  //       ["", "", ""],
  //       ["Equity", "", ""],
  //       ["Owner's Equity", "", formatCurrency(balanceSheetData.equity)],
  //       [
  //         "Total Liabilities and Equity",
  //         "",
  //         formatCurrency(totalLiabilitiesAndEquity),
  //       ],
  //     ],
  //     margin: { top: marginTop, bottom: marginBottom, left: 10, right: 10 },
  //     styles: { fontSize: 10, cellPadding: 5 },
  //     headStyles: {
  //       fillColor: [64, 133, 126],
  //       textColor: [255, 255, 255],
  //       fontSize: 12,
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 80 },
  //       1: { cellWidth: 60, halign: "right" },
  //       2: { cellWidth: 60, halign: "right" },
  //     },
  //     didDrawPage: drawHeaderFooter,
  //   });
  
  //   doc.save("BalanceSheet.pdf");
  // };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const toDay = moment().format("YYYY-MM-DD");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Load the logo image
    const logoUrl = "../../../../src/assets/logo.png";
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error("Failed to load the logo image:", error);
    }
  
    // Function to draw header and footer
    const drawHeaderFooter = (data) => {
      // Header
      doc.setFontSize(14);
      doc.text("Sobha Plantation", 10, 10);
      doc.setFontSize(10);
      doc.text("317/23, Nikaweratiya,", 10, 15);
      doc.text("Kurunagala, Sri Lanka.", 10, 20);
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25);
      doc.text("Contact: 0112 751 757", 10, 30);
      doc.text(`Date: ${toDay}`, 10, 35);
      if (logoDataURL) {
        doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10);
      }
      doc.line(10, 37, pageWidth - 10, 37); // Header line
  
      // Footer
      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 10
      );
    };
  
    // Set margins
    const marginTop = 40;
    const marginBottom = 20;
  
    // Title
    doc.setFontSize(16);
    doc.text("Sobha Plantations - Balance Sheet", pageWidth / 2, 45, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(`As of ${toDay}`, pageWidth / 2, 52, { align: "center" });
  
    // Table settings
    const startY = 60;
  
    // Prepare data for the table
    const assetData = balanceSheetData.assets.map((asset) => [
      asset.subtype,
      formatCurrency(asset.price),
      "",
    ]);
    const liabilityData = balanceSheetData.liabilities.map((liability) => [
      liability.subtype,
      formatCurrency(liability.price),
      "",
    ]);
    const totalAssets = calculateTotal(balanceSheetData.assets);
    const totalLiabilities = calculateTotal(balanceSheetData.liabilities);
    const totalLiabilitiesAndEquity = totalLiabilities + balanceSheetData.equity;
  
    // Create the table
    doc.autoTable({
      startY: startY,
      head: [["Particulars", "Amount", "Total"]],
      body: [
        ["Assets", "", ""],
        ...assetData,
        ["Total Assets", formatCurrency(totalAssets), ""],
        ["", "", ""],
        ["Liabilities", "", ""],
        ...liabilityData,
        ["Total Liabilities", formatCurrency(totalLiabilities), ""],
        ["", "", ""],
        ["Equity", "", ""],
        ["Owner's Equity", formatCurrency(balanceSheetData.equity), ""],
        [
          "Total Liabilities and Equity",
          "",
          formatCurrency(totalLiabilitiesAndEquity),
        ],
      ],
      margin: { top: marginTop, bottom: marginBottom, left: 10, right: 10 },
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 60, halign: "right" },
        2: { cellWidth: 60, halign: "right" },
      },
      didDrawPage: drawHeaderFooter,
    });
  
    doc.save("BalanceSheet.pdf");
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

  const filteredData = data.filter(item =>
    item.subtype.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-slate-100">
      <div className="flex justify-between mb-4">
        <Input
          className='mb-4 border-blue-500 rounded-full active:ring-2 active:ring-blue-300 focus:ring-2 focus:ring-blue-300 stroke-black'
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <button type="primary" onClick={generatePDF} className='float-right p-2 pl-4 pr-4 mt-4 text-base text-white rounded-full bg-lime-600 hover:bg-lime-700'>
          Export PDF
        </button>
      </div>
      
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Balance Sheet</h2>
      <p className="mb-6 text-center text-gray-600">As of {new Date().toLocaleDateString()}</p>

      <Table
        className='text-gray-800'
        columns={columns}
        dataSource={filteredData}
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