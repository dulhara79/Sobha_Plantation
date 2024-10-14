import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import {useNavigate} from "react-router-dom";
import { useSnackbar } from 'notistack';

import Valuation from '../../../components/Sales_and_Finance/Finance/Valuation/Valuation';

import NewLoadingScreen from '../../../components/LoadingDots'

const ValuationDashboard = () => {
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
      <Valuation/>
      </div>
    </div>
  )
}

export default ValuationDashboard
