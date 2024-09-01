import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import CoconutLeafMinerImage from '../../assets/DiseasesImages/CoconutLeafMiner.jpg';

const CoconutLeafMiner = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] p-4`}>
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
              title: 'Coconut Leaf Miner',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Coconut Leaf Miner</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={CoconutLeafMinerImage}
              alt="Coconut Leaf Miner"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Coconut Leaf Miner is a pest that primarily affects coconut trees, causing significant damage to the leaves. The larvae of this pest burrow into the leaf tissue, creating mines that reduce the photosynthetic ability of the leaves, leading to a decline in overall tree health and productivity.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of serpentine mines on leaves.</li>
              <li>Yellowing and browning of leaves.</li>
              <li>Reduced leaf area due to tissue damage.</li>
              <li>Premature leaf drop.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular pruning and destruction of infested leaves.</li>
              <li>Application of systemic insecticides.</li>
              <li>Biological control using parasitoids or predators.</li>
              <li>Use of pheromone traps to monitor and control adult populations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoconutLeafMiner;
