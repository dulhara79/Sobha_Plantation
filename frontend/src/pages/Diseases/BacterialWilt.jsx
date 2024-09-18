import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import BacterialWiltImage from '../../assets/DiseasesImages/BacterialWilt.jpg';

const BacterialWilt = () => {
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
              title: 'Bacterial Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Bacterial Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BacterialWiltImage}
              alt="Bacterial Wilt"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Bacterial Wilt is a serious plant disease caused by bacterial pathogens that affect various crops, including bananas, tomatoes, and potatoes. The disease is characterized by wilting, yellowing, and dying of leaves due to the bacterial infection blocking the plant’s vascular system.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Wilting of leaves, often starting from the lower part of the plant.</li>
              <li>Yellowing and browning of foliage.</li>
              <li>Blackening of vascular tissues.</li>
              <li>Stunted plant growth.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plants.</li>
              <li>Use of resistant plant varieties.</li>
              <li>Application of copper-based bactericides.</li>
              <li>Soil management practices to reduce bacterial load.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacterialWilt;
