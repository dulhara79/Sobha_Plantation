import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import MinorTransactionTable from "../../../components/Sales_and_Finance/Finance/MinorTransactionTable";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import NewLoadingScreen from '../../../components/LoadingDots'

const MinorTransactionDisplay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 1000); // Adjust the delay as needed
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
        <div className={`ml-[50px] pt-3 w-[1000px]`}>
          <h1 className="mb-6 text-3xl font-semibold">Finance Dashboard</h1>
        </div>
        <div className="mt-8"></div>
        <MinorTransactionTable />
      </div>
    </div>
  );
};

export default MinorTransactionDisplay;
