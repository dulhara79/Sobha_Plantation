import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import PapayaMealybugImage from '../../assets/DiseasesImages/PapayaMealybug.jpeg'; // Ensure you have this image

const PapayaMealybug = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-4"> {/* Adjust margin-left as per your layout */}
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Papaya Pests and Diseases',
            },
            {
              href: '',
              title: 'Papaya Mealybug',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Papaya Mealybug</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PapayaMealybugImage}
              alt="Papaya Mealybug"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Papaya Mealybug is a common pest that infests papaya plants, feeding on the sap of leaves, stems, and fruits. This can lead to stunted growth, deformed fruit, and a reduction in overall plant health. The mealybugs excrete a sticky substance that can attract sooty mold, further harming the plant.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of white, waxy clusters on leaves, stems, and fruits.</li>
              <li>Yellowing and wilting of affected plant parts.</li>
              <li>Stunted growth and reduced fruit size.</li>
              <li>Sticky residue on plant surfaces and surrounding areas.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular inspection and removal of mealybugs by hand.</li>
              <li>Application of insecticidal soaps or neem oil.</li>
              <li>Introduce natural predators like ladybugs or lacewings.</li>
              <li>Maintain good plant hygiene and remove heavily infested plants.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PapayaMealybug;
