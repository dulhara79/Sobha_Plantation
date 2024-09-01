import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { notification, Card, Table } from "antd";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import WeatherComponent from "../../components/WeatherInf";
import { HomeOutlined } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb } from 'antd';

const HarvestDashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [todaysHarvests, setTodaysHarvests] = useState({});
  const navigate = useNavigate();

  // Fetch schedules from API
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/harvest");
      if (response.data.success) {
        const data = response.data.data;
        setSchedules(data);
        processHarvestData(data);
      } else {
        console.error("Error fetching schedules: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching schedules: ", error.message);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Process the harvested data to filter and count
  const processHarvestData = (schedules) => {
    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
    const harvestCounts = {};

    schedules.forEach((schedule) => {
      const harvestDate = moment(schedule.harvestDate).startOf('day');
      
      // Remove expired dates
      if (harvestDate.isBefore(today, 'day')) {
        // Implement the logic to remove expired dates from the database if needed
        return;
      }

      // Count harvests starting from the last 7 days
      if (harvestDate.isBetween(sevenDaysAgo, today, 'day', '[]')) {
        const cropType = schedule.cropType;
        if (harvestCounts[cropType]) {
          harvestCounts[cropType].count++;
          harvestCounts[cropType].dates.push(harvestDate.format("YYYY-MM-DD"));
        } else {
          harvestCounts[cropType] = { count: 1, dates: [harvestDate.format("YYYY-MM-DD")] };
        }
      }
    });

    setTodaysHarvests(harvestCounts);

    // Notify for harvests scheduled for today
    Object.keys(harvestCounts).forEach((cropType) => {
      notification.info({
        message: `Today's Harvest - ${cropType}`,
        description: `Harvest for ${cropType} is scheduled for today.`,
        placement: 'topRight',
      });
    });
  };

  // Navigation Handlers
  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/schedule-options");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/yield-options");
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

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Render separate tables for each crop type
  const renderTables = () => {
    return Object.keys(todaysHarvests).map((cropType) => {
      const { count, dates } = todaysHarvests[cropType];
      const columns = [
        { title: 'Crop Type', dataIndex: 'cropType', key: 'cropType' },
        { title: 'Count', dataIndex: 'count', key: 'count' },
        { title: 'Dates', dataIndex: 'dates', key: 'dates' },
      ];

      const dataSource = [
        {
          key: cropType,
          cropType,
          count,
          dates: dates.join(', '),
        },
      ];

      return (
        <Card
          key={cropType}
          title={cropType}
          bordered={false}
          style={{
            marginBottom: '16px',
            backgroundColor: '#d4edda', // Light green background
            border: '1px solid #c3e6cb', // Slightly darker green border
          }}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            showHeader={false}
            style={{
              marginTop: '0', // Remove extra margin from table
            }}
          />
        </Card>
      );
    });
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
                <b className="mb-2 text-3xl">Welcome,</b>
                <div className="text-xl text-gray-900">
                  <div className="font-medium">{`Today is ${getTodayDate()}`}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <NotificationsIcon className="mb-2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Weather Component Section */}
          <div className="mt-5 flex justify-center">
            <WeatherComponent />
          </div>

          {/* Today's Harvest Count Section */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-4">UpComming Harvest Event</h2>
            {renderTables()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestDashboard;
