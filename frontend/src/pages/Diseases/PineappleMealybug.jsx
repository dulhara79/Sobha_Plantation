import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PineappleMealybugImage from '../../assets/DiseasesImages/PineappleMealybug.jpeg';

const PineappleMealybug = () => {
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
              title: 'Pineapple Pests and Diseases',
            },
            {
              href: '',
              title: 'Pineapple Mealybug',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Pineapple Mealybug</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={PineappleMealybugImage}
              alt="Pineapple Mealybug"
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              The Pineapple Mealybug is a pest that affects pineapple plants, causing significant damage by feeding on plant juices. This pest produces a white, waxy coating that can cover the plant, leading to reduced plant vigor and yield. Infestation can also lead to the growth of sooty mold on the honeydew excreted by the mealybugs.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Presence of white, waxy coatings on plant surfaces.</li>
              <li>Yellowing and wilting of plant leaves.</li>
              <li>Stunted plant growth.</li>
              <li>Presence of sooty mold on honeydew-covered areas.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular removal and destruction of infested plant parts.</li>
              <li>Application of systemic insecticides or insecticidal soaps.</li>
              <li>Introduction of natural predators like ladybugs or lacewings.</li>
              <li>Use of neem oil to reduce mealybug populations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PineappleMealybug;
