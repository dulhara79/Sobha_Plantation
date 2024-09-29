import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ETaskForm from "../../components/Employee/ETaskForm";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import NewLoadingScreen from "../../components/LoadingDots";



  const EAddTask = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Simulate loading process (e.g., API calls, component mounting)
      setTimeout(() => {
        setLoading(false); // Once the components or data are loaded
      }, 2000); // Adjust the delay as needed
    }, []);
  
    if (loading) return <NewLoadingScreen />;
    
  const breadcrumbItems = [
    { name: "Employees", href: "/employees/home" },
    { name: "Assign Tasks", href: "/employees/tasks" },
    { name: "Add new task", href: "/employees/tasks/addTask" },
  ];
  return (
    <div className="flex-col">
      <Header />
      <Sidebar />

      <div className={`ml-[300px]`}>
       
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <ETaskForm />
      </div>
    </div>
  );
};

export default EAddTask;
