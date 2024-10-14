// import React, { useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // Updated import
// import { Button } from "@mui/material";
// import PropTypes from "prop-types";
// import logo from "../assets/logo.png";
// import defaultProfileImage from "../assets/defaultProfileImage.png"; // Replace with the path to your default image

// const Header = ({
//   className = "",
//   rectangleDivAlignSelf,
//   rectangleDivWidth,
//   userProfileImage, // User's uploaded profile image
// }) => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Replaced useHistory with useNavigate

//   const HeaderStyle = useMemo(() => {
//     return {
//       alignSelf: rectangleDivAlignSelf,
//       width: rectangleDivWidth,
//     };
//   }, [rectangleDivAlignSelf, rectangleDivWidth]);

//   const handleNavigation = (path) => {
//     navigate(path); // Replaced history.push with navigate
//   };

//   const handleLogout = async () => {
//     try {
//         await axios.get('http://localhost:5000/api/auth/logout');
//         localStorage.removeItem('token');  // Remove any JWT token if stored
//         navigate('/login'); // Redirect to login after logout
//     } catch (err) {
//         console.error('Logout error:', err);
//     }
// };
  
//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "Visit Us", path: "/visit-us" },
//   ];

//   return (
//     <header
//       className={`h-[70px] self-stretch shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row items-center justify-between pt-[11px] px-5 pb-2.5 box-border z-[99] sticky top-0 max-w-full pl-36 pr-36 ${className}`}
//       style={HeaderStyle}
//     >
//       {/* Logo Section */}
//       <img
//         className="w-[160px] h-auto cursor-pointer"
//         loading="lazy"
//         alt="Logo"
//         src={logo}
//         onClick={() => handleNavigation("/")}
//       />

//       {/* Navigation Links */}
//       <nav className="flex flex-row items-center gap-[18px] text-black font-roboto">
//         {menuItems.map((item) => (
//           <div
//             key={item.name}
//             className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
//               location.pathname === item.path
//                 ? "bg-[#60DB19] bg-opacity-80 text-white"
//                 : "bg-silver hover:bg-[#a3a3a3] hover:bg-opacity-60"
//             }`}
//             onClick={() => handleNavigation(item.path)}
//           >
//             {item.name}
//           </div>
//         ))}
//       </nav>

//       {/* Profile and Logout Section */}
//       <div className="flex flex-row items-center gap-[18px]">
//         <img
//           className="rounded-full cursor-pointer w-9 h-9"
//           loading="lazy"
//           alt="User Profile"
//           src={userProfileImage || defaultProfileImage}
//           onClick={() => handleNavigation("/profile")}
//         />
//         <Button
//           className="text-2xl shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] hover:bg-[#000000] hover:text-white"
//           variant="contained"
//           sx={{
//             textTransform: "none",
//             color: "#000",
//             fontSize: "24px",
//             background: "#3acc63",
//             borderRadius: "50px",
//             "&:hover": { background: "#3acc63" },
//             height: 42,
//           }}
//           onClick={handleLogout}
//         >
//           Log out
//         </Button>
//       </div>
//     </header>
//   );
// };

// Header.propTypes = {
//   className: PropTypes.string,
//   rectangleDivAlignSelf: PropTypes.any,
//   rectangleDivWidth: PropTypes.any,
//   userProfileImage: PropTypes.string, // User's profile image URL
// };

// export default Header;


import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Updated import
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import defaultProfileImage from "../assets/defaultProfileImage.png"; // Replace with the path to your default image
import axios from "axios"; // Make sure to import axios

const Header = ({
  className = "",
  rectangleDivAlignSelf,
  rectangleDivWidth,
  userProfileImage, // User's uploaded profile image
}) => {
  const location = useLocation();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const HeaderStyle = useMemo(() => {
    return {
      alignSelf: rectangleDivAlignSelf,
      width: rectangleDivWidth,
    };
  }, [rectangleDivAlignSelf, rectangleDivWidth]);

  const handleNavigation = (path) => {
    navigate(path); // Replaced history.push with navigate
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout"); // Adjust the API URL if necessary
      localStorage.removeItem("token"); // Remove any JWT token if stored
      navigate("/"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/HomePage" },
    { name: "Visit Us", path: "/visit-us" },
  ];

  return (
    <header
      className={`h-[70px] self-stretch shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row items-center justify-between pt-[11px] px-5 pb-2.5 box-border z-[99] sticky top-0 max-w-full pl-36 pr-36 ${className}`}
      style={HeaderStyle}
    >
      {/* Logo Section */}
      <img
        className="w-[160px] h-auto cursor-pointer"
        loading="lazy"
        alt="Logo"
        src={logo}
        onClick={() => handleNavigation("/")}
      />

      {/* Navigation Links */}
      <nav className="flex flex-row items-center gap-[18px] text-black font-roboto">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-[#60DB19] bg-opacity-80 text-white"
                : "bg-silver hover:bg-[#a3a3a3] hover:bg-opacity-60"
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.name}
          </div>
        ))}
      </nav>

      {/* Profile and Logout Section */}
      <div className="flex flex-row items-center gap-[18px]">
        <img
          className="rounded-full cursor-pointer w-9 h-9"
          loading="lazy"
          alt="User Profile"
          src={userProfileImage || defaultProfileImage} // Display user image or default
          onClick={() => handleNavigation("/profile")}
        />
        <Button
          className="text-2xl shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] hover:bg-[#000000] hover:text-white"
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "24px",
            background: "#3acc63",
            borderRadius: "50px",
            "&:hover": { background: "#3acc63" },
            height: 42,
          }}
          onClick={handleLogout} // Trigger logout
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  rectangleDivAlignSelf: PropTypes.any,
  rectangleDivWidth: PropTypes.any,
  userProfileImage: PropTypes.string, // User's profile image URL
};

export default Header;
