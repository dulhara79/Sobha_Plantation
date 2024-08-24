import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import WeatherInf from "../../components/WeatherInf"
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
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


        
        <WeatherInf/>
      </div>
    </div>
  );
};

export default Edashboard;
