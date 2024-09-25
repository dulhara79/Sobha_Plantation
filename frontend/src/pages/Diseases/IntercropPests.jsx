import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const IntercropPests = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

    // List of pests and diseases and their corresponding routes
    const pests = [
      { name: "Fruit Flies", route: "/fruitFlies" },
      { name: "Banana Weevil", route: "/bananaWeevil" },
      { name: "Pineapple Mealybug", route: "/pineappleMealybug" },
      { name: "Papaya Mealybug", route: "/papayaMealybug" },
      { name: "Thrips", route: "/thrips" },
      { name: "Aphids", route: "/aphids" },
    ];
  
    const diseases = [
      { name: "Anthracnose", route: "/anthracnose" },
      { name: "Bacterial Wilt", route: "/bacterialWilt" },
      { name: "Black Sigatoka", route: "/blackSigatoka" },
      { name: "Papaya Ringspot", route: "/papayaRingspot" },
      { name: "Fusarium Wilt", route: "/fusariumWilt" },
      { name: "Powdery Mildew", route: "/powderyMildew" },
    ];

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
          <Link to="/CoconutPests" className="text-[#236A64] font-semibold">
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

      <div className={`ml-[300px] p-4`}>
        <Breadcrumb
          items={[
            {
              href: "/diseases",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Inter Crops Pests and Diseases",
            },
          ]}
        />

        {/* Topic Heading */}
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-semibold">Pests and Diseases</h1>
        </div>

        {/* Buttons for Coconuts and Inter Crops */}
        <div className="flex justify-center space-x-8 mt-2">
          <Button
            style={{
              backgroundColor: "rgba(196, 196, 196, 0)",
              width: "300px",
              height: "28px",
            }}
            onClick={() => navigate("/coconutPests")}
          >
            Coconuts
          </Button>
          <Button
            style={{
              backgroundColor: "rgba(196, 196, 196, 0.44)",
              width: "300px",
              height: "28px",
            }}
            onClick={() => navigate("/intercropPests")}
          >
            Inter Crops
          </Button>
        </div>

        {/* Pest Section */}
        <div className="mt-8 mb-8">
          <h1 className="text-2xl font-semibold mb-9">Common Inter-Crop Pests</h1>

          {/* Grid for Pest Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Buttons for Different Pests */}
            {pests.map(({ name, route }) => (
              <Button
                key={name}
                type="primary"
                block
                className="py-16 px-6 text-lg rounded-lg shadow-lg text-white font-bold"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FFB74D 60%, #E1F5FE 100%)",
                  border: "none",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 15px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
                onClick={() => navigate(route)}
              >
                {name} <RightOutlined />
              </Button>
            ))}
          </div>

          {/* Diseases Section */}
          <div className="mt-10">
            <h1 className="text-2xl font-semibold mb-9">
              Common Inter-Crop Diseases
            </h1>

            {/* Grid for Disease Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Buttons for Different Diseases */}
              {diseases.map(({ name, route }) => (
                <Button
                  key={name}
                  type="primary"
                  block
                  className="py-16 px-6 text-lg rounded-lg shadow-lg text-white font-bold"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #FFB74D 60%, #E1F5FE 100%)",
                    border: "none",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0, 0, 0, 0.1)";
                  }}
                  onClick={() => navigate(route)}
                >
                  {name} <RightOutlined />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercropPests;
