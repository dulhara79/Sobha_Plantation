// src/components/ComplianceCheckList.jsx
import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import "../../index.css";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Button, Input, Modal, notification, Table } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Search } = Input;

const ComplianceCheckList = () => {
  const [complianceChecks, setComplianceChecks] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

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

  const onHomeClick = useCallback(() => {
    navigate("/harvest/harvestdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/schedule-options");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/yield-options");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/harvest/compliancechecklist");
  }, [navigate]);

  const onSearch = (value) => {
    setSearchText(value);
    filterChecks(value);
  };

  const filterChecks = (searchText) => {
    let filteredData = complianceChecks;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((check) =>
        Object.values(check).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
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

    setFilteredChecks(filteredData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Compliance Check List Report", 20, 10);
  
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
  
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("compliance_check_list_report.pdf");
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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Yield Records
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
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
              { title: 'Compliance Checks', href: '/compliance' }
            ]}
          />

          <div className="flex flex-row items-center justify-between shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-[98%] mb-5">
            <b className="text-3xl">Welcome Kaushalya</b>
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
    </div>
  );
};

export default ComplianceCheckList;
