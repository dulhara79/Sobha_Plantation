import React from 'react';
import { Spin } from 'antd';
import { CloudOutlined } from '@ant-design/icons';

const NewLoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <CloudOutlined className="text-6xl text-green-700 animate-bounce" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
      <div className="absolute text-lg font-semibold text-center text-green-600 bottom-10">
        Growing Your Future
      </div>
      <div className="absolute text-sm text-center text-black font-roboto bottom-5">
        Please Wait...
        </div>
    </div>
  );
};

export default NewLoadingScreen;
