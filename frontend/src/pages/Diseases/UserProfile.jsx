import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import ProfileImage from "../../assets/DiseasesImages/Dewdu.jpg";

const UserProfile = () => {
  const navigate = useNavigate(); // Initialize navigate

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
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
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
          <Link to="/UserProfile" className="text-[#236A64] font-semibold">
            My Profile
          </Link>
        </div>
      </nav>

      <div className="ml-[300px] p-4">
        <Breadcrumb
          items={[
            {
              href: "/diseases",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Profile",
            },
          ]}
        />

        {/* Profile Section */}
        <div className="mt-8">
          <h1 className="text-8xl text-center font-semibold mb-8">
            User Profile
          </h1>

          {/* Profile Container */}
          <div className="flex flex-col items-center justify-center">
            {/* Profile Content */}
            <div className="bg-[#3CCD65] rounded-3xl shadow-lg p-10 flex flex-col items-center relative w-3/4 max-w-4xl mt-12 h-[450px]">
              {/* Profile Image */}
              <div className="absolute -top-16">
                <img
                  src={ProfileImage}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              {/* User Details */}
              <div className="mt-20 text-xl font-bold text-center w-full">
                <h3 className="text-10xl font-bold mb-4 text-white">
                  Dewdu Sendanayake
                </h3>
                <ul className="text-black space-y-2 list-none">
                  <li>
                    Date of Birth:{" "}
                    <span className="font-medium text-xl">31/08/2001</span>
                  </li>
                  <li>
                    Gender: <span className="font-medium text-xl">Female</span>
                  </li>
                  <li>
                    Email:{" "}
                    <span className="font-medium text-xl">
                      hdsendanayake@gmail.com
                    </span>
                  </li>
                  <li>
                    Contact Number:{" "}
                    <span className="font-medium text-xl">0707081326</span>
                  </li>
                  <li>
                    Address:{" "}
                    <span className="font-medium text-xl">
                      54/21, Villuda Uyana, Panagoda, Homagama
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-10 mt-8 mb-8">
              <Button
                type="default"
                className="bg-[#3CCD65] text-white hover:bg-[#2b8f57] rounded-full px-15 py-5 shadow-md"
                onClick={() => navigate("/addProfile")} // Navigate to AddProfile on click
              >
                Update Profile
              </Button>
              <Button
                type="default"
                className="bg-[#3CCD65] text-white hover:bg-[#2b8f57] rounded-full px-15 py-5 shadow-md"
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
