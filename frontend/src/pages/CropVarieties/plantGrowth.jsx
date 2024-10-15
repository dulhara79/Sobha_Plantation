import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Table, Button, Input, Form, Modal, Select, message, InputNumber } from 'antd';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import Swal from 'sweetalert2';

const { Option } = Select;

const PlantGrowth = () => {
  const [plantGrowthData, setPlantGrowthData] = useState([]);

  // Create an API instance
  const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your API base URL
  });
  
  useEffect(() => {
    const fetchPlantGrowthData = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/plant-growth');
        setPlantGrowthData(response.data);
      } catch (error) {
        console.error('Error fetching plant growth data:', error);
      }
    };
    
    fetchPlantGrowthData();
  }, []);

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

  const handleFormSubmit = async (values) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to save this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
        let response;
        if (editingRecord) {
          // Update existing record
          response = await api.put(`http://localhost:5000/api/plant-growth/${editingRecord._id}`, values);
          setPlantGrowthData(plantGrowthData.map((item) => (item._id === editingRecord._id ? response.data : item)));
          message.success('Plant growth record updated successfully');
        } else {
          // Add new record
          response = await api.post('http://localhost:5000/api/plant-growth', values);
          setPlantGrowthData([...plantGrowthData, response.data]);
          message.success('Plant growth record added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        console.error('Error saving plant growth data:', error);
        message.error(`Error saving plant growth data: ${error.response?.data?.message || error.message}`);
      }
    }
  };
  
  

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });
  
    if (result.isConfirmed) {
      try {
        await api.delete(`http://localhost:5000/api/plant-growth/${id}`);
        setPlantGrowthData(plantGrowthData.filter((item) => item._id !== id));
        message.success('Plant growth record deleted successfully');
      } catch (error) {
        console.error('Error deleting plant growth data:', error);
        message.error('Error deleting plant growth data');
      }
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

  const handleGenerateReport = async () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoUrl = '../src/assets/logo.png'; // Ensure this path points to your logo
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

    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right
    }
    doc.line(10, 35, pageWidth - 10, 35); // Header line

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
    doc.text("Plant Growth Report", 60, 50);

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

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel the operation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep editing!',
    });

    if (result.isConfirmed) {
      setIsModalVisible(false);
      form.resetFields();
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
            <button type="primary"  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => navigate('/pGrowthForm')} style={{ marginRight: 16 }}>+Add New Record</button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleGenerateReport}
            >
              Generate Reports
            </button>
          </div>
        </div>
        <Table dataSource={filteredData} columns={columns} rowKey="_id" />
      </div>

      {/* Modal for adding/editing plant growth */}
      <Modal
  title={editingRecord ? 'Edit Plant Growth' : 'Add New Plant Growth'}
  visible={isModalVisible}
  onCancel={handleCancel} // Use the handleCancel function
  footer={[
    <Button key="back" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={() => form.submit()}>
      Submit
    </Button>
  ]}
>
  <Form
    form={form}
    layout="vertical"
    onFinish={handleFormSubmit}
    initialValues={editingRecord}
  >
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
        <Option value="Papaya">Papaya</Option>
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
        min={0} // Ensure height cannot be negative
        onChange={(value) => form.setFieldsValue({ height: value })}
        onKeyDown={blockAlphabetInput} // Ensure only numbers can be input
      />
    </Form.Item>
    <Form.Item
      label="Number of Leaves"
      name="numberOfLeaves"
      rules={[{ required: true, message: 'Please enter number of leaves!' }]}
    >
      <InputNumber
        min={0} // Ensure number of leaves cannot be negative
        onChange={(value) => form.setFieldsValue({ numberOfLeaves: value })}
        onKeyDown={blockAlphabetInput} // Ensure only numbers can be input
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
  </Form>
</Modal>

    </div>
  );
};

export default PlantGrowth;
