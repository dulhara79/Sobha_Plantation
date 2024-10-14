import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const HomeSalesCard = () => {  
  const [totalSales, setTotalSales] = useState(0);
  const [mostSellingProduct, setMostSellingProduct] = useState("");
  const [leastSellingProduct, setLeastSellingProduct] = useState("");

  // Fetch Sales Data from Database
  useEffect(() => {
    axios.get("http://localhost:5000/api/salesAndFinance/sales/tracking/month-salecard-summary")
    .then((response) => {
      setTotalSales(response.data.data.totalSales);
      setMostSellingProduct(response.data.data.mostSellingProduct);
      setLeastSellingProduct(response.data.data.leastSellingProduct);
    })
    .catch(error => console.error("Error fetching sales data:", error));
  }, []);

  
  return (
    <div className="p-4 mt-8 mb-8 bg-white rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold">Sales Overview</h3>
        <div className="mt-8">
          <h4 className="text-xl font-semibold">
            {moment().format("YYYY-MM")} Sales Summary
          </h4>
          <div className="flex justify-between mt-4">
            <div>
              <h4 className="text-xl">{totalSales}</h4>
              <h2 className="text-gray-500">Total Sales</h2>
            </div>
            <div>
              <h4 className="text-xl">{mostSellingProduct}</h4>
              <h2 className="text-gray-500">Most Selling Product</h2>
            </div>
            <div>
              <h4 className="text-xl">{leastSellingProduct}</h4>
              <h2 className="text-gray-500">Least Selling Product</h2>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomeSalesCard;