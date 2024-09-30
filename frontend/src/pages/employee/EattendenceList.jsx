import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import EattendenceTable from "../../components/Employee/EattendenceTable";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

export default function EattendenceList() {
  const breadcrumbItems = [
    { name: "Employee", href: "/employees/home" },
    { name: "Attendance Marker", href: "/employees/attendance" },
  ];

  return (
    <div className="flex-col">
      <Header />
      <Sidebar />

      <div className={`ml-[300px]`}>
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <EattendenceTable />
      </div>
    </div>
  );
}
