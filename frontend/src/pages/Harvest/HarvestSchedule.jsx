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

const HarvestSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Fetch schedules from API
  
  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/harvest');
      console.log(response.data.data); // Log the fetched data
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching yield records:', error);
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
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Harvest Schedule Report", 20, 10);

    const tableColumn = ["Crop Type", "Harvest Date",  "Start Time", "End Time", "Field Number","Number of Workers"];
    const tableRows = [];

    filteredSchedules.forEach((schedule) => {
      const scheduleData = [
        moment(schedule.harvestdate).format("YYYY-MM-DD"),
        schedule.cropType,
        schedule.harvestDate,
        schedule.startTime,
        schedule.endTime,
        schedule.fieldNumber,
        schedule.numberOfWorkers,
      ];
      tableRows.push(scheduleData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("harvest_schedule_report.pdf");
  };

  const renderDate = (text) => {
    const date = moment(text, ['YYYY-MM-DD', moment.ISO_8601], true);
    return date.isValid() ? date.format("YYYY-MM-DD") : 'Invalid date';
  };

  const renderTime = (text) => {
    console.log('Rendering time:', text); // Log to check the format
    const formats = ['HH:mm:ss', 'HH:mm', 'h:mm A', 'hh:mm A'];
    const time = moment(text, formats, true);
    return time.isValid() ? time.format('HH:mm') : 'Invalid time';
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
    navigate(`/harvest/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/harvest/${id}`);
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Harvest Schedule deleted successfully!',
        });
        setFilteredSchedules(filteredSchedules.filter(schedule => schedule._id !== id));
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the schedules.',
        });
      }
    } catch (error) {
      console.error('Error deleting schedule:', error.response?.data?.message || error.message);
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'There was an error deleting the schedules.',
      });
    }
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
                  Compliance Checklist
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
                  onClick={generatePDF}
                >
                  Generate PDF Report
                </Button>
              </div>
            </div>

            <Table
              columns={[
                {
                  title: "Crop Type",
                  dataIndex: "cropType",
                  key: "cropType",
                  sorter: true,
                  sortOrder: sorter.field === 'cropType' ? sorter.order : null,
                },
                {
                  title: "Harvest Date",
                  dataIndex: "harvestDate",
                  key: "harvestDate",
                  sorter: true,
                  sortOrder: sorter.field === 'harvestDate' ? sorter.order : null,
                  render: renderDate,
                },
                {
                  title: "Start Time",
                  dataIndex: "startTime",
                  key: "startTime",
                  sorter: true,
                  sortOrder: sorter.field === 'startTime' ? sorter.order : null,
                  render: renderTime,
                },
                {
                  title: "End Time",
                  dataIndex: "endTime",
                  key: "endTime",
                  sorter: true,
                  sortOrder: sorter.field === 'endTime' ? sorter.order : null,
                  render: renderTime,
                },
                {
                  title: "Field Number",
                  dataIndex: "fieldNumber",
                  key: "fieldNumber",
                  sorter: true,
                  sortOrder: sorter.field === 'fieldNumber' ? sorter.order : null,
                },
                {
                  title: "Number of Workers",
                  dataIndex: "numberOfWorkers",
                  key: "numberOfWorkers",
                  sorter: true,
                  sortOrder: sorter.field === 'numberOfWorkers' ? sorter.order : null,
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
              pagination={false}
              scroll={{ y: 400 }}
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

export default HarvestSchedule;
