import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import RootWiltImage from '../../assets/DiseasesImages/RootWilt.jpg'; // Update the path based on your image

const RootWilt = () => {
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
              title: 'Root Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Root Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={RootWiltImage}
              alt="Root Wilt"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Root Wilt is a debilitating disease of coconut trees characterized by the yellowing and wilting of leaves. The disease affects the root system, hindering the tree's ability to absorb water and nutrients, which leads to reduced growth, flowering, and fruit production.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing and drooping of leaves.</li>
              <li>Delayed flowering and fruiting.</li>
              <li>Presence of dry, brittle fronds.</li>
              <li>Stunted growth of the tree.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Improvement of soil fertility through the application of organic manures.</li>
              <li>Regular irrigation and mulching to maintain soil moisture.</li>
              <li>Removal and destruction of severely affected trees to prevent the spread of the disease.</li>
              <li>Use of resistant varieties if available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootWilt;
