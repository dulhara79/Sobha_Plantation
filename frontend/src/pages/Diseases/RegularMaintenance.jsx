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

   // Function to get image data URL
   const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    const logoUrl = "../src/assets/logo.png";
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error("Failed to load the logo image:", error);
    }

    // Function to draw header, footer, and horizontal line
    const drawHeaderFooter = (data) => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Header
      doc.setFontSize(14);
      doc.text("Sobha Plantations", 10, 10); // Align left

      doc.setFontSize(10);
      doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
      doc.text("Kurunegala, Sri Lanka.", 10, 20); // Address line 2
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
      doc.text("Contact: 0112 751 757", 10, 30); // Email address line

      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
      }

      doc.line(10, 35, pageWidth - 10, 35); // Header line

      // Footer with page number
      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 10
      );
    };
    // Set the margins for header and footer space
    const marginTop = 35; // space reserved for header
    const marginBottom = 20; // space reserved for footer

    // Title for the report
    const title = "Coconut Maintenance Report";
    doc.setFontSize(22);

    // Calculate the width of the title
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();

    // Calculate the x position to center the title
    const xPosition = (pageWidth - titleWidth) / 2;

    // Set the title at the calculated center position
    doc.text(title, xPosition, 48); // Adjust y-coordinate to fit under the header

  
    // Define the columns for the table
    const columns = [
     "Date of Maintenance",
     "Task",
     "Manager in Charge",
     "Progress",
    ];
  
    // Get the data from the inspections state
    const rows = filteredRegularMaintenance.map(regularMaintenance => [
      moment(regularMaintenance.dateOfMaintenance).format("YYYY-MM-DD"),
      regularMaintenance.task,
      regularMaintenance.managerInCharge,
      regularMaintenance.progress,
    ]);
  
    // Add table (adjusted startY)
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: 60, // Adjust this value to set how far below the title the table starts
      margin: { horizontal: 10 },
      headStyles: {
        fillColor: [64, 133, 126], // Header background color
        textColor: [255, 255, 255], // Header text color
        fontSize: 12,
      },
      theme: 'striped',
      didDrawPage: drawHeaderFooter,

    });

      doc.save("Maintenance_Report.pdf");
  };

  // Data for the bar chart
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
