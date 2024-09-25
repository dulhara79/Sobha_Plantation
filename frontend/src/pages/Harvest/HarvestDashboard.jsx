import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../index.css";
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import DateTimeDisplay from '../../components/Harvest/DateTimeDisplay';
import Weather from "../../components/WeatherInf";

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);
const menuItems = [
    { name: "HOME", path: "/harvest/harvestdashboard" },
    { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
    { name: "YIELD", path: "/harvest/yield" },
    { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
  ];

const HarvestDashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({ coconut: 0, pepper: 0, papaya: 0, banana: 0 });
    const [upcomingHarvests, setUpcomingHarvests] = useState([]);
    const [expiredHarvests, setExpiredHarvests] = useState([]);
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation();
    const activePage = location.pathname;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const yieldResponse = await axios.get('http://localhost:5000/api/yield');
                prepareChartData(yieldResponse.data.data);
                calculateTotals(yieldResponse.data.data);

                const harvestResponse = await axios.get('http://localhost:5000/api/harvest');
                classifyHarvests(harvestResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const prepareChartData = (data) => {
        if (!data || !Array.isArray(data)) {
            console.error('Invalid data format');
            return;
        }

        const labels = data.map(record => new Date(record.harvestdate).toLocaleDateString());
        const quantities = data.map(record => record.quantity);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Yield Quantity',
                    data: quantities,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
            ],
        });
    };

    const calculateTotals = (data) => {
        const totals = data.reduce((acc, record) => {
            acc[record.cropType] = (acc[record.cropType] || 0) + record.quantity;
            return acc;
        }, {});

        setTotals({
            coconut: totals.coconut || 0,
            pepper: totals.pepper || 0,
            papaya: totals.papaya || 0,
            banana: totals.banana || 0,
            pineapple: totals.pineapple || 0, // Added pineapple
        });
    };

    const classifyHarvests = (schedules) => {
        const now = new Date();
        const upcoming = [];
        const expired = [];

        schedules.forEach(schedule => {
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

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Harvest Yield Trends',
            },
        },
    };
    const isActive = (page) => activePage === page;

    // const getTodayDate = () => {
    //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //     return new Date().toLocaleDateString(undefined, options);
    // };

    const onBackClick = useCallback(() => {
        navigate(-1); // Navigate back to the previous page
    }, [navigate]);

    return (
        <div>
            <Header />
           <Sidebar className="sidebar" />
            <div className="ml-[300px] p-5">
                <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
                 <div className="flex items-center justify-center">
                    <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
                       <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2" onClick={onBackClick} />
                        {menuItems.map((item) => (
                          <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                        <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                         </li>
                        ))}
                  </ul>
             </div>
          </nav>

                  <div className="flex items-center justify-between mb-5">
                    <Breadcrumb
                        items={[
                            {href: '', title: <HomeOutlined />},
                            {title: "Dashboard"},
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

                        <div className="flex flex-row justify-between mt-5 gap-4">
                            <div className="flex-1 flex flex-col items-center justify-center p-3 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105">
                                <h3 className="text-xl text-center">Upcoming Harvests</h3>
                                <ul>
                                    {upcomingHarvests.map((harvest, index) => (
                                        <li key={index}>
                                            {harvest.cropType} - {new Date(harvest.harvestDate).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-3 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-red-400 to-red-600 hover:scale-105">
                                <h3 className="text-xl text-center">Expired Harvests</h3>
                                {expiredHarvests.length > 0 ? (
                                    <ul className="w-full">
                                        {expiredHarvests.map((harvest, index) => (
                                            <li key={index} className="py-1">
                                                {harvest.cropType} - {new Date(harvest.harvestDate).toLocaleDateString()}
                                                <span className="block text-sm text-gray-100">
                                                    Available since: {new Date(harvest.availabilityDate).toLocaleDateString()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No expired harvests.</p>
                                )}
                                <p className="mt-2 text-lg font-bold text-yellow-200">
                                    Reminder: Review expired harvests and update records accordingly.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 shadow-lg rounded-lg p-5 bg-white w-full max-w-5xl mx-auto h-[600px]">
                            {loading ? (
                                <p>Loading chart...</p>
                            ) : (
                                <Line data={chartData} options={options} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default HarvestDashboard;
