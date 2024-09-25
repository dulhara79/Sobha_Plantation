import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import StemBleedingImage from '../../assets/DiseasesImages/StemBleeding.png'; // Update the path based on your image

const StemBleeding = () => {
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
              title: 'Stem Bleeding',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Stem Bleeding</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={StemBleedingImage}
              alt="Stem Bleeding"
              className="w-1/4 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Stem Bleeding is a disease that affects coconut trees, characterized by the exudation of a reddish-brown fluid from cracks in the stem. The disease is caused by a fungus, and it can lead to significant yield loss if not properly managed.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Exudation of reddish-brown fluid from the stem.</li>
              <li>Cracking of the stem bark.</li>
              <li>Discoloration of the stem tissue.</li>
              <li>Premature nut fall and reduced yield.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Scraping the affected area and applying fungicide paste.</li>
              <li>Improving drainage around the tree base.</li>
              <li>Applying lime to the base of the stem.</li>
              <li>Regular monitoring and prompt removal of affected trees.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemBleeding;
