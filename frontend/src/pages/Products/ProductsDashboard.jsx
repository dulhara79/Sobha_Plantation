import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { HomeOutlined } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';

// Colors for the pie chart
const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

const ProductsDashboard = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [inspectionData, setInspectionData] = useState([]);
  const [packagingData, setPackagingData] = useState([]); // New packaging data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch production schedule data
        const scheduleResponse = await axios.get('http://localhost:5000/api/production');
        if (scheduleResponse.data.success) {
          console.log(scheduleResponse.data.data);
          setScheduleData(scheduleResponse.data.data);
        } else {
          console.error('Error fetching schedule data');
        }

        // Fetch inspection data
        const inspectionResponse = await axios.get('http://localhost:5000/api/quality-control');
        if (inspectionResponse.data.success) {
          setInspectionData(inspectionResponse.data.data);
        } else {
          console.error('Error fetching inspection data');
        }

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Format the pie chart data for production schedules
  const formatPieChartData = () => {
    const statusCounts = {
      'Completed': 0,
      'In Progress': 0,
      'Scheduled': 0,
    };

    scheduleData.forEach(schedule => {
      if (schedule.status === 'Completed') {
        statusCounts['Completed'] += 1;
      } else if (schedule.status === 'In Progress') {
        statusCounts['In Progress'] += 1;
      } else if (schedule.status === 'Scheduled') {
        statusCounts['Scheduled'] += 1;
      }
    });
    

    return [
      { name: 'Completed Schedules', value: statusCounts['Completed'] },
      { name: 'In Progress Schedules', value: statusCounts['In Progress'] },
      { name: 'Pending Schedules', value: statusCounts['Scheduled'] },
    ];
  };

  // Format the pie chart data for inspections
  const formatInspectionData = () => {
    const inspectionCounts = {
      'Passed': 0,
      'Failed': 0,
    };

    inspectionData.forEach(inspection => {
      if (inspection.status === 'Passed') {
        inspectionCounts['Passed'] += 1;
      } else if (inspection.status === 'Failed') {
        inspectionCounts['Failed'] += 1;
      }
    });

    return [
      { name: 'Passed Products', value: inspectionCounts['Passed'] },
      { name: 'Failed Products', value: inspectionCounts['Failed'] },
    ];
  };

  // Format the pie chart data for packaging status
  const formatPackagingData = () => {
    const statusCounts = {
      'Completed': 0,
      'In Progress': 0,
      'Scheduled': 0,
    };

    scheduleData.forEach(schedule => {
      if (schedule.status === 'Completed') {
        statusCounts['Completed'] += 1;
      } else if (schedule.status === 'In Progress') {
        statusCounts['In Progress'] += 1;
      } else if (schedule.status === 'Scheduled') {
        statusCounts['Scheduled'] += 1;
      }
    });

    return [
      { name: 'Completed Schedules', value: statusCounts['Completed'] },
      { name: 'In Progress Schedules', value: statusCounts['In Progress'] },
      { name: 'Pending Schedules', value: statusCounts['Scheduled'] },
    ];
  };

  const onGroupContainerClick = useCallback(() => {
    navigate('/products/production-overview');
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate('/products/quality-control');
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate('/products/packaging-labeling');
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    navigate('/products/productdashboard');
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };


  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="p-4 mb-5">
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <div
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white text-white"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Production
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Quality
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Packaging
              </a>
            </div>
            <div className="flex items-center justify-center pt-px px-2 pb-0.5">
              <NotificationsIcon className="text-4xl text-green-500" />
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Products Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        {/* Date Display */}
        <p>{getTodayDate()}</p>

        {/* Pie Chart for Production Schedules */}
        <h3>Production Status</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={formatPieChartData()}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {formatPieChartData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        {/* Pie Chart for Quality Control */}
        <h3>Quality Control</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={formatInspectionData()}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {formatInspectionData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        {/* Pie Chart for Packaging */}
        <h3>Packaging Status</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={formatPackagingData()}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {formatPackagingData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ProductsDashboard;
