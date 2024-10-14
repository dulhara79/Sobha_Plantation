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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Petty Cash Ledger', 20, 10);

    const tableColumn = columns.map((col) => col.title);
    const tableRows = filteredData.map((entry) => columns.map((col) => entry[col.dataIndex]));

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('PettyCashLedger.pdf');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Title level={2} className="mb-6 text-center">Petty Cash Ledger</Title>
      
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <Button type="primary" onClick={generatePDF}>
          Generate PDF
        </Button>
      </div>
      
      <Table
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
