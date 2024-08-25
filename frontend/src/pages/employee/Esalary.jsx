import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeNavbar from "../../components/EmployeeNavbar";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeSalary from "../../components/EmployeeSalary";
const Esalary = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
          ]}
        />
<EmployeeNavbar/>
<EmployeeSalary /> 
        
        
      </div>
    </div>
  );
};

export default Esalary;
