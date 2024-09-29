import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeRegistrationForm from "../../components/Employee/EmployeeRegistrationForm";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import NewLoadingScreen from "../../components/LoadingDots";
const Eregistration = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 2000); // Adjust the delay as needed
  }, []);

  if (loading) return <NewLoadingScreen />;
  
  const breadcrumbItems = [
    { name: 'Employee', href: '/employees/home' },
    { name: 'Registration', href: '/employees/registration' },
    { name: 'Add Employee', href: '/employees/registration/addEmployee' },
];
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
       
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeRegistrationForm />
      </div>
    </div>
  );
};

export default Eregistration;
