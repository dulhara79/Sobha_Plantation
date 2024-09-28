import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate,useLocation,Link } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { HomeOutlined } from '@ant-design/icons';


const { Search } = Input;

const menuItems = [
  { name: "HOME", path: "/harvest/harvestdashboard" },
  { name: "SCHEDULE", path: "/harvest/harvest-schedule" },
  { name: "YIELD", path: "/harvest/yield" },
  { name: "COMPLIANCECHECKLIST", path: "/harvest/compliancechecklist" },
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
      const response = await axios.get('http://localhost:5000/api/yield');
      console.log('API Response:', response.data);
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
      calculateCropQuantities(response.data.data);
    } catch (error) {
      console.error('Error fetching yield records:', error);
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
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowercasedSearchText);
          }
  
          // Check if the value is a number
          if (typeof value === 'number') {
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
    const logoUrl = '../src/assets/logo.png';
    try {
      const logoDataURL = await getImageDataURL(logoUrl);
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20); // Adjust x, y, width, height as needed
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }
  
    // Add title for the report
    doc.setFontSize(22);
    doc.text("Yield Records Report", 70, 40);
  
    // Define the table columns and rows
    const tableColumn = ["Harvest Date","Field Number" ,"Crop Type", "Quantity", "Trees Picked", "Storage Location"];
    const tableRows = filteredSchedules.map((schedule) => [
      moment(schedule.harvestdate).format("YYYY-MM-DD"),
      schedule.fieldNumber,
      schedule.cropType,
      schedule.quantity,
      schedule.treesPicked,
      schedule.storageLocation,
    ]);
  
    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      margin: { horizontal: 10 },
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'striped',
      didDrawPage: (data) => {
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
  
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10);
      },
    });
  
    // Save the PDF
    doc.save("yield_records_report.pdf");
  };

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
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

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/yield/${id}`);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Yield record deleted successfully!',
        });
        // Update local state to remove the deleted record
        setFilteredSchedules(filteredSchedules.filter(record => record._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the yield record.',
        });
      }
    } catch (error) {
      console.error('Error deleting schedule:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the yield record.',
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
                       <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2" onClick={onBackClick} />
                        {menuItems.map((item) => (
                          <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                        <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                         </li>
                        ))}
                  </ul>
             </div>
          </nav>

          <div className="flex items-center justify-between mb-5">
                    <Breadcrumb
                        items={[
                            {href: '', title: <HomeOutlined />},
                            {title: "Dashboard"},
                            {title: "Yield"},
                             ]}
                       />
                    </div>
         <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Search
                  placeholder="Search by any field"
                  onChange={(e) => onSearch(e.target.value)}  // Trigger filter on input change
                  style={{ width: 200 }}
                  value={searchText}  // Keep the input controlled
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
              </div>
            </div>
               {/* Display crop quantities */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                       {Object.keys(cropQuantities).map((crop) => (
                        <div 
                          key={crop} 
                          className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                        <h3 className="text-lg font-bold text-gray-700 text-center">{crop}</h3>
                    <p className="text-xl font-semibold text-indigo-600 mt-2 text-center">{cropQuantities[crop]}</p>
                  </div>
                       ))}
                 </div>
            <Table
              columns={[
                {
                  title: "Harvest Date",
                  dataIndex: "harvestdate",
                  key: "harvestdate",
                  sorter: true,
                  sortOrder: sorter.field === 'harvestdate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Field Number",
                  dataIndex: "fieldNumber",
                  key: "fieldNumber",
                  sorter: true,
                  sortOrder: sorter.field === 'fieldNumber' ? sorter.order : null,
                },
                {
                  title: "Crop Type",
                  dataIndex: "cropType",
                  key: "cropType",
                  sorter: true,
                  sortOrder: sorter.field === 'cropType' ? sorter.order : null,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: true,
                  sortOrder: sorter.field === 'quantity' ? sorter.order : null,
                },
                {
                  title: "Trees Picked",
                  dataIndex: "treesPicked",
                  key: "treesPicked",
                  sorter: true,
                  sortOrder: sorter.field === 'treesPicked' ? sorter.order : null,
                },
                {
                  title: "Storage Location",
                  dataIndex: "storageLocation",
                  key: "storageLocation",
                  sorter: true,
                  sortOrder: sorter.field === 'storageLocation' ? sorter.order : null,
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (text, record) => (
                    <span>
                      <Button type="link" onClick={() => handleUpdate(record._id)}>
                        Edit
                      </Button>
                      <Button type="link" danger onClick={() => confirmDelete(record._id)}>
                        Delete
                      </Button>
                    </span>
                  ),
                },
              ]}
              dataSource={filteredSchedules}
              rowKey="_id"
              pagination={false}  // Disable pagination
              scroll={{ y: 400 }} // Optional: Add vertical scroll if there are many rows
              onChange={(sorter) => {
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

export default YieldRecords;
