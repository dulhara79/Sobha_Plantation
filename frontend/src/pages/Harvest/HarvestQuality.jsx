import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal, Card } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "../../index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HomeOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const { Search } = Input;
const { Option } = Select;

// Navigation menu items for the dashboard
const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "QUALITYCHECKING", path: "/harvest/quality" },
  // { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
];

const HarvestQuality = () => {
  const [qualityControls, setQualityControls] = useState([]);
  const [filteredQualityControls, setFilteredQualityControls] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [metrics, setMetrics] = useState({
    totalInspections: 0,
    passCount: 0,
    failCount: 0,
  });
  const [activeTab, setActiveTab] = useState("inspection");
  const navigate = useNavigate();
  const location = useLocation(); // This should come before using 'location.pathname'
  const activePage = location.pathname;

  // Fetch quality controls from API
  const fetchQualityControls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quality");
      if (response.data.success) {
        const data = response.data.data;
        setQualityControls(data);
        setFilteredQualityControls(data);
        calculateMetrics(data);
      } else {
        console.log(
          "Error: Unable to fetch quality controls, success flag not true"
        );
      }
    } catch (error) {
      console.error("Error fetching quality controls:", error);
    }
  };

  // Calculate metrics
  const calculateMetrics = (data) => {
    const total = data.length;
    const passCount = data.filter((qc) => qc.qualityStatus === "Passed").length;
    const failCount = data.filter((qc) => qc.qualityStatus === "Failed").length;

    setMetrics({
      totalInspections: total,
      passCount: passCount,
      failCount: failCount,
    });
  };

  const COLORS = ["#60DB19", "#FF4D4F"];

  // Ensure totalInspections is greater than 0 to avoid division by zero
  const passRate =
    metrics.totalInspections > 0
      ? (metrics.passCount / metrics.totalInspections) * 100
      : 0;
  const failRate =
    metrics.totalInspections > 0
      ? (metrics.failCount / metrics.totalInspections) * 100
      : 0;

  const pieData = [
    { name: "Pass Rate", value: passRate },
    { name: "Fail Rate", value: failRate },
  ];

  useEffect(() => {
    fetchQualityControls();
  }, []);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Handler for search input
  const onSearch = (value) => {
    setSearchText(value);
    filterQualityControls(value, filterStatus);
  };

  // Handler for filter change
  const onFilterChange = (value) => {
    setFilterStatus(value);
    filterQualityControls(searchText, value);
  };

