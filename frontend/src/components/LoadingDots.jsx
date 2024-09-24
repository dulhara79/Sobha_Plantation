import React from 'react';
import loadingScreen from "../assets/loadingScreen.gif"

const LoadingDot = () => {
  return (
     <div className="flex items-center justify-center w-full h-screen"> 
       {/* <div className={`w-12 h-12 bg-[#adff7d] rounded-full loading-dot`}> */}
        <img src={loadingScreen} alt="Loading" className="w-20 h-auto" />
       {/* </div> */}
     </div>
  );
};

export default LoadingDot;

