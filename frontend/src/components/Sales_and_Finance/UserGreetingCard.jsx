import React, { useState, useEffect } from 'react';
import { CalendarOutlined, BellOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';

import Calendar from './Calendar';
import Notification from './Notification';


const UserGreetingCard = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    <div className={`flex items-center justify-between p-4 mt-4 bg-white rounded-lg shadow-xl`}>
      <div className=''>
        <h2 className="font-bold text-5xlxl">Welcome, </h2>
        <p className="text-xl text-gray-500">{currentDate} <span> at </span> {currentTime}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Tooltip title="Calendar">
          {/* <CalendarOutlined className="text-xl cursor-pointer" /> */}
          <Calendar />
        </Tooltip>
        <Tooltip title="Notifications">
          <Badge dot color="green">
            <BellOutlined className="text-xl cursor-pointer" />
            {/* <Notification /> */}
          </Badge>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserGreetingCard;
