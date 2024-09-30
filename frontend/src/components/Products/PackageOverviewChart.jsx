import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PackageOverviewChart = ({ data }) => {
  const chartData = {
    labels: ['Total Packages', 'Completed Packages', 'Pending Packages'],
    datasets: [
      {
        label: 'Package Overview',
        data: [data.totalPackages, data.completedPackages, data.pendingPackages],
        backgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384'], // Colors for each slice
        borderColor: ['#FFCE56', '#4BC0C0', '#FF6384'], // Border colors matching slices
        borderWidth: 2,
        hoverOffset: 15, // Hover effect for better interactivity
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',  // Place legend on the right side
        align: 'center',  // Align legend items to center
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333', // Label text color
          padding: 10,  // Increase padding for better spacing
          usePointStyle: true,  // Use point styles for legend items
        },
      },
      tooltip: {
        backgroundColor: '#1D6660',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      duration: 2500, // Duration of the chart animation
      easing: 'easeInOutCubic', // Easing effect for animation
    },
  };

  return (
    <div style={chartContainerStyle}>
      <h3 style={chartTitleStyle}>Package Overview</h3>
      <div style={chartWrapperStyle}>
        <Doughnut data={chartData} options={options} width={300} height={300} /> {/* Adjust chart size */}
      </div>
    </div>
  );
};

// Updated styles for the container and title
const chartContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '10px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  width: '800px',  // Adjust width to fit chart and legend
  height: '400px',
  margin: '0 auto',  // Center align the chart container
};

const chartTitleStyle = {
  textAlign: 'center',
  color: '#1D6660',
  marginBottom: '1px',  // Reduced margin to decrease the gap
  fontWeight: '600',
};

const chartWrapperStyle = {
  display: 'flex',
  justifyContent: 'center', // Center the chart horizontally
  alignItems: 'center', // Center the chart vertically
  height: 'calc(100% - 40px)', // Adjust height to account for reduced margin and padding
  marginBottom: '1px',
};

export default PackageOverviewChart;
