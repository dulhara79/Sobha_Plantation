import React from 'react';
import { Card } from '@mui/material';
import { DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const SalesSummaryCard = ({ title, value, icon }) => {
  return (
    <Card className="p-4 m-2 shadow-lg">
      <div className="flex items-center">
        <div className="mr-4 text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default SalesSummaryCard;
