import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Select, Modal } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import "../../index.css";

const { Search } = Input;
const { Option } = Select;

const ProductionScheduleOverview = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  // Fetch schedules from API
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/production");
      if (response.data.success) {
        setSchedules(response.data.data);
        setFilteredSchedules(response.data.data);
      } else {
        console.log("Error: Unable to fetch schedules, success flag not true");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Handlers for navigation
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
    navigate("/products/quality-control");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/packaging");
  }, [navigate]);

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Handler for search input
  const onSearch = (value) => {
    setSearchText(value);
    filterSchedules(value, filterStatus);
  };

  // Handler for filter change
  const onFilterChange = (value) => {
    setFilterStatus(value);
    filterSchedules(searchText, value);
  };

  // Function to filter schedules based on search text and filter status
  const filterSchedules = (searchText, filterStatus) => {
    let filteredData = schedules;

    if (searchText) {
      filteredData = filteredData.filter((schedule) =>
        schedule.productType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter((schedule) => schedule.status === filterStatus);
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

    setFilteredSchedules(filteredData);
  };

  // Sorting handler
  const handleSort = (field, order) => {
    setSorter({ field, order });
    filterSchedules(searchText, filterStatus);
  };

  // Handler to cancel sorting
  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    filterSchedules(searchText, filterStatus);
  };

  // Handle update
  const handleUpdate = (id) => {
    navigate(`/products/editschedule/${id}`);
  };

  // Handle delete
  const handleDelete = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/production/${scheduleId}`);
      fetchSchedules(); // Refresh the schedule list
    } catch (error) {
      console.error("Error deleting schedule:", error);
      Modal.error({
        title: 'Error',
        content: 'Failed to delete the schedule. Please try again later.',
      });
    }
  };

  // Confirm delete
  const confirmDelete = (scheduleId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(scheduleId),
    });
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
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onHomeClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Home
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#40857e] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Production
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick1}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Quality
                </a>
              </div>
              <div
                className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer transition-transform duration-300 ease-in-out transform hover:bg-[#1D6660] hover:text-white"
                onClick={onGroupContainerClick2}
              >
                <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block w-full text-center z-[1] mq1025:text-lgi">
                  Packaging
                </a>
              </div>
            </div>
          </nav>

          {/* Breadcrumb, Search, Filter, and Table */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Breadcrumb>
                <Breadcrumb.Item href="">Products Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="">Production Overview</Breadcrumb.Item>
              </Breadcrumb>
              <div className="flex items-center space-x-4">
                <Search
                  placeholder="Search by Product Type"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Select defaultValue="All" onChange={onFilterChange}>
                  <Option value="All">All</Option>
                  <Option value="Scheduled">Scheduled</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
                <Button 
                  style={{ backgroundColor: "#60DB19", color: "#fff" }} // Custom color for "Add Schedule" button
                  onClick={() => navigate("/products/addschedule")}
                >
                  Add Schedule
                </Button>
              </div>
            </div>
            <Table
              columns={[
              
                {
                  title: "Product Type",
                  dataIndex: "productType",
                  key: "productType",
                  sorter: true,
                  sortOrder: sorter.field === 'productType' ? sorter.order : null,
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: true,
                  sortOrder: sorter.field === 'quantity' ? sorter.order : null,
                },
                {
                  title: "Start Date",
                  dataIndex: "startDate",
                  key: "startDate",
                  sorter: true,
                  sortOrder: sorter.field === 'startDate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "End Date",
                  dataIndex: "endDate",
                  key: "endDate",
                  sorter: true,
                  sortOrder: sorter.field === 'endDate' ? sorter.order : null,
                  render: (text) => moment(text).format("YYYY-MM-DD"),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                },
                {
                  title: "Progress",
                  dataIndex: "progress",
                  key: "progress",
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
              onChange={(pagination, filters, sorter) => {
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

export default ProductionScheduleOverview;
