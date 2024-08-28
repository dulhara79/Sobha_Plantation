import React, { useEffect, useState } from "react";
import { Card, Statistic, Row, Col } from "antd";
import axios from "axios";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const YearlyTransactionsCard = () => {
  const [yearlyData, setYearlyData] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalOutgoing: 0,
    profitOrLoss: 0,
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    /* {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (transactionType) => (
        <span className={transactionType === 'Income' ? 'text-green-500' : 'text-red-500'}>
          {transactionType}
        </span>
      ),
      filters: [
        { text: 'Income', value: 'Income' },
        { text: 'Expense', value: 'Expense' },
      ],
      onFilter: (value, record) => record.transactionType.includes(value),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => <span>{description}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span className={record.transactionType === 'Income' ? 'text-green-500' : 'text-red-500'}>
          {record.transactionType === 'Income' ? '+' : '-'}Rs {amount}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    }, */
    // Add other columns as needed
  ];

  useEffect(() => {
    fetchYearlyData();

    const interval = setInterval(fetchYearlyData, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchYearlyData = async () => {
    try {
      const response = await axios.get("/api/finance/yearly-summary");
      setYearlyData(response.data);
    } catch (error) {
      console.error("Failed to fetch yearly data:", error);
    }
  };

  return (
    <Card title="Yearly Financial Summary" className="shadow-lg">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Total Transactions"
            value={yearlyData.totalTransactions}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Income"
            value={yearlyData.totalIncome}
            prefix="Rs"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Outgoing"
            value={yearlyData.totalOutgoing}
            prefix="Rs"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={yearlyData.profitOrLoss >= 0 ? "Profit" : "Loss"}
            value={yearlyData.profitOrLoss}
            precision={2}
            valueStyle={{
              color: yearlyData.profitOrLoss >= 0 ? "#3f8600" : "#cf1322",
            }}
            prefix={
              yearlyData.profitOrLoss >= 0 ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            suffix="Rs"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default YearlyTransactionsCard;
