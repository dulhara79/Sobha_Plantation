
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import EditTask from "../../components/EditTask";


export default function EditTaskPage() {

    const breadcrumbItems = [
        { name: 'Employees', href: '/employees/home' },
        { name: 'Assign Tasks', href: '/employees/tasks' },
        { name: 'Edit Task Details', href: '/employees/tasks/editTasks' },
    ];

    return (
        <div className="flex-col">
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
            <EditTask/>
        </div>
    </div>

  
);
};