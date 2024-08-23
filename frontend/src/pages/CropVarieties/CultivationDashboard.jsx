import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
const CultivationDashboard = () => {
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
      }
    ]}
  />
  </div>
    </div>
  )
}

export default CultivationDashboard
