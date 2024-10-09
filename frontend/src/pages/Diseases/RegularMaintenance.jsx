import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  HomeOutlined,
  LeftOutlined,
  SearchOutlined,
  FilePdfOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Table, Input, Modal, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import LogoImage from "../../assets/Logo.png";
import "../../index.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import DiseasesNavBar from "../../components/DiseasesComponents/DiseasesNavBar";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const { Search } = Input;

const RegularMaintenance = () => {
  const [regularMaintenance, setRegularMaintenance] = useState([]);
  const [filteredRegularMaintenance, setFilteredRegularMaintenance] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegularMaintenance();
  }, []);

  // Fetch maintenance data from API
  const fetchRegularMaintenance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/regularMaintenance"
      );
      setRegularMaintenance(response.data.data);
      setFilteredRegularMaintenance(response.data.data);
    } catch (error) {
      console.error("Error fetching maintenance data: ", error.message);
    }
  };

  // Search maintenance data
  const handleSearch = (value) => {
    setSearchText(value);
    filterRegularMaintenance(value, filterStatus);
  };

  // Filter maintenance data
  const filterRegularMaintenance = (searchText, filterStatus) => {
    let filteredData = regularMaintenance;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((regularMaintenance) =>
        Object.values(regularMaintenance).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter(
        (regularMaintenance) => regularMaintenance.status === filterStatus
      );
    }

    setFilteredRegularMaintenance(filteredData);
  };

  //Handle update maintenance
  const handleUpdate = (id) => {
    navigate(`/updateMaintenance/${id}`);
  };

  // Confirm before deleting a maintenance entry
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this maintenance record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Delete maintenance entry
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/regularMaintenance/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Maintenance record deleted successfully.",
        });
        setFilteredRegularMaintenance(
          filteredRegularMaintenance.filter((record) => record.id !== id)
        );
      } else {
        notification.error({
          message: "Error",
          description: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting maintenance record: ", error.message);
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Define the columns for the table
    const columns = [
     { title: "Date of Maintenance", dataKey: "dateOfMaintenance" },
     { title: "Task", dataKey: "task" },
     { title: "Manager in Charge", dataKey: "managerInCharge" },
     { title: "Progress", dataKey: "progress" },
    ];
  
    // Get the data from the inspections state
    const rows = filteredRegularMaintenance.map(regularMaintenance => ({
      dateOfMaintenance: moment(regularMaintenance.dateOfMaintenance).format("YYYY-MM-DD"),
      task: regularMaintenance.task,
      managerInCharge: regularMaintenance.managerInCharge,
      progress: regularMaintenance.progress,
    }));
  
    // Add title (lowered y-coordinate)
    doc.setFontSize(18);
    const titleY = 24; // Adjust this value to lower the title
    doc.text("Maintenance Report", 75, titleY);
  
    // Add table (adjusted startY)
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: titleY + 13, // Adjust this value to set how far below the title the table starts
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
        minCellHeight: 17, // Adjust this value for desired row height
        halign: 'left',    // Left-align content horizontally
      valign: 'middle',    // Center content vertically
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: 'striped',
    });
  
      // Add footer with a horizontal line and logo
      const footerY = doc.internal.pageSize.height - 30;
  
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(10, footerY, doc.internal.pageSize.width - 10, footerY); // Horizontal line
  
      // Add logo to the footer
      const logoData = LogoImage; // Replace with the path to your logo
      const logoWidth = 40;
      const logoHeight = 20;
      const xPosition = (doc.internal.pageSize.width - logoWidth) / 2;
      const yPosition = footerY - logoHeight - (-10); // Adjust margin as needed
  
      doc.addImage(logoData, "PNG", xPosition, yPosition, logoWidth, logoHeight);

      doc.save("Maintenance_Report.pdf");
  };

  // Data for the bar chart
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Maintenance Data",
        data: [], // Initial empty data
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#d0f0c0"); // Light green
          gradient.addColorStop(1, "#006400"); // Dark green
          return gradient;
        },
        borderColor: "#3CCD65",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Calculate the data based on filteredMaintenance
    const monthlyData = Array(12).fill(0); // Assuming a 12-month year

    filteredRegularMaintenance.forEach((regularMaintenance) => {
      const month = moment(regularMaintenance.dateOfMaintenance).month(); // Get month index (0-11)
      monthlyData[month] += 1; // Increment the count for that month
    });

    // Update chart data
    setChartData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: monthlyData }],
    }));
  }, [filteredRegularMaintenance]); // Runs whenever filteredMaintenance changes

  // Options for the bar chart (unchanged)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className={`ml-[300px] mt-6`}>
        <Breadcrumb
          items={[
            {
              href: "/diseases",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Regular maintenance",
            },
          ]}
        />
        <DiseasesNavBar />
      </div>

      {/* Maintenance Schedule Section */}
      <div className="ml-[300px] mt-1 p-1">
        <h2 className="text-5xl font-semibold text-center">
          Maintenance Schedule
        </h2>

        {/* Search Button and report generation button*/}
        <div className="flex space-x-4 mt-7">
          <Search
            placeholder="Search for maintenance tasks"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "100%" }}
          />
          <Button icon={<FilePdfOutlined />} onClick={generatePDF}>
            Generate Reports
          </Button>
        </div>

        {/* Analytics Section */}
        <div className="flex justify-center items-center mt-8 mb-10">
          {/* Analytics Chart */}
          <div className="w-full max-w-lg">
            <Bar data={chartData} options={options} />
          </div>
        </div>

        {/* Maintenance Table */}
        <div id="table-to-pdf">
          <Table
            columns={[
              {
                title: "Date of Maintenance",
                dataIndex: "dateOfMaintenance",
                key: "dateOfMaintenance",
                render: (date) => moment(date).format("YYYY-MM-DD"),
              },
              {
                title: "Task",
                dataIndex: "task",
                key: "task",
              },
              {
                title: "Manager in Charge",
                dataIndex: "managerInCharge",
                key: "managerInCharge",
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
                  <span style={{ display: "flex", gap: "2px" }}>
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => handleUpdate(record._id)}
                    />
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => confirmDelete(record._id)}
                    />
                  </span>
                ),
              },
            ]}
            dataSource={filteredRegularMaintenance}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            style={{ width: "100%" }}
            bordered
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center mt-2 mb-4">
          <Button
            type="default"
            className="bg-[#3CCD65] text-white hover:bg-[#2b8f57]"
            onClick={() => navigate("/addMaintenance")}
          >
            Add Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegularMaintenance;
