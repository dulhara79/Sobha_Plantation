import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb,Button } from 'antd';
import {LeftCircleOutlined} from "@ant-design/icons"
const Schedules = () => {
    const navigate = useNavigate();

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
        title: 'Field View',
      },
      {
        href: '',
        title: 'Dashboard',
      },
      {
        href: '',
        title: 'Schedules',
      },
    ]}
  />

{/* Back Button */}
<div className="mb-4">
          {/* <Button onClick={() => navigate(-1)} className="bg-gray-300 text-black"> */}
          <LeftCircleOutlined onClick={() => navigate(-1)}/>
          {/* </Button> */}
        </div>

</div>
    </div>
  )
}

export default Schedules