import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import SalesDashboard from "../../../components/Sales_and_Finance/Sales/SalesDashboard";

import WeeklySalesSummaryCard from "../../../components/Sales_and_Finance/Sales/WeeklySalesSummary";
import SalesReportGenerator from "../../../components/Sales_and_Finance/Sales/SalesReportGenerator";
import SalesTable from "../../../components/Sales_and_Finance/Sales/SalesTable";

import NewLoadingScreen from '../../../components/LoadingDots'

const ViewSalesRecordDashboard = () => {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate loading process (e.g., API calls, component mounting)
      setTimeout(() => {
        setLoading(false); // Once the components or data are loaded
      }, 2000); // Adjust the delay as needed
    }, []);
  
    if (loading) return <NewLoadingScreen />;
  return (
    <div>
      <Header />
      <Sidebar activePage="/salesAndFinance/" />
      <div className={`ml-[300px] pt-3`}>
        <Breadcrumb
          style={{ margin: "10px 0" }}
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              title: "Sales and Finance",
            },
          ]}
        />
        <NavigationButtons activePage="sales" />
        <div className="min-h-screen p-6 bg-gray-100">
          {/* <SalesDashboard /> */}

          <WeeklySalesSummaryCard />
          <SalesReportGenerator />
          <SalesTable />
        </div>
      </div>
    </div>
  );
};

export default ViewSalesRecordDashboard;
