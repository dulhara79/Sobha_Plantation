import React, { useState, useEffect }from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table, Input, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const datasource = [
    {
    key: '1',
    date: '12/08/2024',
    section: 'A',
    pests: 'None',
    diseases: 'None',
    inspectedBy: 'Dewdu',
  },
  {
    key: '2',
    date: '05/08/2024',
    section: 'D',
    pests: 'Coconut Mite',
    diseases: 'None',
    inspectedBy: 'Thamara',
  },
  {
    key: '3',
    date: '01/08/2024',
    section: 'A',
    pests: 'The Red Weevil',
    diseases: 'Bud rot and nutfall',
    inspectedBy: 'Dewdu',
  },
  {
    key: '4',
    date: '27/07/2024',
    section: 'B',
    pests: 'None',
    diseases: 'None',
    inspectedBy: 'Sithara',
  },
  {
    key: '5',
    date: '20/07/2024',
    section: 'C',
    pests: 'None',
    diseases: 'None',
    inspectedBy: 'Dewdu',
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
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
  },
  {
    title: 'Identified Pests',
    dataIndex: 'pests',
    key: 'pests',
  },
  {
    title: 'Identified Diseases',
    dataIndex: 'diseases',
    key: 'diseases',
  },
  {
    title: 'Inspected By',
    dataIndex: 'inspectedBy',
    key: 'inspectedBy',
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

// Dropdown menu for sorting
const sortMenu = (
  <Menu>
    <Menu.Item key="1">Pest</Menu.Item>
    <Menu.Item key="2">Disease</Menu.Item>
    <Menu.Item key="3">Section</Menu.Item>
    <Menu.Item key="4">Instructor</Menu.Item>
  </Menu>
);



const CoconutInspections = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-transparent">
        {/* Go Back Icon */}
        <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
          <LeftOutlined className="text-xl" />
        </button>
        {/* Navigation Items */}
        <div className="flex space-x-4">
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Summary
          </Link>
          <Link to="/CoconutInspections" className="text-[#236A64] font-semibold">
            Inspections
          </Link>
          <Link to="/treatments" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Treatments
          </Link>
          <Link to="/pests-diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Pests and Diseases
          </Link>
          <Link to="/maintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">
            Maintenance
          </Link>
        </div>
      </nav>

      <div className={`ml-[300px] mt-4`}>
      <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: 'Coconut Inspections',
      },
    ]}
  />
    
 
  {/* Body Section */}

  <div className="mt-4">
          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-semibold">Inspections and Disease Identification</h1>
          </div>

          {/* Buttons Row */}
          <div className="flex space-x-4 mt-4">
            <Input placeholder="Search for Pests" prefix={<SearchOutlined />} />
            <Input placeholder="Search for Diseases" prefix={<SearchOutlined />} />
            <Dropdown overlay={sortMenu} trigger={['click']}>
              <Button>
                Sort by <DownOutlined />
              </Button>
            </Dropdown>
            <Button icon={<FilePdfOutlined />}>Generate Reports</Button>
          </div>

          {/* Centered Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <Button style={{ backgroundColor: 'rgba(196, 196, 196, 0.44)' }}>Coconuts</Button>
            <Button>Inter Crops</Button>
          </div>

          {/* Table */}
          <div className="mt-4">
            <Table dataSource={datasource} columns={columns} pagination={false} />
          </div>

          {/* Learn More and Add Buttons */}
          <div className="flex flex-col items-center mt-8 pb-8">
            <Button style={{ backgroundColor: 'rgba(196, 196, 196, 0.44)', width: '100%', maxWidth: '400px' }}>Learn More</Button>
            <Button style={{ backgroundColor: '#236A64', color: '#fff', marginTop: '16px' }}>+ Add</Button>
          </div>
        </div>
       </div>
      </div>
  );
};

export default CoconutInspections;
