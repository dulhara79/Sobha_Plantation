import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal, Card } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { DeleteOutlined, EditOutlined, PlusOutlined, FilePdfOutlined } from '@ant-design/icons';
import moment from "moment";
import "../../index.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { HomeOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import LoadingDot from '../../components/LoadingDots'; 


const { Search } = Input;
const { Option } = Select;

// Navigation menu items for the dashboard
const menuItems = [
  { name: 'HOME', path: '/products/productdashboard' },
  { name: 'PRODUCTION', path: '/products/production-overview' },
  { name: 'QUALITY', path: '/products/quality-control' },
  { name: 'PACKAGING', path: '/products/packaging-labeling' }
];

const QualityControl = () => {
  const [qualityControls, setQualityControls] = useState([]);
  const [filteredQualityControls, setFilteredQualityControls] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalInspections: 0,
    passRate: 0,
    failRate: 0
  });
  const [activeTab, setActiveTab] = useState("inspection"); 
  const navigate = useNavigate();
  const activePage = location.pathname;

  // Fetch quality controls from API
  const fetchQualityControls = async () => {
    try {
      setTimeout(async () => {
      const response = await axios.get("http://localhost:5000/api/quality-control");
      if (response.data.success) {
        const data = response.data.data;
        setQualityControls(data);
        setFilteredQualityControls(data);
        calculateMetrics(data);
      } else {
        console.log("Error: Unable to fetch quality controls, success flag not true");
      }
      setLoading(false); // Stop loading after data fetch
    }, 150); // Adjust the delay as needed
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
    // Convert search text to lowercase for case-insensitive search
    const lowerSearchText = searchText.toLowerCase();
    filteredData = filteredData.filter((qc) =>
      // Search across multiple fields
      qc.productType.toLowerCase().includes(lowerSearchText) ||
      qc.inspectionDate.toLowerCase().includes(lowerSearchText) || // Include inspectionDate in search
      qc.status.toLowerCase().includes(lowerSearchText) ||
      qc.inspectorName.toLowerCase().includes(lowerSearchText) // Include inspectorName in search
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
        await axios.delete(`http://localhost:5000/api/quality-control/${qualityControlId}`);
        fetchQualityControls(); // Refresh the quality control list
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Failed to delete the inspection. ${error.response?.data?.message || 'Please try again.'}`,
          icon: "error",
        });
      }
    };

  // // Handle delete
  // const handleDelete = async (qualityControlId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/quality-control/${qualityControlId}`);
  //     fetchQualityControls(); // Refresh the quality control list
  //   } catch (error) {
  //     console.error("Error deleting quality control:", error);
  //     Modal.error({
  //       title: 'Error',
  //       content: 'Failed to delete the quality control item. Please try again later.',
  //     });
  //   }
  // };

  // // Confirm delete
  // const confirmDelete = (qualityControlId) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this quality control item?",
  //     okText: "Yes",
  //     okType: "danger",
  //     cancelText: "No",
  //     onOk: () => handleDelete(qualityControlId),
  //   });
  // };

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
const generatePDF = async () => {
  const doc = new jsPDF();
  const today = moment().format("YYYY-MM-DD");

  // Load the logo image
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
    doc.text(`Date: ${today}`, 10, 35);

    if (logoDataURL) {
      doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
    }

    doc.line(10, 38, pageWidth - 10, 38); // Header line

    // Footer with page number
    doc.setFontSize(10);
    doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
  };

  // Set the margins for header and footer space
  const marginTop = 30; // space reserved for header
  const marginBottom = 20; // space reserved for footer

  // Title of the report
  doc.setFontSize(22);
  doc.text("Quality Control Report", 65, 48); // Adjust y-coordinate to start below header

  // Calculate the status summary
  const statusSummary = filteredQualityControls.reduce((summary, qc) => {
    const status = qc.status; // Assuming status can be "Pass" or "Fail"
    if (!summary[status]) {
      summary[status] = 0;
    }
    summary[status]++;
    return summary;
  }, {});

  const totalPass = statusSummary["Pass"] || 0;
  const totalFail = statusSummary["Fail"] || 0;

  // Define the overview details
  const overviewHeaders = [['Detail', 'Value']];
  const overviewRows = [
    ['Total Inspections', `${metrics.totalInspections}`],
    ['Pass Rate', `${metrics.passRate}%`],
    ['Fail Rate', `${metrics.failRate}%`],
  ];

  // Add Overview Details Table
  doc.autoTable({
    startY: 60, // Start the first table below the header space
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
    theme: 'grid',
    didDrawPage: drawHeaderFooter, // Add header and footer to each page
  });

  // Second Table: Quality Control Data
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
    theme: 'striped',
    didDrawPage: drawHeaderFooter,
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

  const isActive = (page) => activePage === page;
  
  if (loading) return <LoadingDot />;

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
                <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2" onClick={onBackClick} />
                {menuItems.map((item) => (
                  <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                    <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Breadcrumb and Gallery Button */}
      <div className="flex items-center justify-between mb-5">
          <Breadcrumb
            items={[
              {
                href: '',
                title: <HomeOutlined />,
              },
              {
                title: 'Products',
              },
              {
                title: 'Quality Control',
              },
            ]}
          />
      </div>


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
        <h2 className="mb-4 text-xl font-semibold" style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}
        >Inspection Table</h2>

          {/* Search and Filters */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <Search
                placeholder="Search in quality control"
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
                style={{
                  backgroundColor: '#22c55e', // bg-green-500
                  borderColor: '#22c55e',
                }}
                className="px-4 py-2 text-white rounded hover:bg-green-600 hover:border-green-600"
                icon={<FilePdfOutlined />}
                // style={{ marginBottom: '24px', backgroundColor: '#22c55e', borderColor: '#60DB19', color: '#000000' }} 
                onClick={generatePDF}
                
              >
                Generate Report
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                style={{
                  backgroundColor: '#22c55e', // bg-green-500
                  borderColor: '#22c55e',
                }}
                className="px-4 py-2 text-white rounded hover:bg-green-600 hover:border-green-600"
                onClick={handleAddInspection} // Added button for adding inspections
                // style={{ marginBottom: '24px', backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#000000' }}
              >
                Add Inspection
              </Button>
            </div>
          </div>

          {/* Table */}
          
          <Table
            dataSource={filteredQualityControls}
            rowKey="_id"
            onChange={(pagination, filters, sorter) => handleSort(sorter.field, sorter.order)} // Handle sorting changes
          >
            <Table.Column 
              title="Product Type" 
              dataIndex="productType" 
              key="productType" 
              sorter={true} // Enable sorting
            />
            <Table.Column 
              title="Inspection Date" 
              dataIndex="inspectionDate" 
              key="inspectionDate" 
              render={date => moment(date).format('YYYY-MM-DD')}
              sorter={(a, b) => new Date(a.inspectionDate) - new Date(b.inspectionDate)} // Custom sorting function
            />
            <Table.Column 
              title="Status" 
              dataIndex="status" 
              key="status" 
              sorter={true} // Enable sorting
            />
            <Table.Column 
              title="Inspector Name" 
              dataIndex="inspectorName" 
              key="inspectorName" 
              sorter={true} // Enable sorting
            />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <div>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => handleSubmit(record._id)} 
                    style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }} // Blue color
                  />
                  <Button 
                    icon={<DeleteOutlined />} 
                    onClick={() => confirmDelete(record._id)} 
                    type="danger"
                    style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }} // Red color
                  />
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
