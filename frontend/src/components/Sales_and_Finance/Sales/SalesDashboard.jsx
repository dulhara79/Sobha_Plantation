import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import WeeklySalesSummary from './WeeklySalesSummary';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking');
      setSalesData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this sale?',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/salesAndFinance/sales/tracking/${id}`);
          notification.success({ message: 'Sale deleted successfully!' });
          fetchSalesData(); // Refresh data
        } catch (error) {
          console.error('Error deleting sale:', error);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'product',
      sorter: (a, b) => a.product.name.localeCompare(b.product.name),
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
      sorter: (a, b) => a.quantitySold - b.quantitySold,
    },
    {
      title: 'Revenue Generated',
      dataIndex: 'revenueGenerated',
      key: 'revenueGenerated',
      sorter: (a, b) => a.revenueGenerated - b.revenueGenerated,
    },
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
      sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => console.log('Edit:', record._id)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
          <Button
            icon={<EyeOutlined />}
            onClick={() => console.log('View:', record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Sales Dashboard</h1>
      <WeeklySalesSummary />
      <div className="mt-8">
        <Table
          dataSource={salesData}
          columns={columns}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Button
        type="primary"
        className="mt-4"
        onClick={() => console.log('Generate Report')}
      >
        Generate Summary Report
      </Button>
    </div>
  );
};

export default SalesDashboard;

