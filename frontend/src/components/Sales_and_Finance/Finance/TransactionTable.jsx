import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Card,
  DatePicker,
  Select,
  Input,
  Button,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import moment from "moment";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// import NewLoadingScreen from '../../NewLoadingScreen';
import NewLoadingScreen from "../../../components/LoadingDots";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter states
  const [dateRange, setDateRange] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredSchedules, setFilteredSchedules] = useState([]);


  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/salesAndFinance/finance/transaction"
        );
        const data = response.data.data;
        setTransactions(data);
        setFilteredData(data);
        calculateTotal(data);
      } catch (error) {
        setError("Error fetching transactions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Setup WebSocket for real-time updates
    const socket = new WebSocket("ws://localhost:5000");
    socket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setTransactions(updatedData);
      setFilteredData(updatedData);
      calculateTotal(updatedData);
    };

    return () => {
      socket.close();
    };
  }, []);

  const calculateTotal = (data) => {
    const totalIncome = data
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = data
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
    setTotalAmount(totalIncome - totalExpense);
    setTotalIncome(totalIncome);
    setTotalExpense(totalExpense);
    setTotalRevenue(totalIncome - totalExpense);
    
  };

  const applyFilters = (data) => {
    let filtered = [...data];

    if (dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(
        (transaction) =>
          moment(transaction.date).isSameOrAfter(startDate, "day") &&
          moment(transaction.date).isSameOrBefore(endDate, "day")
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        Object.values(transaction).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    calculateTotal(filtered);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    applyFilters(transactions);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    applyFilters(transactions);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(transactions);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      applyFilters(transactions);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "petty_cash_transactions.csv");
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "petty_cash_transactions.xlsx");
  };

  /*
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Petty Cash Transactions", 14, 16);

    autoTable(doc, {
      head: [
        [
          "Date",
          "Type",
          "Sub Type",
          "Description",
          "Payer/Payee",
          "Method",
          "Amount",
        ],
      ],
      body: filteredData.map((tx) => [
        format(new Date(tx.date), "yyyy-MM-dd"),
        tx.type,
        tx.subtype,
        tx.description,
        tx.payer_payee,
        tx.method,
        tx.amount.toFixed(2),
      ]),
      foot: [["", "", "", "", "", "Balance:", totalAmount.toFixed(2)]],
    });

    doc.save("petty_cash_transactions.pdf");
  };
*/

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

  const exportToPDF = async () => {
    const doc = new jsPDF();

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

      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, "PNG", 10, 10, 40, 10); // Adjust position and size
      }
      doc.setFontSize(12);
      doc.text("Sobha Plantation", 170, 15); // Adjust x, y position
      doc.line(10, 25, pageWidth - 10, 25); // Line under header

      // Footer with page number
      doc.setFontSize(10);
      doc.text(
        `Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`,
        pageWidth - 30,
        pageHeight - 10
      );
    };

    // Set the margins for header and footer space
    const marginTop = 30; // space reserved for header
    const marginBottom = 20; // space reserved for footer

    // Title of the report
    doc.setFontSize(22);
    doc.text("Transaction Report", 50, 35); // Adjust y-coordinate to start below header

    // First Table: Overview Details
    const overviewHeaders = [["Detail", "Value"]];

    // Calculate total quantity and total revenue
    const totalQuantity = filteredSchedules.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalSalesCount = filteredData.length; // Total sales count
    /* const totalincome = filteredData
      .reduce((sum, item) => sum + item.income, 0)
      .toFixed(2); // Total revenue
      const totalExpense = filteredData
      .reduce((sum, item) => sum + item.expense, 0)
      .toFixed(2); // Total revenue
    const totalRevenue = income - expense; // Total revenue */
    const overviewRows = [
      ["Total Transactions Count", `${filteredData.length}`],
      ["Total Income", `${totalIncome.toFixed(2)}`],
      ["Total Expense", `${totalExpense.toFixed(2)}`],
      ["Total Revenue", `${totalRevenue.toFixed(2)}`],
    ];

    // Render the first table
    doc.autoTable({
      startY: marginTop + 20, // Start the first table below the header space
      head: overviewHeaders,
      body: overviewRows,
      margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [64, 133, 126],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      theme: "grid",
      didDrawPage: drawHeaderFooter, // Add header and footer to each page
    });

    // Second Table: Production Schedule Data
    const scheduleRows = filteredData.map((tx) => [
      format(new Date(tx.date), "yyyy-MM-dd"),
      tx.type,
      tx.subtype,
      tx.description,
      tx.payer_payee,
      tx.method,
      tx.amount.toFixed(2),
    ])
      .filter((row) => row.every((cell) => cell !== undefined)); // Ensure no undefined values

    const scheduleHeaders = [
      ["Date",
          "Type",
          "Sub Type",
          "Description",
          "Payer/Payee",
          "Method",
          "Amount",],
    ];

    let finalY = doc.lastAutoTable.finalY + 10; // Adjust space between tables

    // Render the second table only if there are valid rows
    if (scheduleRows.length > 0) {
      doc.autoTable({
        startY: finalY, // Start this table below the first table
        head: scheduleHeaders,
        body: scheduleRows,
        margin: { top: marginTop, bottom: marginBottom, horizontal: 10 },
        styles: {
          fontSize: 10,
        },
        headStyles: {
          fillColor: [64, 133, 126],
          textColor: [255, 255, 255],
          fontSize: 12,
        },
        theme: "striped",
        didDrawPage: drawHeaderFooter,
      });
    } else {
      // Handle the case where there are no schedule rows
      doc.setFontSize(10);
      doc.text(
        "No data available for the production schedule.",
        10,
        finalY + 10
      );
    }

    // Save the PDF
    doc.save("transaction_report.pdf");
  };


  

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/salesAndFinance/finance/transaction/${id}`
      );
      const updatedData = filteredData.filter((item) => item._id !== id);
      setFilteredData(updatedData);
      setTransactions(updatedData);
      calculateTotal(updatedData);

      // Notify server of the deletion for real-time updates
      const socket = new WebSocket("ws://localhost:5000");
      socket.send(JSON.stringify({ action: "delete", id }));
      socket.close();
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/salesAndFinance/finance/transaction-update/${id}`);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <>{format(new Date(text), "yyyy-MM-dd")}</>,
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
      render: (text, record) => (record.type === "income" ? record.amount.toFixed(2) : "-"),
      sorter: (a, b) => (a.type === "income" ? a.amount : 0) - (b.type === "income" ? b.amount : 0),
    },
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      render: (text, record) => (record.type === "expense" ? record.amount.toFixed(2) : "-"),
      sorter: (a, b) => (a.type === "expense" ? a.amount : 0) - (b.type === "expense" ? b.amount : 0),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-4">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined onClick={() => handleEdit(record._id)} />}
            />
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

  // Determine the balance color
  const balanceColor = totalAmount > 0 ? "green" : "red";

  if (loading) return <NewLoadingScreen />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <Card>
        <div className="mb-4">
          <RangePicker onChange={handleDateRangeChange} format="YYYY-MM-DD" />
          <Select
            placeholder="Select Type"
            onChange={handleTypeChange}
            className="ml-4"
            style={{ width: 200 }}
          >
            <Option value="">All Types</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            className="ml-4"
            style={{ width: 300 }}
          />
          <Button
            onClick={() => applyFilters(transactions)}
            type="primary"
            className="ml-4"
          >
            Apply Filters
          </Button>
          <Button onClick={exportToCSV} type="default" className="ml-4">
            Export to CSV
          </Button>
          <Button onClick={exportToExcel} type="default" className="ml-4">
            Export to Excel
          </Button>
          <Button onClick={exportToPDF} type="default" className="ml-4">
            Export to PDF
          </Button>
        </div>
        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
        <div className="mt-4 text-5xl" style={{ color: balanceColor }}>
          <strong>Total Balance:</strong> {totalAmount.toFixed(2)}
        </div>
      </Card>
    </div>
  );
};

export default TransactionTable;
