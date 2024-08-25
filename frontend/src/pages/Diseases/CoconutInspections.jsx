import React, { useState, useEffect }from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';



const CoconutInspections = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>

      <div className={`ml-[300px]`}>
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
    </div>

 
  {/* Summary Section */}
  
 
      </div>
  );
};

export default CoconutInspections;
