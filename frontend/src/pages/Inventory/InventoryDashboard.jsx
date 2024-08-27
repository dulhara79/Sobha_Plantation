import React, { useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';


const InventoryDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGroupContainerClick = useCallback(() => {
    navigate("/Inventory/Fertilizer");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/Inventory/Maintenance");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/Inventory/Equipments");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
      navigate("/Inventory/InventoryDashboard"); // Navigate to HarvestDashboard 
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="p-4 mb-5">
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <div
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Fertilizer
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Maintenance
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Equipments
              </a>
            </div>
          </div>
        </nav>

        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: "Inventory",
            },
            {
              title: "Dashboard",
            },
          ]}
        />
        <div className="mt-5">
          {/* Welcome message section */}
          <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <b className="mb-2 text-3xl">Welcome Maheesha,</b>
                <div className="text-xl text-gray-900">
                  <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <NotificationsIcon className="mb-2 text-gray-500" />
              </div>
            </div>
          </div>
          {/* Weather Component Section */}
       

          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Total Equipments 📝</h3>
              <p className="mt-2 font-extrabold text-10xl">129</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">No of Maintenance in Progress ✅</h3>
              <p className="mt-2 font-extrabold text-10xl">10</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-red-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">No of Equipments for Maintenance</h3>
              <p className="mt-2 font-extrabold text-10xl">6</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Total Plants</h3>
              <p className="mt-2 font-extrabold text-10xl">240</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
