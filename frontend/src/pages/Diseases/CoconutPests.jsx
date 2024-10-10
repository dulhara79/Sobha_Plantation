import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DiseasesNavBar from "../../components/DiseasesComponents/DiseasesNavBar";

const CoconutPests = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  // List of pests and diseases and their corresponding routes
  const pests = [
    { name: "Coconut Leaf Miner", route: "/coconutLeafMiner" },
    { name: "The Black Beetle", route: "/blackBeetle" },
    { name: "Coconut Mites", route: "/coconutMite" },
    { name: "Termites", route: "/termite" },
    { name: "The Red Weevil", route: "/redWeevil" },
    { name: "Mammalian Pests", route: "/mammalianPests" },
  ];

  const diseases = [
    { name: "Bud Rot", route: "/budRot" },
    { name: "Leaf Spot", route: "/leafSpot" },
    { name: "Stem Bleeding", route: "/stemBleeding" },
    { name: "Root Wilt", route: "/rootWilt" },
    { name: "Lethal Yellowing", route: "/lethalYellowing" },
    { name: "Ganoderma", route: "/ganoderma" },
  ];

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[285px] mt-2 p-4`}>
        <Breadcrumb
          items={[
            {
              href: "/diseases",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Coconut Pests and Diseases",
            },
          ]}
        />

        {/* Diseases Navigation Bar */}
        <div style={{ marginBottom: "22px" }}>
              <DiseasesNavBar style={{ height: "80px" }} />{" "}
            </div>

        {/* Topic Heading */}
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-semibold">Pests and Diseases</h1>
        </div>

        {/* Buttons for Coconuts and Inter Crops */}
        <div className="flex justify-center space-x-8 mt-2">
          <Button
            style={{
              backgroundColor: "rgba(196, 196, 196, 0.44)",
              width: "300px",
              height: "28px",
            }}
            onClick={() => navigate("/CoconutPests")}
          >
            Coconuts
          </Button>
          <Button
            style={{
              backgroundColor: "rgba(196, 196, 196, 0)",
              width: "300px",
              height: "28px",
            }}
            onClick={() => navigate("/IntercropPests")}
          >
            Inter Crops
          </Button>
        </div>

        {/* Pest Section */}
        <div className="mt-8 mb-8">
          <h1 className="text-2xl font-semibold mb-9">Common Coconut Pests</h1>

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
                    "linear-gradient(135deg, #6dd400 30%, #fcb045 100%)",
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
              Common Coconut Diseases
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
                      "linear-gradient(135deg, #6dd400 30%, #fcb045 100%)",
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

export default CoconutPests;
