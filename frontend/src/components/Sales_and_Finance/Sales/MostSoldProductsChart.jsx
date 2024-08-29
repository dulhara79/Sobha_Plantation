import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MostSoldProductsChart = ({ data }) => {
  return (
    <Card title="Most Sold Products" className="m-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantitySold" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MostSoldProductsChart;
