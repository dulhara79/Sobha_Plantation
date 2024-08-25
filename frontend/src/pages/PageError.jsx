import React from 'react'

const PageError = () => {
  return ( 
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center">
        <h1 className="font-bold text-white text-9xl">404</h1>
        <p className="mt-4 text-2xl text-white">Oops! Page not found.</p>
        <p className="mt-2 text-white">The page you are looking for does not exist.</p>
        <a href="/" className="inline-block px-6 py-3 mt-6 text-green-500 transition duration-300 bg-white rounded-full shadow-md hover:bg-gray-100">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageError
