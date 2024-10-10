import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import React, {useState, useEffect}  from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import EditEmpAttendance from "../../components/Employee/EditEmpAttendance ";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

import { SnackbarProvider } from "notistack";

import NewLoadingScreen from "../../components/LoadingDots";
  const GetAttendance = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Simulate loading process (e.g., API calls, component mounting)
      setTimeout(() => {
        setLoading(false); // Once the components or data are loaded
      }, 500); // Adjust the delay as needed
    }, []);
  
    if (loading) return <NewLoadingScreen />;
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
          <EditEmpAttendance />
        </div>
      </div>
    </SnackbarProvider>
  );
};
export default GetAttendance;
