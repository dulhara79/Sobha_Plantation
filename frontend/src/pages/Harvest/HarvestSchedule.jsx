import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HomeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "QUALITY CHECKING", path: "/harvest/quality" },
  // { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
];

const HarvestSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/harvest");
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
    } catch (error) {
      console.error("Error fetching yield records:", error);
    }
  };

  const onSearch = (value) => {
    setSearchText(value);
    filterSchedules(value);
  };

  const filterSchedules = (searchText) => {
    let filteredData = schedules;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();

      filteredData = filteredData.filter((schedule) => {
        return Object.keys(schedule).some((key) => {
          const value = schedule[key];

          // Check if the value is a valid date using moment
          if (
            typeof value === "string" &&
            moment(value, moment.ISO_8601, true).isValid()
          ) {
            return moment(value)
              .format("YYYY-MM-DD")
              .toLowerCase()
              .includes(lowercasedSearchText);
          }

          // If the value is a string
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowercasedSearchText);
          }

          // If the value is a number
          if (typeof value === "number") {
            return value.toString().includes(lowercasedSearchText);
          }

          // Other data types (objects, arrays) should not be included in the filter
          return false;
        });
      });
    }

    setFilteredSchedules(filteredData);
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

    // Function to draw header and footer
    const drawHeaderFooter = (data) => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
         
      //Header
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
    const marginTop = 35; // space reserved for header
    const marginBottom = 20; // space reserved for footer
  
    // Title for the report
    const title = "Harvest Schedule Report";
    doc.setFontSize(22);
    
    // Calculate the width of the title
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Calculate the x position to center the title
    const xPosition = (pageWidth - titleWidth) / 2;
    
    // Set the title at the calculated center position
    doc.text(title, xPosition, 48); // Adjust y-coordinate to fit under the header

    // Define table columns and rows
    const tableColumn = [
      "Crop Type",
      "Harvest Date",
      "Start Time",
      "End Time",
      "Field Number",
      "Number of Workers",
    ];
    const tableRows = filteredSchedules.map((schedule) => [
      schedule.cropType,
      moment(schedule.harvestDate).format("YYYY-MM-DD"),
      schedule.startTime,
      schedule.endTime,
      schedule.fieldNumber,
      schedule.numberOfWorkers,
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60, // Ensure the table starts below the title
      margin: { horizontal: 10 }, // Adjust horizontal margin
      styles: { fontSize: 10 }, // Table font size
      headStyles: {
        fillColor: [64, 133, 126], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontSize: 12,
      },
      theme: "striped",
      didDrawPage: drawHeaderFooter, // Draw header and footer on each page
    });

    // Save the PDF
    doc.save("harvest_schedule_report.pdf");
  };

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const renderDate = (text) => {
    const date = moment(text, ["YYYY-MM-DD", moment.ISO_8601], true);
    return date.isValid() ? date.format("YYYY-MM-DD") : "Invalid date";
  };

  const renderTime = (text) => {
    const formats = ["HH:mm:ss", "HH:mm", "h:mm A", "hh:mm A"];
    const time = moment(text, formats, true);
    return time.isValid() ? time.format("HH:mm") : "Invalid time";
  };

  const handleSort = (field, order) => {
    setSorter({ field, order });
    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      if (order === "ascend") return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
    setFilteredSchedules(sortedSchedules);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    setFilteredSchedules(schedules);
  };

  const handleUpdate = (id) => {
    navigate(`/harvest/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/harvest/${id}`
      );
      fetchSchedules();
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
  const confirmDelete = (id) => {
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
        handleDelete(id);
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

  const isActive = (page) => activePage === page;
  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
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
              { href: "", title: <HomeOutlined /> },
              { title: "Harvest" },
              { title: "Schedule" },
            ]}
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Search
                placeholder="Search by any field"
                onChange={(e) => onSearch(e.target.value)}
                style={{ width: 200 }}
                value={searchText}
              />
              <Button
                style={{ backgroundColor: "#60DB19", color: "#fff" }}
                onClick={() => navigate("/harvest/addschedule")}
              >
                Add Schedule
              </Button>
              <Button
                style={{ backgroundColor: "#60DB19", color: "#fff" }}
                onClick={generatePDF}
              >
                Generate PDF Report
              </Button>
            </div>
          </div>
          <Table
            columns={[
              {
                title: "Crop Type",
                dataIndex: "cropType",
                key: "cropType",
                sorter: true,
                sortOrder: sorter.field === "cropType" ? sorter.order : null,
              },
              {
                title: "Harvest Date",
                dataIndex: "harvestDate",
                key: "harvestDate",
                sorter: true,
                sortOrder: sorter.field === "harvestDate" ? sorter.order : null,
                render: renderDate,
              },
              {
                title: "Start Time",
                dataIndex: "startTime",
                key: "startTime",
                sorter: true,
                sortOrder: sorter.field === "startTime" ? sorter.order : null,
                render: renderTime,
              },
              {
                title: "End Time",
                dataIndex: "endTime",
                key: "endTime",
                sorter: true,
                sortOrder: sorter.field === "endTime" ? sorter.order : null,
                render: renderTime,
              },
              {
                title: "Field Number",
                dataIndex: "fieldNumber",
                key: "fieldNumber",
                sorter: true,
                sortOrder: sorter.field === "fieldNumber" ? sorter.order : null,
              },
              {
                title: "Number of Workers",
                dataIndex: "numberOfWorkers",
                key: "numberOfWorkers",
                sorter: true,
                sortOrder:
                  sorter.field === "numberOfWorkers" ? sorter.order : null,
              },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <span>
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => handleUpdate(record._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => confirmDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </span>
                ),
              },
            ]}
            dataSource={filteredSchedules}
            rowKey="_id"
            pagination={false}
            scroll={{ y: 400 }}
            onChange={(pagination, filters, sorter) => {
              if (sorter && sorter.order) {
                handleSort(sorter.field, sorter.order);
              } else {
                cancelSorting();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HarvestSchedule;
