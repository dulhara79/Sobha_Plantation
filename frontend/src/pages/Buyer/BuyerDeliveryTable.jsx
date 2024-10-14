
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import BuyerNavbar from "../../components/Buyer/Header/BuyerNavbar";

import {
  HomeOutlined,
  LeftOutlined,
  SearchOutlined, 
  FilePdfOutlined,
  
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoImage from "../../assets/Logo.png";
import "../../index.css";

const { Search } = Input;

const BuyerDeliveryTable = () => {
  const [deliveryRecords, setDeliveryRecords] = useState([]);
  const [filteredDeliveryRecords, setFilteredDeliveryRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveryRecords();
  }, []);

  // Fetch delivery records from API
  const fetchDeliveryRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/deliveryRecords");
      setDeliveryRecords(response.data.data);
      setFilteredDeliveryRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching delivery: ", error.response ? error.response.data : error.message);
    }
  };

  // Search delivery records
  const handleSearch = (value) => {
    setSearchText(value);
    filterDeliveryRecords(value, filterStatus);
  };

  // Filter delivery records
  const filterDeliveryRecords = (searchText, filterStatus) => {
    let filteredData = deliveryRecords;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((deliveryRecord) =>
        Object.values(deliveryRecord).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((deliveryRecord) => delivery.status === filterStatus);
    }

    setFilteredDeliveryRecords(filteredData);
  };

  // Handle update delivery record
  const handleUpdate = (id) => {
    navigate(`/updateDelivery/${id}`);
  };

  // Confirm before deleting an delivery record
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this delivery record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete delivery record
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deliveryRecords/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "delivery record deleted successfully",
        });
        setFilteredDeliveryRecords(filteredDeliveryRecords.filter(record => record._id !== id));
      } else {
        notification.error({
          message: "Error",
          description: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting delivery record: ", error.message);
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  // Function to get image data URL
const getImageDataURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are handled
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
};
  //pdf generation
  const generatePDF = async () => {
    const doc = new jsPDF();

    const logoUrl = '../src/assets/logo.png';
  let logoDataURL;
  try {
    logoDataURL = await getImageDataURL(logoUrl);
  } catch (error) {
    console.error('Failed to load the logo image:', error);
  }

  // Function to draw header, footer, and horizontal line
  const drawHeaderFooter = (data) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Header
    doc.setFontSize(14);
    doc.text("Sobha Plantation", 10, 10); // Align left

    doc.setFontSize(10);
    doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
    doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
    doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
    doc.text("Contact: 0112 751 757", 10, 30); // Email address line
    
    // Header with logo
    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
    }

    doc.line(10, 35, pageWidth - 10, 35); // Header line

    // Footer with page number
    doc.setFontSize(10);
    doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
  };
    // Set the margins for header and footer space
    const marginTop = 35; // space reserved for header
    const marginBottom = 20; // space reserved for footer
  
    // Title for the report
    const title = "Delivery Records Report";
    doc.setFontSize(22);
    
    // Calculate the width of the title
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Calculate the x position to center the title
    const xPosition = (pageWidth - titleWidth) / 2;
    
    // Set the title at the calculated center position
    doc.text(title, xPosition, 48); // Adjust y-coordinate to fit under the header

    // Define the columns for the table
    const columns = [
      "First Name",
      "Last Name",
      "Email", 
      "Address",
       "City",
      "Country",
      "Postal Code",
      "Phone Number",
    ]; 

    // Get the data from the inspections state
    const rows = filteredDeliveryRecords.map((deliveryRecord) => [
      
      deliveryRecord.firstName,
      deliveryRecord.lastName,
      deliveryRecord.email,
      deliveryRecord.address,
      deliveryRecord.city,
      deliveryRecord.country,
      deliveryRecord.postalCode,
      deliveryRecord.phone,
      
      
    ]);

    // Add table (adjusted startY)
    
    doc.autoTable({
      head:[columns],
      body: rows,
      startY: 60, // Adjust this value to set how far below the title the table starts
      margin: { horizontal: 10 },
      headStyles: {
        fillColor: [64, 133, 126], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontSize: 12,
      },
     
      theme: "striped",
      didDrawPage: drawHeaderFooter,
    });
    // Save the PDF
    doc.save("Delivery_Records.pdf");
  }
  

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* Header */}
      <Header />

      {/* Main content */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div
          className="content"
          style={{ flex: 1, padding: "20px", marginLeft: "280px" }}
        >
          {/* Navigation Bar */}
          {/* <nav className="flex items-center justify-between p-4 bg-transparent">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
            <Link
                to="/buyerdashboard"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/preorders"
                
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pre Order 
              </Link>
              <Link
                to="/buyerinfotable"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
                
              >
                 Buyer Records
              </Link>
              <Link
                to="/Bdeliverytable"
                className="text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full font-semibold">
                 Delivery Records
              </Link>
              
            </div>
          </nav> */}
          <div className="flex-1 ml-[300px] p-4 "></div>
          <BuyerNavbar/>
          <div className="mt-4">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Buyers Delivery Records",
                },
              
                
              ]}
            />
            {/* Topic Heading */}
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-semibold">
                Buyers Delivery Records
              </h1>
            </div>
            {/* Buttons Row */}
            <div className="flex mt-4 space-x-4">

              
              <Search  ///Search Bar
              
                placeholder="Search for Delivery Records"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "100%" }}
              />
              
            <Button
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              style={{
                backgroundColor: 'red',  // Set background color to red
                borderColor: 'red',      // Set border color to red
                color: 'white',          // Set text color to white for contrast
              }}
            >
              Generate Reports 

              
            </Button>

            </div>
            
            {/* Table */}
            <div id="table-to-pdf">
              <Table
                columns={[
                  { title: "First Name", dataIndex: "firstName", key: "firstName" },
                  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
                  { title: "Email", dataIndex: "email", key: "email" },
                  { title: "Address", dataIndex: "address", key: "address" },
                  { title: "City", dataIndex: "city", key: "city" },
                  { title: "Country", dataIndex: "country", key: "country" },
                  { title: "Postal Code", dataIndex: "postalCode", key: "postalCode" },
                  { title: "Phone", dataIndex: "phone", key: "phone" },
                  
                  {
                    title: "Actions",
                    key: "actions",
                    render: (text, record) => (
                      <span style={{ display: "flex", gap: "2px" }}>
                        <Button type="link" onClick={() => handleUpdate(record._id)}>
                          Edit
                        </Button>
                        <Button type="link" danger onClick={() => confirmDelete(record._id)}>
                          Delete
                        </Button>
                      </span>
                    ),
                  },
                ]}
                dataSource={filteredDeliveryRecords}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                style={{ width: "100%" }} // Ensure table width fits content
                bordered
              />
            </div>
            
            {/* Learn More and Add Buttons */}
            <div className="flex flex-col items-center pb-8 mt-8">
              <Button
                style={{
                  backgroundColor: "#236A64",
                  color: "#fff",
                  marginTop: "16px",
                }}
                onClick={() => navigate("/Bdelivery")}
              >
                + Add New Delivery Record
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDeliveryTable
