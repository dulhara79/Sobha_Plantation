import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import ThripsImage from '../../assets/DiseasesImages/Thrips.jpg'; // Update with the actual path

const Thrips = () => {
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
              title: 'Thrips',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-4">
          {/* Topic Heading */}
          <h1 className="text-4xl font-semibold text-center">Thrips</h1>

          {/* Image Section */}
          <div className="flex justify-center mt-6">
            <img
              src={ThripsImage}
              alt="Thrips"
              className="w-1/3 h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Description Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-lg">
              Thrips are tiny insects that can cause considerable damage to a variety of plants, including coconut trees. They feed on plant tissues, leading to stippling, discoloration, and distortion of leaves and flowers. Thrips can also transmit plant viruses, compounding their impact on plant health.
            </p>
          </div>

          {/* Symptoms Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Silver or bronzed patches on leaves.</li>
              <li>Deformed or stunted plant growth.</li>
              <li>Black or dark spots on leaves from fecal deposits.</li>
              <li>Reduced flowering and fruiting.</li>
            </ul>
          </div>

          {/* Treatments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Treatments</h2>
            <ul className="mt-2 list-disc list-inside text-lg">
              <li>Regular monitoring and use of insecticidal soaps or oils.</li>
              <li>Application of systemic insecticides to control infestations.</li>
              <li>Introduction of natural predators such as ladybugs or lacewings.</li>
              <li>Utilization of yellow sticky traps to capture adult thrips.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thrips;
