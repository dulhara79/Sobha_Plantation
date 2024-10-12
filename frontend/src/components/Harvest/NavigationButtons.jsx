import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "QUALITYCHECKING", path: "/harvest/quality" },
  // { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
];
const NavigationButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(location.pathname);

  const isActive = (path) => {
    const currentPath = location.pathname.split('/')[2];
    return currentPath === path.split('/')[2];
  };
  
  return (
    <div className="sticky w-screen bg-gray-100 bg-opacity-50 border-b backdrop-blur top-16">
      <header>
        <nav aria-label="Top">
          <div className="border-gray-200">
            <div className="flex items-center justify-center">
              <ul className="flex flex-row items-center w-full h-8 gap-2 px-2 text-xs font-medium text-gray-800">
                <LeftOutlined
                  className="rounded-full hover:bg-[#abadab] p-2"
                  onClick={() => navigate(-1)}
                />
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex focus:outline-none focus:ring focus:ring-lime-500 ${isActive(activePage) === true && activePage.split('/')[2] === item.path.split('/')[2]
                        ? "text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full"
                        : "hover:bg-lime-200 rounded-full hover:py-1 transition-all duration-200"
                    }`}
                  >
                    <Link to={item.path} className="flex items-center px-2">
                      {item.icon && <item.icon className="mr-4" />}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavigationButtons;
