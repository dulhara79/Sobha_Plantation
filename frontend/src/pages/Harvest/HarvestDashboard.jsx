import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../index.css";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DateTimeDisplay from "../../components/Harvest/DateTimeDisplay";
import Weather from "../../components/WeatherInf";
import LoadingDot from '../../components/LoadingDots'; 

const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "QUALITYCHECKING", path: "/harvest/quality" },
  // { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
];

const HarvestDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingHarvests, setUpcomingHarvests] = useState([]);
  const [expiredHarvests, setExpiredHarvests] = useState([]);
  const navigate = useNavigate(); 
  const location = useLocation();
  const activePage = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {

        setTimeout(async () => {
          
        const harvestResponse = await axios.get(
          "http://localhost:5000/api/harvest"
        );
        classifyHarvests(harvestResponse.data.data);
        

        setLoading(false); // Stop loading after data fetch
        }, 500); // Adjust the delay as needed
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
  
      }
    };

    fetchData();
  }, []);

  const classifyHarvests = (schedules) => {
    const now = new Date();
    const upcoming = [];
    const expired = [];

    schedules.forEach((schedule) => {
      const harvestDate = new Date(schedule.harvestDate);
      if (harvestDate > now) {
        upcoming.push(schedule);
      } else if (harvestDate < now) {
        expired.push(schedule);
      }
    });

    setUpcomingHarvests(upcoming);
    setExpiredHarvests(expired);
  };

  const isActive = (page) => activePage === page;

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  if (loading) return <LoadingDot />;
  
  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
              <ArrowBackIcon
                className="rounded-full hover:bg-[#abadab] p-2"
                onClick={onBackClick}
              />
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={`flex ${
                    isActive(item.path)
                      ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full"
                      : "hover:bg-lime-200 rounded-full"
                  }`}
                >
                  <Link to={item.path} className="flex items-center px-2">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center justify-between mb-5">
          <Breadcrumb
            items={[
              { href: "", title: <HomeOutlined /> },
              { title: "Harvest" },
            ]}
          />
        </div>

        <div className="mt-5">
          <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
            <div className="flex flex-row items-center justify-between">
              <DateTimeDisplay />
              <div className="flex items-center">
                <NotificationsIcon className="text-3xl" />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Weather />
          </div>

          <div className="flex flex-row justify-between gap-4 mt-5">
            <div className="flex flex-col items-center justify-center flex-1 p-3 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105">
              <h3 className="text-xl text-center">Upcoming Harvests</h3>
              <ul>
                {upcomingHarvests.map((harvest, index) => (
                  <li key={index}>
                    {harvest.cropType} -{" "}
                    {new Date(harvest.harvestDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 p-3 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-red-400 to-red-600 hover:scale-105">
              <h3 className="text-xl text-center">Expired Harvests</h3>
              {expiredHarvests.length > 0 ? (
                <ul className="w-full">
                  {expiredHarvests.map((harvest, index) => (
                    <li key={index} className="py-1">
                      {harvest.cropType} -{" "}
                      {new Date(harvest.harvestDate).toLocaleDateString()}
                      <span className="block text-sm text-gray-100">
                        Available since:{" "}
                        {new Date(
                          harvest.availabilityDate
                        ).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No expired harvests.</p>
              )}
              <p className="mt-2 text-lg font-bold text-yellow-200">
                Reminder: Review expired harvests and update records
                accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestDashboard;
