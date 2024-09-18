import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import PowderyMildewImage from '../../assets/DiseasesImages/PowderyMildew.jpeg';

const PowderyMildew = () => {
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
              title: 'Plant Diseases',
            },
            {
              href: '',
              title: 'Powdery Mildew',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Powdery Mildew</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PowderyMildewImage}
              alt="Powdery Mildew"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Powdery Mildew is a fungal disease that affects a wide range of plants. It is characterized by white or grayish powdery patches on the leaves, stems, and buds. This fungal growth can reduce the photosynthetic ability of the plant, leading to poor plant health and reduced yield.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>White or grayish powdery patches on leaves, stems, and buds.</li>
              <li>Distorted or stunted growth.</li>
              <li>Reduced leaf area and photosynthesis.</li>
              <li>Premature leaf drop and reduced fruit yield.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Application of fungicides to control fungal growth.</li>
              <li>Improving air circulation around plants to reduce humidity.</li>
              <li>Regular removal and disposal of infected plant parts.</li>
              <li>Use of resistant plant varieties if available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowderyMildew;
