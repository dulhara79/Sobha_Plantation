import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import NavigationButtons from "../../components/Sales_and_Finance/NavigationButtons";
import UserGreetingCard from "../../components/Sales_and_Finance/UserGreetingCard";
import FinanceCard from "../../components/Sales_and_Finance/Finance/HomeFinanceCard";
import SalesCard from "../../components/Sales_and_Finance/Sales/HomeSalesCard";

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

// import Notification from "../../components/Sales_and_Finance/Notification";
// import NotificationMenu from "../../components/Sales_and_Finance/NotificationMenu";
// import Calendar from "../../components/Sales_and_Finance/Calendar";


const FinanceDashboard = () => {
  // State for Sales and Finance Data
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    mostSellingProduct: "",
    leastSellingProduct: "",
  });

  const [financeData, setFinanceData] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  // State for Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  // Fetch Sales and Finance Data from Database
  useEffect(() => {
    axios.get("/api/sales").then((response) => {
      setSalesData(response.data);
    });

    axios.get("/api/finance").then((response) => {
      setFinanceData(response.data);
    });

    // Fetch Notifications
    axios.get("/api/notifications").then((response) => {
      setNotifications(response.data);
    });
  }, []);

  // Mark Notifications as Read
  const handleNotificationClick = () => {
    setUnreadNotifications(false);
    axios.post("/api/notifications/read").then(() => {
      console.log("Notifications marked as read.");
    });
  };

  return (
    <div>
      <Header />
      <Sidebar activePage="/salesAndFinance/"/>
      <div className={`ml-[300px] pt-3`}>
      <Breadcrumb
      style={{ margin: "10px 0" }}
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              title: "Sales and Finance",
            },
          ]}
        />
        <NavigationButtons />
        <div className="min-h-screen p-6 bg-gray-100">
          <UserGreetingCard
            unreadNotifications={unreadNotifications}
            handleNotificationClick={handleNotificationClick}
          />
          <FinanceCard financeData={financeData} />
          <SalesCard salesData={salesData} />

          {/* <Calendar /> */}
          {/* <NotificationMenu /> */}
          {/* <Notification /> */}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
