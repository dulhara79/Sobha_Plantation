// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SalesSummaryCard from '../../../components/Sales_and_Finance/Sales/SalesSummaryCard';
// import SalesCharts from '../../../components/Sales_and_Finance/Sales/SalesCharts';
// import MostSoldProductsChart from '../../../components/Sales_and_Finance/Sales/MostSoldProductsChart';
// import TotalRevenueChart from '../../../components/Sales_and_Finance/Sales/TotalRevenueChart';
// import io from 'socket.io-client';
// import { DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// // Ensure the socket URL matches your server URL
// const socket = io('http://localhost:5000/'); // Note the port should match your server port

// const SalesAnalyticsPage = () => {
//   const [salesSummary, setSalesSummary] = useState({});
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [mostSoldProducts, setMostSoldProducts] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState([]);

//   useEffect(() => {
//     // Fetch initial data using axios
//     axios.get('http://localhost:5000/api/salesAndFinance/sales/analytics') // Note the port
//       .then((response) => {
//         const data = response.data;
//         setSalesSummary(data.summary);
//         setMonthlySales(data.monthlySales);
//         setMostSoldProducts(data.mostSoldProducts);
//         setTotalRevenue(data.totalRevenue);
//       })
//       .catch((error) => {
//         console.error('Error fetching sales analytics:', error);
//       });

//     // Listen for real-time updates
//     socket.on('salesUpdate', (newData) => {
//       setSalesSummary(newData.summary);
//       setMonthlySales(newData.monthlySales);
//       setMostSoldProducts(newData.mostSoldProducts);
//       setTotalRevenue(newData.totalRevenue);
//     });

//     // Cleanup function to remove the socket listener when the component unmounts
//     return () => {
//       socket.off('salesUpdate');
//     };
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-4 gap-4">
//         <SalesSummaryCard title="Total Revenue" value={salesSummary.totalRevenue} icon={<DollarOutlined />} />
//         <SalesSummaryCard title="Total Units Sold" value={salesSummary.totalUnitsSold} icon={<ShoppingCartOutlined />} />
//         <SalesSummaryCard title="Average Order Value" value={salesSummary.averageOrderValue} />
//         <SalesSummaryCard title="Profit Margin" value={salesSummary.profitMargin} />
//       </div>
//       <SalesCharts data={monthlySales} />
//       <MostSoldProductsChart data={mostSoldProducts} />
//       <TotalRevenueChart data={totalRevenue} />
//     </div>
//   );
// };

// export default SalesAnalyticsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesSummaryCard from '../../../components/Sales_and_Finance/Sales/SalesSummaryCard';
import SalesCharts from '../../../components/Sales_and_Finance/Sales/SalesCharts';
import MostSoldProductsChart from '../../../components/Sales_and_Finance/Sales/MostSoldProductsChart';
import TotalRevenueChart from '../../../components/Sales_and_Finance/Sales/TotalRevenueChart';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import NavigationButtons from "../../../components/Sales_and_Finance/NavigationButtons";

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from '@ant-design/icons';

import NewLoadingScreen from '../../../components/LoadingDots'

const SriLankanRupeeIcon = () => (
  // <span style={{ fontSize: '24px' }}>₨</span>
  <span style={{ fontSize: '24px' }}>LKR.</span>
);

const SalesAnalyticsPage = () => {
  const [salesSummary, setSalesSummary] = useState({});
  const [monthlySales, setMonthlySales] = useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   // Simulate loading process (e.g., API calls, component mounting)
    //   setTimeout(() => {
    //     setLoading(false); // Once the components or data are loaded
    //   }, 2000); // Adjust the delay as needed
    // }, []);
  
    // if (loading) return <NewLoadingScreen />;

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/salesAndFinance/sales/analytics');
      const data = response.data;
      setSalesSummary(data.summary || {});
      setMonthlySales(data.monthlySales || []);
      setMostSoldProducts(data.mostSoldProducts || []);
      setTotalRevenue(data.totalRevenue || []);
    } catch (error) {
      console.error('Error fetching sales analytics:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set up polling every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchData, 30000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Header />
      <Sidebar activePage="/salesAndFinance/"/>
      <div className={`ml-[300px] pt-3`}>
      <Breadcrumb
      style={{ margin: "10px 0" }}
          items={[
            {
              href: "/dashboard",
              title: <HomeOutlined />,
            },
            {
              title: "Sales and Finance",
            },
          ]}
        />
        <NavigationButtons activePage="sales" />
        <div className="min-h-screen p-6 bg-gray-100">
        <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <SalesSummaryCard 
          title="Total Revenue" 
          value={salesSummary.totalRevenue || 'N/A'} 
          icon={<SriLankanRupeeIcon />} 
        />
        <SalesSummaryCard 
          title="Total Units Sold" 
          value={salesSummary.totalUnitsSold || 'N/A'} 
          icon={<ShoppingCartOutlined />} 
        />
        <SalesSummaryCard 
          title="Average Order Value" 
          value={salesSummary.averageOrderValue || 'N/A'} 
        />
        <SalesSummaryCard 
          title="Profit Margin" 
          value={salesSummary.profitMargin || 'N/A'} 
        />
      </div>
      <SalesCharts data={monthlySales} />
      <MostSoldProductsChart data={mostSoldProducts} />
      <TotalRevenueChart data={totalRevenue} />
    </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;
