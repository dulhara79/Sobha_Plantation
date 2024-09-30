import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import ViewSalaryRecord from "../../../components/Sales_and_Finance/Finance/ViewSalaryRecord";
import TransactionSummaryCard from "../../../components/Sales_and_Finance/Finance/TransactionSummaryCard";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import NewLoadingScreen from '../../../components/LoadingDots'

const TransactionDisplay = () => {
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
      <div className={`ml-[300px] pt-3 `}>
        <Breadcrumb
          style={{ margin: "10px 0" }}
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              href: "/salesAndFinance/sales/",
              title: (
                <>
                  <UserOutlined />
                  <span>Sales and Finance</span>
                </>
              ),
            },
            {
              href: "/salesAndFinance/sales/",
              title: (
                <>
                  <span>Sales</span>
                </>
              ),
            },
            {
              title: "Sales Dashboard",
            },
          ]}
        />
        <NavigationButtons />
        <div className="w-full mt-8"></div>
        <ViewSalaryRecord />
      </div>
    </div>
  );
};

export default TransactionDisplay;
