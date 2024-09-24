// src/components/ComplianceCheckList.jsx
import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import "../../index.css";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Button, Input, Modal, notification, Table } from 'antd';
import axios from 'axios';
import { useNavigate,useLocation,Link  } from 'react-router-dom';
import moment from 'moment';
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
const ComplianceCheckList = () => {
  const [complianceChecks, setComplianceChecks] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;


  useEffect(() => {
    fetchComplianceChecks();
  }, []);

  const fetchComplianceChecks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/compliance-checks');
      console.log('Fetched data:', response.data); // Check the data
      if (Array.isArray(response.data.data)) {
        setComplianceChecks(response.data.data);
        setFilteredChecks(response.data.data);
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching compliance checks:', error);
    }
  };

 

  const onBackClick = useCallback(() => {
    navigate(-1); // Navigate back to the previous page
  }, [navigate]);

  const onSearch = (value) => {
    setSearchText(value);
    filterChecks(value);
  };

  const filterChecks = (searchText) => {
    let filteredData = complianceChecks;
  
    console.log("Initial complianceChecks data:", complianceChecks);
    console.log("Search Text:", searchText);
  
    // Filter Logic
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
  
      filteredData = filteredData.filter((check) => {
        const match = Object.values(check).some((value) => {
          if (value !== null && value !== undefined) {
            const stringValue = String(value).toLowerCase();
            const isMatch = stringValue.includes(lowercasedSearchText);
  
            // Debugging logs
            console.log(`Value: ${stringValue}, Match: ${isMatch}`);
            
            return isMatch;
          }
          return false;
        });
  
        return match;
      });
    }
  
    console.log("Filtered Data after search:", filteredData);
  
    // Sort Logic
    if (sorter.field) {
      console.log("Sorting by field:", sorter.field, "Order:", sorter.order);
  
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sorter.field];
        const bValue = b[sorter.field];
  
        // Debugging logs for sorting
        console.log(`Comparing A: ${aValue}, B: ${bValue}`);
  
        // Handle potential undefined or null values during sorting
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;
  
        if (sorter.order === 'ascend') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
  
    console.log("Final filtered data:", filteredData);
    
    setFilteredChecks(filteredData);
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
    doc.text("Compliance Check List Report", 70, 40);
  
    // Define the table columns and rows
    const tableColumn = ["Criteria Name", "Description", "Active", "Last Updated"];
    const tableRows = [];
  
    filteredChecks.forEach((check) => {
      const checkData = [
        check.criteriaName,
        check.description,
        check.isActive ? 'Yes' : 'No',
        moment(check.lastUpdated).format("YYYY-MM-DD HH:mm:ss"),
      ];
      tableRows.push(checkData);
    });
  
    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60, // Adjust to make room for the logo and title
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
    doc.save("compliance_check_list_report.pdf");
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
    filterChecks(searchText);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterChecks(searchText);
  };

  const handleUpdate = (id) => {
    navigate(`/compliance-checks/editrecords/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/compliance-checks/${id}`);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Compliance check deleted successfully!',
        });
        setFilteredChecks(filteredChecks.filter((check) => check._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the compliance check.',
        });
      }
    } catch (error) {
      console.error('Error deleting compliance check:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the compliance check.',
      });
    }
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this compliance check?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
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
                            {title: "Compliance Checks"},
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
                  onClick={() => navigate("/compliance-checks/addrecords")}
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
              columns={[
                {
                  title: "Criteria Name",
                  dataIndex: "criteriaName",
                  key: "criteriaName",
                  sorter: true,
                  sortOrder: sorter.field === 'criteriaName' ? sorter.order : null,
                },
                {
                  title: "Description",
                  dataIndex: "description",
                  key: "description",
                  sorter: true,
                  sortOrder: sorter.field === 'description' ? sorter.order : null,
                },
                {
                  title: "Active",
                  dataIndex: "isActive",
                  key: "isActive",
                  render: (text) => (
                    <span>{text ? 'Yes' : 'No'}</span>
                  ),
                },
                {
                  title: "Last Updated",
                  dataIndex: "lastUpdated",
                  key: "lastUpdated",
                  render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
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
              dataSource={Array.isArray(filteredChecks) ? filteredChecks : []}
              // Remove pagination
              pagination={false}
              onChange={(sorter) => {
                handleSort(sorter.field, sorter.order);
              }}
            />
          </div>
        </div>
      </div>
    
  );
};

export default ComplianceCheckList;
