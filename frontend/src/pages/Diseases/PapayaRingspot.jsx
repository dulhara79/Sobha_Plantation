import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PapayaRingspotImage from '../../assets/DiseasesImages/PapayaRingspot.jpg';

const PapayaRingspot = () => {
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
              title: 'Papaya Pests and Diseases',
            },
            {
              href: '',
              title: 'Papaya Ringspot',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Papaya Ringspot</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PapayaRingspotImage}
              alt="Papaya Ringspot"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Papaya Ringspot is a viral disease that affects papaya plants, causing ring-shaped lesions on leaves, fruit, and stems. The disease leads to stunted growth, reduced fruit yield, and in severe cases, plant death. The virus is transmitted by aphids and can spread rapidly in papaya plantations.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of ring-shaped lesions on leaves and fruit.</li>
              <li>Yellowing and mottling of affected leaves.</li>
              <li>Reduced fruit size and quality.</li>
              <li>Stunted plant growth.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plants.</li>
              <li>Use of resistant papaya varieties.</li>
              <li>Control of aphid populations using insecticides or natural predators.</li>
              <li>Regular monitoring and sanitation practices to prevent spread.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PapayaRingspot;
