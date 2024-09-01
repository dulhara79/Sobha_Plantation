import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import BlackBeetleImage from "../../assets/DiseasesImages/BlackBeetle.jpg"; // Adjust the path based on your file structure

const BlackBeetle = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Coconut Pests and Diseases",
            },
            {
              href: "",
              title: "Black Beetle",
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Black Beetle</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BlackBeetleImage}
              alt="Black Beetle"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Black Beetle is a common pest affecting coconut trees. This
              beetle bores into the trunk and fronds, causing significant damage
              by disrupting the transport of nutrients and water within the
              tree, ultimately reducing yield and tree health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Holes bored into the trunk and fronds.</li>
              <li>Wilting and yellowing of leaves.</li>
              <li>Presence of frass around bore holes.</li>
              <li>Reduced growth and vitality of the tree.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>
                Application of systemic insecticides to kill larvae and adults.
              </li>
              <li>
                Use of biological control agents such as entomopathogenic fungi.
              </li>
              <li>
                Regular monitoring and removal of infested parts of the tree.
              </li>
              <li>Use of traps to catch adult beetles and prevent breeding.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackBeetle;
