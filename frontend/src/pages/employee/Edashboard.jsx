import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeDash from "../../components/Employee/EmployeeDash";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import LoadingDot from '../../components/LoadingDots'; 
//const Edashboard = () => {
export default function Edashboard() {
  const breadcrumbItems = [{ name: "Employees", href: "/employees/home" }];
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 2000); // Adjust the delay as needed
  }, []);
  if (loading) return <LoadingDot />;
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
