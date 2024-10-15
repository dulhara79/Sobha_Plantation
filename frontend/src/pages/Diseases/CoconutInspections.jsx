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
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoImage from "../../assets/Logo.png";
import "../../index.css";
import DiseasesNavBar from "../../components/DiseasesComponents/DiseasesNavBar";

const { Search } = Input;

const CoconutInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInspections();
  }, []);

  // Fetch inspections from API
  const fetchInspections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/diseases");
      setInspections(response.data.data);
      setFilteredInspections(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching inspections: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Search inspections
  const handleSearch = (value) => {
    setSearchText(value);
    filterInspections(value, filterStatus);
  };

  // Filter inspections
  const filterInspections = (searchText, filterStatus) => {
    let filteredData = inspections;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((inspection) =>
        Object.values(inspection).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter(
        (inspection) => inspection.status === filterStatus
      );
    }

    setFilteredInspections(filteredData);
  };

  // Handle update inspection
  const handleUpdate = (id) => {
    navigate(`/updateCoconutDiseases/${id}`);
  };

  // Confirm before deleting an inspection
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this inspection record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete inspection
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/diseases/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Inspection record deleted successfully",
        });
        setFilteredInspections(
          filteredInspections.filter((record) => record._id !== id)
        );
      } else {
        notification.error({
          message: "Error",
          description: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting inspection: ", error.message);
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };
  
  // Helper function to convert image to Data URL
  const getImageDataURL = (imagePath) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imagePath;
          img.crossOrigin = "anonymous";
          img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL("image/png");
              resolve(dataURL);
          };
          img.onerror = (error) => reject(error);
      });
  };
  
  const generatePDF = async () => {
      const doc = new jsPDF();
      const today = moment().format("YYYY-MM-DD");
  
      // Load the logo image
      let logoDataURL;
      try {
          logoDataURL = await getImageDataURL(LogoImage);
      } catch (error) {
          console.error("Failed to load the logo image:", error);
          return; // Exit the function if the logo can't be loaded
      }
  
      // Draw header and footer function
      const drawHeaderFooter = (data) => {
          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;

          // Header
          doc.setFontSize(14);
          doc.text("Sobha Plantations", 10, 10); // Align left
          doc.setFontSize(10);
          doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
          doc.text("Kurunegala, Sri Lanka.", 10, 20); // Address line 2
          doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
          doc.text("Contact: 0112 751 757", 10, 30); // Contact number
          doc.text(`Date: ${today}`, 10, 35);
  
          if (logoDataURL) {
              doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10); // Align right
          }
  
          doc.line(10, 38, pageWidth - 10, 38); // Header line
  
          // // Footer with page number
          // doc.setFontSize(10);
          // doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
      };
  
      // Set the margins for header and footer space
      const marginTop = 40; // Space reserved for header
      const marginBottom = 20; // Space reserved for footer
  
      // Define the columns for the table
      const columns = [
          { title: "Date", dataKey: "dateOfInspection" },
          { title: "Field Section", dataKey: "sectionOfLand" },
          { title: "Identified Pests", dataKey: "identifiedPest" },
          { title: "Identified Diseases", dataKey: "identifiedDisease" },
          { title: "Inspected By", dataKey: "inspectedBy" },
          { title: "Inspection Result", dataKey: "inspectionResult" },
          { title: "Re-Inspection Date", dataKey: "suggestedReInspectionDate" },
      ];
  
      // Prepare the data for the table
      const rows = filteredInspections.map((inspection) => ({
          dateOfInspection: moment(inspection.dateOfInspection).format("YYYY-MM-DD"),
          sectionOfLand: inspection.sectionOfLand,
          identifiedPest: inspection.identifiedPest,
          identifiedDisease: inspection.identifiedDisease,
          inspectedBy: inspection.inspectedBy,
          inspectionResult: inspection.inspectionResult,
          suggestedReInspectionDate: moment(inspection.suggestedReInspectionDate).format("YYYY-MM-DD"),
      }));
  
      // Add title
      doc.setFontSize(18);
      const titleY = 50; // Adjust this value to lower the title
      doc.text("Coconut Inspections and Disease Identification", 35, titleY);
  
      // Add table
      doc.autoTable({
          columns: columns,
          body: rows,
          startY: titleY + 13, // Set how far below the title the table starts
          margin: { horizontal: 10 },
          styles: {
              fontSize: 10,
              minCellHeight: 17, // Adjust for desired row height
              halign: "left", // Left-align content horizontally
              valign: "middle", // Center content vertically
          },
          headStyles: {
              fillColor: [64, 133, 126],
              textColor: [255, 255, 255],
              fontSize: 12,
          },
          theme: "striped",
      });
  
      // Draw the header and footer for each page
      doc.setPage(1);
      drawHeaderFooter({ pageNumber: 1 });
      for (let pageIndex = 1; pageIndex <= doc.internal.getNumberOfPages(); pageIndex++) {
          doc.setPage(pageIndex);
          drawHeaderFooter({ pageNumber: pageIndex });
      }
  
      // Save the PDF
      doc.save("Coconut_Diseases_Report.pdf");
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
          <div className="mt-1">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                {
                  href: "/diseases",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Coconut Inspections",
                },
              ]}
            />
            {/* Diseases Navigation Bar */}
            <div style={{ marginBottom: "22px" }}>
              <DiseasesNavBar style={{ height: "80px" }} />{" "}
            </div>

            {/* Topic Heading */}
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-semibold">
                Coconut Inspections and Disease Identification
              </h1>
            </div>
            {/* Buttons Row */}
            <div className="flex mt-4 space-x-4">
              <Search
                placeholder="Search for Pests and Diseases"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "100%" }}
              />
              <Button icon={<FilePdfOutlined />} onClick={generatePDF}>
                Generate Reports
              </Button>
            </div>
            {/* Centered Buttons */}
            <div className="flex justify-center mt-8 mb-8 space-x-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/CoconutInspections")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/IntercropInspections")}
              >
                Inter Crops
              </Button>
            </div>

            {/* Table */}
            <div id="table-to-pdf">
              <Table
                columns={[
                  {
                    title: "Date",
                    dataIndex: "dateOfInspection",
                    key: "dateOfInspection",
                    render: (text) => moment(text).format("YYYY-MM-DD"),
                  },
                  {
                    title: "Field Section",
                    dataIndex: "sectionOfLand",
                    key: "sectionOfLand",
                  },
                  {
                    title: "Identified Pests",
                    dataIndex: "identifiedPest",
                    key: "identifiedPest",
                  },
                  {
                    title: "Identified Diseases",
                    dataIndex: "identifiedDisease",
                    key: "identifiedDisease",
                  },
                  {
                    title: "Inspected By",
                    dataIndex: "inspectedBy",
                    key: "inspectedBy",
                  },
                  {
                    title: "Inspection Result",
                    dataIndex: "inspectionResult",
                    key: "inspectionResult",
                  },
                  {
                    title: "Re-Inspection Date",
                    dataIndex: "suggestedReInspectionDate",
                    key: "suggestedReInspectionDate",
                    render: (text) => moment(text).format("YYYY-MM-DD"),
                  },
                  {
                    title: "Actions",
                    key: "actions",
                    render: (text, record) => (
                      <span style={{ display: "flex", gap: "2px" }}>
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleUpdate(record._id)}
                        />
                        <Button
                          type="link"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => confirmDelete(record._id)}
                        />
                      </span>
                    ),
                  },
                ]}
                dataSource={filteredInspections}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                style={{ width: "100%" }} // Ensure table width fits content
                bordered
              />
            </div>

            {/* Learn More and Add Buttons */}
            <div className="flex flex-col items-center pb-8 mt-1">
              <Button
                style={{
                  backgroundColor: "#236A64",
                  color: "#fff",
                  marginTop: "16px",
                }}
                onClick={() => navigate("/AddCoconutDiseases")}
              >
                + Add
              </Button>
              <Button
                style={{
                  backgroundColor: "rgba(196, 196, 196, 0.44)",
                  width: "100%",
                  maxWidth: "400px",
                  marginTop: "16px",
                }}
                onClick={() => navigate("/CoconutPests")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoconutInspections;
