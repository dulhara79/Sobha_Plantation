import React, { useState } from 'react';
import { Table, Button, Input, Form, Modal, Select, message, InputNumber } from 'antd';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';

const { Option } = Select;

const PlantGrowth = () => {
  const [plantGrowthData, setPlantGrowthData] = useState([
    
    {
      _id: '3',
      plantType: 'Coconut',
      fieldName: 'Field C',
      date: '2024-09-20',
      height: 150,
      numberOfLeaves: 12,
      leafSize: 'Large',
      healthIssues: 'None',
    },
    {
      _id: '4',
      plantType: 'Banana',
      fieldName: 'Field D',
      date: '2024-09-18',
      height: 180,
      numberOfLeaves: 15,
      leafSize: 'Large',
      healthIssues: 'None',
    },
    {
      _id: '5',
      plantType: 'Pepper',
      fieldName: 'Field E',
      date: '2024-09-22',
      height: 50,
      numberOfLeaves: 10,
      leafSize: 'Small',
      healthIssues: 'None',
    },
    {
      _id: '6',
      plantType: 'Pineapple',
      fieldName: 'Field F',
      date: '2024-09-25',
      height: 60,
      numberOfLeaves: 12,
      leafSize: 'Medium',
      healthIssues: 'None',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [healthFilter, setHealthFilter] = useState('');

  const navigate = useNavigate();

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    if (editingRecord) {
      const updatedData = plantGrowthData.map((item) =>
        item._id === editingRecord._id ? { ...item, ...values } : item
      );
      setPlantGrowthData(updatedData);
      message.success('Plant growth record updated successfully');
    } else {
      const newRecord = {
        ...values,
        _id: (plantGrowthData.length + 1).toString(),
        date: new Date().toISOString().split('T')[0],
      };
      setPlantGrowthData([...plantGrowthData, newRecord]);
      message.success('Plant growth record added successfully');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    const updatedData = plantGrowthData.filter((item) => item._id !== id);
    setPlantGrowthData(updatedData);
    message.success('Plant growth record deleted successfully');
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
  const handleGenerateReport = async () => {
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
      { title: "Plant Type", dataKey: "plantType" },
      { title: "Field Name", dataKey: "fieldName" },
      { title: "Date", dataKey: "date" },
      { title: "Height (cm)", dataKey: "height" },
      { title: "Number of Leaves", dataKey: "numberOfLeaves" },
      { title: "Leaf Size", dataKey: "leafSize" },
      { title: "Health Issues", dataKey: "healthIssues" }
    ];

    // Map the filteredData to match the columns
    const rows = plantGrowthData.map((item) => ({
      plantType: item.plantType,
      fieldName: item.fieldName,
      date: new Date(item.date).toLocaleDateString(),
      height: item.height,
      numberOfLeaves: item.numberOfLeaves,
      leafSize: item.leafSize,
      healthIssues: item.healthIssues,
    }));

    // Add title and table to PDF
    doc.setFontSize(22);
    doc.text("Plant Growth Report", 50, 40);

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
    doc.save("PlantGrowthReport.pdf");
    message.success('PDF report generated and downloaded!');
  };

  const filteredData = plantGrowthData.filter(item => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      item.plantType.toLowerCase().includes(lowerCaseSearchText) ||
      item.fieldName.toLowerCase().includes(lowerCaseSearchText) ||
      new Date(item.date).toLocaleDateString().toLowerCase().includes(lowerCaseSearchText) || // Fix applied here
      item.height.toString().includes(lowerCaseSearchText) ||
      item.numberOfLeaves.toString().includes(lowerCaseSearchText) ||
      item.leafSize.toLowerCase().includes(lowerCaseSearchText) ||
      item.healthIssues.toLowerCase().includes(lowerCaseSearchText)
    );
  }).filter(item => (healthFilter ? item.healthIssues === healthFilter : true));
  

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
            onClick={() => handleEdit(record)} 
            type="link" 
            icon={<EditOutlined />} 
            style={{ marginRight: 8 }} 
          />
          <Button 
            onClick={() => handleDelete(record._id)} 
            type="link" 
            icon={<DeleteOutlined />} 
            danger 
          />
        </>
      ),
    },
  ];

  const blockAlphabetInput = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

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
        
        <div className="mb-4">
        <FieldViewNavbar />
          <LeftCircleOutlined onClick={() => navigate(-1)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Plant Growth</h2>
          <p>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              placeholder="Search here"
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
            <Button type="primary" onClick={handleAddNew} style={{ marginRight: 16 }}>+Add New Record</Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleGenerateReport}
            >
              Generate Reports
            </Button>
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
          <Form.Item
            label="Plant Type"
            name="plantType"
            rules={[{ required: true, message: 'Please select plant type!' }]}
          >
            <Select>
              <Option value="Coconut">Coconut</Option>
              <Option value="Banana">Banana</Option>
              <Option value="Pepper">Pepper</Option>
              <Option value="Pineapple">Pineapple</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Field Name"
            name="fieldName"
            rules={[{ required: true, message: 'Please select field name!' }]}
          >
            <Select>
              <Option value="Field A">Field A</Option>
              <Option value="Field B">Field B</Option>
              <Option value="Field C">Field C</Option>
              <Option value="Field D">Field D</Option>
              
            </Select>
          </Form.Item>
          <Form.Item
            label="Height (cm)"
            name="height"
            rules={[{ required: true, message: 'Please enter height!' }]}
          >
            <InputNumber
              onKeyPress={blockAlphabetInput}
              onChange={(value) => form.setFieldsValue({ height: value })}
            />
          </Form.Item>
          <Form.Item
            label="Number of Leaves"
            name="numberOfLeaves"
            rules={[{ required: true, message: 'Please enter number of leaves!' }]}
          >
            <InputNumber
              onKeyPress={blockAlphabetInput}
              onChange={(value) => form.setFieldsValue({ numberOfLeaves: value })}
            />
          </Form.Item>
          <Form.Item
            label="Leaf Size"
            name="leafSize"
            rules={[{ required: true, message: 'Please select leaf size!' }]}
          >
            <Select>
              <Option value="Small">Small</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Large">Large</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Health Issues"
            name="healthIssues"
            rules={[{ required: true, message: 'Please select health issues!' }]}
          >
            <Select>
              <Option value="None">None</Option>
              <Option value="Pests">Pests</Option>
              {/* Add more options if necessary */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRecord ? "Update" : "Add"} Record
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlantGrowth;
