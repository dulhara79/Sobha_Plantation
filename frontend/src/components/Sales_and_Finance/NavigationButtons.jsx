import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

// const NavigationButtons = ({ activePage }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex items-center mb-6 space-x-2">
//       <Button
//         type="primary"
//         className="bg-black rounded-full hover:bg-[#39cc63]"
//         onClick={() => navigate(-1)}
//         icon={<LeftOutlined />}
//       />
//       <Button
//         type="primary"
//         className={`rounded-full px-4 py-1 ${activePage === "home" ? "bg-[#1D6660]" : "bg-green-500 hover:bg-[#39cc63]"}`}
//         onClick={() => navigate("/salesAndFinance/")}
//       >
//         Home
//       </Button>
//       <Button
//         type="primary"
//         className={`rounded-full px-4 py-1 ${activePage === "sales" ? "bg-[#1D6660]" : "bg-green-500"} hover:bg-[#39cc63]`}
//         onClick={() => navigate("/salesAndFinance/sales/")}
//       >
//         Sales
//       </Button>
//       <Button
//         type="primary"
//         className={`rounded-full px-4 py-1 ${activePage === "finance" ? "bg-[#1D6660]" : "bg-green-500 hover:bg-[#39cc63]"}`}
//         onClick={() => navigate("/salesAndFinance/finance/")}
//       >
//         Finance
//       </Button>
//     </div>
//   );
// };

// export default NavigationButtons;

const menuItems = [
  { name: "HOME", path: "/salesAndFinance/" },
  { name: "SALES", path: "/salesAndFinance/sales/" },
  { name: "FINANCE", path: "/salesAndFinance/finance/" },
  // { name: "ATTENDANCE MARKER", path: "/employees/attendance" },
  // { name: "SALARY", path: "/employees/salary" },
];

const NavigationButtons = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    setActiveTab(path);
  };
  const isActive = (path) => {
    // Check if the current pathname starts with the specified path
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sticky w-screen bg-gray-100 bg-opacity-50 border-b backdrop-blur top-12">
      <header className="">
        <nav aria-label="Top" className="">
          <div className="border-gray-200 ">
            <div className="flex items-center justify-center">
              <ul className="flex flex-row items-center w-full h-8 gap-2 px-2 text-xs font-medium text-gray-800">
                {/* <Button
                                type="primary"
                                className="bg-black rounded-full hover:bg-[#39cc63]"
                                onClick={() => navigate(-1)}
                                icon={<LeftOutlined />}
                              /> */}
                <LeftOutlined
                  className=" rounded-full hover:bg-[#39cc63] p-2"
                  onClick={() => navigate(-1)}
                />
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex focus:outline-none focus:ring focus:ring-lime-500 ${
                      isActive(item.path)
                        ? " text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full "
                        : "hover:bg-lime-200 rounded-full  hover:py-1 transition-all duration-200"
                    }`}
                    onClick={() => handleTabClick(item.path)}
                  >
                    <Link to={item.path} className="flex items-center px-2 ">
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
