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
import html2canvas from "html2canvas";
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
  const [maintenance, setMaintenance] = useState([]);
  const [filteredMaintenance, setFilteredMaintenance] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaintenance();
  }, []);

  // Fetch maintenance data from API
  const fetchMaintenance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/api/regularMaintenance"
      );
      setMaintenance(response.data.data);
      setFilteredMaintenance(response.data.data);
    } catch (error) {
      console.error("Error fetching maintenance data: ", error.message);
    }
  };

  // Search maintenance data
  const handleSearch = (value) => {
    setSearchText(value);
    filterMaintenance(value, filterStatus);
  };

  // Filter maintenance data
  const filterMaintenance = (searchText, filterStatus) => {
    let filteredData = maintenance;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((maintenance) =>
        Object.values(maintenance).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    if (filterStatus !== "All") {
      filteredData = filteredData.filter(
        (maintenance) => maintenance.status === filterStatus
      );
    }

    setFilteredMaintenance(filteredData);
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
        `http://localhost:8090/api/regularMaintenance/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Maintenance record deleted successfully.",
        });
        setFilteredMaintenance(
          filteredMaintenance.filter((record) => record.id !== id)
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

  const generatePDF = () => {
    const input = document.getElementById("table-to-pdf");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.height;
      let heightLeft = imgHeight;

      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text("Maintenance Report", 105, 20, { align: "center" });

      // Add the table image
      let positionY = 30; // Start position for the image on the first page
      pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
      heightLeft -= pageHeight - positionY;

      // Add pages if the content spans multiple pages
      while (heightLeft > 0) {
        pdf.addPage();
        positionY = 0; // Reset position to top of the new page
        pdf.addImage(
          imgData,
          "PNG",
          0,
          positionY - heightLeft,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Add footer with a horizontal line and logo
      const footerY = pdf.internal.pageSize.height - 30;

      pdf.setDrawColor(0);
      pdf.setLineWidth(0.5);
      pdf.line(10, footerY, pdf.internal.pageSize.width - 10, footerY); // Horizontal line

      // Add logo to the footer
      const logoData = LogoImage; // Replace with the path to your logo
      const logoWidth = 40;
      const logoHeight = 20;
      const xPosition = (pdf.internal.pageSize.width - logoWidth) / 2;
      const yPosition = footerY - logoHeight - -10; // Adjust margin as needed

      pdf.addImage(
        logoData,
        "PNG",
        xPosition,
        yPosition,
        logoWidth,
        logoHeight
      );

      pdf.save("Maintenance_Report.pdf");
    });
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

    filteredMaintenance.forEach((maintenance) => {
      const month = moment(maintenance.dateOfMaintenance).month(); // Get month index (0-11)
      monthlyData[month] += 1; // Increment the count for that month
    });

    // Update chart data
    setChartData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: monthlyData }],
    }));
  }, [filteredMaintenance]); // Runs whenever filteredMaintenance changes

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
          <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">
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
            to="/RegularMaintenance"
            className="text-[#236A64] font-semibold"
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

      <div className={`ml-[300px]`}>
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
            dataSource={filteredMaintenance}
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
