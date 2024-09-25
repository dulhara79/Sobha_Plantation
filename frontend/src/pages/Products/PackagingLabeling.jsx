import React, { useCallback, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Breadcrumb } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import Labeling from "./Labeling"; // Import the Labeling component
import Packaging from "./Packaging";

// Navigation menu items for the dashboard
const menuItems = [
  { name: 'HOME', path: '/products/productdashboard' },
  { name: 'PRODUCTION', path: '/products/production-overview' },
  { name: 'QUALITY', path: '/products/quality-control' },
  { name: 'PACKAGING', path: '/products/packaging-labeling' }
];

const PackagingLabeling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;
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

  const isActive = (page) => activePage === page;

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
            <div className="flex items-center justify-center">
              <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
                <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2" onClick={onBackClick} />
                {menuItems.map((item) => (
                  <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                    <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        <Breadcrumb
          items={[
            {
              href: "",
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
          <Tab
            label={
              <span
                style={{
                  fontWeight: "bold",
                  color: activeTab === 0 ? "#1D6660" : "#000",
                }}
              >
                Packaging
              </span>
            }
          />
          <Tab
            label={
              <span
                style={{
                  fontWeight: "bold",
                  color: activeTab === 1 ? "#1D6660" : "#000",
                }}
              >
                Labeling
              </span>
            }
          />
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

