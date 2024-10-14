import React from 'react'
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import AnalyticsCashbook from "../../../components/Sales_and_Finance/Finance/AnalyticsCashbook"

const CashBook = () => {
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
      <AnalyticsCashbook/>
      </div>
    </div>
  )
}

export default CashBook
