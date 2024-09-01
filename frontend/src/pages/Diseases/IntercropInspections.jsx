import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Table, Button, Input, Modal, Dropdown, Menu } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import {
  HomeOutlined,
  LeftOutlined,
  SearchOutlined,
  FilePdfOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../index.css";

const { Search } = Input;

const IntercropInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Fetch inspections from API
  const fetchInspections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/harvest"); // Changed endpoint
      if (response.data.success) {
        setInspections(response.data.data);
        setFilteredInspections(response.data.data);
      } else {
        console.error("Error fetching inspections: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching inspections: ", error.message);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  // Search inspections
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = inspections.filter(
      (inspection) =>
        inspection.intercropType.toLowerCase().includes(value.toLowerCase()) // Changed field
    );
    setFilteredInspections(filtered);
  };

  // Confirm before deleting an inspection
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this inspection record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete inspection
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/harvest/${id}`
      ); // Changed endpoint
      if (response.data.success) {
        fetchInspections();
      } else {
        console.error("Error deleting inspection: ", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting inspection: ", error.message);
    }
  };

  // Columns definition
  const columns = [
    {
      title: "Date",
      dataIndex: "inspectionDate",
      key: "inspectionDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.inspectionDate) - new Date(b.inspectionDate),
    },
    { title: "Field Section", dataIndex: "section", key: "section" },
    { title: "Identified Pests", dataIndex: "pest", key: "pest" },
    { title: "Identified Diseases", dataIndex: "disease", key: "disease" },
    { title: "Inspected By", dataIndex: "inspector", key: "inspector" },
    { title: "Inspection Result", dataIndex: "result", key: "result" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() =>
              navigate(`/intercropInspections/edit/${record.inspectionId}`)
            }
          >
            Edit
          </Button>
          <Button onClick={() => confirmDelete(record.inspectionId)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  // Dropdown menu for sorting
  const sortMenu = (
    <Menu>
      <Menu.Item key="1">Pest</Menu.Item>
      <Menu.Item key="2">Disease</Menu.Item>
      <Menu.Item key="3">Section</Menu.Item>
      <Menu.Item key="4">Inspector</Menu.Item>
    </Menu>
  );

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* Header */}
      <Header />

      {/* Main content */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div
          className="content"
          style={{ flex: 1, padding: "20px", marginLeft: "280px" }}
        >
          {" "}
          {/* Adjust margin-left to push content right */}
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between p-4 bg-transparent">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
              <Link
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/IntercropInspections"
                className="text-[#236A64] font-semibold"
              >
                Inspections
              </Link>
              <Link
                to="/IntercropTreatments"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Treatments
              </Link>
              <Link
                to="/CoconutPests"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pests and Diseases
              </Link>
              <Link
                to="/Maintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link>
            </div>
          </nav>
          <div className="mt-4">
            {" "}
            {/* Adjusted margin */}
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Intercrop Inspections",
                },
              ]}
            />
            {/* Topic Heading */}
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-semibold">
                Intercrop Inspections and Disease Identification
              </h1>
            </div>
            {/* Buttons Row */}
            <div className="flex space-x-4 mt-4">
              <Input
                placeholder="Search for Pests and Diseases"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Dropdown overlay={sortMenu} trigger={["click"]}>
                <Button>
                  Sort by <DownOutlined />
                </Button>
              </Dropdown>
              <Button icon={<FilePdfOutlined />}>Generate Reports</Button>
            </div>
            {/* Centered Buttons */}
            <div className="flex justify-center space-x-8 mt-8 mb-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/coconutInspections")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/intercropInspections")}
              >
                Inter Crops
              </Button>
            </div>
            {/* Table */}
            <div className="mt-4">
              <Table
                dataSource={filteredInspections}
                columns={columns}
                rowKey={(record) => record.inspectionId}
                pagination={{ pageSize: 5 }}
                style={{ width: "100%" }} //Ensure table width fits content
              />
            </div>
            {/* Learn More and Add Buttons */}
            <div className="flex flex-col items-center mt-8 pb-8">
              <Button
                style={{
                  backgroundColor: "rgba(196, 196, 196, 0.44)",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                Learn More
              </Button>
              <Button
                style={{
                  backgroundColor: "#236A64",
                  color: "#fff",
                  marginTop: "16px",
                }}
                onClick={() => navigate("/AddIntercropDiseases")}
              >
                + Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercropInspections;
