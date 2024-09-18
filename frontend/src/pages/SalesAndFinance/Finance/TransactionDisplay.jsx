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
      <div className={`ml-[300px] pt-3 `}>
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
        <div className={`ml-[50px] pt-3 w-[1000px]`}>
          <h1 className="mb-6 text-3xl font-semibold">Finance Dashboard</h1>
          <TransactionSummaryCard />
          </div>
          <div className="mt-8">
          </div>
            <TransactionTable />
          {/* <div className="mt-8 text-right">
            <Button type="primary" onClick={() => generateReport()}>
              Generate Summary Report
            </Button>
          </div> */}
        </div>
      </div>
  );
};

export default TransactionDisplay;
