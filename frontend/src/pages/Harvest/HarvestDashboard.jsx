import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const HarvestDashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({ coconut: 0, pepper: 0, papaya: 0, banana: 0 });
    const [upcomingHarvests, setUpcomingHarvests] = useState([]);
    const [expiredHarvests, setExpiredHarvests] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch yield records
                const yieldResponse = await axios.get('http://localhost:5000/api/yield');
                prepareChartData(yieldResponse.data.data);
                calculateTotals(yieldResponse.data.data);

                // Fetch harvest schedules
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
    // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };


    // Navigation Handlers
    const onGroupContainerClick = useCallback(() => {
        navigate("/harvest/harvest-schedule");
      }, [navigate]);
    
      const onGroupContainerClick1 = useCallback(() => {
        navigate("/harvest/yield");
      }, [navigate]);
    
      const onGroupContainerClick2 = useCallback(() => {
        navigate("/harvest/compliancechecklist");
      }, [navigate]);
    
      const onHomeClick = useCallback(() => {
        navigate("/harvest/harvestdashboard"); // Navigate to HarvestDashboard
      }, [navigate]);
    
      const onBackClick = useCallback(() => {
        navigate(-1); // Navigate back to the previous page
      }, [navigate]);

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
                            className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
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
                            className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
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
                                Compliance Check List
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
                            title: "Schedule",
                        },
                        {
                            title: "Dashboard",
                        },
                    ]}
                />

                <div className="mt-5">
                    {/* Welcome message section */}
                    <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <b className="mb-2 text-3xl">Welcome Harvest Dashboard🙏🙏</b>
                                <div className="text-xl text-gray-900">
                                    <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Existing Dashboard Content */}
                    <div className="grid grid-cols-2 gap-5 mt-5">
    <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105">
        <h3 className="text-xl text-center">Total Coconut 🥥</h3>
        <p className="mt-2 font-extrabold text-4xl">{totals.coconut}</p>
    </div>
    <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105">
        <h3 className="text-xl text-center">Total Pepper 🌶️</h3>
        <p className="mt-2 font-extrabold text-4xl">{totals.pepper}</p>
    </div>
    <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-red-600 hover:scale-105">
        <h3 className="text-xl text-center">Total Papaya 🥭</h3>
        <p className="mt-2 font-extrabold text-4xl">{totals.papaya}</p>
    </div>
    <div className="flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105">
        <h3 className="text-xl text-center">Total Banana 🍌</h3>
        <p className="mt-2 font-extrabold text-4xl">{totals.banana}</p>
    </div>
    <div className="col-span-2 flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105">
        <h3 className="text-xl text-center">Total Pineapple 🍍</h3>
        <p className="mt-2 font-extrabold text-4xl">{totals.pineapple}</p>
    </div>
</div>



                    {/* Harvests Overview */}
                    <div className="flex flex-row justify-between mt-5 gap-4">
                        <div className="flex-1 flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-green-600 hover:scale-105">
                            <h3 className="text-xl text-center">Upcoming Harvests</h3>
                            <ul>
                                {upcomingHarvests.map((harvest, index) => (
                                    <li key={index}>
                                        {harvest.cropType} - {new Date(harvest.harvestDate).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-5 text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg bg-gradient-to-r from-red-400 to-red-600 hover:scale-105">
                          <h3 className="text-xl text-center">Expired Harvests</h3>
                          {expiredHarvests.length > 0 ? (
                          <ul className="w-full">
                            {expiredHarvests.map((harvest, index) => (
                            <li key={index} className="py-2">
                            {harvest.cropType} - {new Date(harvest.harvestDate).toLocaleDateString()} 
                            <span className="block text-sm text-gray-300">
                             Available since: {new Date(harvest.availabilityDate).toLocaleDateString()}
                            </span>
                           </li>
                             ))}
                         </ul>
                       ) : (
                          <p>No expired harvests.</p>
                             )}
                           <p className="mt-4 text-lg font-semibold text-yellow-200">
                         Reminder: Review expired harvests and update records accordingly.
                            </p>
                     </div>

                    </div>

                    {/* Line Chart Section */}
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
