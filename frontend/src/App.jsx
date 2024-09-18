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

// inventory
 import FertilizerRecords from "./pages/Inventory/FertilizerRecords.jsx";
 import EditFertilizerRecord from "./pages/Inventory/EditFertilizerRecord.jsx";
 import AddFertilizerRecord from "./pages/Inventory/AddFertilizerRecord.jsx";
 import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";

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
import YieldRecords from "./pages/Harvest/YieldRecords";
import ComplianceCheckList from "./pages/Harvest/ComplianceCheckList";
import AddYieldRecord from "./pages/Harvest/AddYeildRecord";
import AddHarvestSchedule from  "./pages/Harvest/AddHarvestSchedule";
import EditHarvestSchedule from './pages/Harvest/EditHarvestSchedule';
import EditYieldRecords from './pages/Harvest/EditYieldRecords.jsx'
import AddComplianceCheck from './pages/Harvest/AddComplianceCheck.jsx';
import EditComplianceCheck from './pages/Harvest/EditComplianceCheck.jsx';
import YieldBarChart from './pages/Harvest/YieldBarChart.jsx';

// crop care (diseases)
import DiseasesDashboard from "./pages/Diseases/DiseasesDashboard.jsx";
import CoconutInspections from "./pages/Diseases/CoconutInspections.jsx";
import IntercropInspections from "./pages/Diseases/IntercropInspections.jsx";
import AddCoconutDiseases from "./pages/Diseases/AddCoconutDiseases.jsx";
import AddCropsDiseases from "./pages/Diseases/AddCropsDiseases.jsx";
import CoconutTreatments from "./pages/Diseases/CoconutTreatments.jsx";
import IntercropTreatments from "./pages/Diseases/IntercropTreatments.jsx";
import CoconutPests from "./pages/Diseases/CoconutPests.jsx";
import RegularMaintenance from "./pages/Diseases/RegularMaintenance.jsx";
import IntercropPests from "./pages/Diseases/IntercropPests.jsx";
import UserProfile from "./pages/Diseases/UserProfile.jsx";
import CoconutLeafMiner from "./pages/Diseases/CoconutLeafMiner.jsx";
import BlackBeetle from "./pages/Diseases/BlackBeetle.jsx";
import AddCoconutTreatments from "./pages/Diseases/AddCoconutTreatments.jsx";
import AddIntercropTreatments from "./pages/Diseases/AddIntercropTreatments.jsx";
import Insights from "./pages/Diseases/Insights.jsx";
import DetailedOverview from "./pages/Diseases/DetailedOverview.jsx";
import AddMaintenance from "./pages/Diseases/AddMaintenance.jsx";
import AddProfile from "./pages/Diseases/AddProfile.jsx";

// product
import ProductsDashboard from "./pages/Products/ProductsDashboard.jsx";
import ProductionScheduleOverview from "./pages/Products/ProductionScheduleOverview.jsx";
import QualityControl from "./pages/Products/QualityControl.jsx";
import AddSchedule from "./pages/Products/AddSchedule.jsx";
import EditSchedule from "./pages/Products/EditSchedule.jsx";
import AddInspectionReport from "./pages/Products/AddInspectionReport.jsx";
import EditInspectionReport from "./pages/Products/EditInspectionReport.jsx";
import PackagingLabeling from "./pages/Products/PackagingLabeling.jsx";
import Packaging from "./pages/Products/Packaging.jsx";
import Labeling from "./pages/Products/Labeling.jsx";
import EditPrice from "./pages/Products/EditPrice.jsx";
import AddLabeling from "./pages/Products/AddLabeling.jsx";
import EditLabeling from "./pages/Products/EditLabeling.jsx";

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";
import VarietyCrop from "./pages/CropVarieties/varietyCrop.jsx";
import CropVarietyForm from "./pages/CropVarieties/CropVarietyForm.jsx";
import Seedling from "./pages/CropVarieties/Seedling.jsx";
import Schedules from "./pages/CropVarieties/Schedules.jsx";
import ScheduleForm from "./pages/CropVarieties/ScheduleForm.jsx";
import LandPreparation from "./pages/CropVarieties/LandPreparation.jsx";
import AddSeedlingForm from "./pages/CropVarieties/AddSeedlingForm.jsx";
import PlantGrowth from "./pages/CropVarieties/plantGrowth.jsx";


// buyers
import BuyerRegistrationForm from "./pages/BuyerRegistrationForm.jsx";
import BuyerTable from "./pages/BuyerTable.jsx";
import Profile from './components/Profile';


