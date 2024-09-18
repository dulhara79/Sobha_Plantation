import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import AnthracnoseImage from '../../assets/DiseasesImages/Anthracnose.jpg';

const Anthracnose = () => {
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
              title: 'Anthracnose',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Anthracnose</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={AnthracnoseImage}
              alt="Anthracnose"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Anthracnose is a fungal disease affecting various plants, including bananas. It primarily targets leaves, stems, and fruits, causing dark, sunken lesions. These lesions can expand, leading to significant tissue damage and impacting the overall health and productivity of the plant.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Dark, sunken lesions on leaves, stems, and fruits.</li>
              <li>Lesions often have a reddish-brown or dark brown center with a yellow halo.</li>
              <li>Premature leaf drop and reduced fruit quality.</li>
              <li>Decreased plant vigor and productivity.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Removal and destruction of infected plant material.</li>
              <li>Application of fungicides to manage fungal spread.</li>
              <li>Improving plant health through proper nutrition and irrigation.</li>
              <li>Using resistant plant varieties if available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anthracnose;
