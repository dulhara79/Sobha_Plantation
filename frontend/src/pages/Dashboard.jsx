import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Weather from "../components/WeatherInf";
import Calendar from "../components/Calendar";
import "../index.css";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
    <div className={`ml-[300px]`}>
      <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      }
    ]}
  />
      <Weather />
      <Calendar />
    </div>
    </div>
  );
};

export default Dashboard;
