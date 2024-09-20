import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Table, Input, Modal, notification } from "antd";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import {
  HomeOutlined,
  LeftOutlined,
  FilePdfOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LogoImage from "../../assets/logo.png";
import "../../index.css";

const { Search } = Input;

const CoconutTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTreatments();
  }, []);

  // Fetch treatments from API
  const fetchTreatments = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/treatments");
        setTreatments(response.data.data);
        setFilteredTreatments(response.data.data);
    } catch (error) {
      console.error("Error fetching treatments: ", error.response ? error.response.data : error.message);
    }
  };

  // Search treatments
  const handleSearch = (value) => {
    setSearchText(value);
    filterTreatments(value, filterStatus);
  };

  // Filter treatments
  const filterTreatments = (searchText, filterStatus) => {
    let filteredData = treatments;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((treatment) =>
        Object.values(treatment).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter(
        (treatment) => treatment.status === filterStatus
      );
    }

    setFilteredTreatments(filteredData);
  };

  // Handle update treatment
  const handleUpdate = (id) => {
    navigate(`/updateCoconutTreatments/${id}`);
  };

  // Confirm before deleting a treatment
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this treatment record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete treatment
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8090/api/treatments/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Treatment deleted successfully",
          description: "The treatment record has been deleted successfully.",
        });
        setFilteredTreatments(filteredTreatments.filter((treatment) => treatment._id !== id));
      } else {
        notification.error({
          message: "Error deleting treatment",
          description: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting treatment: ", error.message);
      notification.error({
        message: "Error deleting treatment",
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
      pdf.text("Coconut Treatments Report", 105, 20, { align: "center" });
  
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
  
      pdf.save("Coconut_Treatments_Report.pdf");
    });
  };
  
  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between p-4 bg-transparent">
            {/* Go Back Icon */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            {/* Navigation Items */}
            <div className="flex space-x-4">
              <Link
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/CoconutInspections"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Inspections
              </Link>
              <Link
                to="/CoconutTreatments"
                className="text-[#236A64] font-semibold"
              >
                Treatments
              </Link>
              <Link
                to="/CoconutPests"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pests and Diseases
              </Link>
              <Link
                to="/Maintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link>
            </div>
          </nav>

          <div className="ml-[30px] mt-4">
            <Breadcrumb
              items={[
                {
                  href: "/diseases",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Coconut Treatments",
                },
              ]}
            />
          </div>

          {/* Topic Section */}
          <div className="mt-4 px-6">
            {/* Title and Show More Icon */}
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-semibold">
                Pests and Diseases Treatments
              </h1>
              <div className="flex space-x-4">
              <Search
                placeholder="Search for treatments"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "100%" }}
              />
                <Button icon={<FilePdfOutlined />} onClick={generatePDF}>Generate Reports</Button>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-center space-x-8 mt-8 mb-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/coconutTreatments")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/intercropTreatments")}
              >
                Inter Crops
              </Button>
            </div>

            {/* Table */}
            <div id="table-to-pdf">
              <Table
              columns={[
                {
                  title: "Date of Treatment",
                  dataIndex: "dateOfTreatment",
                  key: "dateOfTreatment",
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Pest or Disease",
                  dataIndex: "pestOrDisease",
                  key: "pestOrDisease",
                },
                {
                  title: "Treatment Method",
                  dataIndex: "treatmentMethod",
                  key: "treatmentMethod",
                },
                {
                  title: "Current Health Rate",
                  dataIndex: "healthRate",
                  key: "healthRate",
                },
                {
                  title: "Treated By",
                  dataIndex: "treatedBy",
                  key: "treatedBy",
                },
                {
                  title: "Notes",
                  dataIndex: "notes",
                  key: "notes",
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (text, record) => (
                    <span style={{ display: "flex", gap: "2px" }}>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record._id)}/>
                      <Button type="link" icon={<DeleteOutlined />} danger onClick={() => confirmDelete(record._id)}/>
                      <Button type="link" icon={<MoreOutlined />} onClick={() => navigate("/detailedOverview")}>More</Button>
                    </span>
                  ),
                },
              ]}
              dataSource={filteredTreatments}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              style={{ width: "100%" }} // Ensure table width fits content
              bordered
              />
            </div>

            {/* Add and Insights Buttons */}
            <div className="flex flex-col items-center mt-8 pb-8">
              <Button
                style={{
                  backgroundColor: "#4CAF50", // Green color for Add button
                  color: "#fff",
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
                onClick={() => navigate("/addCoconutTreatments")}
              >
                + Add
              </Button>

              <Button
                style={{
                  background: "linear-gradient(135deg, #4CAF50, orange)",
                  color: "#fff",
                  marginTop: "16px",
                  width: "100%",
                  maxWidth: "400px",
                  height: "48px", // Taller height for Insights button
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  fontWeight: "bold",
                  transition: "all 0.3s ease", // Transition effect
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                } // Scale on hover
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                } // Reset scale on leave
                onClick={() => navigate("/insights")}
              >
                Insights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoconutTreatments;
