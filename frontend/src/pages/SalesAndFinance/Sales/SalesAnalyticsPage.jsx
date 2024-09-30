// src/pages/SalesAndFinance/Sales/SalesAnalyticsPage.js

import React, { useEffect, useState } from 'react';
import WeeklySoldProductsChart from '../../../components/Sales_and_Finance/Sales/WeeklySoldProductsChart';
import MonthlySoldProductsChart from '../../../components/Sales_and_Finance/Sales/MonthlySoldProductsChart';
import YearlyRevenueChart from '../../../components/Sales_and_Finance/Sales/YearlyRevenueChart';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import NewLoadingScreen from '../../../components/LoadingDots'

const SriLankanRupeeIcon = () => (
  <span style={{ fontSize: '24px' }}>LKR.</span>
);

const SalesAnalyticsPage = () => {
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
      <Sidebar activePage="/salesAndFinance/" />
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
        <NavigationButtons activePage="sales" />
        <div className="min-h-screen p-6 bg-gray-100">
          <div className="p-4">
            {/* Summary Cards */}
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <SalesSummaryCard 
                title="Total Revenue" 
                value={salesSummary.totalRevenue ? `LKR ${salesSummary.totalRevenue.toLocaleString()}` : 'N/A'} 
                icon={<SriLankanRupeeIcon />} 
              />
              <SalesSummaryCard 
                title="Total Units Sold" 
                value={salesSummary.totalUnitsSold ? salesSummary.totalUnitsSold.toLocaleString() : 'N/A'} 
                icon={<ShoppingCartOutlined />} 
              />
              <SalesSummaryCard 
                title="Average Order Value" 
                value={salesSummary.averageOrderValue ? `LKR ${salesSummary.averageOrderValue.toLocaleString()}` : 'N/A'} 
              />
              <SalesSummaryCard 
                title="Profit Margin" 
                value={salesSummary.profitMargin ? `${salesSummary.profitMargin.toFixed(2)}%` : 'N/A'} 
              />
            </div> */}

            {/* Charts */}
            <MonthlySoldProductsChart />
            <WeeklySoldProductsChart />
            <YearlyRevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;
