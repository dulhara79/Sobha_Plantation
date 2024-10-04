import React, { useState, useEffect } from 'react';
import { CalendarOutlined, BellOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import Calendar from './Calendar';
import { jwtDecode } from 'jwt-decode'; // Correct import

const UserGreetingCard = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Update date and time every second
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch token from cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      ?.split('=')[1];
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token

        // Adjust based on token structure (check for different possible fields)
        const nameFromToken = decodedToken.name || decodedToken.username || decodedToken.firstName || 'Guest';
        setUserName(nameFromToken);

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found');
    }
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
    <div className="flex items-center justify-between p-4 mt-4 bg-white rounded-lg shadow-xl">
      <div>
        <h2 className="text-5xl font-bold">Welcome, {userName}!</h2> {/* Display user's name */}
        <p className="text-xl text-gray-500">{currentDate} <span> at </span> {currentTime}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Tooltip title="Calendar">
          <Calendar />
        </Tooltip>
        <Tooltip title="Notifications">
          <Badge dot color="green">
            <BellOutlined className="text-xl cursor-pointer" />
          </Badge>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserGreetingCard;
