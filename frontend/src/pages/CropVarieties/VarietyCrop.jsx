import React, { useState } from 'react';
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb,Button } from 'antd';
import {LeftCircleOutlined} from "@ant-design/icons"
const VarietyCrop = () => {
    const [cropType, setCropType] = useState('Coconut');
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
        title: 'Crop Varieties',
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
          <h2 className="text-xl font-semibold">Crop Variety Selection</h2>
          <p>Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
  
   


        {/* Action Buttons */}
        <div className="flex justify-center space-x-20 mb-4">
  <Button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/cvForm')}>
  
    <span>+ Add New Activity</span>
  </Button>
  <Button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
    <span>Generate Reports</span>
  </Button>
</div>


        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Assigned Person</th>
                <th className="py-3 px-6 text-left">Field Name</th>
                <th className="py-3 px-6 text-left">Varieties</th>
                <th className="py-3 px-6 text-left">Plantation Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {/* Sample Table Data */}
              {[
                {
                  person: 'T.Perera',
                  field: 'Field A',
                  variety: 'Dwarf Coconut',
                  date: '2024-08-20',
                  status: 'In progress',
                  statusColor: 'text-blue-500',
                  remarks: 'In progress',
                },
                {
                  person: 'S.Bandara',
                  field: 'Field B',
                  variety: 'Hybrid Coconut',
                  date: '2024-08-18',
                  status: 'Scheduled',
                  statusColor: 'text-yellow-500',
                  remarks: 'Scheduled',
                },
                {
                  person: 'W.Sirisena',
                  field: 'Field C',
                  variety: 'Tall Coconut',
                  date: '2024-08-20',
                  status: 'Completed',
                  statusColor: 'text-green-500',
                  remarks: 'Completed',
                },
                {
                  person: 'Lasantha',
                  field: 'Field D',
                  variety: 'King Coconut',
                  date: '2024-08-21',
                  status: 'Scheduled',
                  statusColor: 'text-yellow-500',
                  remarks: 'Scheduled',
                },
              ].map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.person}</td>
                  <td className="py-3 px-6 text-left">{item.field}</td>
                  <td className="py-3 px-6 text-left">{item.variety}</td>
                  <td className="py-3 px-6 text-left">{item.date}</td>
                  <td className={`py-3 px-6 text-left font-semibold ${item.statusColor}`}>{item.status}</td>
                  <td className="py-3 px-6 text-left">
                    {/* Action Icons */}
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-600">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <i className="fas fa-trash"></i>
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        <i className="fas fa-info-circle"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  </div>
    </div>
  )
}

export default VarietyCrop
