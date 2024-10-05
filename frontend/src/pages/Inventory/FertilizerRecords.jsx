import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Breadcrumb, Table, Button, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie } from 'react-chartjs-2';  // Import Pie from react-chartjs-2
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Chart.js components

Chart.register(ArcElement, Tooltip, Legend);

const { Search } = Input;
const { Option } = Select;

const FertilizerRecords = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [selectedItem, setSelectedItem] = useState(""); 
  const [totalQuantity, setTotalQuantity] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fertilizers');
      setFertilizers(response.data.data);
      setFilteredFertilizers(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };
	
	

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);
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


 


  const onSearch = (value) => {
    setSearchText(value);
    filterFertilizers(value, filterStatus);
  };



  const filterFertilizers = (searchText, filterStatus) => {
    let filteredData = fertilizers;
  
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((fertilizer) => 
        Object.values(fertilizer).some((value) => 
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }
  
    if (filterStatus !== "All") {
      filteredData = filteredData.filter((fertilizer) => fertilizer.status === filterStatus);
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
  


    setFilteredFertilizers(filteredData);
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
    doc.text("Fertilizer Records Report", 50, 40); // Adjust y-coordinate to fit below the logo
    
    // Define the table columns
    const columns = [
      { title: "Added Date", dataKey: "addedDate" },
      { title: "Fertilizer Name", dataKey: "fertilizerName" },
      { title: "Quantity", dataKey: "quantity" },
      { title: "Unit", dataKey: "unit" },
      { title: "Storage Location", dataKey: "storageLocation" },
      { title: "Expired Date", dataKey: "expiredDate" },
    ];
  
    // Map the filteredFertilizers data to match the columns
    const rows = filteredFertilizers.map(fertilizer => ({
      addedDate: moment(fertilizer.addeddate).format("YYYY-MM-DD"),
      fertilizerName: fertilizer.fertilizertype,
      quantity: fertilizer.quantity,
      unit: fertilizer.unit,
      storageLocation: fertilizer.storagelocation,
      expiredDate: moment(fertilizer.expireddate).format("YYYY-MM-DD"),
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
    doc.save("fertilizer_records_report.pdf");
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
    filterFertilizers(searchText, filterStatus);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterFertilizers(searchText, filterStatus);
  };

  const handleUpdate = (id) => {
    navigate(`/Inventory/EditFertilizerRecords/${id}`);
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
      const response = await axios.delete(`http://localhost:5000/api/fertilizers/${id}`);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Record deleted successfully!',
        });
        setFilteredFertilizers(filteredFertilizers.filter(record => record._id !== id));
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

  const handleItemSelect = (value) => {
    setSelectedItem(value);
  };
  const calculateTotalQuantity = () => {
    const filterFertilizers = fertilizers.filter(
      (fertilizer) =>
        fertilizer.fertilizertype === selectedItem && 
      fertilizer.status.toLowerCase() !== "out of stock"  &&
      fertilizer.status.toLowerCase() !== "expired"

    );
  
    // Calculate total for filtered items
    const total = filterFertilizers.reduce((acc, curr) => acc + curr.quantity, 0);
    const unit = filterFertilizers.length > 0 ? filterFertilizers[0].unit : null;
    setTotalQuantity({ total, unit });

     // Trigger notification if the total quantity is 0
     if (total === 0) {
      notification.warning({
        message: 'Low Stock Alert',
        description: `Stock level for ${selectedItem} is low (0 units remaining). Please restock soon.`,
      });
    } else {
      notification.success({
        message: 'Stock Level',
        description: `Total quantity for ${selectedItem} is ${total}.`,
      });
    }

  };
  
  const getStatusCounts = () => {
    const statusCounts = {
      available: 0,
      outOfStock: 0,
      expired: 0,
    };

    fertilizers.forEach((fertilizer) => {
      const status = fertilizer.status.toLowerCase();
      if (status === "in stock") {
        statusCounts.available += 1;
      } else if (status === "out of stock") {
        statusCounts.outOfStock += 1;
      } else if (status === "expired") {
        statusCounts.expired += 1;
      }
    });

    return statusCounts;
  };

  const statusCounts = getStatusCounts();

  const pieData = {
    labels: ['In Stock', 'Out of Stock', 'Expired'],
    datasets: [
      {
        label: 'Fertilizer Status',
        data: [statusCounts.available, statusCounts.outOfStock, statusCounts.expired],
        backgroundColor: ['#60DB19', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#4CAF50', '#FF2D55', '#FFCD30'],
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
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


          <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'Fertilizers', href: '/Inventory/FertilizerRecords' }]} />
          
                    {/* Pie chart for status visualization */}
<div className="mt-6 mb-10" style={{ width: '400px', height: '300px' }}> {/* Adjust the width and height as needed */}
  <h3>Status of Fertilizers & Agrochemicals</h3>
  <Pie data={pieData} options={pieOptions} />
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
                  onClick={() => navigate("/Inventory/AddFertilizerRecord")}
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
   
            <Table
              dataSource={filteredFertilizers}
              rowKey="_id"
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
                  title: "Fertilizer/Agrochemical Name",
                  dataIndex: "fertilizertype",
                  key: "fertilizertype",
                  sorter: true,
                  sortOrder: sorter.field === 'fertilizertype' ? sorter.order : null,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: true,
                  sortOrder: sorter.field === 'quantity' ? sorter.order : null,
                },
                {
                  title: "Unit",
                  dataIndex: "unit",
                  key: "unit",
                  sorter: true,
                  sortOrder: sorter.field === 'unit' ? sorter.order : null,
                },
                {
                  title: "Storage Location",
                  dataIndex: "storagelocation",
                  key: "storagelocation",
                  sorter: true,
                  sortOrder: sorter.field === 'storagelocation' ? sorter.order : null,
                },
                {
                  title: "Expired Date",
                  dataIndex: "expireddate",
                  key: "expireddate",
                  sorter: true,
                  sortOrder: sorter.field === 'expireddate' ? sorter.order : null,
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
             
             
              onChange={(pagination, filters, sorter) => {
                if (sorter && sorter.order) {
                  handleSort(sorter.field, sorter.order);
                } else {
                  cancelSorting();

                }
              }}
              pagination={{ pageSize: 10 }}
            />

{/* Dropdown and Calculate Button placed below the table */}
            <div className="mt-6">
            <Select
 
           placeholder="Select Fertilizer/Agrochemical"
           onChange={handleItemSelect}
          // value={selectedItem}
           style={{ width: 300 }}
>
  {[...new Set(fertilizers.map((fertilizer) => fertilizer.fertilizertype))].map((fertilizertype) => (
    <Option key={fertilizertype} value={fertilizertype}>
      {fertilizertype}
    </Option>
  ))}
</Select>


              <Button type="primary" onClick={calculateTotalQuantity} style={{ marginLeft: 8 }}>
                Calculate Total Quantity
              </Button>

              {totalQuantity && (
                <div className="mt-4">
                  <h3>Total Quantity: {totalQuantity.total} {totalQuantity.unit}</h3>
                </div>
              )}
            </div>
 


          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecords;
           
















