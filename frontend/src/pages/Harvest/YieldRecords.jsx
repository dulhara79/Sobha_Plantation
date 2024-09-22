import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";



const { Search } = Input;

const YieldRecords = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/yield');
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching yield records:', error);
    }
  };

  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/harvest-schedule");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/harvest/yield");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/harvest/compliancechecklist");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    navigate("/harvest/harvestdashboard"); // Navigate to HarvestDashboard
  }, [navigate]);

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

          // Format and filter date fields
          if (moment(value, moment.ISO_8601, true).isValid()) {
            return moment(value).format("YYYY-MM-DD").toLowerCase().includes(lowercasedSearchText);
          }

          // Filter string and number fields
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowercasedSearchText);
          } else if (typeof value === 'number') {
            return value.toString().includes(searchText);
          }

          return false;
        });
      });
    }

    setFilteredSchedules(filteredData);
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          <nav className="p-4 mb-5">
            {/* Navigation Buttons */}
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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Schedule
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Yield Records
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                Compliance Check List
                </a>
              </div>
            </div>
          </nav>

          <Breadcrumb
            items={[
              { title: 'Home', href: '/' },
              { title: 'Yield', href: '/harvest/yield' }
            ]}
          />
          {/* Welcome Message Component */}
          <div className="flex flex-row items-center justify-between shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-[98%] mb-5">
            <b className="text-3xl">Welcome Kaushalya</b>
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
    </div>
  );
};

export default YieldRecords;
