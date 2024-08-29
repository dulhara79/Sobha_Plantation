import React, { useState, useEffect }from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';



const AddCropsDiseases = () => {
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
        title: 'Add New Record for Other Crop Diseases',
      },
    ]}
  />
    </div>

 
  {/* Summary Section */}
 
      </div>
  );
};

export default AddCropsDiseases;
