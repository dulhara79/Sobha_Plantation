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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoImage from "../../assets/logo.png";
import "../../index.css";

const { Search } = Input;

const IntercropTreatments = () => {
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
      const response = await axios.get("http://localhost:5000/api/cropTreatments");
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
      navigate(`/updateCropsTreatments/${id}`);
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
      `http://localhost:5000/api/cropTreatments/${id}`
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

const generatePDF = async () => {
  const doc = new jsPDF();

  // Define the columns for the table
  const columns = [
    { title: "Date of Treatment", dataKey: "dateOfTreatment" },
    { title: "Pest or Disease", dataKey: "pestOrDisease" },
    { title: "Treatment Method", dataKey: "treatmentMethod" },
    { title: "Current Health Rate", dataKey: "healthRate" },
    { title: "Treated By", dataKey: "treatedBy" },
    { title: "Notes", dataKey: "notes" },
  ];

  // Get the data from the inspections state
  const rows = filteredTreatments.map(treatment => ({
      dateOfTreatment: moment(treatment.dateOfTreatment).format("YYYY-MM-DD"),
      pestOrDisease: treatment.pestOrDisease,
      treatmentMethod: treatment.treatmentMethod,
      healthRate: treatment.healthRate,
      treatedBy: treatment.treatedBy,
      notes: treatment.notes,
    }));

  // Add title (lowered y-coordinate)
  doc.setFontSize(18);
  const titleY = 24; // Adjust this value to lower the title
  doc.text("Inter-Crop Treatments Report", 60, titleY);

  // Add table (adjusted startY)
  doc.autoTable({
    columns: columns,
    body: rows,
    startY: titleY + 13, // Adjust this value to set how far below the title the table starts
    margin: { horizontal: 10 },
    styles: {
      fontSize: 10,
      minCellHeight: 17, // Adjust this value for desired row height
      halign: 'left',    // Left-align content horizontally
    valign: 'middle',    // Center content vertically
    },
    headStyles: {
      fillColor: [64, 133, 126],
      textColor: [255, 255, 255],
      fontSize: 12,
    },
    theme: 'striped',
  //   didDrawPage: (data) => {
  //     // Add page number to footer
  //     const pageNumber = doc.internal.getNumberOfPages();
  //     const pageWidth = doc.internal.pageSize.width;
  //     const pageHeight = doc.internal.pageSize.height;

  //     doc.setFontSize(10);
  //     doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10); // Adjust position as needed
  //   },
  // }
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
    const yPosition = footerY - logoHeight - (-10); // Adjust margin as needed

    doc.addImage(logoData, "PNG", xPosition, yPosition, logoWidth, logoHeight);

    doc.save("Inter-Crop_Treatments_Report.pdf");
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
                className="text-gray-100 px-2 py-0.5 bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 rounded-full font-semibold">
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

          <div className="ml-[30px] mt-4">
            <Breadcrumb
              items={[
                {
                  href: "/diseases",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Intercrop Treatments",
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
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/coconutTreatments")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
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
                onClick={() => navigate("/addIntercropTreatments")}
              >
                + Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercropTreatments;
