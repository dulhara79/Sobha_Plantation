import React, { useState, useEffect } from 'react'
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import PettyCashTable from "../../../components/Sales_and_Finance/Finance/PettyCashTable";
import NewLoadingScreen from "../../../components/LoadingDots";
const PettyCash = () => {
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
    <Sidebar activePage="/salesAndFinance/"/>
      <div className={`ml-[300px] pt-3 max-w-full`}>
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
          },{
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
      <NavigationButtons />
      </div>
      <div className={`ml-[300px] pt-3`}>
      <PettyCashTable/>
      </div>
    </div>
  )
}

export default PettyCash
