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
      const response = await axios.get("http://localhost:5000/api/buyerPreOrder");
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

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are handled
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };
    
  //pdf generation
    const generatePDF = async () => {
      const doc = new jsPDF();
  
      const logoUrl = '../src/assets/logo.png';
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
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
      doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
      doc.text("Contact: 0112 751 757", 10, 30); // Email address line
      
      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
      }
  
      doc.line(10, 35, pageWidth - 10, 35); // Header line
  
      // Footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
    };
      // Set the margins for header and footer space
      const marginTop = 35; // space reserved for header
      const marginBottom = 20; // space reserved for footer
    
      // Title for the report
      const title = "Buyer Pre Order Report";
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
        "name",
        "phoneNumber",
        "address", 
        "productType",
         "productQuantity",
        "orderDate",
        
      ]; 
      
      const rows = filteredPreOrderRecords.map((PreOrderRecord) => [
        
        PreOrderRecord.name,
        PreOrderRecord.phoneNumber,
        PreOrderRecord.address,
        PreOrderRecord.productType,
        PreOrderRecord.productQuantity,
        moment(PreOrderRecord.orderDate).format("YYYY-MM-DD"),
        
        
        
        
        
      ]);
  
      // Add table (adjusted startY)
      
      doc.autoTable({
        head:[columns],
        body: rows,
        startY: 60, // Adjust this value to set how far below the title the table starts
        margin: { horizontal: 10 },
        headStyles: {
          fillColor: [64, 133, 126], // Header background color
          textColor: [255, 255, 255], // Header text color
          fontSize: 12,
        },
       
        theme: "striped", 
        didDrawPage: drawHeaderFooter,
      });
      // Save the PDF
    
    doc.save("Buyer_PreOrder_Records.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Order Date",
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
         <div className="flex-1 ml-[300px] p-4 ">
         
         {/* <div className="ml-[300px] max-w-full"> */}
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
                backgroundColor: '#84cc16',  // Set background color to red
                borderColor: '#84cc16', 
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