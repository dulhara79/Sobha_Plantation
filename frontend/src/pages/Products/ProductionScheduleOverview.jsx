import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import { Breadcrumb, Table, Button, Input, Select, Modal } from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
//import jsPDF from "jspdf";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import "../../index.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    navigate("/products/packaging-labeling");
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
    { title: "Quantity", dataKey: "quantity" },
    { title: "Start Date", dataKey: "startDate" },
    { title: "End Date", dataKey: "endDate" },
    { title: "Status", dataKey: "status" },
    { title: "Progress", dataKey: "progress" },
  ];

  // Map the filteredSchedules data to match the columns
  const rows = filteredSchedules.map(schedule => ({
    productType: schedule.productType,
    quantity: schedule.quantity,
    startDate: moment(schedule.startDate).format('YYYY-MM-DD'),
    endDate: moment(schedule.endDate).format('YYYY-MM-DD'),
    status: schedule.status,
    progress: schedule.progress,
  }));

  // Add title and table
  doc.setFontSize(22);
  doc.text("Production Schedule Report", 50, 40); // Adjust y-coordinate as needed

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
  doc.save("production_schedule_report.pdf");
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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Production Overview
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400  flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Quality Control
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400  flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
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
            <Breadcrumb.Item>Production Overview</Breadcrumb.Item>
          </Breadcrumb>

          {/* <div className="flex space-x-4">
          <Button
        className="flex items-center text-white bg-green-500 rounded-md shadow-md hover:bg-green-600"
        onClick={() => navigate("/products/production-overview")}
        >
          <EventNoteSharpIcon className="mr-2" />
          Schedule
        </Button>
        <Button
          className="flex items-center text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          onClick={() => navigate("/products/gallery")}
        >
          <CollectionsSharpIcon className="mr-2" />
          Gallery
        </Button>
      
      </div> */}

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
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
                
              </Select>
              <Button 
                type="primary" 
                style={{ backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
                onClick={generatePDF} 
              >
                Generate PDF
              </Button>
              <Button 
                type="primary" 
                style={{ backgroundColor: '#1D6660', borderColor: '#1D6660', color: '#fff' }}
                onClick={() => navigate('/products/addschedule')} 
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
