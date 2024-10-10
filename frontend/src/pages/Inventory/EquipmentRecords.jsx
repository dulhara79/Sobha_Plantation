import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb, Table, Button, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { Link,useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie } from 'react-chartjs-2';  // Import Pie from react-chartjs-2
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Chart.js components
import { HomeOutlined } from '@mui/icons-material';

Chart.register(ArcElement, Tooltip, Legend);

const { Search } = Input;
const { Option } = Select;

const menuItems = [
  { name: 'Home', path: '/Inventory/InventoryDashboard' },
  { name: 'Fertilizers & Agrochemicals', path: '/Inventory/FertilizerRecords' },
  { name: 'Equipments & Machines', path: '/Inventory/EquipmentRecords' },
  { name: 'Maintenance Records', path: '/Inventory/MaintenanceRecords' },
  { name: 'Request Payment Details', path: '/Inventory/RequestPaymentRecords' }
];

const EquipmentRecords = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [statusData, setStatusData] = useState([]); // State for pie chart data
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/equipments');
      setEquipments(response.data.data);
      setFilteredEquipments(response.data.data);
      prepareChartData(response.data.data);  // Prepare pie chart data
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);
 

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);


  const onSearch = (value) => {
    setSearchText(value);
    filterEquipments(value, filterStatus);
  };

  const filterEquipments = (searchText, filterStatus) => {
    let filteredData = equipments;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((equipment) =>
        Object.values(equipment).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((equipment) => equipment.status === filterStatus);
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
  
    setFilteredEquipments(filteredData);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const logoUrl = '../src/assets/logo.png'; // Path to your logo image
  
    try {
      // Fetch and convert the image to a Data URL
      const logoDataURL = await getImageDataURL(logoUrl);
  
      // Add the logo image to the PDF
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20); // Adjust x, y, width, height as needed
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }
  
    // Add the title after the logo
    doc.setFontSize(22);
    doc.text("Equipment Records Report", 50, 40); // Adjust y-coordinate to fit below the logo
  
    // Define the table columns
    const columns = [
      { title: "Added Date", dataKey: "addedDate" },
      { title: "Equipment/Machine Name", dataKey: "equipmentName" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Storage Location", dataKey: "storageLocation" },
      { title: "Status", dataKey: "status" },
    ];
  
    // Map the filteredEquipments data to match the columns
    const rows = filteredEquipments.map(equipment => ({
      addedDate: moment(equipment.addeddate).format("YYYY-MM-DD"),
      equipmentName: equipment.equipmenttype,
      quantity: equipment.quantity,
      storageLocation: equipment.storagelocation,
      status: equipment.status,
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
    doc.save("equipment_records_report.pdf");
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
      filterEquipments(searchText, filterStatus);
    };
  
    const cancelSorting = () => {
      setSorter({ field: null, order: null });
      filterEquipments(searchText, filterStatus);
    };
  
    const handleUpdate = (id) => {
      navigate(`/Inventory/EditEquipmentRecords/${id}`);
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
        const response = await axios.delete(`http://localhost:5000/api/equipments/${id}`);
        if(response.status === 200) {
          notification.success({
            message: 'Success',
            description: ' record deleted successfully!',
          });

          // Update local state to remove the deleted record
          setFilteredEquipments(filteredEquipments.filter(record => record._id !== id));
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
          description: error.response?.data?.message || 'There was an error deleting the  record.',
        });
      }
    };
  

  // Handle dropdown selection change
  const handleEquipmentSelect = (value) => {
    setSelectedEquipment(value);
  };

  // Calculate total quantity of selected equipment
  const calculateTotalQuantity = () => {
    // Filter out out-of-stock items and only count the selected equipment
    const filteredEquipments = equipments.filter(
      (equipment) =>
        equipment.equipmenttype === selectedEquipment &&
      equipment.status.toLowerCase() !== "out of stock" && // Exclude out of stock items
      equipment.status.toLowerCase() !== "maintenance"     // Exclude items under maintenance
    );
  
    // Calculate the total quantity
    const total = filteredEquipments.reduce((sum, equipment) => sum + equipment.quantity, 0);
  
    setTotalQuantity(total);
  
    // Trigger notification if the total quantity is 0
    if (total === 0) {
      notification.warning({
        message: 'Low Stock Alert',
        description: `Stock level for ${selectedEquipment} is low (0 units remaining). Please restock soon.`,
      });
    } else {
      notification.success({
        message: 'Stock Level',
        description: `Total quantity for ${selectedEquipment} is ${total}.`,
      });
    }
  };
  const getStatusCounts = () => {
    const statusCounts = {
      instock: 0,
      outOfStock: 0,
      maintenance: 0,
    };

    equipments.forEach((equipment) => {
      const status = equipment.status.toLowerCase();
      if (status === "in stock") {
        statusCounts.instock += 1;
      } else if (status === "out of stock") {
        statusCounts.outOfStock += 1;
      } else if (status === "maintenance") {
        statusCounts.maintenance += 1;
      }
    });


    return statusCounts;
  };
  const statusCounts = getStatusCounts();

  const pieData = {
    labels: ['In Stock', 'Out of Stock', 'Maintenance'],
    datasets: [
      {
        label: 'Equipment & Machine Status',
        data: [statusCounts.instock, statusCounts.outOfStock, statusCounts.maintenance],
        backgroundColor: ['#90EE90', '#0818A8', '#40B5AD'],
        hoverBackgroundColor: ['#4CAF50', '#191970', '#7DF9FF'],
      },
    ],
  };

 
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
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


        <div className="flex items-center justify-between mb-5">
          <Breadcrumb
            items={[
              {
                href: '',
                title: <HomeOutlined />,
              },
              {
                title: 'Inventory',
              },
              { title: 'equipments', href: '/Inventory/EquipmentRecords' },
            ]}
          />
          </div>

             {/* Pie chart for status visualization */}
<div className="flex flex-col items-center justify-center w-full mt-6 mb-10">
<h3>Status of Equipment & Machines</h3>
<div style={{ width: '400px', height: '300px' }}> {/* Adjust the width and height as needed */}

  <Pie data={pieData} options={pieOptions} />
</div>
</div>
                  {/* Page Header */}
                  <header className="flex items-center justify-between px-6 py-4 mb-6 bg-white shadow-md">
            <h1 className="text-2xl font-bold"
            style={{ marginBottom: '24px', fontWeight: 'bold', color: '#1D6660' }}>
              Equipment & Machines Overview</h1>
            <div className="flex items-center space-x-4">

                     <Search
                  placeholder="Search by any field"
                  onChange={(e) => onSearch(e.target.value)}  // Trigger filter on input change
                  style={{ width: 200 }}
                  value={searchText}  // Keep the input controlled
                />
                <Button 
                  style={{ backgroundColor: "#60DB19", color: "#fff" }} 
                  onClick={() => navigate("/Inventory/AddEquipmentRecord")}
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
        
            </header>
           
                 <Table
          columns={[
            {
              title: "Added Date",
              dataIndex: "addeddate",
              key: "addeddate",
              sorter: true,
              sortOrder: sorter.field === 'addeddate' ? sorter.order : null,
              render: (text) => moment(text).format("YYYY-MM-DD"),
            },
            {
              title: "Equipment/Machine Name",
              dataIndex: "equipmenttype",
              key: "equipmenttype",
              sorter: true,
              sortOrder: sorter.field === 'equipmenttype' ? sorter.order : null,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
              sorter: true,
              sortOrder: sorter.field === 'quantity' ? sorter.order : null,
            },
          
            {
              title: "Storage Location",
              dataIndex: "storagelocation",
              key: "storagelocation",
              sorter: true,
              sortOrder: sorter.field === 'storagelocation' ? sorter.order : null,
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
               dataSource={filteredEquipments}
              rowKey="_id"
             // pagination={false}  // Disable pagination
             // Optional: Add vertical scroll if there are many rows
            onChange={(pagination, filters, sorter) => {
                if (sorter && sorter.order) {
                  handleSort(sorter.field, sorter.order);
                } else {
                  cancelSorting();

                }
              }}
              pagination={{ pageSize: 10 }}
            />
    
            
                        {/* Dropdown to select equipment */}
  <div className="mb-4">

<Select
  placeholder="Select Equipment"
  style={{ width: 200 }}
  onChange={handleEquipmentSelect}
>
  {[...new Set(equipments.map((equipment) => equipment.equipmenttype))].map(
    (equipmentType) => (
      <Option key={equipmentType} value={equipmentType}>
        {equipmentType}
      </Option>
    )
  )}
</Select>
              <Button type="primary" onClick={calculateTotalQuantity} style={{ marginLeft: 8 }}>
                Calculate Total Quantity
              </Button>

              {selectedEquipment && (
                <div className="mt-2">
                  <strong>Total Quantity for {selectedEquipment}: </strong>
                  {totalQuantity}
                </div>
              )}
            </div>
            </div>     
          </div>
        </div>
    

  );
};

export default EquipmentRecords;
