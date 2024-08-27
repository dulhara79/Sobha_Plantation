import React, { useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const YieldRecords = () => {
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/harvest/harvestdashboard"); // Navigate to HarvestDashboard
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/harvest-schedule"); // Navigate to harvest-schedule
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/harvest/yield"); // Navigate to yield
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/harvest/task"); // Navigate to task
  }, [navigate]);

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    // Implement edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
    // Implement delete logic here
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
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Home
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Schedule
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Yield Records
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Task Assign
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
              title: "Yield Records",
            },
            {
              title: "Dashboard",
            },
          ]}
        />

        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
          {/* Harvest Schedule Table */}
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="px-4 py-2 border-b">Harvest ID</th>
                  <th className="px-4 py-2 border-b">Harvest Date</th>
                  <th className="px-4 py-2 border-b">Crop Type</th>
                  <th className="px-4 py-2 border-b">Age of yield date</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Way Picked</th>
                  <th className="px-4 py-2 border-b">Storage Location</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row */}
                <tr>
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">2024-08-24</td>
                  <td className="px-4 py-2 border-b">Coconut</td>
                  <td className="px-4 py-2 border-b">10</td>
                  <td className="px-4 py-2 border-b">10000KG</td>
                  <td className="px-4 py-2 border-b">Manual</td>
                  <td className="px-4 py-2 border-b">L001</td>
                  <td className="px-4 py-2 border-b flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(1)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(1)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default YieldRecords;