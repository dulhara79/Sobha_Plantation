import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { ArrowBack } from "@mui/icons-material";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Search } = Input;

const HarvestSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sorter, setSorter] = useState({ field: null, order: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/harvest');
      setSchedules(response.data.data);
      setFilteredSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching yield records:', error);
    }
  };

  const onSearch = (value) => {
    setSearchText(value);
    filterSchedules(value);
  };

  const filterSchedules = (searchText) => {
    let filteredData = schedules;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();

      filteredData = filteredData.filter((schedule) => {
        return Object.keys(schedule).some((key) => {
          const value = schedule[key];

          if (moment(value, moment.ISO_8601, true).isValid()) {
            return moment(value).format("YYYY-MM-DD").toLowerCase().includes(lowercasedSearchText);
          }

          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowercasedSearchText);
          } else if (typeof value === 'number') {
            return value.toString().includes(lowercasedSearchText);
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
      doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 20);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    doc.setFontSize(22);
    doc.text("Harvest Schedule Report", 70, 40);
    
    const tableColumn = ["Crop Type", "Harvest Date", "Start Time", "End Time", "Field Number", "Number of Workers"];
    const tableRows = filteredSchedules.map(schedule => [
      schedule.cropType,
      moment(schedule.harvestDate).format("YYYY-MM-DD"),
      schedule.startTime,
      schedule.endTime,
      schedule.fieldNumber,
      schedule.numberOfWorkers,
    ]);

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

    doc.save("harvest_schedule_report.pdf");
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

  const renderDate = (text) => {
    const date = moment(text, ['YYYY-MM-DD', moment.ISO_8601], true);
    return date.isValid() ? date.format("YYYY-MM-DD") : 'Invalid date';
  };

  const renderTime = (text) => {
    const formats = ['HH:mm:ss', 'HH:mm', 'h:mm A', 'hh:mm A'];
    const time = moment(text, formats, true);
    return time.isValid() ? time.format('HH:mm') : 'Invalid time';
  };

  const handleSort = (field, order) => {
    setSorter({ field, order });
    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      if (order === 'ascend') return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
    setFilteredSchedules(sortedSchedules);
  };

  const cancelSorting = () => {
    setSorter({ field: null, order: null });
    setFilteredSchedules(schedules);
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
          <nav className="flex items-left justify-between p-2 bg-transparent">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
              <ArrowBack className="text-xl" />
            </button>
            <div className="flex space-x-1.5">
              <Link to="/harvest/harvestdashboard" className="text-[#3CCD65] hover:text-[#2b8f57]">Home</Link>
              <Link to="/harvest/harvest-schedule" className="text-[#236A64] front-semibold">Schedule</Link>
              <Link to="/harvest/yield" className="text-[#3CCD65] hover:text-[#2b8f57]">YieldRecords</Link>
              <Link to="/harvest/compliancechecklist" className="text-[#3CCD65] hover:text-[#2b8f57]">ComplianceChecklist</Link>
            </div>
          </nav>
          <Breadcrumb items={[{ title: 'Home', href: '/' }, { title: 'harvest', href: '/harvest' }]} />
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
                <Button style={{ backgroundColor: "#60DB19", color: "#fff" }} onClick={() => navigate("/harvest/addschedule")}>
                  Add Schedule
                </Button>
                <Button style={{ backgroundColor: "#60DB19", color: "#fff" }} onClick={generatePDF}>
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
                      <Button type="link" onClick={() => handleUpdate(record._id)}>Edit</Button>
                      <Button type="link" danger onClick={() => confirmDelete(record._id)}>Delete</Button>
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
