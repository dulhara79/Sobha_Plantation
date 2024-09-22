import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import Weather from "../../components/WeatherInf";

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const HarvestDashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({ coconut: 0, pepper: 0, papaya: 0, banana: 0 });
    const [upcomingHarvests, setUpcomingHarvests] = useState([]);
    const [expiredHarvests, setExpiredHarvests] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

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

    const getTodayDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    };

    const onBackClick = useCallback(() => {
        navigate(-1); // Navigate back to the previous page
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <div className="ml-[300px] pt-3 flex-2">
                    <nav className="flex items-left justify-between p-4 bg-transparent">
                        <button onClick={onBackClick} className="text-gray-600 hover:text-gray-800">
                            <ArrowBack className="text-xl" />
                        </button>
                        <div className="flex space-x-1.5">
                            <Link to="/harvest/harvestdashboard" className="text-[#236A64] font-semibold">Home</Link>
                            <Link to="/harvest/harvest-schedule" className="text-[#3CCD65] hover:text-[#2b8f57]">Schedule</Link>
                            <Link to="/harvest/yield" className="text-[#3CCD65] hover:text-[#2b8f57]">YieldRecords</Link>
                            <Link to="/harvest/compliancechecklist" className="text-[#3CCD65] hover:text-[#2b8f57]">ComplianceChecklist</Link>
                        </div>
                    </nav>

                    <Breadcrumb
                        items={[
                            {
                                href: '',
                                title: <HomeOutlined />,
                            },
                            {
                                title: "Schedule",
                            },
                            {
                                title: "Dashboard",
                            },
                        ]}
                    />

                    <div className="mt-5">
                        <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <b className="mb-2 text-3xl">Welcome to the Harvest Dashboard</b>
                                    <div className="text-xl text-gray-900">
                                        <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
                                    </div>
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
        </div>
    );
};

export default HarvestDashboard;
