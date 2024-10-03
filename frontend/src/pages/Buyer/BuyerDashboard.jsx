import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FileTextOutlined, BoxPlotOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons'; // Import the icon for back button

const BuyerDashboard = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Header />
      <Sidebar />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <LeftOutlined className="text-xl" />
        </button>
        <div className="flex space-x-4">
          <Link
            to="/buyerdashboard"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Home
          </Link>
          <Link
            to="/preorders"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Pre Order
          </Link>
          <Link
            to="/buyerinfotable"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Buyer Records
          </Link>
          <Link
            to="/Bdeliverytable"
            className="text-[#236A64] font-semibold"
          >
            Delivery Records
          </Link>
        </div>
      </nav>

      <div className="ml-[300px]">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Buyer Management',
            },
          ]}
        />
      </div>

      {/* Summary Section */}
      <div className="summary-section" style={{ padding: '20px', marginLeft: '300px' }}>
        <Row gutter={24}>
          {/* Left side - 3 clickable boxes */}
          <Col span={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card
                  onClick={() => handleNavigation('/buyerinfotable')}
                  className="dashboard-card" // Hover effect will apply here
                  style={{
                    backgroundColor: '#D4F5D4',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '22px',
                    padding: '40px',
                    height: '200px', // Adjust height for balance
                    transition: 'background-color 0.3s ease-in-out', // Smooth hover effect
                  }}
                >
                  <FileTextOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                  <div>Manage Buyer Details</div>
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  onClick={() => handleNavigation('/preorders')}
                  className="dashboard-card" // Hover effect will apply here
                  style={{
                    backgroundColor: '#D4F5D4',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '22px',
                    padding: '40px',
                    height: '200px', // Adjust height for balance
                    transition: 'background-color 0.3s ease-in-out', // Smooth hover effect
                  }}
                >
                  <BoxPlotOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
                  <div>Manage Pre Orders</div>
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  onClick={() => handleNavigation('/Bdeliverytable')}
                  className="dashboard-card" // Hover effect will apply here
                  style={{
                    backgroundColor: '#D4F5D4',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '22px',
                    padding: '40px',
                    height: '200px', // Adjust height for balance
                    transition: 'background-color 0.3s ease-in-out', // Smooth hover effect
                  }}
                >
                  <CheckCircleOutlined style={{ fontSize: '48px', color: '#4CAF50' }} />
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
                    height: '300px', // Adjust height for balance
                  }}
                >
                  <div>Total Registered Buyers</div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold' }}>12</div>
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
                    height: '300px', // Adjust height for balance
                  }}
                >
                  <div>Total Pre Orders</div>
                  <div style={{ fontSize: '48px', fontWeight: 'bold' }}>8</div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Add inline styles for hover effect */}
      <style jsx>{`
        .dashboard-card:hover {
          background-color: #70db70 !important;
          transform: translateY(-5px); /* Optional: Adds a slight lift on hover */
          transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BuyerDashboard;
