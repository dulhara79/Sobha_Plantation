import React, { Fragment, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { name: "HOME", path:"/buyerdashboard"  },
    { name: "BUYER RECORDS", path: "/buyerinfotable" },
    { name: "PRE ORDER", path: "/preorders" },
    { name: "DELIVERY DETAILS", path: "/Bdeliverytable" },
    
];

    export default function FieldViewNavbar() {
        const [open, setOpen] = useState(false)
        const location = useLocation();
        const [activeTab, setActiveTab] = useState(null);
    
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
                                    {menuItems.map((item) => (
                                        <li
                                            key={item.name}
                                            className={`flex focus:outline-none focus:ring focus:ring-lime-500 ${
                                                isActive(item.path) ? " text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full " : "hover:bg-lime-200 rounded-full  hover:py-1 transition-all duration-200"
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
        )
    }

