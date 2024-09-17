import React, { useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material"; // Ensure this import is correct
import "../../index.css";

const ScheduleOptionsPage = () => {
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

  const handleAddSchedule = useCallback(() => {
    navigate('/harvest/addschedule');
  }, [navigate]);

  const handleReviewSchedule = useCallback(() => {
    navigate('/harvest/harvest-schedule');
  }, [navigate]);

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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Schedule
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
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

          <div className="flex flex-col items-center justify-center flex-1 p-1 bg-white rounded-lg shadow-lg">
            <h1 className="text-5xl font-bold mb-1 text-center">Manage Harvest Schedules</h1>
            <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-lg shadow-1xl">
              <button
                onClick={handleAddSchedule}
                className="bg-green-500 text-white py-4 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center"
                style={{ width: '500px', height: '220px', fontSize: '24px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.7)' }}
              >
                <span style={{ fontSize: '4rem' }}>➕</span>
                <span className="mt-2 text-xl">Add Harvest Schedule</span>
              </button>
              <button
                onClick={handleReviewSchedule}
                className="bg-green-500 text-white py-4 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center"
                style={{ width: '500px', height: '220px', fontSize: '24px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.7)' }}
              >
                <span style={{ fontSize: '4rem' }}>📋</span>
                <span className="mt-2 text-xl">Review Harvest Schedules</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleOptionsPage;
