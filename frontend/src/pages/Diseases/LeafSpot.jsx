import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import LeafSpotImage from '../../assets/DiseasesImages/LeafSpot.jpg'; // Update the path based on your image

const LeafSpot = () => {
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
              title: 'Leaf Spot',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Leaf Spot</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={LeafSpotImage}
              alt="Leaf Spot"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Leaf spot is a common fungal disease that affects coconut trees, characterized by the appearance of spots on the leaves. These spots can vary in color, often starting as small yellow or brown spots and gradually turning dark brown or black as they enlarge.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Small yellow or brown spots on leaves.</li>
              <li>Spots may merge to form larger necrotic areas.</li>
              <li>Severe infections can cause premature leaf drop.</li>
              <li>Reduced photosynthetic ability due to leaf damage.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Pruning and removal of affected leaves to reduce spread.</li>
              <li>Application of appropriate fungicides to control infection.</li>
              <li>Improving air circulation around trees to reduce humidity.</li>
              <li>Ensuring proper nutrition and water management to maintain tree health.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafSpot;
