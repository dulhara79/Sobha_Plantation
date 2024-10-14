import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Popconfirm, message, DatePicker } from 'antd';
import { SearchOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { RangePicker } = DatePicker;

const SalaryRecordsDashboard = () => {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalaryRecords();
  }, []);

  const fetchSalaryRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/salary/');
      setSalaryRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching salary records:', error);
      message.error('Failed to fetch salary records');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/salesAndFinance/finance/salary/${id}`);
      message.success('Salary record deleted successfully');
      fetchSalaryRecords();
    } catch (error) {
      console.error('Error deleting salary record:', error);
      message.error('Failed to delete salary record');
    }
  };

  const handleEdit = (record) => {
    navigate(`/salesAndFinance/finance/EditEmployeeSalaryRecords/${record._id}`);
    console.log('Edit record:', record);
  };

  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log('Downloading PDF...');
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'emp_name',
      key: 'emp_name',
      sorter: (a, b) => a.emp_name.localeCompare(b.emp_name),
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.payment_date) - new Date(b.payment_date),
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: (salary) => `LKR. ${salary.toFixed(2)}`,
      sorter: (a, b) => a.netSalary - b.netSalary,
    },
    {
      title: 'Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid, partialPayment) => (
        <span className={`px-2 py-1 rounded-full text-xs ${isPaid ? 'bg-green-100 text-green-800' : partialPayment ? 'bg-blue-50 text-blue-800' :'bg-red-100 text-red-800'}`}>
          {isPaid ? 'Paid' : partialPayment ? 'Partial Paid' : 'Unpaid'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-500"
          />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-500"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filteredRecords = salaryRecords.filter(
    (record) =>
      record.emp_name.toLowerCase().includes(searchText.toLowerCase()) ||
      new Date(record.payment_date).toLocaleDateString().includes(searchText)
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Salary Records</h1>
        <div className="space-x-4">
          <Input
            placeholder="Search by name or date"
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadPDF}
            className="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600"
          >
            Download PDF
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredRecords}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        className="rounded-md shadow-sm"
      />
    </div>
  );
};

export default SalaryRecordsDashboard;