import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSpring, animated } from '@react-spring/web';

const COLORS = ['#007BFF', '#20C997', '#66c41d', '#6A5ACD', '#20B2AA'];

const PieChartComponent = ({ title, data, loading }) => {
  // Using react-spring to animate the pie chart container
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
  });

  return (
    <animated.div style={animationProps} className="flex-1 p-5 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </animated.div>
  );
};

export default PieChartComponent;
