// src/LoadingScreen.js
import React from 'react';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4 animate-pulse" />
        <div className="w-32 h-32 mb-4 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader animate-spin"></div>
        <h2 className="text-2xl font-semibold text-white animate-bounce">Loading...</h2>
        <p className="text-white animate-pulse">Please wait while we load the content for you.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
