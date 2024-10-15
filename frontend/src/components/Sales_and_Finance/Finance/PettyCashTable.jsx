import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Title } = Typography;

const PettyCashLedger = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/salesAndFinance/finance/minorTransactions')
      .then((response) => setData(response.data.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  const processEntries = () => {
    let runningBalance = 500;
    let currentMonth = null;
    const formattedEntries = [];
  
    data
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((entry, index) => {
        const entryMonth = moment(entry.date).format("YYYY-MM");
  
        if (entryMonth !== currentMonth) {
          if (currentMonth !== null) {
            formattedEntries.push({
              key: `balance_cd_${currentMonth}`,
              date: moment(entry.date).subtract(1, 'month').endOf('month').format("YYYY-MM-DD"),
              description: 'Balance C/D',
              amount: runningBalance.toFixed(2),
              type: 'balance',
            });
          }
          formattedEntries.push({
            key: `balance_bd_${entryMonth}`,
            date: moment(entry.date).startOf('month').format("YYYY-MM-DD"),
            description: 'Balance B/D',
            amount: runningBalance.toFixed(2),
            type: 'balance',
          });
          currentMonth = entryMonth;
        }
  
        const amount = entry.type === "income" ? entry.amount : -entry.amount;
        runningBalance += amount;
  
        formattedEntries.push({
          ...entry,
          key: index,
          date: moment(entry.date).format("YYYY-MM-DD"),  // Updated date formatting
          amount: amount.toFixed(2),
        });
      });
  
    formattedEntries.push({
      key: `final_balance_cd`,
      date: moment().endOf("month").format("YYYY-MM-DD"),
      description: "Balance C/D",
      amount: runningBalance.toFixed(2),
      type: "balance",
    });
  
    return formattedEntries;
  };
  

  const columns = [
    { title: 'Receipt (LKR)', dataIndex: 'receipt', key: 'receipt', render: (_, record) => record.type === 'income' ? `${record.amount}` : '-' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Receipt No.', dataIndex: 'receiptNo', key: 'receiptNo' },
    { title: 'Particulars', dataIndex: 'description', key: 'description' },
    { title: 'Total (LKR)', dataIndex: 'total', key: 'total', render: (_, record) => record.type === 'expense' ? `${record.amount}` : '-' },
    { title: 'Transport Expenses (LKR)', dataIndex: 'transportExpenses', key: 'transportExpenses', render: (_, record) => record.type === 'expense' && record.subtype === 'Transport Expenses' ? `${record.amount}` : '-' },
    { title: 'Small Equipment (LKR)', dataIndex: 'smallEquipment', key: 'smallEquipment', render: (_, record) => record.type === 'expense' && record.subtype === 'Small Equipment Purchases' ? `${record.amount}` : '-' },
    { title: 'Newspaper (LKR)', dataIndex: 'newspaper', key: 'newspaper', render: (_, record) => record.type === 'expense' && record.subtype === 'Buy News Paper' ? `${record.amount}` : '-' },
    { title: 'Tea (LKR)', dataIndex: 'tea', key: 'tea', render: (_, record) => record.type === 'expense' && record.subtype === 'Tea' ? `${record.amount}` : '-' },
    { title: 'Short Eats (LKR)', dataIndex: 'shortEats', key: 'shortEats', render: (_, record) => record.type === 'expense' && record.subtype === 'Short Eats' ? `${record.amount}` : '-' },
    { title: 'Other (LKR)', dataIndex: 'other', key: 'other', render: (_, record) => record.type === 'expense' && record.subtype === 'Other' ? `${record.amount}` : '-' },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = processEntries().filter((entry) =>
    Object.values(entry).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
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

  const generatePDF = async () => {
    const doc = new jsPDF('l', 'mm', 'a4');
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
  
      doc.line(10, 35, pageWidth - 10, 37); // Header line
  
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
    doc.text("Sobha Plantations - Petty Cash Ledger", pageWidth / 2, 45, { align: "center" });
  
    // Table settings
    const startY = 55;
  
    // Prepare data for the table
    const tableData = processEntries().map(entry => [
      entry.date,
      entry.receiptNo || '-',
      entry.description,
      entry.type === 'income' ? entry.amount : '-',
      entry.type === 'expense' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Transport Expenses' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Small Equipment Purchases' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Buy News Paper' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Tea' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Short Eats' ? entry.amount : '-',
      entry.type === 'expense' && entry.subtype === 'Other' ? entry.amount : '-',
    ]);
  
    // Create the table
    doc.autoTable({
      startY: startY,
      head: [['Date', 'Receipt No.', 'Particulars', 'Receipt (LKR)', 'Total (LKR)', 'Transport Expenses (LKR)', 'Small Equipment (LKR)', 'Newspaper (LKR)', 'Tea (LKR)', 'Short Eats (LKR)', 'Other (LKR)']],
      body: tableData,
      margin: { top: marginTop, bottom: marginBottom, left: 10, right: 10 },
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [64, 133, 126], textColor: [255, 255, 255], fontSize: 9 },
      columnStyles: {
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
        10: { halign: 'right' },
      },
      didDrawPage: drawHeaderFooter,
    });
  
    // Calculate totals
    const totalReceived = tableData.reduce((sum, row) => sum + (parseFloat(row[3]) || 0), 0);
    const totalExpenses = tableData.reduce((sum, row) => sum + (parseFloat(row[4]) || 0), 0);
  
    // Add total row
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5,
      head: [['', '', 'Total', 'Receipt (LKR)', 'Total (LKR)', 'Transport Expenses (LKR)', 'Small Equipment (LKR)', 'Newspaper (LKR)', 'Tea (LKR)', 'Short Eats (LKR)', 'Other (LKR)']],
      body: [[
        '', '', '',
        totalReceived.toFixed(2),
        totalExpenses.toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[5]) || 0), 0).toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[6]) || 0), 0).toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[7]) || 0), 0).toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[8]) || 0), 0).toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[9]) || 0), 0).toFixed(2),
        tableData.reduce((sum, row) => sum + (parseFloat(row[10]) || 0), 0).toFixed(2),
      ]],
      margin: { left: 10, right: 10 },
      styles: { fontSize: 8, cellPadding: 1, fontStyle: 'bold' },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontSize: 9 },
      columnStyles: {
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
        10: { halign: 'right' },
      },
    });
  
    doc.save("PettyCashLedger.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Title level={2} className="mb-6 text-center">Petty Cash Ledger</Title>
      
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
      
      <Table
        style={ { accentColor: 'red', border: '1px solid #e5e7eb'  } }
        className='table-fixed, bg-lime-200'
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        summary={(pageData) => {
          const totalReceived = pageData.reduce((sum, record) => sum + (record.type === 'income' ? parseFloat(record.amount) : 0), 0);
          const totalExpenses = pageData.reduce((sum, record) => sum + (record.type === 'expense' ? parseFloat(record.amount) : 0), 0);

          return (
            <Table.Summary>
              <Table.Summary.Row className="bg-gray-50">
                <Table.Summary.Cell index={0} colSpan={3} >
                  <strong>Monthly Total</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <strong>{totalReceived.toFixed(2)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} colSpan={7}>
                  <strong>{totalExpenses.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </div>
  );
};

export default PettyCashLedger;
