import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { HomeOutlined } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';
import DateTimeDisplay from '../../components/Products/DateTimeDisplay';
import PieChartComponent from '../../components/Products/PieChartComponent'; 
import LoadingDot from '../../components/LoadingDots'; 

const menuItems = [
  { name: 'HOME', path: '/products/productdashboard' },
  { name: 'PRODUCTION', path: '/products/production-overview' },
  { name: 'QUALITY', path: '/products/quality-control' },
  { name: 'PACKAGING', path: '/products/packaging-labeling' }
];

const ProductsDashboard = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [inspectionData, setInspectionData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading delay (optional)
        setTimeout(async () => {
          const scheduleResponse = await axios.get('http://localhost:5000/api/production');
          if (scheduleResponse.data.success) {
            setScheduleData(scheduleResponse.data.data);
          } else {
            console.error('Error fetching schedule data');
          }

          const inspectionResponse = await axios.get('http://localhost:5000/api/quality-control');
          if (inspectionResponse.data.success) {
            setInspectionData(inspectionResponse.data.data);
          } else {
            console.error('Error fetching inspection data');
          }

          setLoading(false); // Stop loading after data fetch
        }, 500); // Adjust the delay as needed
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  const formatPieChartData = () => {
    const statusCounts = { 'Completed': 0, 'In Progress': 0, 'Scheduled': 0 };

    scheduleData.forEach((schedule) => {
      if (schedule.status === 'Completed') statusCounts['Completed'] += 1;
      else if (schedule.status === 'In Progress') statusCounts['In Progress'] += 1;
      else if (schedule.status === 'Scheduled') statusCounts['Scheduled'] += 1;
    });

    return [
      { name: 'Completed Schedules', value: statusCounts['Completed'] },
      { name: 'In Progress Schedules', value: statusCounts['In Progress'] },
      { name: 'Pending Schedules', value: statusCounts['Scheduled'] }
    ];
  };

  const formatInspectionData = () => {
    const inspectionCounts = { 'Passed': 0, 'Failed': 0 };

    inspectionData.forEach((inspection) => {
      if (inspection.status === 'Passed') inspectionCounts['Passed'] += 1;
      else inspectionCounts['Failed'] += 1;
    });

    return [
      { name: 'Passed Products', value: inspectionCounts['Passed'] },
      { name: 'Failed Products', value: inspectionCounts['Failed'] }
    ];
  };

  const isActive = (page) => activePage === page;

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (loading) return <LoadingDot />; // Show loading screen if loading is true

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
              <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2" onClick={onBackClick} />
              {menuItems.map((item) => (
                <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                  <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Breadcrumb and Gallery Button */}
        <div className="flex items-center justify-between mb-5">
          <Breadcrumb
            items={[
              { href: '', title: <HomeOutlined /> },
              { title: 'Products' },
              { title: 'Dashboard' },
            ]}
          />
          <Button
            className="flex items-center text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
            style={{ marginBottom: '24px', backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
            onClick={() => navigate('/products/gallery')}
          >
            <CollectionsSharpIcon className="mr-2" />
            Gallery
          </Button>
        </div>

        {/* Welcome message section with DateTimeDisplay */}
        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
          <div className="flex flex-row items-center justify-between">
            <DateTimeDisplay />
            <div className="flex items-center">
              <NotificationsIcon className="text-3xl" />
            </div>
          </div>
        </div>

        {/* Pie Charts Section */}
        <div className="flex gap-10 mt-5">
          <PieChartComponent title="Production Schedule Status" data={formatPieChartData()} loading={loading} />
          <PieChartComponent title="Inspection Status" data={formatInspectionData()} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
