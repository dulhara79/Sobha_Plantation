import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Table, Button, Input, Modal, notification } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import moment from "moment";
import {
  HomeOutlined,
  LeftOutlined,
  SearchOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoImage from "../../assets/Logo.png";
import "../../index.css";

const { Search } = Input;

const BuyerInfoTable = () => {
  const [InfoRecords, setInfoRecords] = useState([]);
  const [filteredInfoRecords, setFilteredInfoRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInfoRecords();
  }, []);

  // Fetch Info records from API
  const fetchInfoRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/buyerInfo");
      setInfoRecords(response.data.data);
      setFilteredInfoRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching Info: ", error.response ? error.response.data : error.message);
    }
  };

  // Search Info records
  const handleSearch = (value) => {
    setSearchText(value);
    filterInfoRecords(value);
  };

  // Filter Info records
  const filterInfoRecords = (searchText) => {
    let filteredData = InfoRecords;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((InfoRecord) =>
        Object.values(InfoRecord).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    setFilteredInfoRecords(filteredData);
  };

  // Handle update Info record
  const handleUpdate = (id) => {
    navigate(`/updateBuyer/${id}`);
  };

  // Confirm before deleting an Info record
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Handle delete Info record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/buyerInfo/${id}`);
      notification.success({
        message: "Record deleted successfully",
        description: "Record has been deleted successfully",
      });
      fetchInfoRecords(); // Refresh records after deletion
    } catch (error) {
      console.error("Error deleting Info record: ", error.response ? error.response.data : error.message);
      notification.error({
        message: "Error deleting Info record",
        description: "An error occurred while deleting the record",
      });
    }
  };

  // PDF Generation
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Define the columns for the table
    const columns = [
      { title: "First Name", dataKey: "firstName" },
      { title: "Last Name", dataKey: "lastName" },
      { title: "Gender", dataKey: "Gender" },
      { title: "Date of Birth", dataKey: "DOB" },
      { title: "Phone Number", dataKey: "Number" },
      { title: "Email", dataKey: "email" },
    ];

    // Get the data from the InfoRecords state
    const rows = filteredInfoRecords.map((InfoRecord) => ({
      firstName: InfoRecord.firstName,
      lastName: InfoRecord.lastName,
      Gender: InfoRecord.Gender,
      DOB: moment(InfoRecord.DOB).format("YYYY-MM-DD"),
      Number: InfoRecord.Number,
      email: InfoRecord.email,
    }));

    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const titleY = 24;
    doc.text("Buyer Info Records", 70, titleY);

    // Add table
    doc.autoTable({
      columns: columns,
      body: rows,
      startY: titleY + 5,
      margin: { horizontal: 10 },
      styles: {
        fontSize: 10,
        minCellHeight: 17,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      theme: "striped",
    });

    // Add footer with a horizontal line and logo
    const footerY = doc.internal.pageSize.height - 30;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, footerY, doc.internal.pageSize.width - 10, footerY);

    // Add logo to the footer
    const logoWidth = 40;
    const logoHeight = 20;
    const xPosition = (doc.internal.pageSize.width - logoWidth) / 2;
    const yPosition = footerY - logoHeight - -10;

    doc.addImage(LogoImage, "PNG", xPosition, yPosition, logoWidth, logoHeight);

    doc.save("Buyer_Info_Records.pdf");
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Date of Birth",
      dataIndex: "DOB",
      key: "DOB",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Phone Number",
      dataIndex: "Number",
      key: "Number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Button onClick={() => handleUpdate(record._id)} type="link">
            Edit
          </Button>
          <Button onClick={() => confirmDelete(record._id)} type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          <nav className="flex items-center justify-between p-4 bg-transparent">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
            <Link
                to="/buyerdashboard"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/preorders"
                
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pre Order 
              </Link>
              <Link
                to="/buyerinfotable"
                className="text-[#236A64] font-semibold"
                
              >
                 Buyer Records
              </Link>
              <Link
                to="/Bdeliverytable"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                 Delivery Records
              </Link>
            </div>
          </nav>

          <div className="mt-4">
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Buyer Info Records",
                },
              ]}
            />
          </div>
          {/* Topic Heading */}
          <div className="flex items-center justify-center">
              <h1 className="text-5xl font-semibold">
                Buyer Information Records
              </h1>
            </div>

          {/* <div className="flex items-center justify-between mt-4"> */}
          <div className="flex mt-4 space-x-4">
            
            <Search
              placeholder="Search Buyer Records"
              enterButton={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
              className="mb-4"
            />

            <Button
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              }}
            >
              Generate Reports
            </Button>
          </div>

          <Table columns={columns} dataSource={filteredInfoRecords} rowKey="_id" />

          <div className="flex flex-col items-center pb-8 mt-8">
            <Button
              style={{
                backgroundColor: "#236A64",
                color: "#fff",
                marginTop: "16px",
              }}
              onClick={() => navigate("/BuyerInfo")}
            >
              + Add New Buyer Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoTable;
