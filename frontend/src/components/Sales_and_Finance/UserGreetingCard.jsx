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

  return (
    <div className="flex items-center justify-between p-4 mt-4 bg-white rounded-lg shadow">
      <div>
        <h2 className="text-xl font-semibold">Welcome, Dulhara</h2>
        <p className="text-gray-500">{dateTime.toLocaleDateString()}, {dateTime.toLocaleTimeString()}</p>
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
