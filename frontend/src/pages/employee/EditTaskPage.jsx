import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import EditTask from "../../components/Employee/EditTask";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

export default function EditTaskPage() {
  const breadcrumbItems = [
    { name: "Employees", href: "/employees/home" },
    { name: "Assign Tasks", href: "/employees/tasks" },
    { name: "Edit Task Details", href: "/employees/tasks/editTasks" },
  ];

  return (
    <div className="flex-col">
      <Header />
      <Sidebar />

      <div className={`ml-[300px]`}>
        
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <EditTask />
      </div>
    </div>
  );
}
