import React, { useState } from 'react';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import AddTransaction from "../../../components/Sales_and_Finance/Finance/AddTransaction";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

// import FinanceNavigation from "../../../components/finances/FinanceNavigation.js";

import {useNavigate} from "react-router-dom";
import { useSnackbar } from 'notistack';
import UpdateTransaction from '../../../components/Sales_and_Finance/Finance/UpdateTransaction';

const UpdateTransactionPage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
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
      <NavigationButtons />
      <div className={`ml-[250px] pt-3 w-[600px]`}>
      <UpdateTransaction />
      </div>
      </div>
  </div>
  )
}

export default UpdateTransactionPage
