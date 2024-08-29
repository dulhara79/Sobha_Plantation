import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal } from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import "../../index.css";

const { Search } = Input;
const { Option } = Select;

const ProductionScheduleOverview = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  // Fetch schedules from API
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/production");
      if (response.data.success) {
        setSchedules(response.data.data);
        setFilteredSchedules(response.data.data);
      } else {
        console.log("Error: Unable to fetch schedules, success flag not true");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Handlers for navigation
  const onHomeClick = useCallback(() => {
    navigate("/products/productdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/products/quality-control");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/packaging");
  }, [navigate]);

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Handler for search input
  const onSearch = (value) => {
    setSearchText(value);
    filterSchedules(value, filterStatus);
  };

  // Handler for filter change
  const onFilterChange = (value) => {
    setFilterStatus(value);
    filterSchedules(searchText, value);
  };

  // Function to filter schedules based on search text and filter status
  const filterSchedules = (searchText, filterStatus) => {
    let filteredData = schedules;

    if (searchText) {
      filteredData = filteredData.filter((schedule) =>
        schedule.productType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((schedule) => schedule.status === filterStatus);
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

    setFilteredSchedules(filteredData);
  };

  // Sorting handler
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterSchedules(searchText, filterStatus);
  };

  // Handle update
  const handleUpdate = (id) => {
    navigate(`/products/editschedule/${id}`);
  };

  // Handle delete
  const handleDelete = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/production/${scheduleId}`);
      fetchSchedules(); // Refresh the schedule list
    } catch (error) {
      console.error("Error deleting schedule:", error);
      Modal.error({
        title: 'Error',
        content: 'Failed to delete the schedule. Please try again later.',
      });
    }
  };

  // Confirm delete
  const confirmDelete = (scheduleId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(scheduleId),
    });
  };

// Function to convert an image file to base64
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
  try {
    const tableContainer = document.getElementById('pdf-content');
    if (!tableContainer) {
      console.error('PDF content element not found');
      return;
    }

    // Temporarily hide "Actions" column
    const actionColumn = tableContainer.querySelectorAll('.ant-table-cell:last-child');
    actionColumn.forEach(cell => cell.style.display = 'none');

    // Hide action buttons
    const actionButtons = tableContainer.querySelectorAll('.ant-btn');
    actionButtons.forEach(button => button.style.display = 'none');

    // Capture content
    const canvas = await html2canvas(tableContainer, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Restore "Actions" column visibility
    actionColumn.forEach(cell => cell.style.display = '');

    // Restore action buttons visibility
    actionButtons.forEach(button => button.style.display = '');

    // Load logo image
    const logoUrl = '../src/assets/logo.png';
    const logoDataURL = await getImageDataURL(logoUrl);

    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add header with logo and title
    pdf.addImage(logoDataURL, 'PNG', 15, 10, 30, 30); // Logo
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Production Schedule', 75, 25); // Title

    // Add table content to PDF
    const imgWidth = 190; // Width in mm
    const pageHeight = 295; // Height in mm (A4)
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;

    let position = 50; // Adjust to place content below header

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add footer with page number
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    for (let i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
      pdf.setPage(i);
      pdf.text(`Page ${i}`, 190, 285, { align: 'right' });
    }

    // Save the PDF
    pdf.save('production_schedule_report.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    Modal.error({
      title: 'Error',
      content: 'Failed to generate the PDF. Please try again later.',
    });
  }
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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Production Overview
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen  flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Quality Control
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen  flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Packaging
                </a>
              </div>
            </div>
          </nav>

          {/* Page Header */}
          <header className="flex items-center justify-between px-6 py-4 mb-6 bg-white shadow-md">
            <h1 className="text-2xl font-bold">Production Schedule Overview</h1>
            <div className="flex items-center space-x-4">
              <Search
                placeholder="Search by product type"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={onFilterChange}
              >
                <Option value="All">All Statuses</Option>
                <Option value="Scheduled">Scheduled</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
              </Select>
              <Button 
                type="primary" 
                onClick={generatePDF} 
                style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#fff' }} // Custom green color
              >
                Generate PDF
              </Button>
              <Button 
                type="primary" 
                onClick={() => navigate('/products/addschedule')} 
                style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#fff' }} // Custom green color
              >
                Add Schedule
              </Button>

            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 bg-white rounded-lg shadow-md">
            <div id="pdf-content">
              <Table
                dataSource={filteredSchedules}
                columns={[
                  {
                    title: 'Product Type',
                    dataIndex: 'productType',
                    sorter: true,
                    onHeaderCell: (column) => ({
                      onClick: () => handleSort('productType', sorter.order === 'ascend' ? 'descend' : 'ascend'),
                    }),
                  },
                  {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    sorter: true,
                    onHeaderCell: (column) => ({
                      onClick: () => handleSort('quantity', sorter.order === 'ascend' ? 'descend' : 'ascend'),
                    }),
                  },
                  {
                    title: 'Start Date',
                    dataIndex: 'startDate',
                    render: (date) => moment(date).format('YYYY-MM-DD'),
                    sorter: true,
                    onHeaderCell: (column) => ({
                      onClick: () => handleSort('startDate', sorter.order === 'ascend' ? 'descend' : 'ascend'),
                    }),
                  },
                  {
                    title: 'End Date',
                    dataIndex: 'endDate',
                    render: (date) => moment(date).format('YYYY-MM-DD'),
                    sorter: true,
                    onHeaderCell: (column) => ({
                      onClick: () => handleSort('endDate', sorter.order === 'ascend' ? 'descend' : 'ascend'),
                    }),
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                  },
                  {
                    title: 'Progress',
                    dataIndex: 'progress',
                  },
                  {
                    title: 'Actions',
                    render: (text, record) => (
                      <div>
                      <Button 
                        onClick={() => handleUpdate(record._id)} 
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

                    ),
                  },
                ]}
                rowKey="_id"
                pagination={false}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductionScheduleOverview;
