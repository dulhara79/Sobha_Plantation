import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import BlackSigatokaImage from '../../assets/DiseasesImages/BlackSigatoka.jpg';

const BlackSigatoka = () => {
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
              title: 'Black Sigatoka',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Black Sigatoka</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={BlackSigatokaImage}
              alt="Black Sigatoka"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Black Sigatoka is a fungal disease that affects banana plants, characterized by dark lesions on the leaves. This disease reduces the photosynthetic area, leading to decreased fruit production and overall plant health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Dark, elongated lesions on leaves with yellow halos.</li>
              <li>Progressive leaf necrosis and dieback.</li>
              <li>Reduced fruit yield and quality.</li>
              <li>Premature leaf drop.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Application of fungicides to control fungal growth.</li>
              <li>Removal and destruction of infected plant material.</li>
              <li>Improving air circulation and plant spacing.</li>
              <li>Using resistant banana cultivars if available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackSigatoka;
