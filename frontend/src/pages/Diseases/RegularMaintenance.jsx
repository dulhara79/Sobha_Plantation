import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftOutlined, SortAscendingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { SortOutlined } from '@mui/icons-material';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RegularMaintenance = () => {
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
          }
        }
      }
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
            Summary
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

        {/* Maintenance Table */}
        <div className="flex flex-col items-center mt-6">
          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-2/3">
            <table className="min-w-full bg-white">
              <thead className="bg-[#3CCD65]">
                <tr>
                  <th className="py-4 px-8 border-b border-gray-200">Date</th>
                  <th className="py-4 px-8 border-b border-gray-200">Task</th>
                  <th className="py-4 px-8 border-b border-gray-200">Manager in charge</th>
                  <th className="py-4 px-8 border-b border-gray-200">Progress</th>
                  <th className="py-4 px-8 border-b border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">06/08</td>
                  <td className="py-4 px-8 border-b border-gray-200">Watering</td>
                  <td className="py-4 px-8 border-b border-gray-200">Mr. Kasun Ranaweera</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ongoing</td>
                </tr>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">31/07</td>
                  <td className="py-4 px-8 border-b border-gray-200">Pruning</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ms. Nethmi de Silva</td>
                  <td className="py-4 px-8 border-b border-gray-200">Completed</td>
                </tr>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">06/08</td>
                  <td className="py-4 px-8 border-b border-gray-200">Watering</td>
                  <td className="py-4 px-8 border-b border-gray-200">Mr. Kasun Ranaweera</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ongoing</td>
                </tr>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">06/08</td>
                  <td className="py-4 px-8 border-b border-gray-200">Watering</td>
                  <td className="py-4 px-8 border-b border-gray-200">Mr. Kasun Ranaweera</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ongoing</td>
                </tr>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">06/08</td>
                  <td className="py-4 px-8 border-b border-gray-200">Watering</td>
                  <td className="py-4 px-8 border-b border-gray-200">Mr. Kasun Ranaweera</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ongoing</td>
                </tr>
                <tr>
                  <td className="py-4 px-8 border-b border-gray-200">06/08</td>
                  <td className="py-4 px-8 border-b border-gray-200">Watering</td>
                  <td className="py-4 px-8 border-b border-gray-200">Mr. Kasun Ranaweera</td>
                  <td className="py-4 px-8 border-b border-gray-200">Ongoing</td>
                </tr>
                {/* Add other table rows as needed */}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 mb-4">
            <Button type="default" className="bg-[#3CCD65] text-white hover:bg-[#2b8f57]">
              Add Entry
            </Button>
          </div>
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
