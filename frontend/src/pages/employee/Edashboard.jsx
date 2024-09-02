import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeDash from "../../components/Employee/EmployeeDash";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
const Edashboard = () => {
  return (
    <div>
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


<EmployeeNavbar/>
        <EmployeeDash/>
      </div>
    </div>
  );
};

export default Edashboard;
