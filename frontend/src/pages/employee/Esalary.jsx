import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeSalary from "../../components/Employee/EmployeeSalary";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
const Esalary = () => {
  const breadcrumbItems = [
    { name: 'Employee', href: '/finances' },
    { name: 'Salary Payments', href: '/finances/salaryPayment' },
];
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
        
<EmployeeNavbar/>
<Breadcrumbs items={breadcrumbItems} />
<EmployeeSalary /> 
        
        
      </div>
    </div>
  );
};

export default Esalary;
