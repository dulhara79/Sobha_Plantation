import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal, Card } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import "../../index.css";

const { Search } = Input;
const { Option } = Select;

const QualityControl = () => {
  const [qualityControls, setQualityControls] = useState([]);
  const [filteredQualityControls, setFilteredQualityControls] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [metrics, setMetrics] = useState({
    totalInspections: 0,
    passRate: 0,
    failRate: 0
  });
  const [activeTab, setActiveTab] = useState("inspection"); 
  const navigate = useNavigate();

  // Fetch quality controls from API
  const fetchQualityControls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quality-control");
      if (response.data.success) {
        const data = response.data.data;
        setQualityControls(data);
        setFilteredQualityControls(data);
        calculateMetrics(data);
      } else {
        console.log("Error: Unable to fetch quality controls, success flag not true");
      }
    } catch (error) {
      console.error("Error fetching quality controls:", error);
    }
  };

  // Calculate metrics
  const calculateMetrics = (data) => {
    const total = data.length;
    const passCount = data.filter(qc => qc.status === "Passed").length;
    const failCount = data.filter(qc => qc.status === "Failed").length;

    setMetrics({
      totalInspections: total,
      passRate: total > 0 ? (passCount / total * 100).toFixed(2) : 0,
      failRate: total > 0 ? (failCount / total * 100).toFixed(2) : 0
    });
  };

  useEffect(() => {
    fetchQualityControls();
  }, []);

  // Handlers for navigation
  const onHomeClick = useCallback(() => {
    navigate("/products/productdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onProductionOverviewClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onPackagingClick = useCallback(() => {
    navigate("/products/packaging-labeling");
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

  // Function to filter quality controls based on search text and filter status
  const filterQualityControls = (searchText, filterStatus) => {
    let filteredData = qualityControls;

    if (searchText) {
      filteredData = filteredData.filter((qc) =>
        qc.productType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((qc) => qc.status === filterStatus);
    }

    if (sorter.field) {
      filteredData = [...filteredData].sort((a, b) => {
        if (sorter.order === 'ascend') {
          return a[sorter.field] > b[sorter.field] ? 1 : -1;
        } else {
          return a[sorter.field] < b[sorter.field] ? 1 : -1;
        }
      });
    }

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
  navigate(`/products/editInspectionReport/${id}`);
};

  // Handle delete
  const handleDelete = async (qualityControlId) => {
    try {
      await axios.delete(`http://localhost:5000/api/quality-control/${qualityControlId}`);
      fetchQualityControls(); // Refresh the quality control list
    } catch (error) {
      console.error("Error deleting quality control:", error);
      Modal.error({
        title: 'Error',
        content: 'Failed to delete the quality control item. Please try again later.',
      });
    }
  };

  // Confirm delete
  const confirmDelete = (qualityControlId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this quality control item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(qualityControlId),
    });
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
  
  // Generate PDF report
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Load the logo image
  const logoUrl = '../src/assets/logo.png'; 
  try {
    const logoDataURL = await getImageDataURL(logoUrl);

    // Add the logo image to the PDF
    doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20); // Adjust x, y, width, height as needed

  } catch (error) {
    console.error('Failed to load the logo image:', error);
  }

    // Define the table columns
    const columns = [
      { title: "Product Type", dataKey: "productType" },
      { title: "Inspection Date", dataKey: "inspectionDate" },
      { title: "Status", dataKey: "status" },
      { title: "Inspector Name", dataKey: "inspectorName" },
    ];

    // Map the filteredQualityControls data to match the columns
    const rows = filteredQualityControls.map(qc => ({
      productType: qc.productType,
      inspectionDate: moment(qc.inspectionDate).format('YYYY-MM-DD'),
      status: qc.status,
      inspectorName: qc.inspectorName,
    }));

    // Add title and table
    doc.setFontSize(22);
    doc.text("Quality Control Report", 70, 40); // Adjust y-coordinate as needed

    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 50, 
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126], 
        textColor: [255, 255, 255], 
        fontSize: 12,
        
      },
      theme: 'striped',
      didDrawPage: (data) => {
        // Add page number to footer
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10); // Adjust position as needed
      },
    });

    // Save the PDF
    doc.save("quality_control_report.pdf");
  };

  // Handler for "Add Inspection" button
  const handleAddInspection = () => {
    navigate("/products/addInspectionReport"); // Replace with your actual route
  };


  // Handler for "Issues" page navigation
  const navigateToIssues = () => {
    navigate("/products/issues");
  };

  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          {/* Navigation Bar */}
          <nav className="p-4 mb-5">
            <div className="container flex items-center justify-between mx-auto space-x-4">
              <div
                className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
                onClick={onBackClick}
              >
                <ArrowBack className="text-gray-700" />
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onProductionOverviewClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Production Overview
                </a>
              </div>
              <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white text-white"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Quality Control
              </a>
            </div>

              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onPackagingClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Packaging
                </a>
              </div>
            </div>
          </nav>

          {/* Breadcrumbs */}
          <Breadcrumb style={{ marginBottom: 16, marginLeft: 16 }}>
            <Breadcrumb.Item onClick={onHomeClick}>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Quality Control</Breadcrumb.Item>
          </Breadcrumb>


          {/* Metrics */}
          <div className="card-container">
          <Card
            title="Total Inspections"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.totalInspections}
            </div>
          </Card>

          <Card
            title="Pass Rate"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.passRate}%
            </div>
          </Card>

          <Card
            title="Fail Rate"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.failRate}%
            </div>
          </Card>
        </div>
        
        <div className="flex flex-col p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold" style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>Inspection Table</h2>

          {/* Search and Filters */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Search
                placeholder="Search by product type"
                onSearch={onSearch}
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
                style={{ marginBottom: '24px', backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }} 
                onClick={generatePDF}
                
              >
                Generate Report
              </Button>
              <Button 
                type="primary" 
                onClick={handleAddInspection} // Added button for adding inspections
                style={{ marginBottom: '24px', backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
              >
                Add Inspection
              </Button>
            </div>
          </div>

          {/* Table */}
          
          <Table
            dataSource={filteredQualityControls}
            rowKey="_id"
            onChange={(pagination, filters, sorter) => handleSort(sorter.field, sorter.order)}
          >
            <Table.Column title="Product Type" dataIndex="productType" key="productType" />
            <Table.Column title="Inspection Date" dataIndex="inspectionDate" key="inspectionDate" render={date => moment(date).format('YYYY-MM-DD')} />
            <Table.Column title="Status" dataIndex="status" key="status" />
            <Table.Column title="Inspector Name" dataIndex="inspectorName" key="inspectorName" />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <div>
                      <Button 
                      onClick={() => handleSubmit(record._id)} 
                      style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }} // Blue color
                    >
                      Edit
                    </Button>

                      <Button 
                        onClick={() => confirmDelete(record._id)} 
                        type="danger"
                        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }} // Red color
                      >
                        Delete
                      </Button>
                    </div>
              )}
            />
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;
