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
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoImage from "../../assets/logo.png";
import "../../index.css";
import DiseasesNavBar from "../../components/DiseasesComponents/DiseasesNavBar";

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
      const response = await axios.get("http://localhost:5000/api/treatments");
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
        `http://localhost:5000/api/treatments/${id}`
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
    doc.text("Sobha Plantations", 10, 10); // Align left

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
    "Date of Treatment",  
   "Pest or Disease",  
   "Treatment Method", 
   "Current Health Rate", 
    "Treated By", 
    "Notes"
    ]; 

    // Get the data from the inspections state
    const rows = filteredTreatments.map((treatment) => [
      moment(treatment.dateOfTreatment).format("YYYY-MM-DD"),
      treatment.pestOrDisease,
      treatment.treatmentMethod,
      treatment.healthRate,
      treatment.treatedBy,
      treatment.notes,
      
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
    doc.save("Coconut_Treatments_Report.pdf");
  }
  
  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[285px] p-4 overflow-auto">
          
          <div className="mt-2">
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
            {/* Diseases Navigation Bar */}
            <div style={{ marginBottom: "22px" }}>
              <DiseasesNavBar style={{ height: "80px" }} />{" "}
            </div>
          </div>

          {/* Topic Section */}
          <div className="px-6 mt-4">
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
            <div className="flex justify-center mt-8 mb-8 space-x-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/CoconutTreatments")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/IntercropTreatments")}
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
            <div className="flex flex-col items-center pb-8 mt-8">
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
