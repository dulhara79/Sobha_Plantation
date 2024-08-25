import React, { useState, useEffect }from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const CultivationDashboard = () => {
    
    const [currentDate, setCurrentDate] = useState(new Date());

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
      <Header/>
      <Sidebar/>

      <div className={`ml-[300px]`}>
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
{/* Welcome Message */}
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Welcome Piyushi,</h2>
          <p>Today is {formattedDate}</p>
    </div>

    {/* Summary Section */}
    <div className="grid grid-cols-2 gap-6">
          <Link to="/varietyCrop" className="bg-[#8fd68b] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition cursor-pointer block">
            <img src="/path/to/crop-variety-icon.png" alt="Crop Variety" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-lg font-semibold">Crop Variety</h3>
          </Link>
          <Link to="/landPreparation" className="bg-[#8fd68b] p-8 rounded-xl text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition cursor-pointer block">
    <img src="/path/to/land-preparation-icon.png" alt="Land Preparation" className="mx-auto mb-4 w-16 h-16" />
    <h3 className="text-lg font-semibold">Land Preparation</h3>
  </Link>

  <Link to="/plantGrowth" className="bg-[#8fd68b] p-8 rounded-xl text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition cursor-pointer block">
    <img src="/path/to/plant-growth-icon.png" alt="Plant Growth" className="mx-auto mb-4 w-16 h-16" />
    <h3 className="text-lg font-semibold">Plant Growth</h3>
  </Link>

  <Link to="/seedling" className="bg-[#8fd68b] p-8 rounded-xl text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition cursor-pointer block">
    <img src="/path/to/seedling-distribution-icon.png" alt="Seedling Distribution" className="mx-auto mb-4 w-16 h-16" />
    <h3 className="text-lg font-semibold">Seedling Distribution</h3>
  </Link>

  <Link to="/schedules" className="bg-[#8fd68b] p-8 rounded-xl text-center hover:bg-gradient-to-r from-green-400 to-blue-500 transition cursor-pointer block">
    <img src="/path/to/schedule-icon.png" alt="Schedules" className="mx-auto mb-4 w-16 h-16" />
    <h3 className="text-lg font-semibold">Schedules</h3>
  </Link>
        </div>

  </div>
    </div>
  )
}

export default CultivationDashboard
