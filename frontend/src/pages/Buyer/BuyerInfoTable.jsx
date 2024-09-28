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
import LogoImage from "../../assets/Logo.png";
import "../../index.css";

const { Search } = Input;

const BuyerInfoTable = () => {
  const [InfoRecords, setInfoRecords] = useState([]);
  const [filteredInfoRecords, setFilteredInfoRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInfoRecords();
  }, []);

  // Fetch Info records from API
  const fetchInfoRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/buyerInfo");
      setInfoRecords(response.data.data);
      setFilteredInfoRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching Info: ", error.response ? error.response.data : error.message);
    }
  };

  // Search Info records
  const handleSearch = (value) => {
    setSearchText(value);
    filterInfoRecords(value, filterStatus);
  };

  // Filter Info records
  const filterInfoRecords = (searchText, filterStatus) => {
    let filteredData = InfoRecords;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((InfoRecord) =>
        Object.values(InfoRecord).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((InfoRecord) => Info.status === filterStatus);
    }

    setFilteredInfoRecords(filteredData);
  };

  // Handle update Info record
  const handleUpdate = (id) => {
    navigate(`/updateBuyer/${id}`);
  };

  // Confirm before deleting an Info record
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Info record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete Info record
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/buyerInfo/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Info record deleted successfully",
        });
        setFilteredInfoRecords(filteredInfoRecords.filter(record => record._id !== id));
      } else {
        notification.error({
          message: "Error",
          description: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting Info record: ", error.message);
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("table-to-pdf");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.height;
      let heightLeft = imgHeight;
  
      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text("Info record Identification", 105, 20, { align: "center" });
  
      // Add the table image
      let positionY = 30; // Start position for the image on the first page
      pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
      heightLeft -= pageHeight - positionY;
  
      // Add pages if the content spans multiple pages
      while (heightLeft > 0) {
        pdf.addPage();
        positionY = 0; // Reset position to top of the new page
        pdf.addImage(imgData, "PNG", 0, positionY - heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Add footer with a horizontal line and logo
      const footerY = pdf.internal.pageSize.height - 30;
  
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.5);
      pdf.line(10, footerY, pdf.internal.pageSize.width - 10, footerY); // Horizontal line
  
      // Add logo to the footer
      const logoData = LogoImage; // Replace with the path to your logo
      const logoWidth = 40;
      const logoHeight = 20;
      const xPosition = (pdf.internal.pageSize.width - logoWidth) / 2;
      const yPosition = footerY - logoHeight - (-10); // Adjust margin as needed
  
      pdf.addImage(logoData, "PNG", xPosition, yPosition, logoWidth, logoHeight);
  
      pdf.save("InfoRecord.pdf");
    });
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
                to="/buyerinfotable"
                className="text-[#236A64] font-semibold"
              >
                Manage Buyer Details
              </Link>
              <Link
                to="/Bdeliverytable"
                 className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Manage Delivery Information
              </Link>
              <Link
                to="/Bdeliverytable"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Manage Orders
              </Link>
              <Link
                to="/CoconutPests"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Manage Feedback
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
                  title: "Buyers Info Records",
                },
              ]}
            />
            {/* Topic Heading */}
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-semibold">
                Buyers Info Records
              </h1>
            </div>
            {/* Buttons Row */}
            <div className="flex mt-4 space-x-4">

              
              <Search  ///Search Bar
              
                placeholder="Search for Buyer Info"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "100%" }}
              />
                <Button
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              style={{
                backgroundColor: 'red',  
                borderColor: 'red',      
                color: 'white',          
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
                  { title: "User Name", dataIndex: "userName", key: "userName" },
                  { title: "Gender", dataIndex: "Gender", key: "Gender" },
                  { title: "DOB", dataIndex: "DOB", key: "DOB" },
                  { title: "Number", dataIndex: "Number", key: "Number" },
                  { title: "email ", dataIndex: "email", key: "email" },
                  
    
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
                dataSource={filteredInfoRecords}
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
                onClick={() => navigate("/BuyerInfo")}
              >
                + Add New Buyer Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoTable