import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import FusariumWiltImage from '../../assets/DiseasesImages/FusariumWilt.jpg'; // Update path as necessary

const FusariumWilt = () => {
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
              title: 'Fusarium Wilt',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Fusarium Wilt</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={FusariumWiltImage}
              alt="Fusarium Wilt"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Fusarium Wilt is a serious fungal disease that affects a wide range of plants, including coconut trees. The disease is caused by the fungus Fusarium oxysporum, which infects the plant's vascular system, leading to wilting, yellowing of leaves, and ultimately plant death.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Yellowing and wilting of leaves, often starting from the bottom of the plant.</li>
              <li>Stunted growth and reduced yield.</li>
              <li>Dark discoloration of the vascular tissue in the stem.</li>
              <li>Premature leaf drop and plant death.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Improving soil drainage and avoiding waterlogging.</li>
              <li>Application of fungicides and soil treatments.</li>
              <li>Use of resistant plant varieties where available.</li>
              <li>Practicing crop rotation and field sanitation to reduce disease inoculum.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusariumWilt;
