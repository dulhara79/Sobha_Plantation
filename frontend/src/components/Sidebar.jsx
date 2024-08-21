import React, { useState } from "react";
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

  const menuItems = [
    { name: "Home", icon: <HomeOutlined />, path: "/dashboard" },
    { name: "Finances", icon: <AccountBalanceOutlined />, path: "/finance/finance/dashboard" },
    { name: "Inventory", icon: <InventoryOutlined />, path: "/inventory/dashboard" },
    { name: "Employees", icon: <BadgeOutlined />, path: "/employees/dashboard" },
    { name: "Harvest", icon: <ForestOutlined />, path: "/harvest/dashboard" },
    { name: "Crop Care", icon: <BugReportOutlined />, path: "/crop-care/dashboard" },
    { name: "Products", icon: <ViewInAr />, path: "/products/dashboard" },
    { name: "Field View", icon: <FilterVintageOutlined />, path: "/field-view/dashboard" },
    { name: "Buyers", icon: <Person />, path: "/buyers/dashboard" },
  ];

  return (
    <div
      className={`w-[306px] shadow-lg rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke flex flex-col items-start justify-start pt-[88px] px-2 pb-[240.3px] relative gap-[39.7px] text-left text-9xl text-gray-1700 font-roboto ${className}`}
    >
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          onClick={() => setActivePage(item.path)}
          className={`w-[206px] flex flex-row items-center justify-start py-2 px-[21px] rounded-full box-border text-center transition-all duration-300 ${
            activePage === item.path
              ? "bg-[#60DB19] bg-opacity-80 text-white"
              : "bg-whitesmoke text-gray-1700"
          } hover:bg-[#a3a3a3] hover:bg-opacity-60`}
        >
          <div className="flex flex-row items-center justify-between flex-1 gap-5">
            {item.icon}
            <span className="font-bold text-[inherit] whitespace-nowrap">
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
