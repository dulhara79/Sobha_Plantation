import React, { useState, useEffect }from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, LeftOutlined, EyeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const datasource = [
    {
      key: '1',
      date: '12/08/2024',
      pestOrDisease: 'Coconut Mite',
      treatmentMethod: 'Spray neem kernel extracts',
      healthRate: '80%',
      reapplyingDate: '15/08/2024',
    },
    {
      key: '2',
      date: '09/08/2024',
      pestOrDisease: 'The Red Weevil',
      treatmentMethod: 'Diacon® IGR PLUS and PBO-8® Synergist',
      healthRate: '70%',
      reapplyingDate: '10/08/2024',
    },
    {
      key: '3',
      date: '03/08/2024',
      pestOrDisease: 'The Red Weevil',
      treatmentMethod: 'Diacon® IGR PLUS and PBO-8® Synergist',
      healthRate: '50%',
      reapplyingDate: '09/08/2024',
    },
    {
      key: '4',
      date: '12/08/2024',
      pestOrDisease: 'Coconut Mite',
      treatmentMethod: 'Spray neem kernel extracts',
      healthRate: '80%',
      reapplyingDate: '15/08/2024',
    },
    {
      key: '5',
      date: '12/08/2024',
      pestOrDisease: 'Coconut Mite',
      treatmentMethod: 'Spray neem kernel extracts',
      healthRate: '80%',
      reapplyingDate: '15/08/2024',
    },
  ];
  
  // Table columns configuration
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Pest / Disease',
      dataIndex: 'pestOrDisease',
      key: 'pestOrDisease',
    },
    {
      title: 'Treatment Method',
      dataIndex: 'treatmentMethod',
      key: 'treatmentMethod',
    },
    {
      title: 'Health Rate',
      dataIndex: 'healthRate',
      key: 'healthRate',
    },
    {
      title: 'Reapplying Date',
      dataIndex: 'reapplyingDate',
      key: 'reapplyingDate',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: () => (
        <div className="flex space-x-2">
            <Button type="link" icon={<EditOutlined />} onClick={() => {/* Navigate to update page */}} />
            <Button type="link" icon={<DeleteOutlined />} onClick={() => {/* Navigate to delete page */}} />
        </div>
        ),
    },
  ];
  

const CoconutTreatments = () => {
    const navigate = useNavigate();

  return (
    <div>
      <Header/>
      <div className='flex h-screen'>
      <Sidebar/>
        <div className="flex-1 ml-[300px] p-4 overflow-auto">

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        {/* Go Back Icon */}
        <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
          <LeftOutlined className="text-xl" />
        </button>
        {/* Navigation Items */}
        <div className="flex space-x-4">
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Home
          </Link>
          <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Inspections
          </Link>
          <Link to="/CoconutTreatments" className="text-[#236A64] font-semibold">
            Treatments
          </Link>
          <Link to="/CoconutPests" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Pests and Diseases
          </Link>
          <Link to="/Maintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Maintenance
          </Link>
        </div>
      </nav>

      <div className={`ml-[30px] mt-4`}>
      <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: 'Coconut Treatments',
      },
    ]}
  />
    </div>

 
  {/* Body Section */}

  <div className="mt-4 px-6">
          {/* Title and Show More Icon */}
          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-semibold">Pests and Diseases Treatments</h1>
            <EyeOutlined className="text-xl ml-4" style={{ color: '#236A64' }} />
          </div>

          {/* Table */}
          <div className="mt-4">
            <Table dataSource={datasource} columns={columns} pagination={false} />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-14 mt-9">
            <Button style={{ backgroundColor: '#3ECE67', width: '100%', maxWidth: '200px' }}>Add New Entry</Button>
            <Button style={{ backgroundColor: '#3ECE67', width: '100%', maxWidth: '200px' }}>Save</Button>
            </div>

            {/* Other Crops Button */}
            <div className="flex justify-between space-x-4 mt-6">
            <Button 
              style={{ backgroundColor: '#296E68', color: '#fff', flex: 1 }} 
              onClick={() => navigate('/otherCrops')}
            >
              Other Crops
            </Button>
          </div>

          {/* Insights Button */}
          <div className="flex justify-center mt-8 mb-6">
            <Button 
              style={{ backgroundColor: '#000', color: '#fff', fontWeight: 'bold', width: '100%', maxWidth: '300px' }}
              onClick={() => navigate('/insights')}
            >
              Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CoconutTreatments;
