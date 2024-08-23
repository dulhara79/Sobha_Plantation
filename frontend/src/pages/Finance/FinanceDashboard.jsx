import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const FinanceDashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px] pt-3`}>
        <Breadcrumb
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              href: "/finance/dashboard",
              title: (
                <>
                  <UserOutlined />
                  <span>Finance</span>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FinanceDashboard;
