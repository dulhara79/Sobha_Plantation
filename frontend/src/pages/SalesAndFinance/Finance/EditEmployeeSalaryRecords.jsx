import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EditEmployeeSalary from "../../../components/Sales_and_Finance/Finance/EditEmployeeSalary";

import NewLoadingScreen from '../../../components/LoadingDots'

const Esalary = () => {
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
      <Sidebar />
      <div className={`ml-[300px]`}>
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
              title: "Sales Dahsboard",
            },
          ]}
        />
        <div className="grid sm:grid-cols-6">
        <NavigationButtons />
        <EditEmployeeSalary />
        </div>
      </div>
    </div>
  );
};

export default Esalary;
