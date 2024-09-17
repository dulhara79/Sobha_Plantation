import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import CoconutMiteImage from '../../assets/DiseasesImages/CoconutMite.jpg';

const CoconutMite = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Coconut Pests and Diseases',
            },
            {
              href: '',
              title: 'Coconut Mite',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Coconut Mite</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={CoconutMiteImage}
              alt="Coconut Mite"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Coconut Mite is a tiny pest that affects coconut palms, causing a range of damage including leaf stippling and reduced overall plant vigor. These mites feed on the plant's sap, leading to chlorosis and poor growth.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of fine stippling or mottling on leaves.</li>
              <li>Yellowing and curling of leaves.</li>
              <li>Reduced plant growth and vigor.</li>
              <li>Possible leaf drop in severe cases.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and use of miticides.</li>
              <li>Application of neem oil or other natural pesticides.</li>
              <li>Maintaining plant health through proper nutrition and watering.</li>
              <li>Using predatory mites to control pest populations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoconutMite;
