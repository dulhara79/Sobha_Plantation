import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table, Tag, Input, Select, notification, Row, Col, Modal, Form } from 'antd';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const { Search } = Input;
const { Option } = Select;

const Seedling = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentSeedling, setCurrentSeedling] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeedlings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/seedlings');
        setDataSource(response.data);
        setFilteredData(response.data);
      } catch (error) {
        notification.error({ message: 'Error fetching seedlings', description: error.message });
      }
    };

    fetchSeedlings();
  }, []);

  // Filter and search data
  useEffect(() => {
    let filtered = dataSource;

    // Filter by search value (seedling type, current quantity, and min stock)
    if (searchValue) {
      filtered = filtered.filter(item =>
        item.seedlingType.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.currentQuantity.toString().includes(searchValue) ||
        item.minStock.toString().includes(searchValue)
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchValue, statusFilter, dataSource]);

  // Handle edit button click (open modal)
  const handleEdit = (record) => {
    setCurrentSeedling(record);
    form.setFieldsValue({ ...record, minStock: 50 }); // Set minStock to 50
    setEditModalVisible(true);
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

  // Handle modal form submission (edit seedling)
  const handleUpdate = async () => {
    try {
      const updatedSeedling = await form.validateFields();
      
      // Set status based on the currentQuantity value
      const status =
        updatedSeedling.currentQuantity === 0
          ? 'Out of Stock'
          : updatedSeedling.currentQuantity < 50
          ? 'Low Stock'
          : 'In Stock';

      const updatedData = { ...updatedSeedling, status, minStock: 50 }; // Ensure minStock is 50

      await axios.put(`http://localhost:5000/api/seedlings/${currentSeedling._id}`, updatedData);
      setDataSource(dataSource.map(item => (item._id === currentSeedling._id ? updatedData : item)));
      setEditModalVisible(false);
      notification.success({ message: 'Seedling updated successfully!' });
    } catch (error) {
      notification.error({ message: 'Error updating seedling', description: error.message });
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setEditModalVisible(false);
    form.resetFields(); // Reset form fields when modal is closed
  };

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.text('Seedling Report', 14, 10);

    // Prepare the table data
    const tableData = filteredData.map((item, index) => [
      index + 1,
      item.seedlingType,
      item.currentQuantity,
      item.minStock,
      item.status,
    ]);

    // Add table using autoTable plugin
    doc.autoTable({
      head: [['#', 'Seedling Type', 'Current Qty', 'Min Stock', 'Status']],
      body: tableData,
      startY: 20,
    });

    // Save the PDF
    doc.save('seedling-report.pdf');
  };

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
          <EditOutlined
            style={{ fontSize: '18px', marginRight: '10px', cursor: 'pointer', color: '#1890ff' }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }}
            onClick={() => handleDelete(record._id)}
          />
        </span>
      ),
    },
  ];

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
                    placeholder="Search by seedling type, quantity, or stock"
                    enterButton
                    onSearch={(value) => setSearchValue(value)}
                    style={{ width: 400 }}
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
                <Button type="primary" className="mr-2" onClick={() => navigate('/seedlingForm')}>Add New Seedling Type</Button>
                <Button type="default" style={{ backgroundColor: 'green', color: 'white' }} onClick={generatePDF}>Generate Reports</Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Seedling Table */}
        <Table dataSource={filteredData} columns={columns} pagination={false} />

        {/* Edit Modal */}
        <Modal
          title="Edit Seedling"
          visible={editModalVisible}
          onOk={handleUpdate}
          onCancel={handleCancel}
          okText="Update"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="seedlingType"
              label="Seedling Type"
              rules={[{ required: true, message: 'Please select the seedling type' }]}
            >
              <Select placeholder="Select a seedling type">
                <Option value="coconut">Coconut</Option>
                <Option value="papaya">Papaya</Option>
                <Option value="banana">Banana</Option>
                <Option value="pepper">Pepper</Option>
                <Option value="pineapple">Pineapple</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="currentQuantity"
              label="Current Quantity"
              rules={[{ required: true, message: 'Please input the current quantity' }]}
            >
              <Input type="number" onChange={() => form.setFieldsValue({ status: '' })} />
            </Form.Item>
            <Form.Item
              name="minStock"
              label="Minimum Stock"
            >
              <Input type="number" disabled value={50} />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select disabled>
                <Option value="In Stock">In Stock</Option>
                <Option value="Low Stock">Low Stock</Option>
                <Option value="Out of Stock">Out of Stock</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Seedling;
