import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table, Modal, Dropdown, Menu } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Input } from 'antd';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RegularMaintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // Fetch maintenance data from API
  const fetchMaintenanceData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/harvest'); // Adjust the API endpoint as needed
      if (response.data.success) {
        setMaintenanceData(response.data.data);
        setFilteredData(response.data.data);
      } else {
        console.error('Error fetching maintenance data: ', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching maintenance data: ', error.message);
    }
  };

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  // Search maintenance data
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = maintenanceData.filter((data) =>
      data.task.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Confirm before deleting a maintenance entry
  const confirmDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this maintenance record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  // Delete maintenance entry
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/harvest/${id}`);
      if (response.data.success) {
        fetchMaintenanceData();
      } else {
        console.error('Error deleting maintenance record: ', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting maintenance record: ', error.message);
    }
  };

  // Columns definition for the table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    { title: 'Task', dataIndex: 'task', key: 'task' },
    { title: 'Manager in Charge', dataIndex: 'manager', key: 'manager' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => navigate(`/maintenance/edit/${record.id}`)}>Edit</Button>
          <Button onClick={() => confirmDelete(record.id)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  // Dropdown menu for sorting (if needed)
  const sortMenu = (
    <Menu>
      <Menu.Item key="1">Task</Menu.Item>
      <Menu.Item key="2">Date</Menu.Item>
      <Menu.Item key="3">Manager</Menu.Item>
      <Menu.Item key="4">Progress</Menu.Item>
    </Menu>
  );

  // Data for the bar chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Maintenance Data',
        data: [30, 40, 35, 50, 45, 55, 60, 40], // Example data values
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, data } = chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, '#d0f0c0'); // Light green
          gradient.addColorStop(1, '#006400'); // Dark green
          return gradient;
        },
        borderColor: '#3CCD65',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Header />
      <Sidebar />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        {/* Go Back Icon */}
        <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
          <LeftOutlined className="text-xl" />
        </button>
        {/* Navigation Items */}
        <div className="flex space-x-4">
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Home
          </Link>
          <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Inspections
          </Link>
          <Link to="/CoconutTreatments" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Treatments
          </Link>
          <Link to="/CoconutPests" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Pests and Diseases
          </Link>
          <Link to="/RegularMaintenance" className="text-[#236A64] font-semibold">
            Maintenance
          </Link>
          <Link to="/UserProfile" className="text-[#3CCD65] hover:text-[#2b8f57]">
            My Profile
          </Link>
        </div>
      </nav>

      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Regular maintenance',
            },
          ]}
        />
      </div>

      {/* Maintenance Schedule Section */}
      <div className="ml-[300px] mt-1 p-1">
        <h2 className="text-5xl font-semibold text-center">Maintenance Schedule</h2>

        {/* Search and Sort Buttons */}
        <div className="flex space-x-4 mt-4">
          <Input
            placeholder="Search for Tasks"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Dropdown overlay={sortMenu} trigger={['click']}>
            <Button>
              Sort by <SortAscendingOutlined />
            </Button>
          </Dropdown>
        </div>

        {/* Maintenance Table */}
        <div className="mt-6">
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
            style={{ width: '100%' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center mt-10 mb-4">
          <Button type="default" className="bg-[#3CCD65] text-white hover:bg-[#2b8f57]" onClick={() => navigate('/addMaintenance')}>
            Add Entry
          </Button>
        </div>

        {/* Analytics Section */}
        <div className="flex justify-between items-start mt-8 mb-10 ml-30">
          {/* Analytics Chart */}
          <div className="w-1/2">
            <Bar data={data} options={options} />
          </div>

          {/* Analytics Data */}
          <div className="w-1/2 ml-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Analytics</h3>
              {/* Sort By Button */}
              <div className="flex items-center space-x-2 mr-12">
                <span className="text-gray-600">Sort by</span>
                <Button icon={<SortAscendingOutlined />} />
              </div>
            </div>
            <ul className="list-none space-y-2">
              <li>Current Temperature: 30°C</li>
              <li>Current Humidity: 70%</li>
              <li>Current Soil Moisture: 30%</li>
              <li>Current Light Intensity: 70000 lux</li>
              <li>Current Rainfall: 6 mm</li>
              <li>Current Wind Speed: 10 km/h</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularMaintenance;
