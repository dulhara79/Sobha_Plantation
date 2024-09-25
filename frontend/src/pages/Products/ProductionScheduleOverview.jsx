  import React, { useCallback, useEffect, useState } from "react";
  import { useNavigate, Link, useLocation } from "react-router-dom";
  import { ArrowBack } from "@mui/icons-material";
  import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';
  import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
  import { Breadcrumb, Table, Button, Input, Select, Modal } from "antd";
  import axios from "axios";
  import html2canvas from "html2canvas";
  import { ArrowLeftOutlined, FilePdfOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
  import Sidebar from "../../components/Sidebar";
  import Header from "../../components/Header";
  import moment from "moment";
  import "../../index.css";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import { HomeOutlined } from '@mui/icons-material';
  import Swal from 'sweetalert2';

  const { Search } = Input;
  const { Option } = Select;


  // Navigation menu items for the dashboard
  const menuItems = [
    { name: 'HOME', path: '/products/productdashboard' },
    { name: 'PRODUCTION', path: '/products/production-overview' },
    { name: 'QUALITY', path: '/products/quality-control' },
    { name: 'PACKAGING', path: '/products/packaging-labeling' }
  ];

  const ProductionScheduleOverview = () => {
    const [schedules, setSchedules] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sorter, setSorter] = useState({ field: null, order: null });
    const navigate = useNavigate();
    const location = useLocation();
    const activePage = location.pathname;

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


    // Confirm delete
    const confirmDelete = (scheduleId) => {
      Swal.fire({
        title: "Are you sure you want to delete this schedule?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(scheduleId);
          Swal.fire({
            title: "Deleted!",
            text: "Your schedule has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    };

    // Handle delete
    const handleDelete = async (scheduleId) => {
      try {
        await axios.delete(`http://localhost:5000/api/production/${scheduleId}`);
        fetchSchedules(); // Refresh the schedule list
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Failed to delete the schedule. ${error.response?.data?.message || 'Please try again.'}`,
          icon: "error",
        });
      }
    };

    // // Handle delete
    // const handleDelete = async (scheduleId) => {
    //   try {
    //     await axios.delete(`http://localhost:5000/api/production/${scheduleId}`);
    //     fetchSchedules(); // Refresh the schedule list
    //   } catch (error) {
    //     console.error("Error deleting schedule:", error);
    //     Modal.error({
    //       title: 'Error',
    //       content: 'Failed to delete the schedule. Please try again later.',
    //     });
    //   }
    // };

    // // Confirm delete
    // const confirmDelete = (scheduleId) => {
    //   Modal.confirm({
    //     title: "Are you sure you want to delete this schedule?",
    //     okText: "Yes",
    //     okType: "danger",
    //     cancelText: "No",
    //     onOk: () => handleDelete(scheduleId),
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

      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 10); // Adjust position and size
      }
      doc.setFontSize(12);
      doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
      doc.line(10, 25, pageWidth - 10, 25); // Line under header

      // Footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
    };

    // Set the margins for header and footer space
    const marginTop = 30; // space reserved for header
    const marginBottom = 20; // space reserved for footer

    // Title of the report
    doc.setFontSize(22);
    doc.text("Production Schedule Report", 50 , 35); // Adjust y-coordinate to start below header

    // Calculate status summary
    const statusSummary = filteredSchedules.reduce((summary, schedule) => {
      const status = schedule.status;
      if (!summary[status]) {
        summary[status] = 0;
      }
      summary[status]++;
      return summary;
    }, {});

    // Convert status summary to an array for the table
    const statusRows = Object.entries(statusSummary).map(([status, count]) => [status, count]);

    // First Table: Overview Details
    const overviewHeaders = [['Detail', 'Value']];
    const overviewRows = [
      ['Total Schedules', `${filteredSchedules.length}`],
      ['Total Quantity', `${filteredSchedules.reduce((sum, item) => sum + item.quantity, 0)}`],
    ];

    // Add status details to the overview
    statusRows.forEach(([status, count]) => {
      overviewRows.push([`Total ${status} Schedules`, `${count}`]);
    });

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
      theme: 'grid',
      didDrawPage: drawHeaderFooter, // Add header and footer to each page
    });

    // Second Table: Production Schedule Data
    const scheduleRows = filteredSchedules.map(schedule => [
      schedule.productType,
      schedule.quantity,
      moment(schedule.startDate).format('YYYY-MM-DD'),
      moment(schedule.endDate).format('YYYY-MM-DD'),
      schedule.status,
      `${schedule.progress}%`
    ]);

    const scheduleHeaders = [['Product Type', 'Quantity', 'Start Date', 'End Date', 'Status', 'Progress (%)']];

    let finalY = doc.lastAutoTable.finalY + 10; // Adjust space between tables

    doc.autoTable({
      startY: finalY,  // Start this table below the first table
      head: scheduleHeaders,
      body: scheduleRows,
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
    doc.save('production_schedule_report.pdf');
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
                  title: 'Production Overview',
                },
              ]}
            />
        </div>


            {/* Page Header */}
            <header className="flex items-center justify-between px-6 py-4 mb-6 bg-white shadow-md">
              <h1 className="text-2xl font-bold">Production Schedule Overview</h1>
              <div className="flex items-center space-x-4">
                <Search
                  placeholder="Search by product type"
                  onChange={(e) => onSearch(e.target.value)} // Trigger search as user types
                  style={{ width: 200, marginRight: 16 }} // Added marginRight for spacing
                  allowClear
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
                  style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#fff' }}
                  onClick={generatePDF} 
                >
                  Generate PDF
                </Button>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#60DB19', borderColor: '#60DB19', color: '#fff' }}
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
                        icon={<EditOutlined  />}
                          onClick={() => handleUpdate(record._id)} 
                          style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }} // Blue color
                        >
                          
                        </Button>
                        <Button 
                        icon={<DeleteOutlined />} 
                          onClick={() => confirmDelete(record._id)} 
                          type="danger"
                          style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }} // Red color
                        >
                          
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
