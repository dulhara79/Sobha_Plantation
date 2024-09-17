import React from "react";
import { Route, Routes } from "react-router-dom";

// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

/**
 * sales and finance
*/ 
//sales
import SalesAndFinanceDashboard from "./pages/SalesAndFinance/SalesAndFinanceDashboard.jsx";
import SalesDashboard from "./pages/SalesAndFinance/Sales/SalesDashboard.jsx";
import AddSalesRecordDashboard from "./pages/SalesAndFinance/Sales/AddSalesRecordDashboard.jsx";
import ViewSalesRecordDashboard from "./pages/SalesAndFinance/Sales/ViewSalesRecordDashboard.jsx";
import SalesAnalyticsPage from "./pages/SalesAndFinance/Sales/SalesAnalyticsPage.jsx";
// finance
import FinanceDashboard from "./pages/SalesAndFinance/Finance/FinanceDashboard.jsx";
import AddTransactionPage from "./pages/SalesAndFinance/Finance/AddTransactionPage.jsx";
import TransactionDisplay from "./pages/SalesAndFinance/Finance/TransactionDisplay.jsx";
import FinancialAnalyticsPage from "./pages/SalesAndFinance/Finance/FinancialAnalyticsPage.jsx";
import AddNewValuationPage from "./pages/SalesAndFinance/Finance/AddNewValuationPage.jsx";

// inventory
 import Fertilizer from "./pages/Inventory/Fertilizer.jsx";
 import FertilizerForm from "./pages/Inventory/FertilizerForm.jsx";
 import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
 import Maintenance from "./pages/Inventory/Maintenance.jsx";
 import MaintenanceForm from "./pages/Inventory/MaintenanceForm.jsx";
// employee
import Edashboard from "./pages/employee/Edashboard.jsx";
import Eregistration from "./pages/employee/Eregistration.jsx";
import Esalary from "./pages/employee/Esalary";
import EaddTask from "./pages/employee/EaddTask.jsx";
import EditTaskPage from "./pages/employee/EditTaskPage.jsx";
import ViewTaskList from "./pages/employee/ViewTaskList.jsx";
import GetAttendance from "./pages/employee/GetAttendance.jsx";
import EmployeeList from "./pages/employee/EmployeeList.jsx";
import EattendenceList from "./pages/employee/EattendenceList.jsx";

// harvest
import HarvestDashboard from "./pages/Harvest/HarvestDashboard";
import HarvestSchedule from"./pages/Harvest/HarvestSchedule";
import YieldRecords from "./pages/Harvest/YieldRecords.jsx";
import TaskAssign from "./pages/Harvest/TaskAssign.jsx"
import AddHarvestSchedule from "./pages/Harvest/AddHarvestSchedule.jsx";
import EditHarvestSchedule from './pages/Harvest/EditHarvestSchedule';
// crop care

// product
import ProductsDashboard from "./pages/Products/ProductsDashboard.jsx";
import ProductionScheduleOverview from "./pages/Products/ProductionScheduleOverview.jsx";
import QualityControl from "./pages/Products/QualityControl.jsx";
import AddSchedule from "./pages/Products/AddSchedule.jsx";
import EditSchedule from "./pages/Products/EditSchedule.jsx";
import AddInspectionReport from "./pages/Products/AddInspectionReport.jsx";

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";
import VarietyCrop from "./pages/CropVarieties/varietyCrop.jsx";
import CropVarietyForm from "./pages/CropVarieties/CropVarietyForm.jsx";
import Seedling from "./pages/CropVarieties/Seedling.jsx";
import Schedules from "./pages/CropVarieties/Schedules.jsx";
import ScheduleForm from "./pages/CropVarieties/ScheduleForm.jsx";
import LandPreparation from "./pages/CropVarieties/LandPreparation.jsx";

// buyers
import BuyerRegistrationForm from "./pages/BuyerRegistrationForm.jsx";
import BuyerTable from "./pages/BuyerTable.jsx";
import Profile from './components/Profile';


import PageError from "./pages/PageError.jsx";
import UpdateTransactionPage from "./pages/SalesAndFinance/Finance/UpdateTransactionPage.jsx";