// import Test from "./pages/Test.jsx";
import PageError from "./pages/PageError.jsx";


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
      <Route path="/salesAndFinance/finance/transaction-display" element={<TransactionDisplay />} />
      <Route path="/salesAndFinance/finance/analytics" element={<FinancialAnalyticsPage />} />

      {/* inventory */}
    <Route path="/Inventory/FertilizerRecords" element={<FertilizerRecords/>} />
    <Route path="/Inventory/EditFertilizerRecords/:id" element={<EditFertilizerRecord/>} />
    <Route path="/Inventory/AddFertilizerRecord" element={<AddFertilizerRecord/>} />
    <Route path="/Inventory/InventoryDashboard" element={<InventoryDashboard/>} />

      {/* employee */}        
      <Route path="/employee/dashboard" element={<Edashboard/>}/>
      <Route path="/employee/registration" element= {<Eregistration/>}/>
      <Route path="/employee/salary" element= {<Esalary/>}/>
      <Route path="/employee/task" element= {<EaddTask/>}/>
      <Route path="/employee/taskedit/:id" element= {<EditTaskPage/>}/>
      <Route path="/employee/TaskListview" element= {<ViewTaskList/>}/>
      <Route path="/employee/attendance" element= {<GetAttendance/>}/>
      <Route path="/employee/employeelist" element= {<EmployeeList/>}/>
      <Route path="/employee/attendanceList" element= {<EattendenceList/>}/>

      {/* harvest */}
      <Route path="/harvest/harvestdashboard" element={<HarvestDashboard />} />
      <Route path="/harvest/harvest-schedule" element={<HarvestSchedule />} />
      <Route path="/harvest/yield" element={<YieldRecords />} />
      <Route path="/harvest/compliancechecklist" element={<ComplianceCheckList />} />
      <Route path="/yield/addrecords" element={<AddYieldRecord />} />
      <Route path="/harvest/addschedule" element={<AddHarvestSchedule />} />
      <Route path="/harvest/edit/:id" element={<EditHarvestSchedule />} />
      <Route path="/yield/editrecords/:id" element={<EditYieldRecords />} />
      <Route path="/compliance-checks/addrecords" element={<AddComplianceCheck />} />
      <Route path="/compliance-checks/editrecords/:id" element={<EditComplianceCheck />} />
      <Route path="/yield-bar-chart" element={<YieldBarChart />} />


      {/* crop care */}
      <Route path="/diseases" element={<DiseasesDashboard />} />
      <Route path="/coconutInspections" element={<CoconutInspections />} />
      <Route path="/intercropInspections" element={<IntercropInspections />} />
      <Route path="/addCoconutDiseases" element={<AddCoconutDiseases />} />
      <Route path="/addCropDiseases" element={<AddCropsDiseases />} />
      <Route path="/coconutTreatments" element={<CoconutTreatments />} />
      <Route path="/intercropTreatments" element={<IntercropTreatments />} />
      <Route path="/coconutPests" element={<CoconutPests />} />
      <Route path="/maintenance" element={<RegularMaintenance />} />
      <Route path="/intercropPests" element={<IntercropPests />} />
      <Route path="/maintenance" element={<RegularMaintenance />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/coconutLeafMiner" element={<CoconutLeafMiner />} />
      <Route path="/blackBeetle" element={<BlackBeetle />} />
      <Route path="/addCoconutTreatments" element={<AddCoconutTreatments />} />
      <Route path="/addIntercropTreatments" element={<AddIntercropTreatments />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/detailedOverview" element={<DetailedOverview />} />
      <Route path="/addMaintenance" element={<AddMaintenance />} />
      <Route path="/addProfile" element={<AddProfile />} />

      {/* product */}
      <Route path="/products/productdashboard" element={<ProductsDashboard />} />
      <Route path="/products/production-overview" element={<ProductionScheduleOverview />} />
      <Route path="/products/quality-control" element={<QualityControl />} />
      <Route path="/products/addschedule" element={<AddSchedule />} />
      <Route path="/products/editschedule/:id" element={<EditSchedule />} />
      <Route path="/products/addInspectionReport" element={<AddInspectionReport />} />
      <Route path="/products/editInspectionReport/:id" element={<EditInspectionReport />} />
      <Route path="/products/packaging-labeling" element={<PackagingLabeling />} />
      <Route path="/products/packaging" element={<Packaging />} />
      <Route path="/products/packaging-labeling/labeling" element={<Labeling />} />
      <Route path="/products/editPrice/:id" element={<EditPrice />} />
      <Route path="/products/addLabeling" element={<AddLabeling />} />
      <Route path="/products/editLabeling/:id" element={<EditLabeling />} />

      {/* field view  */}
      <Route path="/cultivationDashboard" element={<CultivationDashboard />} />
      <Route path="/varietyCrop" element={<VarietyCrop />} />
      <Route path="/cvForm" element={<CropVarietyForm />} />
      <Route path="/seedlingDistribution" element={<Seedling />} />
      <Route path="/schedules" element={<Schedules />} />
      <Route path="/scheduleForm" element={<ScheduleForm />} />
      <Route path="/landPreparation" element={<LandPreparation />} />
      <Route path="/seedlingForm" element={<AddSeedlingForm />} />
      <Route path="/pGrowth" element={<PlantGrowth />} />
      

        
      {/* buyers */}
      <Route path="/buyer-registration" element={<BuyerRegistrationForm />} />
      <Route path="/buyert" element={<BuyerTable />} />
      <Route path="/profile" element={<Profile />} />

      {/* page not found & error page */}
      {/* <Route path="/test" element={<Test />} /> */}

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
