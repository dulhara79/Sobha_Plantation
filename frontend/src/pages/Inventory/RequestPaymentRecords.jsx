import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb, Table, Button, Input, Modal, notification, Select } from "antd"; // Added Select component
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable

const { Search } = Input;
const { Option } = Select; // Select Option for month dropdown

const RequestPaymentRecords = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [selectedMonth, setSelectedMonth] = useState(null); // State for selected month
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests');
      setRequests(response.data.data);
      setFilteredRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };



  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);





  const onSearch = (value) => {
    setSearchText(value);
    filterRequests(value, filterStatus);
  };

  const menuItems = [
    { name: 'Home', path: '/Inventory/InventoryDashboard' },
    { name: 'Fertilizers & Agrochemicals', path: '/Inventory/FertilizerRecords' },
    { name: 'Equipments & Machines', path: '/Inventory/EquipmentRecords' },
    { name: 'Maintenance Records', path: '/Inventory/MaintenanceRecords' },
    { name: 'Request Payment Details', path: '/Inventory/RequestPaymentRecords' }
  ];

  const isActive = (path) => {
    return window.location.pathname === path;
  };

  const filterRequests = (searchText, filterStatus) => {
    let filteredData = requests;
  
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((request) => 
        Object.values(request).some((value) => 
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }
  
    if (filterStatus !== "All") {
      filteredData = filteredData.filter((request) => request.status === filterStatus);
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

    setFilteredRequests(filteredData);
  };

  
  // Handle month selection change
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  // Calculate total amount for the selected month
  const calculateTotalAmount = () => {
    if (selectedMonth === null) {
      notification.error({ message: "Please select a month!" });
      return;
    }

    const monthRequests = requests.filter(request => 
      moment(request.submitteddate).month() === selectedMonth
    );


  // Check if there are no records for the selected month
  if (monthRequests.length === 0) {
    setTotalAmount(0); // Reset total amount to 0
    notification.info({
      message: `No data available for ${moment()
        .month(selectedMonth)
        .format("MMMM")}.`,
    });
    return;
  }

    const total = monthRequests.reduce((sum, request) => sum + request.amount, 0);
    setTotalAmount(total);

   
  notification.success({
    message: `Total Amount for ${moment().month(selectedMonth).format("MMMM")}: Rs.${total}`,
  });
  };

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
  
    // Add title after the logo
    doc.setFontSize(22);
    doc.text("Requests Records Report", 50, 40); // Adjust y-coordinate to fit below the logo
  
    // Define the table columns
    const columns = [
      { title: "Section", dataKey: "section" },
      { title: "Item", dataKey: "item" },
      { title: "Amount", dataKey: "amount" },
      { title: "Description", dataKey: "description" },
      { title: "Submitted Date", dataKey: "submittedDate" },
      { title: "Status", dataKey: "status" },
    ];
  
    // Map the filteredRequests data to match the columns
    const rows = filteredRequests.map(request => ({
      section: request.section,
      item: request.item,
      amount: request.amount,
      description: request.description,
      submittedDate: moment(request.submitteddate).format('YYYY-MM-DD'),
      status: request.status,
    }));
  
    // Add table with column and row data
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 50, // Set the table to start below the title and logo
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126], // Table header background color
        textColor: [255, 255, 255], // Table header text color
        fontSize: 12,
      },
      theme: 'striped', // Table theme
      didDrawPage: (data) => {
        // Add page number to footer
        const pageNumber = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
  
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageNumber}`, pageWidth - 25, pageHeight - 10); // Adjust footer positioning
      },
    });
  
    // Save the PDF
    doc.save("request_records_report.pdf");
  };
  
  // Utility function to convert the image to a Data URL
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
    });
  };
  
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterRequests(searchText, filterStatus);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterRequests(searchText, filterStatus);
  };

  const handleUpdate = (id) => {
    navigate(`/Inventory/EditRequestPaymentRecord/${id}`);
  };
  
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/requests/${id}`);
      if(response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Record deleted successfully!',
        });
        setFilteredRequests(filteredRequests.filter(record => record._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the record.',
        });
      }
    } catch (error) {
      console.error('Error deleting record:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the record.',
      });
    }
  };

  return (
    <div>
    <Header />
    <Sidebar className="sidebar" />
    <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row items-center w-full h-8 gap-2 text-xs font-medium text-gray-800">
              <ArrowBackIcon className="rounded-full hover:bg-[#abadab] p-2 cursor-pointer" onClick={onBackClick} />
              {menuItems.map((item) => (
                <li key={item.name} className={`flex ${isActive(item.path) ? "text-gray-100 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-full" : "hover:bg-lime-200 rounded-full"}`}>
                  <Link to={item.path} className="flex items-center px-2">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>


          <Breadcrumb items={[{ title: 'Home', href: '/' }, 
            { title: 'requests', href: '/Inventory/RequestPaymentRecords' }]} />

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Search
                  placeholder="Search by any field"
                  onChange={(e) => onSearch(e.target.value)}
                  style={{ width: 200 }}
                  value={searchText}
                />
                <Button style={{ backgroundColor: "#60DB19", color: "#fff" }} onClick={() => navigate("/Inventory/AddRequestPaymentRecord")}>
                  Add Records
                </Button>
                <Button style={{ backgroundColor: "#60DB19", color: "#fff" }} onClick={generatePDF}>
                  Generate PDF Report
                </Button>
              </div>
            </div>

           

            <Table
       columns={[
              
        {
          title: "Section",
          dataIndex: "section",
          key: "section",
          sorter: true,
          sortOrder: sorter.field === 'section' ? sorter.order : null,
        },
        {
          title: "Item",
          dataIndex: "item",
          key: "item",
          sorter: true,
          sortOrder: sorter.field === 'item' ? sorter.order : null,
        },
        {
          title: "Amount (Rs:)",
          dataIndex: "amount",
          key: "amount",
          sorter: true,
          sortOrder: sorter.field === 'amount' ? sorter.order : null,
          render: (amount) => `Rs. ${amount.toFixed(2)}`,  // Format amount to two decimal places
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          sorter: true,
          sortOrder: sorter.field === 'description' ? sorter.order : null,
        },
        {
          title: "Submitted Date",
          dataIndex: "submitteddate",
          key: "submitteddate",
          sorter: true,
          sortOrder: sorter.field === 'submitteddate' ? sorter.order : null,
          render: (text) => moment(text).format("YYYY-MM-DD"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: true,
          sortOrder: sorter.field === 'status' ? sorter.order : null,
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

              dataSource={filteredRequests}
              onChange={(pagination, filters, sorter) => handleSort(sorter.field, sorter.order)}
              rowKey="_id"
            />

            {/* Dropdown for selecting a month */}
<div className="flex items-center mb-4">
  <Select
    placeholder="Select Month"
    style={{ width: 200 }}
    onChange={handleMonthChange}
  >
    {moment.months().map((month, index) => (
      <Option key={index} value={index}>
        {month}
      </Option>
    ))}
  </Select>

  <Button type="primary" onClick={calculateTotalAmount} style={{ marginLeft: 8 }}>
    Calculate Total Amount
  </Button>
</div>

{/* Display the total amount */}
{totalAmount > 0 && (
  <div className="mt-2">
    <strong>Total Amount for Selected Month: Rs:{totalAmount.toFixed(2)}</strong>

  </div>
)}


          </div>
        </div>
      </div>
 
  );
};

export default RequestPaymentRecords;
