import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import BudRotImage from '../../assets/DiseasesImages/BudRot.jpg'; // Update the path based on your image

const BudRot = () => {
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
              title: 'Bud Rot',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Bud Rot</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BudRotImage}
              alt="Bud Rot"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Bud Rot is a serious disease that affects coconut trees, primarily caused by a fungal or bacterial infection. It leads to the decay of the growing point of the coconut tree, which can ultimately cause the death of the plant if not managed promptly.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Wilting and yellowing of the young leaves.</li>
              <li>Foul smell emanating from the rotting bud.</li>
              <li>Softening and browning of the central shoot.</li>
              <li>Eventually, the central shoot dies and falls off.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Remove and destroy affected tissues immediately.</li>
              <li>Apply fungicides or bactericides to prevent the spread of the infection.</li>
              <li>Maintain good plantation hygiene to reduce disease incidence.</li>
              <li>Ensure proper drainage and avoid water stagnation around the plant base.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudRot;
