import React from "react";

const HomeSalesCard = ({ salesData }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Sales</h3>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-500">Total sales</p>
          <h4 className="text-xl">{salesData.totalSales}</h4>
        </div>
        <div>
          <p className="text-gray-500">Most selling product</p>
          <h4 className="text-xl">{salesData.mostSellingProduct}</h4>
        </div>
        <div>
          <p className="text-gray-500">Least selling product</p>
          <h4 className="text-xl">{salesData.leastSellingProduct}</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeSalesCard;
