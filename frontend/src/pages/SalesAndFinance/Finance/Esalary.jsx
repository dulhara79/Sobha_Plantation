import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeSalary from "../../../components/Sales_and_Finance/Finance/EmployeeSalary";

import NewLoadingScreen from '../../../components/LoadingDots'

const Esalary = () => {
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
        <EmployeeSalary />
        </div>
      </div>
    </div>
  );
};

export default Esalary;
