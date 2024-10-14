import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import AddMinorTransactions from "../../../components/Sales_and_Finance/Finance/AddMinorTransactions";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import NewLoadingScreen from '../../../components/LoadingDots'

// import FinanceNavigation from "../../../components/finances/FinanceNavigation.js";

import {useNavigate} from "react-router-dom";
import { useSnackbar } from 'notistack';

const AddMinorTransactionPage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

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
    <div className={`ml-[300px] pt-3 w-[600px]`}>
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
      <div className={`ml-[250px] pt-3 w-[600px]`}>
      <AddMinorTransactions />
      </div>
      </div>
  </div>
  )
}


export default AddMinorTransactionPage;
