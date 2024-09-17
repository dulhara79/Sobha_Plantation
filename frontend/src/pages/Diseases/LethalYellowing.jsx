import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import LethalYellowingImage from '../../assets/DiseasesImages/LethalYellowing.png'; // Make sure to update the path according to your image location

const LethalYellowing = () => {
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
              title: 'Lethal Yellowing',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Lethal Yellowing</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={LethalYellowingImage}
              alt="Lethal Yellowing"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Lethal Yellowing is a devastating disease affecting coconut palms and other palm species, caused by phytoplasmas. It is characterized by the yellowing of leaves, premature fruit drop, and eventually the death of the infected tree. The disease spreads primarily through insect vectors, particularly planthoppers.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing of older leaves, progressing to younger leaves.</li>
              <li>Premature fruit drop, often with blackened tips.</li>
              <li>Collapse of the crown and death of the tree.</li>
              <li>Decay of the new emerging spear leaf.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and removal of infected trees to prevent spread.</li>
              <li>Application of antibiotics such as oxytetracycline via trunk injection.</li>
              <li>Planting resistant varieties of coconut palms.</li>
              <li>Controlling the vector population through insecticides.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LethalYellowing;
