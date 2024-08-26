import React from "react";

const HomeFinanceCard = ({ financeData }) => {
  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Finance</h3>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-500">Total transactions</p>
          <h4 className="text-xl">{financeData.totalTransactions}</h4>
        </div>
        <div>
          <p className="text-gray-500">Total Income</p>
          <h4 className="text-xl">LKR {financeData.totalIncome}</h4>
        </div>
        <div>
          <p className="text-gray-500">Total Expenses</p>
          <h4 className="text-xl">LKR {financeData.totalExpenses}</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeFinanceCard;
