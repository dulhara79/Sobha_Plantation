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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch production schedule data
        const scheduleResponse = await axios.get('http://localhost:5000/api/production');
        if (scheduleResponse.data.success) {
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
          </div>
        </nav>

        {/* Breadcrumb and Gallery Button */}
        <div className="flex items-center justify-between mb-5">
          <Breadcrumb
            items={[{
              href: '',
              title: <HomeOutlined />,
            }, {
              title: 'Products',
            }, {
              title: 'Dashboard',
            }]}
          />
          <Button
            className="flex items-center text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => navigate('/products/gallery')}
          >
            <CollectionsSharpIcon className="mr-2" />
            Gallery
          </Button>
        </div>

        {/* Welcome message section */}
        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <b className="mb-2 text-3xl">Welcome,</b>
              <div className="text-xl text-gray-900">
                <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
              </div>
            </div>
            <div className="flex items-center">
              <NotificationsIcon className="text-3xl" />
            </div>
          </div>
        </div>

        {/* Pie Charts Section */}
        <div className="flex gap-10 mt-5">
          {/* Production Schedule Pie Chart */}
          <div className="flex-1 p-5 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Production Schedule Status</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={formatPieChartData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {formatPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Inspection Status Pie Chart */}
          <div className="flex-1 p-5 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Inspection Status</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={formatInspectionData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {formatInspectionData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
