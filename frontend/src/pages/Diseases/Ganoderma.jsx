import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import GanodermaImage from '../../assets/DiseasesImages/Ganoderma.jpg'; // Update the path based on your image

const Ganoderma = () => {
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
              title: 'Ganoderma',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Ganoderma</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={GanodermaImage}
              alt="Ganoderma"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Ganoderma is a fungal disease that affects coconut trees, leading to severe damage and even death. This pathogen causes the formation of rotting lesions on the trunk and base of the tree, disrupting the flow of nutrients and water, which ultimately weakens and kills the tree.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of conks or shelf-like structures on the trunk or base of the tree.</li>
              <li>Rotting or decaying areas around the base of the trunk.</li>
              <li>Yellowing and wilting of fronds.</li>
              <li>Reduced overall tree vigor and growth.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected tree parts.</li>
              <li>Application of fungicides to control the spread of the disease.</li>
              <li>Improvement of soil drainage to reduce moisture around the base of the tree.</li>
              <li>Use of resistant coconut varieties if available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganoderma;
