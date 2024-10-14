import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HomeOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Search } = Input;

const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "QUALITYCHECKING", path: "/harvest/quality" },
  // { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
];
const YieldRecords = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [cropQuantities, setCropQuantities] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/yield");
      console.log("API Response:", response.data);
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
      calculateCropQuantities(response.data.data);
    } catch (error) {
      console.error("Error fetching yield records:", error);
    }
  };

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  const onSearch = (value) => {
    setSearchText(value);
    filterSchedules(value, filterStatus);
  };

  const filterSchedules = (searchText) => {
    let filteredData = schedules;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();

      filteredData = filteredData.filter((schedule) => {
        return Object.keys(schedule).some((key) => {
          const value = schedule[key];

          // Debugging
          console.log(`Key: ${key}, Value: ${value}`);

          // Check if the value is a date using moment
          if (moment(value, moment.ISO_8601, true).isValid()) {
            // Format the date and filter it
            const formattedDate = moment(value).format("YYYY-MM-DD");
            return formattedDate.includes(lowercasedSearchText);
          }

          // Check if the value is a string
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowercasedSearchText);
          }

          // Check if the value is a number
          if (typeof value === "number") {
            return value.toString().includes(searchText);
          }

          return false;
        });
      });
    }

    setFilteredSchedules(filteredData);
  };

  const calculateCropQuantities = (schedules) => {
    const quantities = schedules.reduce((acc, schedule) => {
      const { cropType, quantity } = schedule;
      if (acc[cropType]) {
        acc[cropType] += quantity;
      } else {
        acc[cropType] = quantity;
      }
      return acc;
    }, {});
    setCropQuantities(quantities);
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
    const marginTop = 35; // space reserved for header
    const marginBottom = 20; // space reserved for footer
  
    // Title for the report
    const title = "Yield Records Report";
    doc.setFontSize(22);
    
    // Calculate the width of the title
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Calculate the x position to center the title
    const xPosition = (pageWidth - titleWidth) / 2;
    
    // Set the title at the calculated center position
    doc.text(title, xPosition, 48); // Adjust y-coordinate to fit under the header
  
    // Define the table columns and rows
    const tableColumn = [
      "Harvest Date",
      "Field Number",
      "Crop Type",
      "Quantity",
      "Unit",
      "Trees Picked",
      "Storage Location",
    ];
    
    const tableRows = filteredSchedules.map((schedule) => [
      moment(schedule.harvestdate).format("YYYY-MM-DD"),
      schedule.fieldNumber,
      schedule.cropType,
      schedule.quantity,
      schedule.unit,
      schedule.treesPicked,
      schedule.storageLocation,
    ]);
  
    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: marginTop + 20, // Start table after the title
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
      didDrawPage: drawHeaderFooter, // Add header and footer to each page
    });
  
    // Save the PDF
    doc.save("yield_records_report.pdf");
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

  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterSchedules(searchText, filterStatus);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterSchedules(searchText, filterStatus);
  };

  const handleUpdate = (id) => {
    navigate(`/yield/editrecords/${id}`);
  };
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

  const handleDelete = async (scheduleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/yield/${scheduleId}`
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
  const isActive = (page) => activePage === page;
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
              { title: "Yield" },
            ]}
          />
        </div>

        {/* Display crop quantities */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {Object.keys(cropQuantities).map((crop) => (
            <div
              key={crop}
              className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-bold text-gray-700 text-center">
                {crop}
              </h3>
              <p className="text-xl font-semibold text-indigo-600 mt-2 text-center">
                {cropQuantities[crop]}
              </p>
            </div>
          ))}
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Search
                placeholder="Search by any field"
                onChange={(e) => onSearch(e.target.value)} // Trigger filter on input change
                style={{ width: 200 }}
                value={searchText} // Keep the input controlled
              />
              <Button
                style={{ backgroundColor: "#60DB19", color: "#fff" }}
                onClick={() => navigate("/yield/addrecords")}
              >
                Add Records
              </Button>
              <Button
                style={{ backgroundColor: "#60DB19", color: "#fff" }}
                onClick={generatePDF}
              >
                Generate PDF Report
              </Button>
              <Button
                style={{ backgroundColor: "#60DB19", color: "#fff" }}
                onClick={() => navigate("/harvest/harvestCal")}  // Navigate on click
              >
                Estimate Harvest Calculator
              </Button>

            </div>
          </div>
          <Table
            columns={[
              {
                title: "Harvest Date",
                dataIndex: "harvestdate",
                key: "harvestdate",
                sorter: (a, b) =>
                  moment(a.harvestdate).unix() - moment(b.harvestdate).unix(), // Sort by date
                sortOrder: sorter.field === "harvestdate" ? sorter.order : null,
                render: (text) => moment(text).format("YYYY-MM-DD"),
              },
              {
                title: "Field Number",
                dataIndex: "fieldNumber",
                key: "fieldNumber",
                sorter: (a, b) => a.fieldNumber.localeCompare(b.fieldNumber), // Sort alphabetically
                sortOrder: sorter.field === "fieldNumber" ? sorter.order : null,
              },
              {
                title: "Crop Type",
                dataIndex: "cropType",
                key: "cropType",
                sorter: (a, b) => a.cropType.localeCompare(b.cropType), // Sort alphabetically
                sortOrder: sorter.field === "cropType" ? sorter.order : null,
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                sorter: (a, b) => a.quantity - b.quantity, // Sort numerically
                sortOrder: sorter.field === "quantity" ? sorter.order : null,
              },
              {
                title: "Unit",
                dataIndex: "unit",
                key: "unit",
                sorter: (a, b) => a.unit.localeCompare(b.unit), // Sort alphabetically
                sortOrder: sorter.field === "unit" ? sorter.order : null,
              },
              
              
              {
                title: "Trees Picked",
                dataIndex: "treesPicked",
                key: "treesPicked",
                sorter: (a, b) => a.treesPicked - b.treesPicked, // Sort numerically
                sortOrder: sorter.field === "treesPicked" ? sorter.order : null,
              },
              {
                title: "Storage Location",
                dataIndex: "storageLocation",
                key: "storageLocation",
                sorter: (a, b) =>
                  a.storageLocation.localeCompare(b.storageLocation), // Sort alphabetically
                sortOrder:
                  sorter.field === "storageLocation" ? sorter.order : null,
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
            pagination={false} // Disable pagination
            scroll={{ y: 400 }} // Optional: Add vertical scroll if there are many rows
            onChange={(pagination, filters, sorter) => {
              handleSort(sorter.field, sorter.order);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default YieldRecords;
