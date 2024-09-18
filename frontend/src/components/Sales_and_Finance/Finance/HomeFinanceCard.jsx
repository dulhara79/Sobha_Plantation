import React, { useEffect, useState } from "react";
import axios from 'axios';

const HomeFinanceCard = () => {
  const [financeData, setFinanceData] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salesAndFinance/finance/transaction/getAll-transactions-summary');
        console.log(response.data);
        setFinanceData(response.data);
      } catch (error) {
        console.error("Error fetching finance data", error);
      }
    };

    fetchFinanceData();
  }, []);

  return (
    <div className={`p-4 mt-8 mb-8 rounded-lg shadow-xl bg-gradient-to-r from-white from-10% via-[#e8ffee] via-50% to-[#fff0f0] to-90%`}>
      <h3 className="font-bold text-7xl">Finance</h3>
      <div className="flex justify-between mt-4">
        <div className="">
          <h4 className={`text-blue-600 text-[28px] pl-14`}>
            {financeData.totalTransactions.toLocaleString()}
          </h4>
          <p className={`text-3xl font-bold text-black`}>Total Transactions</p>
        </div>
        <div>
          <h4 className={`text-green-600 text-[28px]`}>
            LKR {financeData.totalIncome.toLocaleString()}
          </h4>
          <p className="text-3xl font-bold text-black">Total Income</p>
        </div>
        <div className="pr-20">
          <h4 className={`text-red-600 text-[28px]`}>
            LKR {financeData.totalExpenses.toLocaleString()}
          </h4>
          <p className="text-3xl font-bold text-black">Total Expenses</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFinanceCard;
