import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import TaskList from "../../components/Employee/TaskList";
import { SnackbarProvider } from "notistack";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

export default function ViewTaskList() {
  const breadcrumbItems = [
    { name: "Employees", href: "/employees/home" },
    { name: "Assign Tasks", href: "/employees/tasks" },
  ];

  return (
    <SnackbarProvider>
      <div className="">
        <Header />
        <Sidebar />

        <div className={`ml-[300px]`}>
         
          <EmployeeNavbar />
          <Breadcrumbs items={breadcrumbItems} />
          <TaskList />
        </div>
      </div>
    </SnackbarProvider>
  );
}
