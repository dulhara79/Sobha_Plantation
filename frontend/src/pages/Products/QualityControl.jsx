import React, { useCallback, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { HomeOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Breadcrumb, Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const QualityControl = () => {
  const navigate = useNavigate();
  
  // State to handle inspection data
  const [inspectionData, setInspectionData] = useState([]);

  useEffect(() => {
    
    setInspectionData([]);
  }, []);

  // Navigation handlers
  const onHomeClick = useCallback(() => {
    navigate("/products/productdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/products/production-overview");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/products/quality-overview");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/products/packaging-overview");
  }, [navigate]);

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
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<i className="fas fa-edit"></i>}
            onClick={() => handleEdit(record.key)}
          />
          <Button
            type="link"
            icon={<i className="fas fa-trash-alt"></i>}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  // Handlers for actions
  const handleEdit = (key) => {
    console.log(`Edit report with key: ${key}`);
    // Implement edit functionality here
  };

  const handleDelete = (key) => {
    console.log(`Delete report with key: ${key}`);
    // Implement delete functionality here
  };

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        {/* Navigation Bar */}
        <nav className="p-4 mb-5">
          <div className="container flex items-center justify-between mx-auto space-x-4">
            <div
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform bg-gray-200 rounded-41xl hover:bg-gray-300"
              onClick={onBackClick}
            >
              <ArrowBackIcon className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onHomeClick}
            >
              Home
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick}
            >
              Production
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-mediumspringgreen hover:text-white"
              onClick={onGroupContainerClick1}
            >
              Quality
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
              onClick={onGroupContainerClick2}
            >
              Packaging
            </div>
          </div>
        </nav>

        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              title: "Products",
            },
            {
              title: "Quality Control",
            },
            {
              title: "Inspection",
            },
          ]}
        />

        {/* Metrics Section */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="p-4 text-center rounded-lg shadow-lg bg-mediumspringgreen">
            <h3 className="text-xl font-bold text-white">Defect Rate</h3>
            <p className="text-4xl font-bold text-white">5%</p>
          </div>
          <div className="p-4 text-center rounded-lg shadow-lg bg-mediumspringgreen">
            <h3 className="text-xl font-bold text-white">Inspections</h3>
            <p className="text-4xl font-bold text-white">120</p>
          </div>
          <div className="p-4 text-center rounded-lg shadow-lg bg-mediumspringgreen">
            <h3 className="text-xl font-bold text-white">Compliance</h3>
            <p className="text-4xl font-bold text-white">98%</p>
          </div>
        </div>

        {/* Inspection Reports Table */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Inspection Reports Table</h2>
            <Button type="primary" onClick={() => navigate("/products/addInspectionReport")}>
              Add New Report
            </Button>
          </div>
          <Table columns={columns} dataSource={inspectionData} />
        </div>
      </div>
    </div>
  );
};

export default QualityControl;
