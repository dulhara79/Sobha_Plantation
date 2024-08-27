import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';

const CoconutPests = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        {/* Go Back Icon */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <LeftOutlined className="text-xl" />
        </button>
        {/* Navigation Items */}
        <div className="flex space-x-4">
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Summary
          </Link>
          <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Inspections
          </Link>
          <Link to="/CoconutTreatments" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Treatments
          </Link>
          <Link to="/CoconutPests" className="text-[#236A64] font-semibold">
            Pests and Diseases
          </Link>
          <Link to="/Maintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Maintenance
          </Link>
        </div>
      </nav>

      <div className={`ml-[300px] p-4`}>
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Coconut Pests',
            },
          ]}
        />

        {/* Summary Section */}
        <div className="mt-8">
          <h1 className="text-5xl font-semibold text-center mb-9">Common Coconut Pests</h1>

 {/* Grid for Pest Buttons */}
 <div className="grid grid-cols-2 gap-4">
            {/* Buttons for Different Pests */}
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              Coconut Leaf Miner <RightOutlined />
            </Button>
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              The Black Beetle <RightOutlined />
            </Button>
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              Coconut Mites <RightOutlined />
            </Button>
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              Termites <RightOutlined />
            </Button>
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              The Red Weevil <RightOutlined />
            </Button>
            <Button 
              type="primary" 
              block 
              className="bg-[#8BEF8A] hover:bg-[#75D873] text-black py-16 px-6 text-lg rounded-lg"
            >
              Mammalian Pests <RightOutlined />
            </Button>
          </div>

{/* Additional Buttons Section */}
<div className="flex justify-center space-x-4 mt-8">
            <Button
              type="default"
              className="bg-gray-100 text-gray-800 hover:bg-gray-400 py-6 px-5 text-lg rounded-lg mt-4 mb-8"
              onClick={() => window.location.href = '/CoconutDiseases'} // Adjust path accordingly
            >
              Coconut Diseases &gt;&gt;
            </Button>
            <Button
              type="default"
              className="bg-gray-100 text-gray-800 hover:bg-gray-400 py-6 px-5 text-lg rounded-lg mt-4 mb-8"
              onClick={() => window.location.href = '/OtherCrops'} // Adjust path accordingly
            >
              Other Crops &gt;&gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoconutPests;