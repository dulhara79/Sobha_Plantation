// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Card,
//   DatePicker,
//   Select,
//   Input,
//   Button,
//   Popconfirm,
//   Tooltip,
// } from "antd";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";
// import { format } from "date-fns";
// import moment from "moment";
// import Papa from "papaparse";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// // import NewLoadingScreen from '../../NewLoadingScreen';
// import NewLoadingScreen from "../../../components/LoadingDots";
// import { Link, useNavigate } from "react-router-dom";

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const TransactionTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Filter states
//   const [dateRange, setDateRange] = useState([]);
//   const [typeFilter, setTypeFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [filteredSchedules, setFilteredSchedules] = useState([]);

//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/salesAndFinance/finance/minorTransactions"
//         );
//         const data = response.data.data;
//         setTransactions(data);
//         setFilteredData(data);
//         calculateTotal(data);
//       } catch (error) {
//         setError("Error fetching transactions");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     // Setup WebSocket for real-time updates
//     const socket = new WebSocket("ws://localhost:5000");
//     socket.onmessage = (event) => {
//       const updatedData = JSON.parse(event.data);
//       setTransactions(updatedData);
//       setFilteredData(updatedData);
//       calculateTotal(updatedData);
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const calculateTotal = (data) => {
//     const totalIncome = data
//       .filter((tx) => tx.type === "income")
//       .reduce((sum, tx) => sum + tx.amount, 0);
//     const totalExpense = data
//       .filter((tx) => tx.type === "expense")
//       .reduce((sum, tx) => sum + tx.amount, 0);
//     setTotalAmount(totalIncome - totalExpense);
//     setTotalIncome(totalIncome);
//     setTotalExpense(totalExpense);
//     setTotalRevenue(totalIncome - totalExpense);
//   };

//   const applyFilters = (data) => {
//     let filtered = [...data];

//     if (dateRange.length === 2) {
//       const [startDate, endDate] = dateRange;
//       filtered = filtered.filter(
//         (transaction) =>
//           moment(transaction.date).isSameOrAfter(startDate, "day") &&
//           moment(transaction.date).isSameOrBefore(endDate, "day")
//       );
//     }

//     if (typeFilter) {
//       filtered = filtered.filter(
//         (transaction) => transaction.type === typeFilter
//       );
//     }

//     if (searchTerm) {
//       filtered = filtered.filter((transaction) =>
//         Object.values(transaction).some((value) =>
//           value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }

//     setFilteredData(filtered);
//     calculateTotal(filtered);
//   };

//   const handleDateRangeChange = (dates) => {
//     let filtered = [...data];
    
//     setDateRange(dates);
//     applyFilters(transactions);

//     if (dateRange.length === 2) {
//       const [startDate, endDate] = dateRange;
//       filtered = filtered.filter(
//         (transaction) =>
//           moment(transaction.date).isSameOrAfter(startDate, "day") &&
//           moment(transaction.date).isSameOrBefore(endDate, "day")
//       );
//     }

//   };

//   const handleTypeChange = (value) => {
//     let filtered = [...data];
    
//     setTypeFilter(value);
//     applyFilters(transactions);

//     if (typeFilter) {
//       filtered = filtered.filter(
//         (transaction) => transaction.type === typeFilter
//       );
//     }

//   };

//   const handleSearch = (e) => {
//     let filtered = [...data];
    
//     setSearchTerm(e.target.value);
//     applyFilters(transactions);

//     if (searchTerm) {
//       filtered = filtered.filter((transaction) =>
//         Object.values(transaction).some((value) =>
//           value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }

//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       applyFilters(transactions);
//     }
//   };

//   const exportToCSV = () => {
//     const csv = Papa.unparse(filteredData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "petty_cash_transactions.csv");
//     link.click();
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Transactions");
//     XLSX.writeFile(wb, "petty_cash_transactions.xlsx");
//   };

//   /*
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Petty Cash Transactions", 14, 16);

//     autoTable(doc, {
//       head: [
//         [
//           "Date",
//           "Type",
//           "Sub Type",
//           "Description",
//           "Payer/Payee",
//           "Method",
//           "Amount",
//         ],
//       ],
//       body: filteredData.map((tx) => [
//         format(new Date(tx.date), "yyyy-MM-dd"),
//         tx.type,
//         tx.subtype,
//         tx.description,
//         tx.payer_payee,
//         tx.method,
//         tx.amount.toFixed(2),
//       ]),
//       foot: [["", "", "", "", "", "Balance:", totalAmount.toFixed(2)]],
//     });

//     doc.save("petty_cash_transactions.pdf");
//   };
// */

//   const getImageDataURL = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = "Anonymous"; // Ensure cross-origin images are handled
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         context.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL("image/png"));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });
//   };

//   const exportToPDF = async () => {
//     const doc = new jsPDF();
//     const today = moment().format("YYYY-MM-DD");

//     // Load the logo image
//     const logoUrl = "../../../../src/assets/logo.png";
//     let logoDataURL;
//     try {
//       logoDataURL = await getImageDataURL(logoUrl);
//     } catch (error) {
//       console.error("Failed to load the logo image:", error);
//     }

//     // Function to draw header, footer, and horizontal line
//     const drawHeaderFooter = (data) => {
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;

//       // Header with logo
//       // if (logoDataURL) {
//       //   doc.addImage(logoDataURL, "PNG", 10, 10, 40, 10); // Adjust position and size
//       // }
//       // doc.setFontSize(12);
//       // doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
//       // doc.line(10, 25, pageWidth - 10, 25); // Line under header
//       doc.setFontSize(14);
//       doc.text("Sobha Plantation", 10, 10); // Align left

//       doc.setFontSize(10);
//       doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
//       doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
//       doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
//       doc.text("Contact: 0112 751 757", 10, 30); // Email address line
//       doc.text(`Date: ${today}`, pageWidth - 10, 35); // Align right
      

//       if (logoDataURL) {
//         doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
//       }

//       doc.line(10, 40, pageWidth - 10, 40); // Header line
//       // Footer with page number
//       doc.setFontSize(10);
//       doc.text(
//         `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
//         pageWidth - 30,
//         pageHeight - 10
//       );
//     };

//     // Set the margins for header and footer space
//     const marginTop = 30; // space reserved for header
//     const marginBottom = 20; // space reserved for footer

//     // Title of the report
    
//     doc.setFontSize(22);
//     doc.text("Cash Book", 65, 45); // Adjust y-coordinate to start below header

//     // First Table: Overview Details
//     const overviewHeaders = [["Detail", "Value"]];

//     // Calculate total quantity and total revenue
//     const totalQuantity = filteredSchedules.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );
//     const totalSalesCount = filteredData.length; // Total sales count
//     /* const totalincome = filteredData
//       .reduce((sum, item) => sum + item.income, 0)
//       .toFixed(2); // Total revenue
//       const totalExpense = filteredData
//       .reduce((sum, item) => sum + item.expense, 0)
//       .toFixed(2); // Total revenue
//     const totalRevenue = income - expense; // Total revenue */
//     const overviewRows = [
//       ["Total Transactions Count", `${filteredData.length}`],
//       ["Total Income", `${totalIncome.toFixed(2)}`],
//       ["Total Expense", `${totalExpense.toFixed(2)}`],
//       ["Total Revenue", `${totalRevenue.toFixed(2)}`],
//     ];

//     // Render the first table
//     doc.autoTable({
//       startY: marginTop + 20, // Start the first table below the header space
//       head: overviewHeaders,
//       body: overviewRows,
//       margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
//       styles: {
//         fontSize: 10,
//       },
//       headStyles: {
//         fillColor: [64, 133, 126],
//         textColor: [255, 255, 255],
//         fontSize: 12,
//       },
//       theme: "grid",
//       didDrawPage: drawHeaderFooter, // Add header and footer to each page
//     });

//     // Second Table: Production Schedule Data
//     const scheduleRows = filteredData
//       .map((tx) => [
//         format(new Date(tx.date), "yyyy-MM-dd"),
//         tx.type,
//         tx.subtype,
//         tx.description,
//         tx.payer_payee,
//         tx.method,
//         tx.amount.toFixed(2),
//       ])
//       .filter((row) => row.every((cell) => cell !== undefined)); // Ensure no undefined values

//     const scheduleHeaders = [
//       [
//         "Date",
//         "Type",
//         "Sub Type",
//         "Description",
//         "Payer/Payee",
//         "Method",
//         "Amount",
//       ],
//     ];

//     let finalY = doc.lastAutoTable.finalY + 10; // Adjust space between tables

//     // Render the second table only if there are valid rows
//     if (scheduleRows.length > 0) {
//       doc.autoTable({
//         startY: finalY, // Start this table below the first table
//         head: scheduleHeaders,
//         body: scheduleRows,
//         margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
//         styles: {
//           fontSize: 10,
//         },
//         headStyles: {
//           fillColor: [64, 133, 126],
//           textColor: [255, 255, 255],
//           fontSize: 12,
//         },
//         theme: "striped",
//         didDrawPage: drawHeaderFooter,
//       });
//     } else {
//       // Handle the case where there are no schedule rows
//       doc.setFontSize(10);
//       doc.text(
//         "No data available for the production schedule.",
//         10,
//         finalY + 10
//       );
//     }

//     // Save the PDF
//     doc.save("transaction_report.pdf");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/salesAndFinance/finance/minorTransactions/${id}`
//       );
//       const updatedData = filteredData.filter((item) => item._id !== id);
//       setFilteredData(updatedData);
//       setTransactions(updatedData);
//       calculateTotal(updatedData);

