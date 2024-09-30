import React, { useState } from 'react';
import { Table, Button, Input, Form, Modal, Select, message, InputNumber } from 'antd';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import the plugin for creating tables in jsPDF
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import moment from 'moment';

const { Option } = Select;

const PlantGrowth = () => {
  const [plantGrowthData, setPlantGrowthData] = useState([
    {
      _id: '1',
      plantType: 'Tomato',
      fieldName: 'Field A',
      date: '2024-09-15',
      height: 30,
      numberOfLeaves: 15,
      leafSize: 'Medium',
      healthIssues: 'None',
    },
    {
      _id: '2',
      plantType: 'Corn',
      fieldName: 'Field B',
      date: '2024-09-10',
      height: 100,
      numberOfLeaves: 8,
      leafSize: 'Large',
      healthIssues: 'Pests',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [healthFilter, setHealthFilter] = useState('');

  const navigate = useNavigate();

  // Function to get image data URL
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

  // Generate report as PDF
  const handleGenerateReport = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png';
    try {
      const logoDataURL = await getImageDataURL(logoUrl);
      // Add the logo image to the PDF
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20); // Adjust x, y, width, height as needed
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Define table columns
    const columns = [
      'Plant Type',
      'Field Name',
      'Date',
      'Height (cm)',
      'Number of Leaves',
      'Leaf Size',
      'Health Issues',
    ];

    // Prepare data for the table
    const rows = plantGrowthData.map((item) => [
      item.plantType,
      item.fieldName,
      new Date(item.date).toLocaleDateString(),
      item.height,
      item.numberOfLeaves,
      item.leafSize,
      item.healthIssues,
    ]);

    // Add the title
    doc.setFontSize(18);
    doc.text('Plant Growth Report', 14, 30);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40, // Adjust the start position of the table
    });

    // Save the generated PDF
    doc.save('PlantGrowthReport.pdf');

    message.success('PDF report generated and downloaded!');
  };

  // Show modal for creating a new record
  const handleAddNew = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  // Submit form data
  const handleFormSubmit = (values) => {
    if (editingRecord) {
      // Update existing record
      const updatedData = plantGrowthData.map((item) =>
        item._id === editingRecord._id ? { ...item, ...values } : item
      );
      setPlantGrowthData(updatedData);
      message.success('Plant growth record updated successfully');
    } else {
      // Add new record
      const newRecord = {
        ...values,
        _id: (plantGrowthData.length + 1).toString(), // Temporary ID for frontend
        date: new Date().toISOString().split('T')[0],
      };
      setPlantGrowthData([...plantGrowthData, newRecord]);
      message.success('Plant growth record added successfully');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Edit a plant growth record
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // Delete a plant growth record
  const handleDelete = (id) => {
    const updatedData = plantGrowthData.filter((item) => item._id !== id);
    setPlantGrowthData(updatedData);
    message.success('Plant growth record deleted successfully');
  };

  // Filter data based on search and health issues
  const filteredData = plantGrowthData
    .filter(item =>
      item.plantType.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(item => (healthFilter ? item.healthIssues === healthFilter : true));

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'Plant Type',
      dataIndex: 'plantType',
      key: 'plantType',
    },
    {
      title: 'Field Name',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Height (cm)',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Number of Leaves',
      dataIndex: 'numberOfLeaves',
      key: 'numberOfLeaves',
    },
    {
      title: 'Leaf Size',
      dataIndex: 'leafSize',
      key: 'leafSize',
    },
    {
      title: 'Health Issues',
      dataIndex: 'healthIssues',
      key: 'healthIssues',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            type="danger"
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Sidebar />

      <div style={{ marginLeft: '300px', padding: '20px' }}>
        <Breadcrumb
          items={[
            { href: '', title: <HomeOutlined /> },
            { href: '', title: 'Field View' },
            { href: '', title: 'Dashboard' },
            { href: '', title: 'Plant Growth' },
          ]}
        />
        <FieldViewNavbar />
        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        {/* Page Header */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Plant Growth</h2>
          <p>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              placeholder="Search by plant type"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200, marginRight: 16 }}
            />
            <Select
              placeholder="Filter by health issue"
              onChange={(value) => setHealthFilter(value)}
              allowClear
              style={{ width: 200 }}
            >
              <Option value="None">None</Option>
              <Option value="Pests">Pests</Option>
            </Select>
          </div>
          <div>
            <Button type="primary" onClick={handleAddNew} style={{ marginRight: 16 }}>+ Add New Record</Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleGenerateReport}
            >
              Generate PDF Report
            </Button>
          </div>
        </div>
        <Table dataSource={filteredData} columns={columns} rowKey="_id" />
      </div>

      {/* Modal for adding/editing plant growth */}
      <Modal
        title={editingRecord ? 'Edit Plant Growth' : 'Add New Plant Growth'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item label="Plant Type" name="plantType" rules={[{ required: true, message: 'Please input plant type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Field Name" name="fieldName" rules={[{ required: true, message: 'Please input field name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Height (cm)" name="height" rules={[{ required: true, message: 'Please input plant height!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Number of Leaves" name="numberOfLeaves" rules={[{ required: true, message: 'Please input number of leaves!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Leaf Size" name="leafSize" rules={[{ required: true, message: 'Please input leaf size!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Health Issues" name="healthIssues">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlantGrowth;
