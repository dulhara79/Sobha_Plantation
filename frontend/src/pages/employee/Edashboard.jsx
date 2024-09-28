import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeDash from "../../components/Employee/EmployeeDash";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
//const Edashboard = () => {
export default function Edashboard() {
  const breadcrumbItems = [{ name: "Employees", href: "/employees/home" }];
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
        

        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeDash />
      </div>
    </div>
  );
}
