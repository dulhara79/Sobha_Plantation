/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import FinancialAnalytics from "../../../components/Sales_and_Finance/Finance/FinancialAnalytics";
import YearlyTransactionsCard from '../../../components/Sales_and_Finance/Finance/YearlyTransactionsCard';

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from '@ant-design/icons';

const FinancialAnalyticsPage = () => {
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
        <div className="p-4 bg-gray-100">
        <NavigationButtons activePage="sales" />
        </div>
        <div className={`ml-[250px] pt-3 w-[600px]`}>
        <YearlyTransactionsCard />
        <div className="mt-8">
          <FinancialAnalytics />
          </div>
        </div>
        </div>
    </div>
  )
}

export default FinancialAnalyticsPage
 */

import axios from 'axios';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import FinancialAnalytics from "../../../components/Sales_and_Finance/Finance/FinancialAnalytics";
import YearlyTransactionsCard from '../../../components/Sales_and_Finance/Finance/YearlyTransactionsCard';

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from '@ant-design/icons';
import AnalyticsBalanceSheet from '../../../components/Sales_and_Finance/Finance/AnalyticsBalanceSheet';
import AnalyticsCashbook from '../../../components/Sales_and_Finance/Finance/AnalyticsCashbook';
import AnalyticsTransactionTable from '../../../components/Sales_and_Finance/Finance/AnalyticsTransactionTable';
import AnalyticsSummaryCard from '../../../components/Sales_and_Finance/Finance/AnalyticsSummaryCard';

const FinancialAnalyticsPage = () => {
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
        <div className="p-4 bg-gray-100">
        <NavigationButtons activePage="sales" />
        </div>
        <div className={`ml-[250px] pt-3 w-[600px]`}>
          <AnalyticsSummaryCard />
        </div>
    </div>
    <div className={`ml-[300px] pt-3`}>
          <AnalyticsBalanceSheet />
          <AnalyticsCashbook />
          <AnalyticsTransactionTable />
          </div>
    </div>
  )
}

export default FinancialAnalyticsPage
