import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import DateTimeDisplay from '../../components/Products/DateTimeDisplay';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {
  FileTextOutlined,
  CalendarOutlined,
  CarOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import axios from 'axios';  // Import axios for API calls
import BuyerNavbar from '../../components/Buyer/Header/BuyerNavbar';
import NewLoadingScreen from '../../components/LoadingDots'

const BuyerDashboard = () => {
  const navigate = useNavigate();

  // State for buyers and pre-orders
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [totalPreOrders, setTotalPreOrders] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 1000); // Adjust the delay as needed
  }, []);


  // Update the date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  // Fetch the total buyers and pre-orders count from the backend
  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        // Fetch total buyers
        const buyerResponse = await axios.get('http://localhost:5000/api/buyerInfo/count/buyers'); // Replace with your API endpoint
        setTotalBuyers(buyerResponse.data.totalBuyers);

        // Fetch total pre-orders
        const preOrderResponse = await axios.get('http://localhost:5000/api/buyerPreOrder/count/preOrders'); // Replace with your API endpoint
        setTotalPreOrders(preOrderResponse.data.totalPreOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchBuyerData();
  }, []); // Empty dependency array means it runs once after the component mounts

  // Format the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  if (loading) return <NewLoadingScreen />;

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: '300px', padding: '20px' }}>
        <BuyerNavbar />
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: '', title: <HomeOutlined /> },
            { href: '', title: 'Buyer Management' },
          ]}

          className="mb-6"
        />

        {/* Welcome message section with DateTimeDisplay */}
        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
          <div className="flex flex-row items-center justify-between">
            <DateTimeDisplay />
            <div className="flex items-center">
              {/* <NotificationsIcon className="text-3xl" /> */}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary-section" style={{ padding: '20px' }}>
          <Row gutter={24}>
            {/* Left side - 3 clickable boxes */}
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Card
                    onClick={() => handleNavigation('/buyerinfotable')}
                    className="dashboard-card"
                    style={{
                      backgroundColor: '#D4F5D4',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '22px',
                      padding: '40px',
                      height: '200px',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                  >
                    <FileTextOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                    <div>Manage Buyer Details</div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card
                    onClick={() => handleNavigation('/preorders')}
                    className="dashboard-card"
                    style={{
                      backgroundColor: '#D4F5D4',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '22px',
                      padding: '40px',
                      height: '200px',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                  >
                    <CalendarOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                    <div>Manage Pre Orders</div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card
                    onClick={() => handleNavigation('/Bdeliverytable')}
                    className="dashboard-card"
                    style={{
                      backgroundColor: '#D4F5D4',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '22px',
                      padding: '40px',
                      height: '200px',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                  >
                    <CarOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                    <div>Manage Delivery Info</div>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* Right side - 2 non-clickable boxes */}
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Card
                    style={{
                      backgroundColor: '#A0E7A0',
                      borderRadius: '12px',
                      textAlign: 'center',
                      fontSize: '22px',
                      padding: '40px',
                      height: '300px',
                    }}
                  >
                    <UsergroupAddOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                    <div>Total Registered Buyers</div>
                    <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{totalBuyers}</div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card
                    style={{
                      backgroundColor: '#A0E7A0',
                      borderRadius: '12px',
                      textAlign: 'center',
                      fontSize: '22px',
                      padding: '40px',
                      height: '300px',
                    }}
                  >
                    <ShoppingCartOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                    <div>Total Pre Orders</div>
                    <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{totalPreOrders}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <style jsx>{`
        .dashboard-card:hover {
          background-color: #70db70 !important;
          transform: translateY(-5px);
          transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BuyerDashboard;
