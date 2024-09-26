import React from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import {Link} from "react-router-dom";

function Breadcrumb({ items }) {
    return (
        <nav className="flex ml-8 my-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {/* Render the Home icon with the specified path */}
                <li className="inline-flex items-center">
                    <HomeIcon className="w-4 h-4 mr-1 text-gray-700 dark:text-gray-400" />
                    <Link to="/dashboard" className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                        Dashboard
                    </Link>
                </li>
                {/* Render other breadcrumb items */}
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {/* Arrow separator for all items */}
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </div>
                        <Link to={item.href} className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {/* Render the name of the breadcrumb item */}
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
