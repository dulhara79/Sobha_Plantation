import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import BananaWeevilImage from '../../assets/DiseasesImages/BananaWeevil.png';

const BananaWeevil = () => {
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
              title: 'Banana Pests and Diseases',
            },
            {
              href: '',
              title: 'Banana Weevil',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Banana Weevil</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BananaWeevilImage}
              alt="Banana Weevil"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Banana Weevil is a significant pest of banana plants, causing extensive damage to both the fruit and the plant itself. The adult weevils lay their eggs in the banana plant, and the larvae tunnel into the plant tissues, leading to a reduction in plant vigor and fruit yield.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of holes and tunnels in the banana stems.</li>
              <li>Wilting and yellowing of banana leaves.</li>
              <li>Reduced fruit quality and premature ripening.</li>
              <li>Visible larvae and adult weevils on or near the plant.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of infested plant parts.</li>
              <li>Application of systemic insecticides targeting the larvae.</li>
              <li>Use of pheromone traps to monitor and reduce adult weevil populations.</li>
              <li>Implementing good agricultural practices to reduce pest habitat.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BananaWeevil;
