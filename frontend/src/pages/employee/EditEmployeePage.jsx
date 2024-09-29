import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { SnackbarProvider } from "notistack";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import EditEmployee from "../../components/Employee/EditEmployee";

export default function ViewTaskList() {
  const breadcrumbItems = [
    { name: 'Employee', href: '/employees/home' },
    { name: 'Registration', href: '/employees/registration' },
    { name: 'Edit Employee Details', href: '/employees/registration/editemployee' },
  ];

  return (
    <SnackbarProvider>
      <div className="">
        <Header />
        <Sidebar />

        <div className={`ml-[300px]`}>
         
          <EmployeeNavbar />
          <Breadcrumbs items={breadcrumbItems} />
          <EditEmployee />
        </div>
      </div>
    </SnackbarProvider>
  );
}
