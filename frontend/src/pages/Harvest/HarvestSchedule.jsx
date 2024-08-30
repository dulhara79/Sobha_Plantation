import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Modal, Row, Col } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import { HomeOutlined } from "@ant-design/icons";
import "../../index.css";

const { Search } = Input;

const HarvestSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Fetch schedules from API
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/harvest");
      if (response.data.success) {
        setSchedules(response.data.data);
        setFilteredSchedules(response.data.data);
      } else {
        console.error("Error fetching schedules: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching schedules: ", error.message);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Search schedules
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = schedules.filter((schedule) =>
      schedule.cropType.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSchedules(filtered);
  };

  // Confirm before deleting a schedule
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete schedule
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/harvest/${id}`);
      if (response.data.success) {
        fetchSchedules();
      } else {
        console.error("Error deleting schedule: ", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting schedule: ", error.message);
    }
  };

  // Columns definition
  const columns = [
    { title: "Harvest ID", dataIndex: "harvestId", key: "harvestId" },
    { title: "Crop Type", dataIndex: "cropType", key: "cropType" },
    {
      title: "Harvest Date",
      dataIndex: "harvestDate",
      key: "harvestDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.harvestDate) - new Date(b.harvestDate),
    },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Field Number", dataIndex: "fieldNumber", key: "fieldNumber" },
    { title: "Number of Workers", dataIndex: "numberOfWorkers", key: "numberOfWorkers" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => navigate(`/harvest/edit/${record.harvestId}`)}>Edit</Button>
          <Button onClick={() => confirmDelete(record.harvestId)} danger>Delete</Button>
        </span>
      ),
    }
  ];

  // Navigation Handlers
  const onGroupContainerClick = useCallback(() => {
    navigate("/harvest/harvest-schedule");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/harvest/yield");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/harvest/task");
  }, [navigate]);

  const onHomeClick = useCallback(() => {
    navigate("/harvest/harvestdashboard");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Function to format today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="content" style={{ marginLeft: '250px' }}> {/* Add margin to create space from the sidebar */}
        <Header />
        <nav className="p-4 mb-5" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <div className="container flex items-center space-x-4">
            <div
              className="flex items-center justify-center pt-px px-2 pb-0.5 cursor-pointer"
              onClick={onBackClick}
            >
              <ArrowBack className="text-gray-700" />
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onHomeClick}
            >
              <a className="relative font-bold text-[inherit] inline-block w-full text-center">
                Home
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-[#1D6660] flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick}
            >
              <a className="relative font-bold text-[inherit] inline-block w-full text-center">
                Schedule
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick1}
            >
              <a className="relative font-bold text-[inherit] inline-block w-full text-center">
                Yield Records
              </a>
            </div>
            <div
              className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex items-center justify-center pt-px px-5 pb-0.5 cursor-pointer"
              onClick={onGroupContainerClick2}
            >
              <a className="relative font-bold text-[inherit] inline-block w-full text-center">
                Task Assign
              </a>
            </div>
          </div>
        </nav>

        {/* <Breadcrumb style={{ marginBottom: '30px' }}>
          <Breadcrumb.Item onClick={() => navigate(-1)}>
            <ArrowBack style={{ marginRight: 50 }} /> Back
          </Breadcrumb.Item>
          <Breadcrumb.Item>Harvest Schedule</Breadcrumb.Item>
        </Breadcrumb> */}

        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col style={{ flex: 1, textAlign: 'right' }}>
            <Search
              placeholder="Search by Crop Type"
              onSearch={handleSearch}
              enterButton
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300, marginRight: 20 }}
            />
          </Col>
          <Col style={{ flex: 1 }}>
            <Button type="primary" onClick={() => navigate("/harvest/addschedule")} style={{ marginLeft: 'auto' }}>
              Add Schedule
            </Button>
          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '25px' }}>
          <Table
            dataSource={filteredSchedules}
            columns={columns}
            rowKey={(record) => record.harvestId}
            pagination={{ pageSize: 5 }}
            style={{ width: '97%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HarvestSchedule;
