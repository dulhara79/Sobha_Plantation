import React, { useState } from "react";
import "../index.css";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  BadgeOutlined,
  ViewInAr,
  AccountBalanceOutlined,
  InventoryOutlined,
  ForestOutlined,
  BugReportOutlined,
  FilterVintageOutlined,
  Person,
  HomeOutlined,
} from "@mui/icons-material";

const Sidebar = ({ className = "" }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const isActive = (path) => {
    const currentPath = location.pathname.split('/')[1];
    return currentPath === path.split('/')[1];
    // return path.split('/')[1];
  };

  const menuItems = [
    { name: "Home", icon: <HomeOutlined />, path: "/dashboard" },
    { name: "Finances", icon: <AccountBalanceOutlined />, path: "/salesAndFinance/" },
    { name: "Inventory", icon: <InventoryOutlined />, path: "/inventory/dashboard" },
    { name: "Employees", icon: <BadgeOutlined />, path: "/employee/dashboard" },
    { name: "Harvest", icon: <ForestOutlined />, path: "/harvest/dashboard" },
    { name: "Crop Care", icon: <BugReportOutlined />, path: "/crop-care/dashboard" },
    { name: "Products", icon: <ViewInAr />, path: "/products/productdashboard" },
    { name: "Field View", icon: <FilterVintageOutlined />, path: "/cultivationDashboard" },
    { name: "Buyers", icon: <Person />, path: "/buyers/dashboard" },
  ];

  console.log("location.pathname: "+location.pathname);
  console.log("activePage: "+activePage);
  console.log("isActivePage: "+isActive(activePage));

  return (
    <div
      className={`w-[280px] shadow-lg rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke flex flex-col items-start justify-start pt-[70px] px-2 pb-[240.3px] fixed gap-[20px] text-left text-lg text-gray-1700 font-roboto no-underline ${className}`}
    >
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          onClick={() => setActivePage(item.path)}
          className={`w-[206px] flex flex-row items-center justify-start py-2 px-[21px] rounded-full box-border text-left transition-all duration-300 no-underline ${
            /* isActive(activePage) === item.path */ isActive(activePage) === true && activePage.split('/')[1] === item.path.split('/')[1]
              ? "bg-[#60DB19] bg-opacity-80 text-white"
              : "bg-whitesmoke text-gray-1700" }
          } hover:bg-[#a3a3a3] hover:bg-opacity-60 hover:text-2xl`}
        >
          <div className="flex flex-row items-center flex-1 gap-5">
            {item.icon}
            <span className="font-bold text-left no-underline whitespace-nowrap">
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;

