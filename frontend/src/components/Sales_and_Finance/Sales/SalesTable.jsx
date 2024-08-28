// src/components/SalesTable.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, notification } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const SalesTable = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking');
                setSalesData(response.data.data);
                setFilteredData(response.data.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSalesData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/salesAndFinance/sales/tracking/${id}`);
            setSalesData(salesData.filter(sale => sale._id !== id));
            notification.success({ message: 'Sale deleted successfully!' });
        } catch (error) {
            notification.error({ message: 'Failed to delete sale.' });
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product.name',
            sorter: (a, b) => a.product.name.localeCompare(b.product.name),
        },
        {
            title: 'Quantity Sold',
            dataIndex: 'quantitySold',
            sorter: (a, b) => a.quantitySold - b.quantitySold,
        },
        {
            title: 'Revenue Generated',
            dataIndex: 'revenueGenerated',
            sorter: (a, b) => a.revenueGenerated - b.revenueGenerated,
        },
        {
            title: 'Sale Date',
            dataIndex: 'saleDate',
            sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <Button icon={<EyeOutlined />} />
                    <Button icon={<EditOutlined />} />
                    <Popconfirm
                        title="Are you sure to delete this sale?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
    );
};

export default SalesTable;
