import React from 'react';
import './LoadingDot.css';

const LoadingDot = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={`w-12 h-12 bg-[#adff7d] rounded-full loading-dot`}></div>
    </div>
  );
};

export default LoadingDot;

