import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import NewLoadingScreen from "../../../components/LoadingDots";

// import FinanceNavigation from "../../../components/finances/FinanceNavigation.js";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import PettyCash from "../../../components/Sales_and_Finance/Finance/PettyCashTable";
import CashBook from "../../../components/Sales_and_Finance/Finance/AnalyticsCashbook";
import AnalyticsBalanceSheet from "../../../components/Sales_and_Finance/Finance/AnalyticsBalanceSheet";

const AddTransactionPage = () => {
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
      <Sidebar activePage="/salesAndFinance/" />
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
        <NavigationButtons />
        <div className={`ml-[150px] pt-3 max-w-full`}>
          <div className="flex justify-between">
            <h1 className="font-semibold ">Financial Sheets</h1>
          </div>
        </div>
        <div className="mb-20">
          <PettyCash />
          <CashBook />
          <AnalyticsBalanceSheet />
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;