//       // Notify server of the deletion for real-time updates
//       const socket = new WebSocket("ws://localhost:5000");
//       socket.send(JSON.stringify({ action: "delete", id }));
//       socket.close();
//     } catch (error) {
//       console.error("Error deleting transaction", error);
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/salesAndFinance/finance/minortransaction-update/${id}`);
//   };

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (text) => <>{format(new Date(text), "yyyy-MM-dd")}</>,
//       sorter: (a, b) => new Date(a.date) - new Date(b.date),
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Payer/Payee",
//       dataIndex: "payer_payee",
//       key: "payer_payee",
//     },
//     {
//       title: "Income",
//       dataIndex: "income",
//       key: "income",
//       render: (text, record) =>
//         record.type === "income" ? record.amount.toFixed(2) : "-",
//       sorter: (a, b) =>
//         (a.type === "income" ? a.amount : 0) -
//         (b.type === "income" ? b.amount : 0),
//     },
//     {
//       title: "Expense",
//       dataIndex: "expense",
//       key: "expense",
//       render: (text, record) =>
//         record.type === "expense" ? record.amount.toFixed(2) : "-",
//       sorter: (a, b) =>
//         (a.type === "expense" ? a.amount : 0) -
//         (b.type === "expense" ? b.amount : 0),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <div className="flex space-x-4">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined onClick={() => handleEdit(record._id)} />}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Are you sure to delete this transaction?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//           <Tooltip title={`Details: ${record.description} - ${record.amount}`}>
//             <Button icon={<InfoCircleOutlined />} />
//           </Tooltip>
//         </div>
//       ),
//     },
//   ];

//   // Determine the balance color
//   const balanceColor = totalAmount > 0 ? "green" : "red";

//   if (loading) return <NewLoadingScreen />;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-4">
//       <Card>
//         <div className="mb-4">
//           <RangePicker onChange={handleDateRangeChange} format="YYYY-MM-DD" />
//           <Select
//             placeholder="Select Type"
//             onChange={handleTypeChange}
//             className="ml-4"
//             style={{ width: 200 }}
//           >
//             <Option value="">All Types</Option>
//             <Option value="income">Income</Option>
//             <Option value="expense">Expense</Option>
//           </Select>
//           <Input
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearch}
//             onKeyPress={handleKeyPress}
//             className="ml-4"
//             style={{ width: 300 }}
//           />
//           <Button
//             onClick={() => applyFilters(transactions)}
//             type="primary"
//             className="ml-4"
//           >
//             Apply Filters
//           </Button>
//           <Button onClick={exportToCSV} type="default" className="ml-4">
//             Export to CSV
//           </Button>
//           <Button onClick={exportToExcel} type="default" className="ml-4">
//             Export to Excel
//           </Button>
//           <Button onClick={exportToPDF} type="default" className="ml-4">
//             Export to PDF
//           </Button>
//         </div>
//         <Link to="/salesAndFinance/finance/petty-cash">
//           <Button type="primary">View Petty Cash Book</Button>
//         </Link>
//         <Table columns={columns} dataSource={filteredData} rowKey="_id" />
//         <div className="mt-4 text-5xl" style={{ color: balanceColor }}>
//           <strong>Total Balance:</strong> {totalAmount.toFixed(2)}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default TransactionTable;


import React, { useState, useEffect } from 'react';
import { Table, Card, DatePicker, Select, Input, Button, Popconfirm, Tooltip, Menu, Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ModernTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateRange, typeFilter, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/salesAndFinance/finance/minorTransactions");
      const data = response.data.data;
      setTransactions(data);
      setFilteredData(data);
      calculateTotals(data);
    } catch (error) {
      setError("Error fetching transactions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (data) => {
    let income = 0;
    let expense = 0;
    data.forEach(tx => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else {
        expense += tx.amount;
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalAmount(income - expense);
  };

  const applyFilters = () => {
    if (!transactions || !Array.isArray(transactions)) return;
  
    let filtered = [...transactions];
  
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date) >= startDate &&
          new Date(transaction.date) <= endDate
      );
    }
  
    if (typeFilter) {
      filtered = filtered.filter((transaction) => transaction.type === typeFilter);
    }
  
    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        Object.values(transaction).some((value) =>
          value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
      );
    }
  
    setFilteredData(filtered);
    calculateTotals(filtered);
  };

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
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

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const today = moment().format("YYYY-MM-DD");

    // Load the logo image
    const logoUrl = "../../../../src/assets/logo.png";
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

      doc.setFontSize(14);
      doc.text("Sobha Plantation", 10, 10);

      doc.setFontSize(10);
      doc.text("317/23, Nikaweratiya,", 10, 15);
      doc.text("Kurunagala, Sri Lanka.", 10, 20);
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25);
      doc.text("Contact: 0112 751 757", 10, 30);
      doc.text(`Date: ${today}`, 10, 35);

      if (logoDataURL) {
        doc.addImage(logoDataURL, "PNG", pageWidth - 50, 10, 40, 10);
      }

      doc.line(10, 40, pageWidth - 10, 40);

      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 10
      );
    };

    const marginTop = 30;
    const marginBottom = 20;

    doc.setFontSize(22);
    doc.text("Transaction Report", 65, 55);

    // First Table: Overview Details
    const overviewHeaders = [["Detail", "Value"]];
    const overviewRows = [
      ["Total Transactions Count", `${filteredData.length}`],
      ["Total Income", `${totalIncome.toFixed(2)}`],
      ["Total Expense", `${totalExpense.toFixed(2)}`],
      ["Total Balance", `${totalAmount.toFixed(2)}`],
    ];

    doc.autoTable({
      startY: marginTop + 30,
      head: overviewHeaders,
      body: overviewRows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "grid",
      didDrawPage: drawHeaderFooter,
    });

    // Second Table: Transaction Data
    const transactionRows = filteredData.map((tx) => [
      format(new Date(tx.date), "yyyy-MM-dd"),
      tx.description,
      tx.payer_payee,
      tx.type === 'income' ? tx.amount.toFixed(2) : '-',
      tx.type === 'expense' ? tx.amount.toFixed(2) : '-',
    ]);

    const transactionHeaders = [
      ["Date", "Description", "Payer/Payee", "Income", "Expense"],
    ];

    let finalY = doc.lastAutoTable.finalY + 10;

    if (transactionRows.length > 0) {
      doc.autoTable({
        startY: finalY,
        head: transactionHeaders,
        body: transactionRows,
        margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
        styles: { fontSize: 10 },
        headStyles: {
          fillColor: [64, 133, 126],
          textColor: [255, 255, 255],
          fontSize: 12,
        },
        theme: "striped",
        didDrawPage: drawHeaderFooter,
      });
    } else {
      doc.setFontSize(10);
      doc.text("No transaction data available.", 10, finalY + 10);
    }

    doc.save("transaction_report.pdf");
  };

  const handleExport = ({ key }) => {
    switch (key) {
      case 'pdf':
        console.log('Exporting to PDF...');
        exportToPDF();
        break;
      case 'csv':
        console.log('Exporting to CSV...');
        exportToCSV();
        break;
      case 'excel':
        console.log('Exporting to Excel...');
        exportToExcel();
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => format(new Date(text), "yyyy-MM-dd"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payer/Payee",
      dataIndex: "payer_payee",
      key: "payer_payee",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      render: (text, record) => record.type === "income" ? record.amount.toFixed(2) : "-",
      sorter: (a, b) => (a.type === "income" ? a.amount : 0) - (b.type === "income" ? b.amount : 0),
    },
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      render: (text, record) => record.type === "expense" ? record.amount.toFixed(2) : "-",
      sorter: (a, b) => (a.type === "expense" ? a.amount : 0) - (b.type === "expense" ? b.amount : 0),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this transaction?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Tooltip title={`Details: ${record.description} - ${record.amount}`}>
            <Button icon={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/salesAndFinance/finance/minorTransactions/${id}`);
      const updatedData = filteredData.filter((item) => item._id !== id);
      setFilteredData(updatedData);
      setTransactions(updatedData);
      calculateTotal(updatedData);
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Editing transaction with id: ${id}`);
  };

  const handlePettyCashNavigation = () => {
    navigate('/salesAndFinance/finance/petty-cash');
  };

  const exportMenu = (
    <Menu onClick={handleExport}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="csv">Download as CSV</Menu.Item>
      <Menu.Item key="excel">Download as Excel</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 bg-gray-100">
      <Card className="rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <RangePicker onChange={(dates) => setDateRange(dates)} className="border-gray-300 rounded-full" />
            <Select
              placeholder="Select Type"
              onChange={(value) => setTypeFilter(value)}
              className="w-40 rounded-full"
            >
              <Option value="">All Types</Option>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
            <Input
              placeholder="Search transactions..."
              onChange={handleSearchChange}
              prefix={<SearchOutlined />}
              className="w-64 rounded-full"
              allowClear
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="primary" onClick={handlePettyCashNavigation} className="flex flex-row items-center gap-2 pt-2 pb-2 pl-4 pr-4 font-semibold text-white border-none rounded-full text-whii-700 bg-lime-600 hover:bg-lime-700">Petty Cash Table</button>
          </div>                    
          <Dropdown overlay={exportMenu} trigger={['hover']}>
            <button className="flex flex-row items-center gap-2 pt-2 pb-2 pl-4 pr-4 font-semibold text-white border-none rounded-full text-whii-700 bg-lime-600 hover:bg-lime-700">
              Export <DownloadOutlined />
            </button>
          </Dropdown>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="_id"
          loading={loading}
          className="overflow-hidden rounded-lg"
        />

        <div className="mt-6 text-right">
          <span className="text-2xl font-bold" style={{ color: totalAmount > 0 ? 'green' : 'red' }}>
            Total Balance: {totalAmount.toFixed(2)}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ModernTransactionTable;

