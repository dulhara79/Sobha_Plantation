import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table, Tag, Input, Select, notification, Row, Col, Modal, Form,Card } from 'antd';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import Swal from 'sweetalert2';

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

  // Handle delete button click with SweetAlert confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/seedlings/${id}`);
          setDataSource(dataSource.filter(item => item._id !== id));
          Swal.fire(
            'Deleted!',
            'Your seedling has been deleted.',
            'success'
          );
        } catch (error) {
          Swal.fire(
            'Error!',
            'There was an error deleting the seedling.',
            'error'
          );
        }
      }
    });
  };

  // Handle modal form submission (edit seedling)
  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this seedling?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    });

    if (result.isConfirmed) {
      try {
        const updatedSeedling = await form.validateFields();

        const status =
          updatedSeedling.currentQuantity == 0
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
    }
  };

 // Handle modal cancel with SweetAlert confirmation
 const handleCancel = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You want to cancel editing?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it!'
  });

  if (result.isConfirmed) {
    setEditModalVisible(false);
    form.resetFields();
  }
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

  // Handle PDF generation
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; // Adjust the path to your logo as necessary
    let logoDataURL = null;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Header
    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(14);
    doc.text("Sobha Plantation", 10, 10); // Align left
    doc.setFontSize(10);
    doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
    doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
    doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address
    doc.text("Contact: 0112 751 757", 10, 30); // Contact

    // Add logo if it exists
    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right
    }
    doc.line(10, 35, pageWidth - 10, 35); // Header line

    // Define the table columns
    const columns = [
      { title: "Seedling Type", dataKey: "seedlingType" },
      { title: "Current Quantity", dataKey: "currentQuantity" },
      { title: "Minimum Stock", dataKey: "minStock" },
      { title: "Status", dataKey: "status" }
    ];

    // Map the filteredData to match the columns
    const rows = filteredData.map((item) => ({
      seedlingType: item.seedlingType,
      currentQuantity: item.currentQuantity,
      minStock: item.minStock,
      status: item.status,
    }));

    // Add title and table to PDF
    doc.setFontSize(22);
    doc.text("Seedling Inventory Report", 50, 50);

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 60,
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
    notification.success({ message: 'PDF report generated and downloaded!' });
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
        <Tag color={text === 'In Stock' ? 'green' : 'red'}>
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

  const renderMatrixCards = () => (
    <Row gutter={[16, 16]}>
      {filteredData.map(item => {
        let cardColor;
        switch (item.status) {
          case 'In Stock':
            cardColor = '#d4edda'; // Light green for in stock
            break;
          case 'Low Stock':
            cardColor = '#fff3cd'; // Light yellow for low stock
            break;
          case 'Out of Stock':
            cardColor = '#f8d7da'; // Light red for out of stock
            break;
          default:
            cardColor = '#ffffff'; // Default white color
        }

        return (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <Card
              title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.seedlingType}</span>}
              bordered={false}
              style={{
                backgroundColor: cardColor,
                padding: '20px',
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
              }}
              hoverable
            >
              <p style={{ fontSize: '14px' }}>
                <strong>Current Quantity:</strong> {item.currentQuantity}
              </p>
              <p style={{ fontSize: '14px', marginBottom: 0 }}>
                <strong>Status:</strong> <Tag color={item.status === 'Low Stock' ? 'red' : 'green'}>{item.status}</Tag>
              </p>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

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
                <Button type="default" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={generatePDF}>Generate Reports</Button>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Render Matrix Cards */}
        {renderMatrixCards()}

        {/* Table Display */}
        <Table columns={columns} dataSource={filteredData} rowKey="_id" pagination={{ pageSize: 8 }} style={{ marginTop: 50 }} />

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
            <Form.Item label="Current Quantity"  name="currentQuantity" rules={[{ required: true, message: 'Please enter the current quantity!' }]}>
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
