import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Table, Tag } from 'antd';
import {LeftCircleOutlined} from "@ant-design/icons"

// Sample data for the table
const dataSource = [
  {
    key: '1',
    seedlingType: 'Dwarf Coconut',
    currentQty: 200,
    minStock: 50,
    status: 'OK',
  },
  {
    key: '2',
    seedlingType: 'Hybrid Coconut',
    currentQty: 30,
    minStock: 50,
    status: 'Low Stock',
  },
  {
    key: '3',
    seedlingType: 'Tall Coconut',
    currentQty: 120,
    minStock: 100,
    status: 'OK',
  },
  {
    key: '4',
    seedlingType: 'King Coconut',
    currentQty: 15,
    minStock: 20,
    status: 'Low Stock',
  },
];

// Column definitions for the table
const columns = [
  {
    title: 'Seedling Type',
    dataIndex: 'seedlingType',
    key: 'seedlingType',
  },
  {
    title: 'Current Qty',
    dataIndex: 'currentQty',
    key: 'currentQty',
  },
  {
    title: 'Min Stock',
    dataIndex: 'minStock',
    key: 'minStock',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <Tag color={text === 'Low Stock' ? 'red' : 'green'}>
        {text.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <span>
        <Button type="link" icon={<i className="fas fa-edit"></i>}></Button>
        <Button type="link" icon={<i className="fas fa-trash-alt"></i>}></Button>
        <Button type="link">Notify</Button>
      </span>
    ),
  },
];

const Seedling = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="ml-[300px] p-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: 'Field View',
            },
            {
              href: '',
              title: 'Dashboard',
            },
            {
              href: '',
              title: 'Seedling',
            },
          ]}
        />
        {/* Back Button */}
     <div className="mb-4">
          {/* <Button onClick={() => navigate(-1)} className="bg-gray-300 text-black"> */}
          <LeftCircleOutlined onClick={() => navigate(-1)}/>
          {/* </Button> */}
        </div>

{/* Page Header */}
<div className="bg-white shadow-md rounded-lg p-4 my-4">
          <h2 className="text-xl font-semibold">Seedling</h2>
          <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        {/* Page Title and Buttons */}
        
          
          <div>
            <Button type="primary" className="mr-2">Add New Activity</Button>
            <Button type="default">Generate Reports</Button>
          </div>
        

       

        {/* Seedling Table */}
        <Table dataSource={dataSource} columns={columns} pagination={false} />

      </div>
    </div>
  );
};

export default Seedling;