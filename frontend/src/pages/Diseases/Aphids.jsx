import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import AphidsImage from '../../assets/DiseasesImages/Aphids.jpg';

const Aphids = () => {
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
              title: 'Plant Pests and Diseases',
            },
            {
              href: '',
              title: 'Aphids',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Aphids</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={AphidsImage}
              alt="Aphids"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Aphids are small sap-sucking insects that can infest a wide range of plants. They are known for their rapid reproduction and can cause significant damage by feeding on plant sap, leading to stunted growth, distorted leaves, and a reduction in overall plant health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Distorted and curled leaves.</li>
              <li>Presence of a sticky substance on leaves and surrounding areas.</li>
              <li>Yellowing or wilting of plant foliage.</li>
              <li>Formation of sooty mold on plant surfaces due to honeydew excretion.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and manual removal of aphids.</li>
              <li>Application of insecticidal soaps or oils to target aphids.</li>
              <li>Introduction of natural predators such as ladybugs and lacewings.</li>
              <li>Use of systemic insecticides if infestations are severe.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aphids;
