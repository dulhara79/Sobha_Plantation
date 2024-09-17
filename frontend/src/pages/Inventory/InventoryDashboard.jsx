import React, { useCallback } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, Row, Col } from "antd";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

// Import image assets
import Tools from '../../assets/Inventory/tools.jpg';
import Fertilizers from '../../assets/Inventory/fertilizerImg.png';
//import Plants from '../../assets/Inventory/plantsImg.png';
import Agrochemicals from '../../assets/Inventory/agrochemicalImg.jpg';
import Maintenance from '../../assets/Inventory/maintenanceImg.png';

ChartJS.register(ArcElement);

const toolsData = {
  labels: ["Available", "Used"],
  datasets: [
    {
      data: [78, 22],
      backgroundColor: ["#FF9F40", "#FFCE56"],
      hoverBackgroundColor: ["#FF9F40", "#FFCE56"],
    },
  ],
};

const fertilizersData = {
  labels: ["Available", "Used"],
  datasets: [
    {
      data: [45, 55],
      backgroundColor: ["#4BC0C0", "#36A2EB"],
      hoverBackgroundColor: ["#4BC0C0", "#36A2EB"],
    },
  ],
};

{/*const plantsData = {
  labels: ["Available", "Used"],
  datasets: [
    {
      data: [64, 36],
      backgroundColor: ["#36A2EB", "#FF6384"],
      hoverBackgroundColor: ["#36A2EB", "#FF6384"],
    },
  ],
};
*/}
const agroChemicalsData = {
  labels: ["Available", "Used"],
  datasets: [
    {
      data: [56, 44],
      backgroundColor: ["#FF6384", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#FFCE56"],
    },
  ],
};

const maintenanceData = {
  labels: ["Completed", "Pending", "Overdue"],
  datasets: [
    {
      data: [70, 20, 10],
      backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
    },
  ],
};

const InventoryDashboard = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/Inventory/FertilizerRecords");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/Inventory/MaintenanceRecords");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/Inventory/EquipmentRecords");
  }, [navigate]);

  const onGroupContainerClick3 = useCallback(() => {
    navigate("/Inventory/RequestPaymentRecords");
  }, [navigate]);

  

  const onHomeClick = useCallback(() => {
    navigate("/Inventory/InventoryDashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        <nav className="p-4 mb-5">
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <div
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>
            <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Fertilizers & Agrochemicals
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Maintenance Records
                </a>
              </div>
              <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Equipments & Machines
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick3}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Request Payment Details
              </a>
            </div>
      
          </div>
        </nav>

        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: "Inventory",
            },
            {
              title: "Dashboard",
            },
          ]}
        />

        <div className="flex justify-center items-center mt-5">
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
       { /*      <Col span={8}>
                <Card title="Plant Varieties">
                  <Row align="middle" justify="center">
                    <Col span={12}>
                      <img src={Plants} alt="Plants" style={{ width: "120px", height: "160px" }} />
                    </Col>
                    <Col span={12}>
                      <Pie data={plantsData} />
                      <p>64% plant varieties are available.</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

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
  );
};

export default InventoryDashboard;
