import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal, Card } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import "../../index.css";

const { Search } = Input;
const { Option } = Select;

const QualityControl = () => {
  const [qualityControls, setQualityControls] = useState([]);
  const [filteredQualityControls, setFilteredQualityControls] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const [metrics, setMetrics] = useState({
    totalInspections: 0,
    passRate: 0,
    failRate: 0
  });
  const [activeTab, setActiveTab] = useState("inspection"); 
  const navigate = useNavigate();
  
  // State to handle inspection data
  const [inspectionData, setInspectionData] = useState([]);
  useEffect(() => {
    // Fetch or update inspection data dynamically here
    // Example: fetchInspectionData();

    // Temporary placeholder for illustration, should be replaced with actual fetching logic
    setInspectionData([
      {
        key: "1",
        productType: "Coconut oil",
        inspectionDate: "2024-08-01",
        status: "Pass",
        inspectorName: "Mr. Perera",
      },
      {
        key: "2",
        productType: "Coconut cream",
        inspectionDate: "2024-08-02",
        status: "Fail",
        inspectorName: "Mr. Perera",
      },
      {
        key: "3",
        productType: "Coconut water",
        inspectionDate: "2024-08-04",
        status: "Pass",
        inspectorName: "Mr. Jagath",
      },
    ]);

  }, []);

  // Handlers for navigation
  const onHomeClick = useCallback(() => {
    navigate("/products/productdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onProductionOverviewClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onPackagingClick = useCallback(() => {
    navigate("/packaging");
  }, [navigate]);

  // Handler for search input
  const onSearch = (value) => {
    setSearchText(value);
    filterQualityControls(value, filterStatus);
  };

  // Table columns definition
  const columns = [
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Inspection Date",
      dataIndex: "inspectionDate",
      key: "inspectionDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={`${
            text === "Pass" ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {text}
        </span>
      ),
    },
    
    {
      title: "Inspector Name",
      dataIndex: "inspectorName",
      key: "inspectorName",
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
  ];

  // Handlers for actions
  const handleEdit = (key) => {
    console.log(`Edit report with key: ${key}`);
    // Implement edit functionality here
  };

  // Handler for "Add Inspection" button
  const handleAddInspection = () => {
    navigate("/products/addInspectionReport"); // Replace with your actual route
  };


  // Handler for "Issues" page navigation
  const navigateToIssues = () => {
    navigate("/products/issues");
  };

  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[300px] pt-3 flex-1">
          {/* Navigation Bar */}
          <nav className="p-4 mb-5">
            <div className="container flex items-center justify-between mx-auto space-x-4">
              <div
                className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
                onClick={onBackClick}
              >
                <ArrowBack className="text-gray-700" />
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onProductionOverviewClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Production Overview
                </a>
              </div>
              <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white text-white"
              onClick={onHomeClick}
            >
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
              Quality Control
              </a>
            </div>

              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-gradient-to-tr from-emerald-500 via-green-500 to-lime-400 flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onPackagingClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Packaging
                </a>
              </div>
            </div>
          </nav>

          {/* Breadcrumbs */}
          <Breadcrumb style={{ marginBottom: 16, marginLeft: 16 }}>
          <Breadcrumb.Item>..</Breadcrumb.Item>
            <Breadcrumb.Item onClick={onHomeClick}>Products</Breadcrumb.Item>
            <Breadcrumb.Item>Quality Control</Breadcrumb.Item>
          </Breadcrumb>


          {/* Metrics */}
          <div className="card-container">
          <Card
            title="Total Inspections"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.totalInspections}
            </div>
          </Card>

          <Card
            title="Pass Rate"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.passRate}%
            </div>
          </Card>

          <Card
            title="Fail Rate"
            bordered={false}
            className="card"
          >
            <div className="card-content">
              {metrics.failRate}%
            </div>
          </Card>
        </div>

        {/* Inspection Reports Table */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Inspection Reports Table</h2>
            <Button type="primary" onClick={() => navigate("/products/add-report")}
              style={{ backgroundColor: "#60DB19", color: "#fff" }}>
              Add New Report
            </Button>
          </div>



          {/* Table */}
          <Table
            dataSource={filteredQualityControls}
            rowKey="_id"
            onChange={(pagination, filters, sorter) => handleSort(sorter.field, sorter.order)}
          >
            <Table.Column title="Product Type" dataIndex="productType" key="productType" />
            <Table.Column title="Inspection Date" dataIndex="inspectionDate" key="inspectionDate" render={date => moment(date).format('YYYY-MM-DD')} />
            <Table.Column title="Status" dataIndex="status" key="status" />
            <Table.Column title="Inspector Name" dataIndex="inspectorName" key="inspectorName" />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <div>
                      <Button 
                      onClick={() => handleSubmit(record._id)} 
                      style={{ marginRight: 8, backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }} // Blue color
                    >
                      Edit
                    </Button>

                      <Button 
                        onClick={() => confirmDelete(record._id)} 
                        type="danger"
                        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff' }} // Red color
                      >
                        Delete
                      </Button>
                    </div>
              )}
            />
          </Table>

        </div>
      </div>
    </div>
  );
};

export default QualityControl;
