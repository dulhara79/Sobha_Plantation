import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios"; // To make API requests

import profileImage from "../assets/DSC07695.jpg"; // Update the path to match your folder structure

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Uvindu Seneviratne",
    dob: "2002/10/06",
    gender: "Male",
    email: "uvindu123@gmail.com",
    contactNumber: "0779456456",
    address: "Colombo",
    registrationDate: "31/08/2020",
    profilePicture: profileImage, // Set the imported image as the initial profile picture
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = () => {
    console.log("Update Profile Clicked");
  };

  const handleDeleteProfile = () => {
    console.log("Delete Profile Clicked");
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);

      // Display the selected image immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUploadPicture = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: response.data.profilePictureUrl,
      }));
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
            gap: "10px",
          }}
        >
          <Link to="/" style={buttonStyle}>
            Home
          </Link>
          <Link to="/order-details" style={buttonStyle}>
            Order Details
          </Link>
          <Link to="/profile" style={buttonStyle}>
            Profile
          </Link>
          <Link to="/cart" style={buttonStyle}>
            Cart
          </Link>
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f4f4f4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "500px",
              backgroundColor: "#6CC1A0",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={profile.profilePicture}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginTop: "20px" }}
              />
              <button
                onClick={handleUploadPicture}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                Upload Picture
              </button>
            </div>
            <h2>{profile.name}</h2>
            <div style={{ textAlign: "left", marginTop: "20px" }}>
              <p>Date of birth: {profile.dob}</p>
              <p>Gender: {profile.gender}</p>
              <p>Email: {profile.email}</p>
              <p>Contact Number: {profile.contactNumber}</p>
              <p>Address: {profile.address}</p>
              <p>Registration date: {profile.registrationDate}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleUpdateProfile}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Update Profile
              </button>
              <button
                onClick={handleDeleteProfile}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
};

export default Profile;
