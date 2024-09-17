import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import ratImage from '../../assets/DiseasesImages/rat.png';
import batImage from '../../assets/DiseasesImages/bat.jpg';

const MammalianPests = () => {
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
              title: 'Mammalian Pests',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Mammalian Pests</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={ratImage}
              alt="Mammalian Pests"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
            <img
                src={batImage}
                alt="Mammalian Pests"
                className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Mammalian pests such as rats and bats can cause significant damage to coconut trees. Rats are known for gnawing on tender parts of the plant and fruits, while bats may feed on the nectar and fruit, leading to decreased yield and quality.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Chewed leaves, stems, or fruits indicating rat activity.</li>
              <li>Droppings and gnaw marks near the base of the tree.</li>
              <li>Presence of bats around the coconut plantation, especially at dusk or dawn.</li>
              <li>Partially eaten coconuts or scattered remnants around the tree base.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Setting up traps or using rodenticides to control rat populations.</li>
              <li>Installing nets or barriers to prevent bat access to coconut flowers and fruits.</li>
              <li>Maintaining cleanliness around the plantation to reduce food sources for pests.</li>
              <li>Encouraging natural predators such as owls and snakes to control rodent populations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MammalianPests;
