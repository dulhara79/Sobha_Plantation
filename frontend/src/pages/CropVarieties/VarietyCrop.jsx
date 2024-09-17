import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Select } from 'antd';


const { Search } = Input;
const { Option } = Select;

const VarietyCrop = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');
  const [cropVarieties, setCropVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
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


  const filteredData = cropVarieties.filter(item => (
    (filter === 'All' || item.status === filter) &&
    (item.assignedPerson.toLowerCase().includes(searchText.toLowerCase()) ||
     item.fieldName.toLowerCase().includes(searchText.toLowerCase()) ||
     item.varieties.toLowerCase().includes(searchText.toLowerCase()) ||
     new Date(item.plantationDate).toLocaleDateString().toLowerCase().includes(searchText.toLowerCase()))
  ));

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
            <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{item.assignedPerson}</td>
                    <td className="py-3 px-6 text-left">{item.fieldName}</td>
                    <td className="py-3 px-6 text-left">{item.varieties}</td>
                    <td className="py-3 px-6 text-left">{new Date(item.plantationDate).toLocaleDateString()}</td>
                    <td className={`py-3 px-6 text-left font-semibold ${item.status === 'In Progress' ? 'text-blue-500' : item.status === 'Scheduled' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {item.status}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Button type="link" onClick={() => navigate(`/cvForm/${item._id}`)}>Edit</Button>
                      <Button type="link" danger onClick={() => deleteCropVariety(item._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default VarietyCrop;
