import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import TermiteImage from '../../assets/DiseasesImages/Termite.jpg';

const Termite = () => {
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
              title: 'Termites',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Termites</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={TermiteImage}
              alt="Termites"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Termites are a group of pests that can cause extensive damage to coconut trees by feeding on the wood and other organic materials within the tree. This can weaken the structural integrity of the tree, potentially leading to its collapse or death.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Hollow-sounding wood.</li>
              <li>Visible termite mud tubes on the trunk and branches.</li>
              <li>Frass (termite droppings) near the base of the tree.</li>
              <li>Dead or dying branches.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Applying termiticides around the base of the tree.</li>
              <li>Removing and burning infested parts of the tree.</li>
              <li>Introducing natural predators like ants to control termite populations.</li>
              <li>Maintaining tree health to reduce susceptibility to termites.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Termite;
