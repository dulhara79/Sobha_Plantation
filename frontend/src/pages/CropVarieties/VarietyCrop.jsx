import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable plugin
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Select, Modal, Form, notification } from 'antd';

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

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Crop Varieties Report', 14, 22);

    // Define table columns
    const columns = ['Assigned Person', 'Field Name', 'Varieties', 'Plantation Date', 'Status'];

    // Prepare data for the table
    const rows = cropVarieties.map((item) => [
      item.assignedPerson,
      item.fieldName,
      item.varieties,
      new Date(item.plantationDate).toLocaleDateString(),
      item.status,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    // Save the generated PDF
    doc.save('CropVarietiesReport.pdf');
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

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px]">
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
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/cvForm')}
            >
              + Add New Activity
            </Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleGenerateReport}
            >
              Generate Reports
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Assigned Person</th>
                  <th className="py-3 px-6 text-left">Field Name</th>
                  <th className="py-3 px-6 text-left">Varieties</th>
                  <th className="py-3 px-6 text-left">Plantation Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{item.assignedPerson}</td>
                    <td className="py-3 px-6 text-left">{item.fieldName}</td>
                    <td className="py-3 px-6 text-left">{item.varieties}</td>
                    <td className="py-3 px-6 text-left">{new Date(item.plantationDate).toLocaleDateString()}</td>
                    <td className={`py-3 px-6 text-left font-semibold ${item.status === 'In Progress' ? 'text-blue-500' : item.status === 'Scheduled' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {item.status}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(item)}
                      />
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => deleteCropVariety(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit Modal */}
        <Modal
          title="Edit Crop Variety"
          visible={isModalVisible}
          onOk={handleUpdate}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="assignedPerson"
              label="Assigned Person"
              rules={[{ required: true, message: 'Please input the assigned person!' }]}
            >
              <Input
                placeholder="Enter assigned person"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/[^a-zA-Z\s]/.test(value)) {
                    notification.error({
                      message: 'Invalid Input',
                      description: 'Assigned person should not contain numbers or special characters.'
                    });
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              name="fieldName"
              label="Field Name"
              rules={[{ required: true, message: 'Please select the field name!' }]}
            >
              <Select placeholder="Select Field Name">
                {fieldOptions.map(field => (
                  <Option key={field} value={field}>{field}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="varieties"
              label="Varieties"
              rules={[{ required: true, message: 'Please select the variety!' }]}
            >
              <Select placeholder="Select Variety">
                {varietyOptions.map(variety => (
                  <Option key={variety} value={variety}>{variety}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="plantationDate"
              label="Plantation Date"
              rules={[{ required: true, message: 'Please select the plantation date!' }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select placeholder="Select Status">
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
