import React, { useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@ant-design/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const Fertilizer = () => {
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/Inventory/InventoryDashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/Inventory/Fertilizer"); // Navigate to Fertilizer
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/Inventory/Maintenance"); // Navigate to Maintenance
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/Inventory/Equipments"); // Navigate to Equipments
  }, [navigate]);

  const onAddFertilizerClick = useCallback(() => {
    navigate("/Inventory/FertilizerForm"); // Navigate to FertilizerForm
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
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Fertilizer
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick1}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Maintenance
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Equipments
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
              title: "Inventory",
            },
            {
              title: "Fertilizer",
            },
          ]}
        />

        {/* Add New Fertilizer Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onAddFertilizerClick}
            className="bg-mediumspringgreen text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-500"
          >
            <AddIcon />
            <span>Add New Fertilizer</span>
          </button>
        </div>

        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
            
          {/* Fertilizer Table */}

          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="px-4 py-2 border-b">Fertilizer ID</th>
                  <th className="px-4 py-2 border-b"> Date</th>
                  <th className="px-4 py-2 border-b">Type</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Storage Location</th>
                  <th className="px-4 py-2 border-b">Expire Date</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row */}
                <tr>
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">2024-08-15</td>
                  <td className="px-4 py-2 border-b">Papaya</td>
                  <td className="px-4 py-2 border-b">5kg</td>
                  <td className="px-4 py-2 border-b">Warehouse 3</td>
                  <td className="px-4 py-2 border-b">2025-12-19</td>
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
                <tr>
                  <td className="px-4 py-2 border-b">2</td>
                  <td className="px-4 py-2 border-b">2024-08-20</td>
                  <td className="px-4 py-2 border-b">Pepper</td>
                  <td className="px-4 py-2 border-b">5kg</td>
                  <td className="px-4 py-2 border-b">Warehouse 3</td>
                  <td className="px-4 py-2 border-b">2025-12-16</td>
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
                <tr>
                  <td className="px-4 py-2 border-b">3</td>
                  <td className="px-4 py-2 border-b">2024-08-31</td>
                  <td className="px-4 py-2 border-b">Coconut</td>
                  <td className="px-4 py-2 border-b">8KG</td>
                  <td className="px-4 py-2 border-b">Warehouse 2</td>
                  <td className="px-4 py-2 border-b">2025-12-1</td>
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

export default Fertilizer;
