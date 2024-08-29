import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";
import TransactionTable from "../../../components/Sales_and_Finance/Finance/TransactionTable";
import TransactionSummaryCard from "../../../components/Sales_and_Finance/Finance/TransactionSummaryCard";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const TransactionDisplay = () => {
  return (
    <div>
      <Header />
      <Sidebar activePage="/salesAndFinance/" />
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
        <div className="p-4 bg-gray-100">
          <NavigationButtons activePage="finance" />
        </div>
        <div className={`ml-[150px] pt-3 w-[600px]`}>
          <h1 className="mb-6 text-3xl font-semibold">Finance Dashboard</h1>
          <TransactionSummaryCard />
          <div className="mt-8">
            <TransactionTable />
          </div>
          <div className="mt-8 text-right">
            <Button type="primary" onClick={() => generateReport()}>
              Generate Summary Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDisplay;
