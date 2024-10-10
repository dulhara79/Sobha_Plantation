import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { DatePicker, Popover, Radio, message } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this package is installed
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ViewSalaryRecord = () => {
  const [loading, setLoading] = useState(false);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("payment_date");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/salesAndFinance/finance/salary/")
      .then((response) => {
        setSalaryRecords(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteSalaryRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this salary record?")) {
      setLoading(true);
      axios
        .delete(
          `http://localhost:5000/api/salesAndFinance/finance/salary/${id}`
        )
        .then(() => {
          setSalaryRecords((prev) =>
            prev.filter((record) => record._id !== id)
          );
          message.success("Salary record deleted.");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error("Failed to delete salary record.");
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/salesAndFinance/finance/EditEmployeeSalaryRecords/${id}`);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRecords = useMemo(() => {
    const comparator = (a, b) => {
      if (a[orderBy] < b[orderBy]) return orderDirection === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return orderDirection === "asc" ? 1 : -1;
      return 0;
    };
    return [...salaryRecords].sort(comparator);
  }, [salaryRecords, orderBy, orderDirection]);

  const filteredRecords = sortedRecords.filter((record) =>
    Object.values(record).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Records Report", 10, 10);
    const headers = [
      ["Date", "Name", "Start Date", "End Date", "Type", "Basic Days", "Basic Rate","Bonus", "OT Hours" ,  "OT Rate", "EPF/ETF", "Total"],
    ];
    const data = filteredRecords.map((record) => [
      record.payment_date.split("T")[0],
      record.emp_name,
      record.salary_start_date.split("T")[0],
      record.salary_end_date.split("T")[0],
      record.type,
      record.basic_days,
      record.basic_rate.toFixed(2),
      record.bonus_salary.toFixed(2),
      record.ot_hours.toFixed(2),
      record.ot_rate.toFixed(2),
      record.epf_etf.toFixed(2),
      ((record.basic_days * record.basic_rate +
        record.ot_hours * record.ot_rate +
        record.bonus_salary) * (1 - record.epf_etf / 100)).toFixed(2),
    ]);
    doc.autoTable({ head: headers, body: data, startY: 20 });
    doc.save("salary_records.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Salary Payments
          </h1>
          <p className="text-sm text-gray-500">
            Manage your employee salary payments effectively.
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="w-64 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:ring focus:ring-green-300"
            />
            {searchQuery && (
              <XMarkIcon
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
          <Button
            shape="round"
            type="primary"
            onClick={() => setPopoverVisible(!popoverVisible)}
            icon={<ArrowDownTrayIcon className="w-5 h-5" />}
          >
            Download PDF
          </Button>
          <Popover
            content={
              <div className="space-y-4">
                <DatePicker.RangePicker
                  onChange={(dates) => setSelectedDates(dates)}
                />
                <div>
                  <Radio.Group
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <Radio value="payment_date">Date</Radio>
                    <Radio value="rate">Rate</Radio>
                  </Radio.Group>
                </div>
                <Button type="primary" onClick={handleDownloadPDF}>
                  Download
                </Button>
              </div>
            }
            title="Date Range and Sorting"
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={setPopoverVisible}
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "payment_date"}
                  direction={orderDirection}
                  onClick={() => handleSort("payment_date")}
                >
                  Payment Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "emp_name"}
                  direction={orderDirection}
                  onClick={() => handleSort("emp_name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "salary_start_date"}
                  direction={orderDirection}
                  onClick={() => handleSort("salary_start_date")}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "salary_end_date"}
                  direction={orderDirection}
                  onClick={() => handleSort("salary_end_date")}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderDirection}
                  onClick={() => handleSort("type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "basic_days"}
                  direction={orderDirection}
                  onClick={() => handleSort("basic_days")}
                >
                  Basic Days
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "bonus_salary"}
                  direction={orderDirection}
                  onClick={() => handleSort("bonus_salary")}
                >
                  Bonus Salary
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ot_hours"}
                  direction={orderDirection}
                  onClick={() => handleSort("ot_hours")}
                >
                  OT Hours
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ot_rate"}
                  direction={orderDirection}
                  onClick={() => handleSort("ot_rate")}
                >
                  OT Rates
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "epf_etf"}
                  direction={orderDirection}
                  onClick={() => handleSort("epf_etf")}
                >
                  EPF/ETF
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "description"}
                  direction={orderDirection}
                  onClick={() => handleSort("description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {/* <IconButton
                    onClick={() => handleDeleteSalaryRecord(record._id)}
                    size="small"
                    className="text-red-600 hover:bg-red-100"
                  >
                    <TrashIcon className="w-5 h-5" /> 
                  </IconButton>*/}
                  </TableCell>
                  <TableCell>{record.payment_date}</TableCell>
                  <TableCell>{record.emp_name}</TableCell>
                  <TableCell>{record.salary_start_date}</TableCell>
                  <TableCell>{record.salary_end_date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.basic_days}</TableCell>
                  <TableCell>{record.bonus_salary.toFixed(2)}</TableCell>
                  <TableCell>{record.ot_hours.toFixed(2)}</TableCell>
                  <TableCell>{record.ot_rate.toFixed(2)}</TableCell>
                  <TableCell>{record.epf_etf}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton size="small" className=""
                      onClick={() => handleEdit(record._id)}>
                        <EditFilled />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSalaryRecord(record._id)}
                        className=""
                      >
                        <TrashIcon className="w-5 h-5" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


export default ViewSalaryRecord;