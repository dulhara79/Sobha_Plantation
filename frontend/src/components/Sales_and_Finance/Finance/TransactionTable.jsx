import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, DatePicker, Select, Input, Button } from 'antd';
import { format } from 'date-fns';
import moment from 'moment';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [dateRange, setDateRange] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction');
        const data = response.data.data;
        setTransactions(data);
        applyFilters(data);
        const totalIncome = data.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
        const totalExpense = data.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
        setTotalAmount(totalIncome - totalExpense);
      } catch (error) {
        setError('Error fetching transactions');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = (data) => {
    let filtered = [...data];

    if (dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(transaction =>
        moment(transaction.date).isBetween(startDate, endDate, null, '[]')
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    const totalIncome = filtered.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = filtered.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    setTotalAmount(totalIncome - totalExpense);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    applyFilters(transactions);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'petty_cash_transactions.csv');
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'petty_cash_transactions.xlsx');
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <>{format(new Date(text), 'yyyy-MM-dd')}</>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Sub Type',
      dataIndex: 'subtype',
      key: 'subtype',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Payer/Payee',
      dataIndex: 'payer_payee',
      key: 'payer_payee',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: text => <>{text.toFixed(2)}</>,
    },
  ];

  // Determine the balance color
  const balanceColor = totalAmount > 0 ? 'green' : 'red';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <Card>
        <div className="mb-4">
          <RangePicker onChange={handleDateRangeChange} format="YYYY-MM-DD" />
          <Select
            placeholder="Select Type"
            onChange={handleTypeChange}
            className="ml-4"
            style={{ width: 200 }}
          >
            <Option value="">All Types</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
          <Input
            placeholder="Search Description"
            onChange={handleSearch}
            className="ml-4"
            style={{ width: 300 }}
          />
          <Button onClick={handleFilter} type="primary" className="ml-4">Apply Filters</Button>
          <Button onClick={exportToCSV} type="default" className="ml-4">Export to CSV</Button>
          <Button onClick={exportToExcel} type="default" className="ml-4">Export to Excel</Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="_id"
          pagination={false}
          className="text-xl" // Increase font size for table
        />
        <div className="pr-16 mt-4 font-bold text-right text-10xl" style={{ color: balanceColor }}>
          Balance: {totalAmount.toFixed(2)}
        </div>
      </Card>
    </div>
  );
};

export default TransactionTable;