import Test from "./pages/Test.jsx";

export default function App() {
  return (
    <Routes>
      {/* landing page and dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* finance */}
      <Route path="/salesAndFinance/" element={<SalesAndFinanceDashboard />} />
      <Route path="/salesAndFinance/sales/" element={<SalesDashboard />} />
      <Route path="/salesAndFinance/sales/addSalesRecord" element={<AddSalesRecordDashboard />} />
      <Route path="/salesAndFinance/sales/viewSalesRecord" element={<ViewSalesRecordDashboard />} />
      <Route path="/salesAndFinance/sales/analytics" element={<SalesAnalyticsPage />} />
      <Route path="/salesAndFinance/finance/" element={<FinanceDashboard />} />
      <Route path="/salesAndFinance/finance/add-transaction" element={<AddTransactionPage />} />
      <Route path="/salesAndFinance/finance/transaction-update/:id" element={<UpdateTransactionPage />} />
      <Route path="/salesAndFinance/finance/transaction-display" element={<TransactionDisplay />} />
      <Route path="/salesAndFinance/finance/analytics" element={<FinancialAnalyticsPage />} />
      <Route path="/salesAndFinance/finance/add-valuation" element={<AddNewValuationPage />} />

      {/* inventory */}
      <Route path="/Inventory/Fertilizer" element={<Fertilizer/>} />
      <Route path="/Inventory/Maintenance" element={<Maintenance/>} />
      <Route path="/Inventory/InventoryDashboard" element={<InventoryDashboard/>} />
      <Route path="/Inventory/FertilizerForm" element={<FertilizerForm/>} />
      <Route path="/Inventory/MaintenanceForm" element={<MaintenanceForm/>} />

      {/* employee */}
      <Route path="/employee/dashboard" element={<Edashboard/>}/>
      <Route path="/employee/registration" element= {<Eregistration/>}/>
      <Route path="/employee/salary" element= {<Esalary/>}/>
      <Route path="/employee/task" element= {<EaddTask/>}/>
      <Route path="/employee/taskedit" element= {<EditTaskPage/>}/>
      <Route path="/employee/TaskListview" element= {<ViewTaskList/>}/>
      <Route path="/employee/attendance" element= {<GetAttendance/>}/>
      <Route path="/employee/employeelist" element= {<EmployeeList/>}/>
      <Route path="/employee/attendanceList" element= {<EattendenceList/>}/>

      {/* harvest */}
      <Route path="/harvest/harvestdashboard" element={<HarvestDashboard />} />
      <Route path="/harvest/harvest-schedule" element={<HarvestSchedule />} />
      <Route path="/harvest/yield" element={<YieldRecords />} />
      <Route path="/harvest/task" element={<TaskAssign/>} />
      <Route path="/harvest/addschedule" element={<AddHarvestSchedule />} />
      <Route path="/harvest/edit/:id" element={<EditHarvestSchedule />} />
      {/* crop care */}

      {/* product */}
      <Route path="/products/productdashboard" element={<ProductsDashboard />} />
      <Route path="/products/production-overview" element={<ProductionScheduleOverview />} />
      <Route path="/products/quality-control" element={<QualityControl />} />
      <Route path="/products/addschedule" element={<AddSchedule />} />
      <Route path="/products/editschedule/:id" element={<EditSchedule />} />
      <Route path="/products/addInspectionReport" element={<AddInspectionReport />} />

      {/* field view  */}
      <Route path="/cultivationDashboard" element={<CultivationDashboard />} />
      <Route path="/varietyCrop" element={<VarietyCrop />} />
      <Route path="cvForm" element={<CropVarietyForm />} />
      <Route path="seedlingDistribution" element={<Seedling />} />
      <Route path="schedules" element={<Schedules />} />
      <Route path="scheduleForm" element={<ScheduleForm />} />
      <Route path="landPreparation" element={<LandPreparation />} />
        
      {/* buyers */}
      <Route path="/buyer-registration" element={<BuyerRegistrationForm />} />
      <Route path="/buyert" element={<BuyerTable />} />
      <Route path="/profile" element={<Profile />} />

      {/* page not found & error page */}
      <Route path="/test" element={<Test />} />

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
