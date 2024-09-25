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

const SalesTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [revenueGenerated, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter states
  const [dateRange, setDateRange] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/salesAndFinance/sales/tracking"
        );
        const data = response.data.data; 

        console.log("response: ", response);
        
               
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

  let total = 0;
  const calculateTotal = (data) => {
    var totalIncome = data
        total += totalIncome;
    setTotalAmount(total);
  };

  const applyFilters = (data) => {
    let filtered = [...data];

    if (dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(
        (transaction) =>
          moment(transaction.saleDate).isSameOrAfter(startDate, "day") &&
          moment(transaction.saleDate).isSameOrBefore(endDate, "day")
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
    link.setAttribute("download", "sales Data.csv");
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "sales Data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("sales Data", 14, 16);

    autoTable(doc, {
      head: [
        [
          "Date",
          "Product",
          "Unit Price",
          "Quantity",
          "Revenue Generated"
        ],
      ],
      body: filteredData.map((tx) => [
        format(new Date(tx.saleDate), "yyyy-MM-dd"),
        tx.product,
        tx.unitPrice,
        tx.quantitySold,
        tx.revenueGenerated.toFixed(2),
      ]),
      foot: [["", "", "", "", "", "Balance:", revenueGenerated.toFixed(2)]],
    });

    doc.save("sales Data.pdf");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/salesAndFinance/sales/tracking/${id}`
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
    navigate(`/api/salesAndFinance/sales/tracking/${id}`);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "saleDate",
      key: "saleDate",
      render: (text) => <>{format(new Date(text), "yyyy-MM-dd")}</>,
      sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) => <>{text.toFixed(2)}</>,
    },
    {
      title: "Sold Quantity",
      dataIndex: "quantitySold",
      key: "quantitySold",
    },
    {
      title: "Amount",
      dataIndex: "revenueGenerated",
      key: "revenueGenerated",
      render: (text) => <>{text.toFixed(2)}</>, // text.toFixed(2)
      sorter: (a, b) => a.amount - b.amount,
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
//   const balanceColor = revenueGenerated > 0 ? "green" : "red";

  if (loading) return <NewLoadingScreen />;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <Card>
        <div className="mb-4">
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
        <div className="mt-4 text-5xl" >
          {/* <strong>Total Balance:</strong> {revenueGenerated.toFixed(2)} */}
        </div>
      </Card>
    </div>
  );
};

export default SalesTable;
