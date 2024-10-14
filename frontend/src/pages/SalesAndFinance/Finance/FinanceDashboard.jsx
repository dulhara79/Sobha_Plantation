import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
// import Add from "@mui/icons-material/Add";
// import List from "@mui/icons-material/List";
// import Assessment from "@mui/icons-material/Assessment";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Use this or another suitable icon for Budget
// import Analytics from "@mui/icons-material/Analytics";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import {Add, List, Assessment, AttachMoney, Analytics} from "@mui/icons-material";

import NewLoadingScreen from '../../../components/LoadingDots'

const SriLankanRupeeIcon = () => (
  <span style={{ fontSize: '28px', fontWeight: 900 , margin: '10px'}}>LKR.</span>
);

const SalesDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate loading process (e.g., API calls, component mounting)
      setTimeout(() => {
        setLoading(false); // Once the components or data are loaded
      }, 1000); // Adjust the delay as needed
    }, []);
  
    if (loading) return <NewLoadingScreen />;

  return (
    <>
      <Header />
      <Sidebar />
      <div className={`ml-[300px] pt-3`}>
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
              title: "Finance Dashboard",
            },
          ]}
        />
          <NavigationButtons />
        <div className="p-4 bg-gray-100">
          {/* Rectangle Icons */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/finance/add-transaction")}
            >
              <Add fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Add Transaction</span>
            </div>
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/finance/add-minortransaction")}
            >
              <List fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Add Minor Transactions</span>
            </div>
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/finance/valuation-dashboard")}
            >
              <Assessment fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Valuation</span>
            </div>
            <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/finance/analytics")}
            >
              <Analytics fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Analytics</span>
            </div>
            {/* <div
              className="flex flex-col items-center justify-center h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/budget")}
            >
              <AttachMoney fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Budget</span>
            </div> */}
            <div 
              className="flex flex-col items-center justify-center col-span-2 h-72 p-8 bg-[#7ff587] rounded-lg cursor-pointer hover:bg-[#39cc63]"
              onClick={() => navigateTo("/salesAndFinance/finance/employeeSalary")}
            >
              {/* <AttachMoney fontSize="large" className="mb-8 mr-2 size-24" /> */}
              <SriLankanRupeeIcon fontSize="large" className="mb-8 mr-2 size-24" />
              <span className="text-xl font-semibold">Salary</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
