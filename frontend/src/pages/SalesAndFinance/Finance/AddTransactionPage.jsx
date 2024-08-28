import React from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import NavigationButtons from '../../../components/Sales_and_Finance/NavigationButtons'
import AddTransaction from '../../../components/Sales_and_Finance/Finance/AddTransaction'
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const AddTransactionPage = () => {
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
      <NavigationButtons activePage="finance" />
      </div>
      <div className={`ml-[250px] pt-3 w-[600px]`}>
      <AddTransaction />
      </div>
      </div>
  </div>
  )
}

export default AddTransactionPage
