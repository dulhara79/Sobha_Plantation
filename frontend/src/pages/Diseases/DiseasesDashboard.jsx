import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// Import images
import diseaseIdentificationImg from "../../assets/DiseasesImages/disease.jpg";
import applicationOfTreatmentsImg from "../../assets/DiseasesImages/treatment.jpg";
import maintenanceActivitiesImg from "../../assets/DiseasesImages/maintenance.jpg";
import trendAnalysisImg from "../../assets/DiseasesImages/trend.jpg";

const DiseasesDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  // Format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <Header />
      <Sidebar />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        {/* Go Back Icon */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <LeftOutlined className="text-xl" />
        </button>
        {/* Navigation Items */}
        <div className="flex space-x-4">
          <Link to="/diseases" className="text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full font-semibold">
            Home
          </Link>
          <Link
            to="/CoconutInspections"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Inspections
          </Link>
          <Link
            to="/CoconutTreatments"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Treatments
          </Link>
          <Link
            to="/CoconutPests"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Pests and Diseases
          </Link>
          <Link
            to="/RegularMaintenance"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Maintenance
          </Link>
          {/* <Link
            to="/UserProfile"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            My Profile
          </Link> */}
        </div>
      </nav>

      <div className={`ml-[300px]`}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Crop Care",
            },
          ]}
        />
        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          {/* <h2 className="text-2xl font-semibold">Welcome Dewdu Sendanayake!</h2> */}
          <p>Today is {formattedDate}</p>
        </div>

        {/* Slogan Section */}
        <div className="my-4 p-4 bg-gradient-to-r from-yellow-300 via-green-500 to-yellow-300 rounded-lg shadow-lg text-center">
          <h2 className="text-16xl font-bold text-white animate-pulse">
            🤍🌴 Nurture Your Crops, Nourish Your Future! 🌴🤍
          </h2>
          <p className="text-xl text-white mt-2">
            Discover the best practices for healthy coconut cultivation! 
          </p>
          <div className="mt-4">
            <span className="text-4xl animate-bounce">🕊️</span>
            <span className="text-4xl animate-bounce">🥥</span>
            <span className="text-4xl animate-bounce">🕊️</span>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4 grid grid-cols-2 gap-6">
          {/* First Row: Functions Overview */}
          <Link
            to="/CoconutInspections"
            className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-yellow-300  via-white to-green-500 transition cursor-pointer"
          >
            <h1 className="text-3xl font-bold mb-2">Disease Identification</h1>
            <img
              src={diseaseIdentificationImg}
              alt="Disease Identification"
              className="w-full h-80 object-cover rounded-lg"
            />
          </Link>

          <Link
            to="/CoconutTreatments"
            className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-500  via-white to-yellow-300 transition cursor-pointer"
          >
            <h1 className="text-3xl font-bold mb-2">
              Application of Treatments
            </h1>
            <img
              src={applicationOfTreatmentsImg}
              alt="Application of Treatments"
              className="w-full h-80 object-cover rounded-lg"
            />
          </Link>

          {/* Second Row: Functions Overview */}
          <Link
            to="/RegularMaintenance"
            className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-yellow-300  via-white to-green-500 transition cursor-pointer"
          >
            <h1 className="text-3xl font-bold mb-2">Maintenance Activities</h1>
            <img
              src={maintenanceActivitiesImg}
              alt="Maintenance Activities"
              className="w-full h-80 object-cover rounded-lg"
            />
          </Link>

          <Link
            to="/insights"
            className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-500  via-white to-yellow-300 transition cursor-pointer"
          >
            <h1 className="text-3xl font-bold mb-2">Trend Analysis</h1>
            <img
              src={trendAnalysisImg}
              alt="Trend Analysis"
              className="w-full h-80 object-cover rounded-lg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiseasesDashboard;
