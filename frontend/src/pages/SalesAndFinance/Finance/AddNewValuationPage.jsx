import React, { useState, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ValuationForm from "../../../components/Sales_and_Finance/Finance/ValuationForm";
import { message, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import NewLoadingScreen from "../../../components/LoadingDots";

const AddNewValuationPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 1000); // Adjust the delay as needed
  }, []);

  if (loading) return <NewLoadingScreen />;

  return (
    <SnackbarProvider maxSnack={3}>
      <Header />
      <Sidebar />
      <div className={`flex flex-row ml-[300px] pt-3`}>
        <div className="w-full">
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
          <div className="w-10/12 mt-10 ml-30">
            <h1 className="my-4 ml-20 text-3xl font-bold text-gray-800">
              Add New Valuation Record
            </h1>
            <ValuationForm />
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default AddNewValuationPage;
