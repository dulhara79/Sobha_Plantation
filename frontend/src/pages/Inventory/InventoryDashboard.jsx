
import React, { useEffect, useState, useCallback } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, Row, Col } from "antd";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import DateTimeDisplay from "../../components/Inventory/DateTimeDisplay";
import LoadingDot from '../../components/LoadingDots';

// Import image assets
import Tools from '../../assets/Inventory/tools.jpg';
import Fertilizers from '../../assets/Inventory/fertilizerImg.png';
import Agrochemicals from '../../assets/Inventory/agrochemicalImg.jpg';
import Maintenance from '../../assets/Inventory/maintenanceImg.png';

ChartJS.register(ArcElement);

const menuItems = [
  { name: "Home", path: "/Inventory/InventoryDashboard" },
  { name: "Fertilizers & Agrochemicals", path: "/Inventory/FertilizerRecords" },
  { name: "Equipments & Machines", path: "/Inventory/EquipmentRecords" },
  { name: "Maintenance Records", path: "/Inventory/MaintenanceRecords" },
  { name: "Request Payment Details", path: "/Inventory/RequestPaymentRecords" }
];


const toolsData = {
  labels: ["In Stock", "Out of Stock","Maintenance"],
  datasets: [
    {
      data: [78, 22,20],
      backgroundColor: ['#90EE90', '#0818A8', '#40B5AD'],
      hoverBackgroundColor: ['#4CAF50', '#191970', '#7DF9FF'],
    },
  ],
};


const fertilizersData = {
  labels: ["In Stock", "Out of Stock", "Expired"],
  datasets: [
    {
      data: [40, 60,20],
      backgroundColor: ['#60DB19', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#4CAF50', '#FF2D55', '#FFCD30'],
    },
  ],
};
  
const agroChemicalsData = {
  labels: ["Available", "Used","Expired"],
  datasets: [
    {
      data: [56, 44,10],
      backgroundColor: ["#32CD32", "#FFCE56","#0818A8"],
      hoverBackgroundColor: ["#00A36C", "#FFCE56","#191970"],
    },
  ],
};

const maintenanceData = {
  labels: ["In Progress", "Completed"],
  datasets: [
    {
      data: [30, 60],
      backgroundColor: ['#000080', '#40B5AD'],
      hoverBackgroundColor: ['#4169E1', '#40E0D0'],
    },
  ],
};

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;
  const [loading, setLoading] = useState(true);

  

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 500); // Adjust the delay as needed
  }, []);

  if (loading) return <LoadingDot />;


  const isActive = (page) => activePage === page;

  
  return (
     
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
     <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
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

        <div className="flex items-center justify-between mb-5">
        <Breadcrumb
             items={[
              { href: '', title: <HomeOutlined /> },
              { title: 'Inventory' },
              { title: 'Dashboard' },
            ]}
        />
     </div>

     <div className="mt-5">
          <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
            <div className="flex flex-row items-center justify-between">
              <DateTimeDisplay />
              <div className="flex items-center">
                <NotificationsIcon className="text-3xl" />
              </div>
            </div>
          </div>

        <div className="flex items-center justify-center mt-5">
          <div className="w-full max-w-[1200px]">
            <Row gutter={[16, 16]} justify="center" className="mt-5">
              <Col span={8}>
                <Card title="Equipments and Machines">
                  <Row align="middle" justify="center">
                    <Col span={12}>
                      <img src={Tools} alt="Tools" style={{ width: "100px", height: "120px" }} />
                    </Col>
                    <Col span={12}>
                      <Pie data={toolsData} />
                      <p>78% Equipments and Machines are available.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Fertilizers">
                  <Row align="middle" justify="center">
                    <Col span={12}>
                      <img src={Fertilizers} alt="Fertilizers" style={{ width: "90px", height: "100px" }} />
                    </Col>
                    <Col span={12}>
                      <Pie data={fertilizersData} />
                      <p>45% fertilizers are available.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
       { /*

          <Row gutter={[16, 16]} justify="center" className="mt-5">*/}
              <Col span={8}>
                <Card title="Agro Chemicals">
                  <Row align="middle" justify="center">
                    <Col span={12}>
                      <img src={Agrochemicals} alt="Agrochemicals" style={{ width: "110px", height: "180px" }} />
                    </Col>
                    <Col span={12}>
                      <Pie data={agroChemicalsData} />
                      <p>56% agro chemicals are available.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Maintenance Records">
                  <Row align="middle" justify="center">
                    <Col span={12}>
                      <img src={Maintenance} alt="Maintenance" style={{ width: "130px", height: "125px" }} />
                    </Col>
                    <Col span={12}>
                      <Pie data={maintenanceData} />
                      <p>70% of maintenance tasks are completed.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default InventoryDashboard;
