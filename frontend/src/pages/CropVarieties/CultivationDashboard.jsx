import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import FieldViewNavbar from '../../components/FieldView/FieldViewNavbar';
import PieChartComponent from '../../components/Products/PieChartComponent'; // Import the PieChartComponent
import axios from 'axios';

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

  // Fetch schedule data for the pie chart
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/production'); // Adjust API endpoint as necessary
        if (response.data.success) {
          setScheduleData(response.data.data);
        } else {
          console.error('Error fetching schedule data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  // Format the schedule data for the pie chart
  const formatPieChartData = () => {
    const statusCounts = { 'Planned': 0, 'In Progress': 0, 'Completed': 0 };

    scheduleData.forEach((schedule) => {
      if (schedule.status === 'Planned') statusCounts['Planned'] += 1;
      else if (schedule.status === 'In Progress') statusCounts['In Progress'] += 1;
      else if (schedule.status === 'Completed') statusCounts['Completed'] += 1;
    });

    return [
      { name: 'Planned', value: statusCounts['Planned'] },
      { name: 'In Progress', value: statusCounts['In Progress'] },
      { name: 'Completed', value: statusCounts['Completed'] },
    ];
  };

  // Format the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
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
        <FieldViewNavbar />

        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-6 my-6">
          <h2 className="text-2xl font-bold">👋 Welcome,</h2>
          <p className="text-gray-600">Today is {formattedDate}</p>
        </div>

        {/* Pie Chart Section */}
        <div className="flex justify-center">
          <PieChartComponent title="Production Schedule Status" data={formatPieChartData()} loading={loading} />
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/varietyCrop"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌿</span>
            <h3 className="text-2xl font-semibold mt-4">Crop Variety</h3>
          </Link>

          <Link
            to="/landPreparation"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌾</span>
            <h3 className="text-2xl font-semibold mt-4">Land Preparation</h3>
          </Link>

          <Link
            to="/pGrowth"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌱</span>
            <h3 className="text-2xl font-semibold mt-4">Plant Growth</h3>
          </Link>

          <Link
            to="/seedlingDistribution"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🌰</span>
            <h3 className="text-2xl font-semibold mt-4">Seedling Distribution</h3>
          </Link>

          <Link
            to="/schedules"
            className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block"
          >
            <span className="text-10xl">🗓️</span>
            <h3 className="text-2xl font-semibold mt-4">Schedules</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CultivationDashboard;
