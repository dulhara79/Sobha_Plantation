import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts'; 

const MonthlySalesChart = () => {
    const [weeklySales, setWeeklySales] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        // Fetch weekly sales data
        const weeklyResponse = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking/weekly-summary');
        setWeeklySales(weeklyResponse.data.mostSoldProducts || []);

        // Fetch monthly sales data
        const monthlyResponse = await axios.get('http://localhost:5000/api/salesAndFinance/sales/tracking/monthly-summary');
        setMonthlySales(monthlyResponse.data.mostSoldProducts || []);
        setMonthlyRevenue(monthlyResponse.data.monthlySales || []);

      } catch (error) {
        console.error('Error fetching sales analytics:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div>
            {/* Weekly Sold Products (Bar Chart) */}
            <div className="my-8">
              <h3 className="mb-4 text-xl font-semibold">Weekly Sold Products</h3>
              <BarChart width={800} height={400} data={weeklySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantitySold" fill="#82ca9d" />
              </BarChart>
            </div>

            {/* Monthly Sold Products (Bar Chart) */}
            <div className="my-8">
              <h3 className="mb-4 text-xl font-semibold">Monthly Sold Products</h3>
              <BarChart width={800} height={400} data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantitySold" fill="#8884d8" />
              </BarChart>
            </div>

            {/* Total Revenue per Month (Line Chart) */}
            <div className="my-8">
              <h3 className="mb-4 text-xl font-semibold">Monthly Revenue</h3>
              <LineChart
                width={800}
                height={400}
                data={monthlyRevenue}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
        </div>
    );
};

export default MonthlySalesChart;
