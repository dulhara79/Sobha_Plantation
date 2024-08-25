import React, { useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined, ErrorOutline } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ProductsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGroupContainerClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/products/quality-control");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/packaging");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate, location]);

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
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Production
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Quality
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Packaging
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
              title: "Products",
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
                <b className="mb-2 text-3xl">Welcome Dewmini,</b>
                <div className="text-xl text-gray-900">
                  <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <NotificationsIcon className="mb-2 text-gray-500" />
                
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-5">
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Total Inspections 📝</h3>
              <p className="mt-2 font-extrabold text-10xl">1,200</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Passed Products ✅</h3>
              <p className="mt-2 font-extrabold text-10xl">1,050</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-red-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Failed Products <ErrorOutline style={{ color: "black" }} /></h3>
              <p className="mt-2 font-extrabold text-10xl">150</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Active Schedules 📅</h3>
              <p className="mt-2 font-extrabold text-10xl">10</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Packaged Units 📦</h3>
              <p className="mt-2 font-extrabold text-10xl">8,000</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform bg-red-500 rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-xl text-center">Defect Rate ⚠️</h3>
              <p className="mt-2 font-extrabold text-10xl">12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
