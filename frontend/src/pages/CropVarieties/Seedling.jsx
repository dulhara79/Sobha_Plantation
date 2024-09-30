import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table, Tag, Input, Select, notification, Row, Col, Modal, Form } from 'antd';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';

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

    if (searchValue) {
      filtered = filtered.filter(item =>
        item.seedlingType.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.currentQuantity.toString().includes(searchValue) ||
        item.minStock.toString().includes(searchValue)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [searchValue, statusFilter, dataSource]);

  // Handle edit button click
  const handleEdit = (record) => {
    setCurrentSeedling(record);
    form.setFieldsValue({ ...record, minStock: 50 });
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

      const status =
        updatedSeedling.currentQuantity === 0
          ? 'Out of Stock'
          : updatedSeedling.currentQuantity < 50
          ? 'Low Stock'
          : 'In Stock';

      const updatedData = { ...updatedSeedling, status, minStock: 50 };

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
    form.resetFields();
  };

  // Function to get image data URL for the logo
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are handled
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // Generate PDF Report with the logo
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; // Ensure this path points to your logo
    try {
      const logoDataURL = await getImageDataURL(logoUrl);

      // Add the logo image to the PDF
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20);

    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Define the table columns
    const columns = [
      { title: "Seedling Type", dataKey: "seedlingType" },
      { title: "Current Quantity", dataKey: "currentQuantity" },
      { title: "Minimum Stock", dataKey: "minStock" },
      { title: "Status", dataKey: "status" }
    ];

    // Map the filteredData to match the columns
    const rows = filteredData.map((item, index) => ({
      seedlingType: item.seedlingType,
      currentQuantity: item.currentQuantity,
      minStock: item.minStock,
      status: item.status,
    }));

    // Add title and table to PDF
    doc.setFontSize(22);
    doc.text("Seedling Inventory Report", 50, 40);

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 50,
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'striped',
      didDrawPage: (data) => {
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10);
      },
    });

    // Save the PDF
    doc.save("seedling_inventory_report.pdf");
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
        <FieldViewNavbar />
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


        {/* Table Display */}
        <Table columns={columns} dataSource={filteredData} rowKey="_id" pagination={{ pageSize: 8 }} />

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
    <Form.Item label="Seedling Type" name="seedlingType" rules={[{ required: true, message: 'Please select the seedling type!' }]}>
      <Select placeholder="Select a seedling type">
        <Option value="coconut">Coconut</Option>
        <Option value="pepper">Pepper</Option>
        <Option value="banana">Banana</Option>
        <Option value="pineapple">Pineapple</Option>
      </Select>
    </Form.Item>
            <Form.Item label="Current Quantity" name="currentQuantity" rules={[{ required: true, message: 'Please enter the current quantity!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Minimum Stock" name="minStock">
              <Input disabled />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Seedling;
