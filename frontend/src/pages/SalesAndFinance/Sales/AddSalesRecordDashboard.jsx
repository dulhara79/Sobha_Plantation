import React from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import NavigationButtons from '../../../components/Sales_and_Finance/NavigationButtons'
import AddSalesRecord from '../../../components/Sales_and_Finance/Sales/AddSalesRecord'
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const AddSalesRecordDashboard = () => {
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
        <AddSalesRecord />
        </div>
        </div>
    </div>
  )
}

export default AddSalesRecordDashboard
