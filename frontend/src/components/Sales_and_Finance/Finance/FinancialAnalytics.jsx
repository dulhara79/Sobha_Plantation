import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const FinancialAnalytics = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlySalesData, setYearlySalesData] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [monthlyRes, yearlySalesRes, productPerfRes] = await Promise.all([
        axios.get('/api/finance/monthly-analytics'),
        axios.get('/api/finance/yearly-sales'),
        axios.get('/api/finance/product-performance'),
      ]);

      setMonthlyData(monthlyRes.data || []);
      setYearlySalesData(yearlySalesRes.data || []);
      
      // Ensure productPerformance is an array
      if (Array.isArray(productPerfRes.data)) {
        setProductPerformance(productPerfRes.data);
      } else {
        console.error('Unexpected data format for product performance');
        setProductPerformance([]);
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    }
  };

  return (
    <div className="financial-analytics-page">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Monthly Transaction Analytics">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Array.isArray(monthlyData) ? monthlyData : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#3f8600" />
                <Bar dataKey="expenses" fill="#cf1322" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Yearly Sales Analytics">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Array.isArray(yearlySalesData) ? yearlySalesData : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Product Performance Analytics">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  dataKey="value"
                  nameKey="product"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {productPerformance.length > 0 &&
                    productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialAnalytics;
