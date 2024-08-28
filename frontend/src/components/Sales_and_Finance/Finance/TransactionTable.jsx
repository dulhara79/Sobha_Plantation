import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  DatePicker,
  Space,
  Button,
  Popconfirm,
  Tooltip,
  notification,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const TransactionTable = () => {
  // Ensure that transactions and filteredTransactions are initialized as empty arrays
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  // const fetchTransactions = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/salesAndFinance/finance/transaction"
  //     ).then((response) => {
  //       const fetchedTransactions (response.data.data)
  //     console.log(response.data); // Check what is returned

      // Ensure the response is an array, if not, default to an empty array
      // const fetchedTransactions = Array.isArray(response.data)
      //   ? response.data
      //   : [];
  //       const fetchedTransactions = (response.data)
  //       console.log(Array.isArray(response.data)); // Check what is returned
  //     console.log(fetchedTransactions); // Check what is returned
  //     setTransactions(fetchedTransactions);
  //     setFilteredTransactions(fetchedTransactions);
  //   } catch (error) {
  //     console.error("Failed to fetch transactions:", error);
  //   }
  // };

  useEffect(() => {
    axios
        .get('http://localhost:5000/api/salesAndFinance/finance/transaction')
        .then((response) => {
          setTransactions(response.data.data);
          setFilteredTransactions(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/salesAndFinance/finance/transaction/${transactionId}`
      );
      notification.success({ message: "Transaction deleted successfully" });
      fetchTransactions();
    } catch (error) {
      notification.error({
        message: "Failed to delete transaction",
        description: error.message,
      });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      setFilteredTransactions(
        transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      setFilteredTransactions(
        transactions.filter((transaction) =>
          dayjs(transaction.dateTime).isBetween(dates[0], dates[1], null, "[]")
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const columns = [
    {
      title: "Date",
      // dataIndex: "dateTime",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (text) => dayjs(text).format("DD-MM-YYYY"),
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (text) => (
        <span className={text === "Income" ? "text-green-500" : "text-red-500"}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
    },
    {
      title: "Category",
      dataIndex: "transactionCategory",
      key: "transactionCategory",
      sorter: (a, b) => a.transactionCategory.localeCompare(b.transactionCategory),
    },/* 
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
    }, */
    /* {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    }, */
    {
      title: "Payer/Payee",
      dataIndex: "payerPayee",
      key: "payerPayee",
      sorter: (a, b) => a.payerPayee.localeCompare(b.payerPayee),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/transactions/edit/${record._id}`)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this transaction?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Tooltip title={record.description}>
            <Button icon={<InfoCircleOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search Transactions"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
          suffix={<SearchOutlined />}
        />
        <DatePicker.RangePicker onChange={handleDateRangeChange} />
      </Space>
      <Table columns={columns} dataSource={filteredTransactions} rowKey="_id" />
    </div>
  );
};

export default TransactionTable;
