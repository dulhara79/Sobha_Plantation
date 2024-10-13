///////
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";

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
      const response = await axios.get("http://localhost:8090/api/deliveryRecords");
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
      const response = await axios.delete(`http://localhost:8090/api/deliveryRecords/${id}`);
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


  //pdf generation
  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Define the columns for the table
    const columns = [
      { title: "First Name", dataKey: "firstName" },
      { title: "Last Name", dataKey: "lastName" },
      { title: "Email", dataKey: "email" },
      { title: "Address", dataKey: "address" },
      { title: "City", dataKey: "city" },
      { title: "Country", dataKey: "country" },
      { title: "Postal Code", dataKey: "postalCode" },
      { title: "Phone Number", dataKey: "phone" },
    ]; 

    // Get the data from the inspections state
    const rows = filteredDeliveryRecords.map((deliveryRecord) => ({
      
      firstName: deliveryRecord.firstName,
      lastName: deliveryRecord.lastName,
      email: deliveryRecord.email,
      address: deliveryRecord.address,
      city: deliveryRecord.city,
      country: deliveryRecord.country,
      postalCode: deliveryRecord.postalCode,
      phone: deliveryRecord.phone,
      
      
    }));

    // Add title (lowered y-coordinate)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const titleY = 24; // Adjust this value to lower the title
    doc.text("Buyer Delivery Records", 70, titleY);
    

    // Add table (adjusted startY)
    
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: titleY + 5, // Adjust this value to set how far below the title the table starts
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
        minCellHeight: 17, // Adjust this value for desired row height
        halign: "left", // Left-align content horizontally
        valign: "middle", // Center content vertically
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      theme: "striped",
    });

    // Add footer with a horizontal line and logo
    const footerY = doc.internal.pageSize.height - 30;

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, footerY, doc.internal.pageSize.width - 10, footerY); // Horizontal line

    // Add logo to the footer
    const logoData = LogoImage; // Replace with the path to your logo
    const logoWidth = 40;
    const logoHeight = 20;
    const xPosition = (doc.internal.pageSize.width - logoWidth) / 2;
    const yPosition = footerY - logoHeight - -10; // Adjust margin as needed

    doc.addImage(logoData, "PNG", xPosition, yPosition, logoWidth, logoHeight);

    doc.save("Delivery_Records.pdf");
  };
  

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
          <nav className="flex items-center justify-between p-4 bg-transparent">
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
          </nav>
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
