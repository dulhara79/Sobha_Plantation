import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import RedWeevilImage from '../../assets/DiseasesImages/RedWeevil.jpg';

const RedWeevil = () => {
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
              title: 'Red Palm Weevil',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Red Palm Weevil</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={RedWeevilImage}
              alt="Red Palm Weevil"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Red Palm Weevil is a significant pest affecting palm species, including coconut palms. The larvae bore into the trunk, causing structural damage, and potentially leading to the collapse and death of the tree if left untreated.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Visible holes on the trunk with oozing sap.</li>
              <li>Presence of frass (insect excrement) near the entry points.</li>
              <li>Wilting and yellowing of fronds.</li>
              <li>Unnatural leaning or collapse of the tree in severe cases.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of infested parts.</li>
              <li>Application of insecticidal treatments to affected areas.</li>
              <li>Use of pheromone traps to monitor and reduce adult populations.</li>
              <li>Implementing biological controls using entomopathogenic fungi.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedWeevil;
