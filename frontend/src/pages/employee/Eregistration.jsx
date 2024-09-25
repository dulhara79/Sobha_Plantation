import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeRegistrationForm from "../../components/Employee/EmployeeRegistrationForm";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
const Eregistration = () => {
  
  const breadcrumbItems = [
    { name: 'Employee', href: '/employees/home' },
    { name: 'Registration', href: '/employees/registration' },
    { name: 'Add Employee', href: '/employees/registration/addEmployee' },
];
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
       
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeRegistrationForm />
      </div>
    </div>
  );
};

export default Eregistration;
