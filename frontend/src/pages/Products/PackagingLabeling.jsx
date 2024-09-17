import React, { useCallback, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab } from "@mui/material";
import Labeling from './Labeling'; // Import the Labeling component
import Packaging from "./Packaging";

const PackagingLabeling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const onGroupContainerClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/products/quality-control");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/products/packaging-labeling");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    navigate("/products/productdashboard");
}, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>

            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Production
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Quality
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white text-white"
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
              title: "Packaging",
            },
          ]}
        />
        {/* Tabs for Packaging and Labeling */}
        <Tabs value={activeTab} onChange={handleTabChange} className="mt-5">
          <Tab label="Packaging" />
          <Tab label="Labeling" />
        </Tabs>
        {/* Content based on selected tab */}
        <div className="mt-5">
          {activeTab === 0 && <Packaging />}
          {activeTab === 1 && <Labeling />} {/* Render Labeling component */}
        </div>
      </div>
    </div>
  );
};

export default PackagingLabeling;
