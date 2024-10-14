import React, { useState, useEffect } from "react"; 
import axios from "axios";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import NavigationButtons from "../../components/Sales_and_Finance/NavigationButtons";
import UserGreetingCard from "../../components/Sales_and_Finance/UserGreetingCard";
import FinanceCard from "../../components/Sales_and_Finance/Finance/HomeFinanceCard";
import SalesCard from "../../components/Sales_and_Finance/Sales/HomeSalesCard";

import NewLoadingScreen from "../../components/LoadingDots";

const FinanceDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [financeData, setFinanceData] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    // Simulate loading process (e.g., API calls, component mounting)
    setTimeout(() => {
      setLoading(false); // Once the components or data are loaded
    }, 1000); // Adjust the delay as needed
  }, []);

  // Fetch Sales and Finance Data from Database
  useEffect(() => {
    axios.get("/api/finance").then((response) => {
      setFinanceData(response.data);
    });
  }, []);

  if (loading) return <NewLoadingScreen />;

  return (
    <div>
      <Header />
      <Sidebar activePage="/salesAndFinance/"/>
      <div className={`ml-[300px] pt-3`}>
        <NavigationButtons />
        <div className="min-h-screen p-6 bg-gray-100">
          <UserGreetingCard />
          <FinanceCard financeData={financeData} />
          <SalesCard />
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
