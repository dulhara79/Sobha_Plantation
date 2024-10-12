import React, { Fragment, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { name: "HOME", path: "/harvest/home" },
    { name: "RECORDS", path: "/harvest/harvestRecords" },
    { name: "ESTIMATED HARVEST", path: "/harvest/calculateHarvest" },


];

export default function HarvestNavigation() {
    const [open, setOpen] = useState(false)
    const location = useLocation();
    const isActive = (path) => {
        // Check if the current pathname starts with the specified path
        return location.pathname.startsWith(path);
    };

    return (
        <div className="bg-gray-100 bg-opacity-50 backdrop-blur sticky top-12 border-b w-screen">
            <header className=" ">
                <nav aria-label="Top" className="">
                    <div className=" border-gray-200 ">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row items-center w-full gap-2 text-gray-800 px-2 text-xs font-medium h-8">
                                {menuItems.map((item) => (
                                    <li
                                        key={item.name}
                                        className={`flex focus:outline-none focus:ring focus:ring-lime-500 ${
                                            isActive(item.path) ? " text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full " : "hover:text-gray-600"
                                        }`}
                                    >
                                        <Link to={item.path} className="px-2 flex items-center ">
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
