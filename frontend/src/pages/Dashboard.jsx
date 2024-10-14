import React from "react";
import Header from "../components/Header";
import "../index.css";
import {
  HomeOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  TeamOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// Import images for each box
import cultivationImage from "../assets/DashboardImg/cultivation.jpg";
import inventoryImage from "../assets/DashboardImg/inventory.png";
import harvestImage from "../assets/DashboardImg/harvest.jpg";
import cropCareImage from "../assets/DashboardImg/cropcare.jpg";
import productsImage from "../assets/DashboardImg/products.png";
import financeImage from "../assets/DashboardImg/finance.jpg";
import employeeImage from "../assets/DashboardImg/employee.png";
import buyerImage from "../assets/DashboardImg/buyer.jpg";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="ml-16 mr-16 mt-1">
        {/* Breadcrumb for navigation */}
        {/* <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb> */}

        {/* Slogan */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-[5rem] font-bold text-green-800 animate-grow">
            Sobha Plantations
          </h1>
          <p className="text-2xl text-gray-600 italic">
            We grow with care, for all to share!
          </p>

          {/* Tailwind custom CSS within JSX */}
          <style jsx>{`
            @keyframes grow {
              0% {
                transform: scale(0.5);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }

            .animate-grow {
              animation: grow 2s ease-in-out;
            }
          `}</style>
        </div>

        <div className="grid grid-cols-4 gap-10 mx-4 mb-20">
          {/* Box 1 */}
          <Link
            to="/cultivationDashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={cultivationImage}
              alt="Cultivation"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Cultivation</h2>
          </Link>

          {/* Box 2 */}
          <Link
            to="/inventory/InventoryDashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={inventoryImage}
              alt="Inventory"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Inventory</h2>
          </Link>

          {/* Box 3 */}
          <Link
            to="/harvest/harvestdashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={harvestImage}
              alt="Harvest"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Harvest</h2>
          </Link>

          {/* Box 4 */}
          <Link
            to="/diseases"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={cropCareImage}
              alt="Crop-Care"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Crop-Care</h2>
          </Link>

          {/* Box 5 */}
          <Link
            to="/products/productdashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={productsImage}
              alt="Products"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Products</h2>
          </Link>

          {/* Box 6 */}
          <Link
            to="/salesAndFinance/"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={financeImage}
              alt="Finance"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Finance</h2>
          </Link>

          {/* Box 7 */}
          <Link
            to="/employee/dashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={employeeImage}
              alt="Employee"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Employee</h2>
          </Link>

          {/* Box 8 */}
          <Link
            to="/buyerdashboard"
            className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer text-center"
          >
            <img
              src={buyerImage}
              alt="Buyer"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold">Buyer</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
