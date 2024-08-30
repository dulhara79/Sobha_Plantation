import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import TaskList from "../../components/TaskList";
import { SnackbarProvider } from "notistack";

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
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
            ]}
          />
          <EmployeeNavbar />
          <TaskList />
        </div>
      </div>
    </SnackbarProvider>
  );
}
