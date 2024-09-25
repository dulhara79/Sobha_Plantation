import React, { useState } from 'react';
import { Table, Button, Input, Form, Modal, Select, message } from 'antd';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import the plugin for creating tables in jsPDF

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

  // Generate report as PDF
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Plant Growth Report', 14, 22);

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

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    // Save the generated PDF
    doc.save('PlantGrowthReport.pdf');

    message.success('PDF report generated and downloaded!');
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
          <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)} type="danger">Delete</Button>
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
            { href: '', title: 'Crop Varieties' },
          ]}
        />
        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        {/* Page Header */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Crop Variety Selection</h2>
          <p>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type="primary" onClick={handleAddNew} style={{ marginRight: 16 }}>Add New Record</Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
          <div>
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
        </div>

        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
      </div>

      <Modal
        title={editingRecord ? "Edit Plant Growth" : "Add Plant Growth"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item label="Plant Type" name="plantType" rules={[{ required: true, message: 'Please input plant type!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Field Name" name="fieldName" rules={[{ required: true, message: 'Please input field name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Height (cm)" name="height" rules={[{ required: true, message: 'Please input height!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Number of Leaves" name="numberOfLeaves" rules={[{ required: true, message: 'Please input number of leaves!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Leaf Size" name="leafSize" rules={[{ required: true, message: 'Please input leaf size!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Health Issues" name="healthIssues">
            <Input defaultValue="None" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">{editingRecord ? "Update" : "Submit"}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlantGrowth;
