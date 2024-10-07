import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ArrowBack from "@mui/icons-material/ArrowBack"; // Adjust the import based on your icon setup

const YieldBarChartPage = () => {
  const [yieldData, setYieldData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/harvest/harvestdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/schedule-options");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/yield-options");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/harvest/compliancechecklist");
  }, [navigate]);

  useEffect(() => {
    const fetchYieldData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/yield"); // Update the endpoint as needed
        console.log("API response:", response.data);
        setYieldData(response.data.data); // Ensure this matches your API response structure
      } catch (err) {
        console.error("Error fetching yield data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYieldData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading yield data: {error.message}</p>;
  }

  if (!yieldData || yieldData.length === 0) {
    return <p>No yield data available.</p>;
  }

  // Preparing data for the bar chart
  const barData = {
    labels: yieldData.map((record) => record.cropType),
    datasets: [
      {
        label: "Yield Quantity",
        data: yieldData.map((record) => record.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          <nav className="p-4 mb-5">
            {/* Navigation Buttons */}
            <div className="container flex items-center justify-between mx-auto space-x-4">
              <div
                className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
                onClick={onBackClick}
              >
                <ArrowBack className="text-gray-700" />
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Schedule
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Yield Records
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Compliance Check List
                </a>
              </div>
            </div>
          </nav>
          <h1 className="text-5xl font-bold mb-6 text-center">
            Yield Bar Chart
          </h1>
          <div style={{ width: "1000px", height: "500px", margin: "0 auto" }}>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldBarChartPage;