// Function to filter quality controls based on search text, filter status, and multiple fields
const filterQualityControls = (searchText, filterStatus) => {
  let filteredData = qualityControls;

  // Filter by search text on multiple fields
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    filteredData = filteredData.filter((qc) => {
      // Log the checkDate value for debugging
      console.log('Checking QC:', qc);

      // Check against cropType, checkDate, qualityController, and parameters (size, ripeness, damage)
      return (
        qc.cropType.toLowerCase().includes(searchLower) ||
        // Check if checkDate matches the search text
        (typeof qc.checkDate === 'string' && qc.checkDate.toLowerCase().includes(searchLower)) || // For string representation
        (qc.checkDate instanceof Date && new Date(qc.checkDate).toLocaleDateString().includes(searchLower)) || // For Date objects
        qc.qualityController.toLowerCase().includes(searchLower) ||
        (qc.parameters?.size && qc.parameters.size.toString().includes(searchLower)) ||
        (qc.parameters?.ripeness && qc.parameters.ripeness.toLowerCase().includes(searchLower)) ||
        (qc.parameters?.damage && qc.parameters.damage.toLowerCase().includes(searchLower))
      );
    });
  }

  // Filter by quality status if it's not "All"
  if (filterStatus !== "All") {
    filteredData = filteredData.filter((qc) => qc.qualityStatus === filterStatus);
  }

  // Apply sorting if sorter field is provided
  if (sorter.field) {
    filteredData = [...filteredData].sort((a, b) => {
      const fieldA = a[sorter.field];
      const fieldB = b[sorter.field];

      if (sorter.order === "ascend") {
        return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
        return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
    });
  }

  // Update state and metrics
  setFilteredQualityControls(filteredData);
  calculateMetrics(filteredData); // Update metrics based on filtered data
};




  // Sorting handler
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterQualityControls(searchText, filterStatus);
  };

  // Handle update
  const handleSubmit = (id) => {
    navigate(`/quality/editinspection/${id}`);
  };

  // Confirm delete
  const confirmDelete = (qualityControlId) => {
    Swal.fire({
      title: "Are you sure you want to delete this inspection?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(qualityControlId);
        Swal.fire({
          title: "Deleted!",
          text: "Your inspection has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle delete
  const handleDelete = async (qualityControlId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/quality/${qualityControlId}`
      );
      fetchQualityControls(); // Refresh the quality control list
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Failed to delete the inspection. ${
          error.response?.data?.message || "Please try again."
        }`,
        icon: "error",
      });
    }
  };

  // Function to get image data URL
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };
  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Load the logo image
    const logoUrl = "../src/assets/logo.png";
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error("Failed to load the logo image:", error);
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
    const marginTop = 30; // space reserved for header
    const marginBottom = 20; // space reserved for footer
  
    // Title for the report
    const title = "Quality Report";
    doc.setFontSize(22);
    
    // Calculate the width of the title
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Calculate the x position to center the title
    const xPosition = (pageWidth - titleWidth) / 2;
    
    // Set the title at the calculated center position
    doc.text(title, xPosition, 48); // Adjust y-coordinate to fit under the header
  
    const passRate =
      metrics.totalInspections > 0
        ? (metrics.passCount / metrics.totalInspections) * 100
        : 0;
    const failRate =
      metrics.totalInspections > 0
        ? (metrics.failCount / metrics.totalInspections) * 100
        : 0;
  
    // Define the overview details
    const overviewHeaders = [["Detail", "Value"]];
    const overviewRows = [
      ["Total Inspections", `${metrics.totalInspections}`],
      ["Pass Rate", `${passRate.toFixed(2)}%`], // Show pass rate in percentage format
      ["Fail Rate", `${failRate.toFixed(2)}%`], // Show fail rate in percentage format
    ];
  
    // Add Overview Details Table
    doc.autoTable({
      startY: marginTop + 20, // Start the first table below the header space
      head: overviewHeaders,
      body: overviewRows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "grid",
      didDrawPage: drawHeaderFooter, // Add header and footer to each page
    });
  
    // Second Table: Quality Control Data
    const columns = [
      { title: "Crop Type", dataKey: "cropType" },
      { title: "Check Date", dataKey: "checkDate" },
      { title: "Quality Status", dataKey: "qualityStatus" },
      { title: "Quality Controller", dataKey: "qualityController" },
      { title: "Parameters", dataKey: "parameters" },
    ];
  
    // Map the filteredQualityControls data to match the columns
    const rows = filteredQualityControls.map((qc) => {
      // Convert parameters to a string representation
      const params = qc.parameters;
      const parametersString = `
        
        Ripeness: ${params.ripeness || 'N/A'}, 
        Damage: ${params.damage || 'N/A'}
      `.trim(); // Trim any extra spaces
  
      return {
        cropType: qc.cropType,
        checkDate: moment(qc.checkDate).format("YYYY-MM-DD"),
        qualityStatus: qc.qualityStatus,
        qualityController: qc.qualityController,
        parameters: parametersString, // Use the formatted string
      };
    });
  
    let finalY = doc.lastAutoTable.finalY + 10; // Adjust space between tables
  
    doc.autoTable({
      startY: finalY, // Start this table below the first table
      columns: columns,
      body: rows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "striped",
      didDrawPage: drawHeaderFooter,
    });
  
    // Save the PDF
    doc.save("Quality_Report.pdf");
  };
  

  // Handler for "Add Inspection" button
  const handleAddInspection = () => {
    navigate("/quality/addinspection"); // Replace with your actual route
  };

  const isActive = (page) => activePage === page;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          {/* Navigation Bar */}
          <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
            <div className="flex items-center justify-center">
              <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
                <ArrowBackIcon
                  className="rounded-full hover:bg-[#abadab] p-2"
                  onClick={onBackClick}
                />
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex ${
                      isActive(item.path)
                        ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full"
                        : "hover:bg-lime-200 rounded-full"
                    }`}
                  >
                    <Link to={item.path} className="flex items-center px-2">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          
          <div className="flex items-center justify-between mb-5">
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  title: "Harvest",
                },
                {
                  title: "Quality Checking",
                },
              ]}
            />
          </div>
          {/* Pass/Fail Rates Table */}
          <div
            className="flex flex-col p-4 bg-white rounded shadow-md items-center"
            style={{
              marginTop: "10px",
              maxWidth: "700px",
              margin: "0 auto",
              height: "400px",
            }}
          >
            <h2
              className="mb-4 text-xl font-semibold"
              style={{
                marginBottom: "-60px",
                fontWeight: "bold",
                color: "#1D6660",
              }}
            >
              Pass/Fail Count
            </h2>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="flex flex-col p-4 bg-white rounded shadow-md">
            {/* <h2 className="mb-4 text-xl font-semibold" style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}
        >Inspection Table</h2> */}

            {/* Search and Filters */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Search
                  placeholder="Search "
                  onChange={(e) => onSearch(e.target.value)} // Trigger search as user types
                  style={{ width: 200, marginRight: 16 }} // Added marginRight for spacing
                  allowClear
                />

                <Select defaultValue="All" style={{ width: 120 }} onChange={onFilterChange}>
                <Option value="All">All</Option>
                <Option value="Passed">Pass</Option>
                <Option value="Failed">Fail</Option>
              </Select>
              </div>

              {/* Buttons for actions */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  icon={<FilePdfOutlined />}
                  style={{
                    marginBottom: "24px",
                    backgroundColor: "#60DB19",
                    borderColor: "#60DB19",
                    color: "#000000",
                  }}
                  onClick={generatePDF}
                >
                  Generate Report
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddInspection} // Added button for adding inspections
                  style={{
                    marginBottom: "24px",
                    backgroundColor: "#60DB19",
                    borderColor: "#60DB19",
                    color: "#000000",
                  }}
                >
                  Add Inspection
                </Button>
              </div>
            </div>

            {/* Table */}

            {/* Table displaying quality control inspections */}
            <Table
              dataSource={filteredQualityControls}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              onChange={(pagination, filters, sorter) =>
                handleSort(sorter.field, sorter.order)
              }
              columns={[
                {
                  title: "Crop Type",
                  dataIndex: "cropType",
                  sorter: true,
                  sortOrder: sorter.field === "cropType" && sorter.order,
                },
                {
                  title: "Check Date",
                  dataIndex: "checkDate",
                  render: (date) => moment(date).format("YYYY-MM-DD"),
                  sorter: true,
                  sortOrder: sorter.field === "checkDate" && sorter.order,
                },
                {
                  title: "Quality Status",
                  dataIndex: "qualityStatus",
                  sorter: true,
                  sortOrder: sorter.field === "qualityStatus" && sorter.order,
                },
                {
                  title: "Quality Controller",
                  dataIndex: "qualityController",
                  sorter: true,
                  sortOrder:
                    sorter.field === "qualityController" && sorter.order,
                },
                {
                  title: "Parameters",
                  dataIndex: "parameters",
                  render: (params) => (
                    <span>{`Ripeness: ${params.ripeness || "N/A"}, Damage: ${
                      params.damage || "N/A"
                    }`}</span>
                  ),
                },
                {
                  title: "Actions",
                  render: (record) => (
                    <div>
                      <Button
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 }}
                        onClick={() => handleSubmit(record._id)}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => confirmDelete(record._id)}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestQuality;
