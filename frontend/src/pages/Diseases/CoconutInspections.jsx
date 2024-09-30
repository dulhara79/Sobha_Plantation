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
      const response = await axios.get("http://localhost:8090/api/diseases");
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
        `http://localhost:8090/api/diseases/${id}`
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

  const generatePDF = async () => {
    const doc = new jsPDF();

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

    // Get the data from the inspections state
    const rows = filteredInspections.map((inspection) => ({
      dateOfInspection: moment(inspection.dateOfInspection).format(
        "YYYY-MM-DD"
      ),
      sectionOfLand: inspection.sectionOfLand,
      identifiedPest: inspection.identifiedPest,
      identifiedDisease: inspection.identifiedDisease,
      inspectedBy: inspection.inspectedBy,
      inspectionResult: inspection.inspectionResult,
      suggestedReInspectionDate: moment(
        inspection.suggestedReInspectionDate
      ).format("YYYY-MM-DD"),
    }));

    // Add title (lowered y-coordinate)
    doc.setFontSize(18);
    const titleY = 24; // Adjust this value to lower the title
    doc.text("Coconut Inspections and Disease Identification", 35, titleY);

    // Add table (adjusted startY)
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: titleY + 13, // Adjust this value to set how far below the title the table starts
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
        fontSize: 12,
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
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/CoconutInspections"
                className="text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full font-semibold"
              >
                Inspections
              </Link>
              <Link
                to="/CoconutTreatments"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
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
                to="/RegularMaintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              {/* <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link> */}
            </div>
          </nav>
          <div className="mt-4">
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
            {/* Topic Heading */}
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-semibold">
                Coconut Inspections and Disease Identification
              </h1>
            </div>
            {/* Buttons Row */}
            <div className="flex space-x-4 mt-4">
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
            <div className="flex justify-center space-x-8 mt-8 mb-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/coconutInspections")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/intercropInspections")}
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
            <div className="flex flex-col items-center mt-1 pb-8">
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
