import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";

// Include the necessary chart.js elements
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Data for the pie chart
  const pieData = {
    labels: ["Healthy", "Maintenance Needed", "Concerned"],
    datasets: [
      {
        data: [82, 10, 8], // Corresponding data for each section
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"], // Colors: green, yellow, red
      },
    ],
  };

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
          <Link to="/diseases" className="text-[#236A64] font-semibold">
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
            to="/Maintenance"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            Maintenance
          </Link>
          <Link
            to="/UserProfile"
            className="text-[#3CCD65] hover:text-[#2b8f57]"
          >
            My Profile
          </Link>
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
          <h2 className="text-xl font-semibold">Welcome Dewdu!</h2>
          <p>Today is {formattedDate}</p>
        </div>

        {/* Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4 grid grid-cols-3 gap-6">
          {/* Left Section: Health Overview */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Health Overview</h3>
            <Pie data={pieData} />

            <h3 className="text-lg font-semibold mt-6">Recent Alerts</h3>
            <div className="mt-2">
              <div className="bg-red-500 text-white p-2 rounded-lg mb-2">
                <p>Critical Alert</p>
                <p>12/07/2024 at 11:30 am</p>
                <p>Ms. Rasanjalee Silva discovered that during the...</p>
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded-lg mb-2">
                <p>Maintenance Alert</p>
                <p>15/07/2024 at 09:00 am</p>
                <p>Fertilization needed for the section A and B of...</p>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <p>Health Reminder</p>
                <p>10/08/2024 at 8:30 am</p>
                <p>No current issues detected</p>
              </div>
            </div>
          </div>

          {/* Right Section: Functions Overview */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Link
              to="/CoconutInspections"
              className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-orange-400 to-green-500 transition cursor-pointer block flex-col h-100"
            >
              <h1 className="text-3xl font-bold mb-2">
                Disease Identification
              </h1>
              <img
                src={diseaseIdentificationImg}
                alt="Disease Identification"
                className="w-full h-80 object-cover rounded-lg"
              />
            </Link>

            <Link
              to="/CoconutTreatments"
              className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-orange-500 transition cursor-pointer block flex-col h-100"
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

            <Link
              to="/maintenance-activities"
              className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-green-400 to-orange-500 transition cursor-pointer block flex-col h-100"
            >
              <h1 className="text-3xl font-bold mb-2">
                Maintenance Activities
              </h1>
              <img
                src={maintenanceActivitiesImg}
                alt="Maintenance Activities"
                className="w-full h-80 object-cover rounded-lg"
              />
            </Link>

            <Link
              to="/trend-analysis"
              className="bg-[#7EF486] p-8 rounded-lg text-center hover:bg-gradient-to-r from-orange-400 to-green-500 transition cursor-pointer block flex-col h-100"
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
    </div>
  );
};

export default DiseasesDashboard;
