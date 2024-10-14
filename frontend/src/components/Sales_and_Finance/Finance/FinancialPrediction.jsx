import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Spin, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Title, Text } = Typography;

const FinancialPrediction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/summary/predict-next-month');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div className="mt-4 text-center">No data available.</div>;
  }

  // Prepare data for the line chart
  const chartData = [
    { month: 'Last Month', income: data.avgMonthlyIncome, expenses: data.avgMonthlyExpenses },
    { month: 'Next Month', income: data.predictedIncome, expenses: data.predictedExpenses },
  ];

  return (
    <div className="p-4">
      <Title level={2} className="mb-8 text-center">
        Financial Predictions
      </Title>
      <div className="grid flex-wrap grid-flow-col grid-cols-4 gap-2 mt-10 mb-10">
      {/* <Row gutter={[16, 16]} className="max-w-2xl mx-auto"> */}
        <Col>
          <Card className="shadow-lg h-44">
            <Title level={4} className="text-green-600">
              Average Monthly Income
            </Title>
            <Text className="text-2xl font-semibold"><span className='text-base text-gray-800 '>LKR.</span>{data.avgMonthlyIncome.toFixed(2)}</Text>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-lg">
            <Title level={4} className="text-red-600">
              Average Monthly Expenses
            </Title>
            <Text className="text-2xl font-semibold"><span className='text-base text-gray-800 '>LKR.</span>{data.avgMonthlyExpenses.toFixed(2)}</Text>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-lg">
            <Title level={4} className="text-green-600">
              Predicted Income (Next Month)
            </Title>
            <Text className="text-2xl font-semibold"><span className='text-base text-gray-800 '>LKR.</span>{data.predictedIncome.toFixed(2)}</Text>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-lg">
            <Title level={4} className="text-red-600">
              Predicted Expenses (Next Month)
            </Title>
            <Text className="text-2xl font-semibold"><span className='text-base text-gray-800 '>LKR.</span>{data.predictedExpenses.toFixed(2)}</Text>
          </Card>
        </Col>
      {/* </Row> */}
      </div>

      <Title level={3} className="mt-8 text-center">
        Income and Expenses Over Time
      </Title>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default FinancialPrediction;
