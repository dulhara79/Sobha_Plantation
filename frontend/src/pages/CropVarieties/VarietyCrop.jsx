import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable plugin
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Select, Modal, Form, notification } from 'antd';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import moment from 'moment'; // Import moment for date formatting

const { Search } = Input;
const { Option } = Select;

const VarietyCrop = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');
  const [cropVarieties, setCropVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/crop-varieties'); // Ensure this URL is correct
        setCropVarieties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCropVariety = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/crop-varieties/${id}`);
      setCropVarieties(cropVarieties.filter((variety) => variety._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

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

// Generate PDF report
const handleGenerateReport = async () => {
  const doc = new jsPDF();

  // Load the logo image
  const logoUrl = '../src/assets/logo.png'; 
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
    { title: "Assigned Person", dataKey: "assignedPerson" },
    { title: "Field Name", dataKey: "fieldName" },
    { title: "Varieties", dataKey: "varieties" },
    { title: "Plantation Date", dataKey: "plantationDate" },
    { title: "Status", dataKey: "status" },
  ];

  // Map the filtered cropVarieties data to match the columns
  const rows = cropVarieties.map(variety => ({
    assignedPerson: variety.assignedPerson,
    fieldName: variety.fieldName,
    varieties: variety.varieties,
    plantationDate: moment(variety.plantationDate).format('YYYY-MM-DD'),
    status: variety.status,
  }));

  // Add title and table
  doc.setFontSize(22);
  doc.text("Crop Varieties Report", 50, 50); // Adjust y-coordinate as needed

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
      // Add page number to footer
      const pageNumber = doc.internal.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10); // Adjust position as needed
    },
  });

  // Save the PDF
  doc.save("crop_varieties_report.pdf");
  notification.success({ message: 'PDF report generated and downloaded!' });
};

  const filteredData = cropVarieties.filter(item => (
    (filter === 'All' || item.status === filter) &&
    (item.assignedPerson.toLowerCase().includes(searchText.toLowerCase()) ||
     item.fieldName.toLowerCase().includes(searchText.toLowerCase()) ||
     item.varieties.toLowerCase().includes(searchText.toLowerCase()) ||
     new Date(item.plantationDate).toLocaleDateString().toLowerCase().includes(searchText.toLowerCase()))
  ));

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      plantationDate: new Date(record.plantationDate),
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const formattedValues = {
        ...values,
        plantationDate: values.plantationDate.toISOString(),
      };

      await axios.put(`http://localhost:5000/api/crop-varieties/${currentRecord._id}`, formattedValues);
      setCropVarieties(cropVarieties.map(item => item._id === currentRecord._id ? { ...item, ...formattedValues } : item));
      notification.success({ message: 'Crop variety updated successfully' });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Error updating crop variety', description: error.message });
    }
  };

  const fieldOptions = ['Field A', 'Field B', 'Field C', 'Field D'];
  const varietyOptions = ['Coconut', 'Papaya', 'Banana', 'Pepper', 'Pineapple'];

  // Function to restrict input to letters only
  const restrictInputToLetters = (event) => {
    const char = String.fromCharCode(event.which);
    if (!/[a-zA-Z\s]/.test(char)) {
      event.preventDefault();
    }
  };

  // Function to prevent pasting non-alphabetic characters
  const preventNonAlphabeticPaste = (event) => {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (!/^[a-zA-Z\s]+$/.test(pasteData)) {
      event.preventDefault();
      notification.error({
        message: 'Invalid Paste',
        description: 'Pasted content contains non-alphabetic characters.',
      });
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px]">
        <Breadcrumb
          items={[{ href: '', title: <HomeOutlined /> }, { href: '', title: 'Field View' }, { href: '', title: 'Dashboard' }, { href: '', title: 'Crop Varieties' }]}
        />
        <FieldViewNavbar />

        {/* Back Button */}
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} />
        </div>

        {/* Page Header */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Crop Variety Selection</h2>
          <p>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Search, Filter and Action Buttons Section */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-4">
            <Search
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              defaultValue="All"
              style={{ width: 200 }}
              onChange={(value) => setFilter(value)}
            >
              <Option value="All">All Status</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate('/cvForm')}
            >
              + Add New Activity
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleGenerateReport}
            >
              Generate Reports
            </button>
          </div>
        </div>

        {/* Crop Varieties Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Crop Varieties List</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Assigned Person</th>
                <th className="border border-gray-300 p-2">Field Name</th>
                <th className="border border-gray-300 p-2">Varieties</th>
                <th className="border border-gray-300 p-2">Plantation Date</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((variety) => (
                <tr key={variety._id}>
                  <td className="border border-gray-300 p-2">{variety.assignedPerson}</td>
                  <td className="border border-gray-300 p-2">{variety.fieldName}</td>
                  <td className="border border-gray-300 p-2">{variety.varieties}</td>
                  <td className="border border-gray-300 p-2">{moment(variety.plantationDate).format('YYYY-MM-DD')}</td>
                  <td className={`border border-gray-300 p-2 font-semibold ${
                      variety.status === 'In Progress' ? 'text-blue-500' :
                      variety.status === 'Scheduled' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                    {variety.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center gap-4">
                      <EditOutlined 
                        className="cursor-pointer" 
                        onClick={() => handleEdit(variety)} 
                      />
                      <DeleteOutlined 
                        className="cursor-pointer" 
                        onClick={() => deleteCropVariety(variety._id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Edit Form */}
        <Modal
          title={currentRecord ? 'Edit Crop Variety' : 'Add Crop Variety'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={currentRecord ? handleUpdate : () => {}}>
              Submit
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={currentRecord ? handleUpdate : () => {}}>
            <Form.Item
              label="Assigned Person"
              name="assignedPerson"
              rules={[{ required: true, message: 'Please input the assigned person!' }]}
            >
              <Input onKeyPress={restrictInputToLetters} onPaste={preventNonAlphabeticPaste} />
            </Form.Item>
            <Form.Item
              label="Field Name"
              name="fieldName"
              rules={[{ required: true, message: 'Please select a field!' }]}
            >
              <Select>
                {fieldOptions.map((field) => (
                  <Option key={field} value={field}>{field}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Varieties"
              name="varieties"
              rules={[{ required: true, message: 'Please select a variety!' }]}
            >
              <Select>
                {varietyOptions.map((variety) => (
                  <Option key={variety} value={variety}>{variety}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Plantation Date"
              name="plantationDate"
              rules={[{ required: true, message: 'Please select a date!' }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select a status!' }]}
            >
              <Select>
                <Option value="In Progress">In Progress</Option>
                <Option value="Scheduled">Scheduled</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default VarietyCrop;
