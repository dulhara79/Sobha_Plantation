import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import PieChartComponent from '../../components/Products/PieChartComponent'; // Import the PieChartComponent
import axios from 'axios';
import DateTimeDisplay from '../../components/Products/DateTimeDisplay';

const CultivationDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update the date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

 

  // Format the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
        
        <FieldViewNavbar />

        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Field View',
            },
            {
              href: '',
              title: 'Dashboard',
            },
          ]}
        />

{/* Welcome message section with DateTimeDisplay */}
<div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] 
              rounded-6xl bg-gray-100 p-5 max-w-full gap-5 mt-8 mb-8">
  <div className="flex flex-row items-center justify-between">
    <DateTimeDisplay />
    <div className="flex items-center">
      <NotificationsIcon className="text-3xl" />
    </div>
  </div>
</div>



        {/* Summary Section */}
  <div className="grid grid-cols-2 gap-12">
    <Link
      to="/varietyCrop"
      className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 
                 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
    >
      <span className="text-10xl">🌿</span>
      <h3 className="mt-4 text-2xl font-semibold">Crop Variety</h3>
    </Link>

          <Link
            to="/landPreparation"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌾</span>
            <h3 className="mt-4 text-2xl font-semibold">Land Preparation</h3>
          </Link>

          <Link
            to="/pGrowth"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌱</span>
            <h3 className="mt-4 text-2xl font-semibold">Plant Growth</h3>
          </Link>

          <Link
            to="/seedlingDistribution"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌰</span>
            <h3 className="mt-4 text-2xl font-semibold">Seedling Distribution</h3>
          </Link>

          <Link
            to="/schedules"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🗓️</span>
            <h3 className="mt-4 text-2xl font-semibold">Schedules</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CultivationDashboard;
