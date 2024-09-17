import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table, Tag, Input, Select, notification, Row, Col } from 'antd';
import { HomeOutlined, LeftCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const { Search } = Input;
const { Option } = Select;

// Column definitions for the table
const columns = [
  {
    title: 'Seedling Type',
    dataIndex: 'seedlingType',
    key: 'seedlingType',
  },
  {
    title: 'Current Qty',
    dataIndex: 'currentQuantity',
    key: 'currentQuantity',
  },
  {
    title: 'Min Stock',
    dataIndex: 'minStock',
    key: 'minStock',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <Tag color={text === 'Low Stock' ? 'red' : 'green'}>
        {text.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <span>
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
        <Button type="link" onClick={() => handleNotify(record)}>Notify</Button>
      </span>
    ),
  },
];

const Seedling = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeedlings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/seedlings');
        setDataSource(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        notification.error({ message: 'Error fetching seedlings', description: error.message });
      }
    };

    fetchSeedlings();
  }, []);

  // Filter and search data
  useEffect(() => {
    let filtered = dataSource;

    if (searchText) {
      filtered = filtered.filter(item =>
        item.seedlingType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchText, statusFilter, dataSource]);

  // Handle edit button click
  const handleEdit = (record) => {
    console.log('Edit', record);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/seedlings/${id}`);
      setDataSource(dataSource.filter(item => item._id !== id));
      notification.success({ message: 'Seedling deleted successfully!' });
    } catch (error) {
      notification.error({ message: 'Error deleting seedling', description: error.message });
    }
  };

  // Handle notify button click
  const handleNotify = (record) => {
    console.log('Notify', record);
  };

  // Navigate to the Add Seedling form
  const handleAddNew = () => {
    navigate('/seedlingForm'); // Adjust the route as necessary
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { href: '', title: <HomeOutlined /> },
            { href: '', title: 'Field View' },
            { href: '', title: 'Dashboard' },
            { href: '', title: 'Seedling' },
          ]}
        />
        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} />
        </div>

        {/* Page Header */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Seedling</h2>
          <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Search, Filter, and Buttons */}
        <div className="my-4">
          <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
            <Col flex="auto">
              <Row gutter={16}>
                <Col>
                  <Search
                    placeholder="Search by seedling type"
                    enterButton
                    onSearch={(value) => setSearchText(value)}
                    style={{ width: 300 }}
                  />
                </Col>
                <Col>
                  <Select
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    style={{ width: 200 }}
                  >
                    <Option value="All">All</Option>
                    <Option value="In Stock">In Stock</Option>
                    <Option value="Low Stock">Low Stock</Option>
                    <Option value="Out of Stock">Out of Stock</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col>
              <div style={{ textAlign: 'right' }}>
                <Button type="primary" className="mr-2" onClick={handleAddNew}>Add New Seedling</Button>
                <Button type="default" style={{ backgroundColor: 'green', color: 'white' }}>Generate Reports</Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Seedling Table */}
        <Table dataSource={filteredData} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Seedling;
