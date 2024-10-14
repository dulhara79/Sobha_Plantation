// BarGraph.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const BarGraph = ({ data }) => {
  return (
    <BarChart
      width={900} // Adjust the width as needed
      height={600} // Adjust the height as needed
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey="value" 
        fill="#1D6660" // Change color as needed
        animationDuration={500} // Animation duration in milliseconds
      />
    </BarChart>
  );
};

export default BarGraph;
