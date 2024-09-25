import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import FruitFliesImage from '../../assets/DiseasesImages/FruitFlies.jpeg'; // Make sure the image is in the correct location

const FruitFlies = () => {
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
              title: 'Fruit Pests and Diseases',
            },
            {
              href: '',
              title: 'Fruit Flies',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Fruit Flies</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={FruitFliesImage}
              alt="Fruit Flies"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Fruit flies are small, common pests that are known for infesting overripe or fermenting fruit. They can cause significant damage to fruit crops by laying eggs, which develop into larvae that feed on the fruit, leading to spoilage and potential crop loss.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of small, visible flies around fruit.</li>
              <li>Soft, rotting spots on the fruit surface.</li>
              <li>Presence of small maggots or larvae inside the fruit.</li>
              <li>Increased fruit drop and reduced fruit quality.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regularly inspect and remove infested or overripe fruit.</li>
              <li>Use fruit fly traps and attractants to monitor and reduce populations.</li>
              <li>Apply appropriate insecticides or biological controls as needed.</li>
              <li>Maintain clean and hygienic conditions in fruit storage areas.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitFlies;
