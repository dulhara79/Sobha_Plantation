///
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
import BuyerNavbar from "../../components/Buyer/Header/BuyerNavbar";
const { Search } = Input;

const BuyerPreOrderTable = () => {
  const [PreOrderRecords, setPreOrderRecords] = useState([]);
  const [filteredPreOrderRecords, setFilteredPreOrderRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPreOrderRecords();
  }, []);

  // Fetch PreOrder records from API
  const fetchPreOrderRecords = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/buyerPreOrder");
      setPreOrderRecords(response.data.data);
      setFilteredPreOrderRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching PreOrder: ", error.response ? error.response.data : error.message);
    }
  };

  // Search PreOrder records
  const handleSearch = (value) => {
    setSearchText(value);
    filterPreOrderRecords(value);
  };

  // Filter PreOrder records
  const filterPreOrderRecords = (searchText) => {
    let filteredData = PreOrderRecords;

    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredData = filteredData.filter((PreOrderRecord) =>
        Object.values(PreOrderRecord).some((value) =>
          String(value).toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    setFilteredPreOrderRecords(filteredData);
  };

  // Handle update PreOrder record
  const handleUpdate = (id) => {
    navigate(`/update-preorder/${id}`);
  };

  // Confirm before deleting an PreOrder record
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  // Handle delete PreOrder record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/buyerPreOrder/${id}`);
      notification.success({
        message: "Record deleted successfully",
        description: "Record has been deleted successfully",
      });
      fetchPreOrderRecords(); // Refresh records after deletion
    } catch (error) {
      console.error("Error deleting PreOrder record: ", error.response ? error.response.data : error.message);
      notification.error({
        message: "Error deleting PreOrder record",
        description: "An error occurred while deleting the record",
      });
    }
  };

  // PDF Generation
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Define the columns for the table
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Phone Number", dataKey: "phoneNumber" },
      { title: "Address", dataKey: "address" },
      { title: "product Type", dataKey: "productType" },
      { title: "product Quantity", dataKey: "productQuantity" },
      { title: "Order Date", dataKey: "orderDate" },
    ];

    // Get the data from the PreOrderRecords state
    const rows = filteredPreOrderRecords.map((PreOrderRecord) => ({
      name: PreOrderRecord.name,
      phoneNumber: PreOrderRecord.phoneNumber,
      address: PreOrderRecord.address,
      
      productType: PreOrderRecord.productType,
      productQuantity: PreOrderRecord.productQuantity,
      orderDate: moment(PreOrderRecord.orderDate).format("YYYY-MM-DD"),
    }));

    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const titleY = 24;
    doc.text("Buyer PreOrder Records", 70, titleY);

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

    doc.save("Buyer_PreOrder_Records.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    
    {
      title: "phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
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
          <BuyerNavbar />

          <Breadcrumb
          items={[
            { href: '', title: <HomeOutlined /> },
            { href: '', title: 'Manage Pre Orders' },
          ]}
        />
          {/* Topic Heading */}
          <div className="flex items-center justify-center">
              <h1 className="text-5xl font-semibold">
              PreOrder Records
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

          <Table columns={columns} dataSource={filteredPreOrderRecords} rowKey="_id" />

          <div className="flex flex-col items-center pb-8 mt-8">
            <Button
              style={{
                backgroundColor: "#236A64",
                color: "#fff",
                marginTop: "16px",
              }}
              onClick={() => navigate("/create-preorder")}
            >
              + Add New Pre Order Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPreOrderTable;
