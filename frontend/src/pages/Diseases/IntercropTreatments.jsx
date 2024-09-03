import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Table, Input, Modal, Dropdown, Menu } from "antd";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  HomeOutlined,
  LeftOutlined,
  FilePdfOutlined,
  DownOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../index.css";

const { Search } = Input;

const IntercropTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Fetch treatments from API
  const fetchTreatments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/harvest"); // Adjust the API endpoint as needed
      if (response.data.success) {
        setTreatments(response.data.data);
        setFilteredTreatments(response.data.data);
      } else {
        console.error("Error fetching treatments: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching treatments: ", error.message);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  // Search treatments
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = treatments.filter((treatment) =>
      treatment.pestOrDisease.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTreatments(filtered);
  };

  // Confirm before deleting a treatment
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this treatment record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete treatment
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/harvest/${id}`
      );
      if (response.data.success) {
        fetchTreatments();
      } else {
        console.error("Error deleting treatment: ", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting treatment: ", error.message);
    }
  };

  // Columns definition
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Pest or Disease",
      dataIndex: "pestOrDisease",
      key: "pestOrDisease",
    },
    {
      title: "Treatment Method",
      dataIndex: "treatmentMethod",
      key: "treatmentMethod",
    },
    {
      title: "Current Health Rate",
      dataIndex: "healthRate",
      key: "healthRate",
    },
    {
      title: "Treated By",
      dataIndex: "treatedBy",
      key: "treatedBy",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/intercrop-treatments/edit/${record.key}`)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  // Dropdown menu for sorting
  const sortMenu = (
    <Menu>
      <Menu.Item key="1">Date</Menu.Item>
      <Menu.Item key="2">Pest/Disease</Menu.Item>
      <Menu.Item key="3">Health Rate</Menu.Item>
      <Menu.Item key="4">Reapplying Date</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between p-4 bg-transparent">
            {/* Go Back Icon */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            {/* Navigation Items */}
            <div className="flex space-x-4">
              <Link
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/CoconutInspections"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Inspections
              </Link>
              <Link
                to="/CoconutTreatments"
                className="text-[#236A64] font-semibold"
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

          <div className="ml-[30px] mt-4">
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Intercrop Treatments",
                },
              ]}
            />
          </div>

          {/* Body Section */}
          <div className="mt-4 px-6">
            {/* Title and Show More Icon */}
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-semibold">
                Pests and Diseases Treatments
              </h1>
              <div className="flex space-x-4">
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
            </div>

            {/* Buttons Row */}
            <div className="flex justify-center space-x-8 mt-8 mb-8">
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0)" }}
                onClick={() => navigate("/coconutTreatments")}
              >
                Coconuts
              </Button>
              <Button
                style={{ backgroundColor: "rgba(196, 196, 196, 0.44)" }}
                onClick={() => navigate("/intercropTreatments")}
              >
                Inter Crops
              </Button>
            </div>

            {/* Table */}
            <div className="mt-4">
              <Table
                dataSource={filteredTreatments}
                columns={columns}
                pagination={{ pageSize: 5 }}
              />
            </div>

            {/* Add and Insights Buttons */}
            <div className="flex flex-col items-center mt-8 pb-8">
              <Button
                style={{
                  backgroundColor: "#4CAF50", // Green color for Add button
                  color: "#fff",
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
                onClick={() => navigate("/addIntercropTreatments")}
              >
                + Add
              </Button>

              <Button
                style={{
                  background: "linear-gradient(135deg, orange, #4CAF50)", // Green-blue gradient background
                  color: "#fff",
                  marginTop: "16px",
                  width: "100%",
                  maxWidth: "400px",
                  height: "48px", // Taller height for Insights button
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  fontWeight: "bold",
                  transition: "all 0.3s ease", // Transition effect
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                } // Scale on hover
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                } // Reset scale on leave
                onClick={() => navigate("/insights")}
              >
                Insights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercropTreatments;
