import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import React from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import GetEmpAttendance from "../../components/Employee/GetEmpAttendance";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

import { SnackbarProvider } from "notistack";

export default function GetAttendance() {
  const breadcrumbItems = [
    { name: "Employee", href: "/employees/home" },
    { name: "Attendance Marker", href: "/employees/attendance" },
    { name: "Get Attendance", href: "/employees/attendance/getAttendance" },
  ];

  return (
    <SnackbarProvider>
      <div className="">
        <Header />
        <Sidebar />

        <div className={`ml-[300px]`}>
          <EmployeeNavbar />
          <Breadcrumbs items={breadcrumbItems} />
          <GetEmpAttendance />
        </div>
      </div>
    </SnackbarProvider>
  );
}
