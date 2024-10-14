import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LearnMore from "./components/LearnMore";
import Login from "./pages/Login.jsx";
// import Logout from "./pages/Logout.jsx";
import Signup from "./pages/Signup.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

/**
 * sales and finance
 */
import SalesAndFinanceDashboard from "./pages/SalesAndFinance/SalesAndFinanceDashboard.jsx";

import SalesDashboard from "./pages/SalesAndFinance/Sales/SalesDashboard.jsx";

import AddSalesRecordDashboard from "./pages/SalesAndFinance/Sales/AddSalesRecordDashboard.jsx";
import ViewSalesRecordDashboard from "./pages/SalesAndFinance/Sales/ViewSalesRecordDashboard.jsx";
import EditSalesDataPage from "./pages/SalesAndFinance/Sales/EditSalesDataPage.jsx";
import SalesAnalyticsPage from "./pages/SalesAndFinance/Sales/SalesAnalyticsPage.jsx";

// finance
import FinanceDashboard from "./pages/SalesAndFinance/Finance/FinanceDashboard.jsx";

import AddTransactionPage from "./pages/SalesAndFinance/Finance/AddTransactionPage.jsx";
import TransactionDisplay from "./pages/SalesAndFinance/Finance/TransactionDisplay.jsx";
import UpdateTransactionPage from "./pages/SalesAndFinance/Finance/UpdateTransactionPage.jsx";
import FinancialAnalyticsPage from "./pages/SalesAndFinance/Finance/FinancialAnalyticsPage.jsx";

import AddNewValuationPage from "./pages/SalesAndFinance/Finance/AddNewValuationPage.jsx";
import ValuationDashboardPage from "./pages/SalesAndFinance/Finance/ValuationDashboard.jsx";
import EditValuationPage from "./pages/SalesAndFinance/Finance/EditValuationPage.jsx";

import Esalary from "./pages/SalesAndFinance/Finance/Esalary.jsx";
import ViewSalaryRecordPage from "./pages/SalesAndFinance/Finance/ViewSalaryRecordPage.jsx";
import EditEmployeeSalaryRecords from "./pages/SalesAndFinance/Finance/EditEmployeeSalaryRecords.jsx";

// inventory
import FertilizerRecords from "./pages/Inventory/FertilizerRecords.jsx";
import EditFertilizerRecord from "./pages/Inventory/EditFertilizerRecord.jsx";
import AddFertilizerRecord from "./pages/Inventory/AddFertilizerRecord.jsx";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
import MaintenanceRecords from "./pages/Inventory/MaintenanceRecords.jsx";
import EditMaintenanceRecord from "./pages/Inventory/EditMaintenanceRecord.jsx";
import AddMaintenanceRecord from "./pages/Inventory/AddMaintenanceRecord.jsx";
import EquipmentRecords from "./pages/Inventory/EquipmentRecords.jsx";
import EditEquipmentRecord from "./pages/Inventory/EditEquipmentRecord.jsx";
import AddEquipmentRecord from "./pages/Inventory/AddEquipmentRecord.jsx";
import RequestPaymentRecords from "./pages/Inventory/RequestPaymentRecords.jsx";
import AddRequestPaymentRecord from "./pages/Inventory/AddRequestPaymentRecord.jsx";
import EditRequestPaymentRecord from "./pages/Inventory/EditRequestPaymentRecord.jsx";

// employee
import Edashboard from "./pages/employee/Edashboard.jsx";
import Eregistration from "./pages/employee/Eregistration.jsx";
import EaddTask from "./pages/employee/EaddTask.jsx";
import EditTaskPage from "./pages/employee/EditTaskPage.jsx";
import ViewTaskList from "./pages/employee/ViewTaskList.jsx";
import ViewTaskDetails from "./pages/employee/ViewTaskDetails.jsx";
import GetAttendance from "./pages/employee/GetAttendance.jsx";
import EditAtendence from "./pages/employee/EditAtendence.jsx";
import EmployeeList from "./pages/employee/EmployeeList.jsx";
import EattendenceList from "./pages/employee/EattendenceList.jsx";
import ViewOneAttendance from "./pages/employee/ViewOneAttendance.jsx";
import EditEmployeePage from "./pages/employee/EditEmployeePage.jsx";
import ViewOneEmployee from "./pages/employee/ViewOneEmployee.jsx";

// harvest
import HarvestDashboard from "./pages/Harvest/HarvestDashboard";
import HarvestSchedule from "./pages/Harvest/HarvestSchedule";
import YieldRecords from "./pages/Harvest/YieldRecords";
import ComplianceCheckList from "./pages/Harvest/ComplianceCheckList";
import AddYieldRecord from "./pages/Harvest/AddYeildRecord";
import AddHarvestSchedule from "./pages/Harvest/AddHarvestSchedule";
import EditHarvestSchedule from "./pages/Harvest/EditHarvestSchedule";
import EditYieldRecords from "./pages/Harvest/EditYieldRecords.jsx";
import AddComplianceCheck from "./pages/Harvest/AddComplianceCheck.jsx";
import EditComplianceCheck from "./pages/Harvest/EditComplianceCheck.jsx";
import YieldBarChart from "./pages/Harvest/YieldBarChart.jsx";
import HarvestQuality from "./pages/Harvest/HarvestQuality";
import AddInspection from "./pages/Harvest/AddInspection.jsx";
import EditInspection from "./pages/Harvest/EditInspection.jsx";

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
import CoconutMite from "./pages/Diseases/CoconutMite.jsx";
import Termite from "./pages/Diseases/Termite.jsx";
import RedWeevil from "./pages/Diseases/RedWeevil.jsx";
import MammalianPests from "./pages/Diseases/MammalianPests.jsx";
import BudRot from "./pages/Diseases/BudRot.jsx";
import LeafSpot from "./pages/Diseases/LeafSpot.jsx";
import StemBleeding from "./pages/Diseases/StemBleeding.jsx";
import RootWilt from "./pages/Diseases/RootWilt.jsx";
import LethalYellowing from "./pages/Diseases/LethalYellowing.jsx";
import Ganoderma from "./pages/Diseases/Ganoderma.jsx";
import FruitFlies from "./pages/Diseases/FruitFlies.jsx";
import BananaWeevil from "./pages/Diseases/BananaWeevil.jsx";
import PineappleMealybug from "./pages/Diseases/PineappleMealybug.jsx";
import PapayaMealybug from "./pages/Diseases/PapayaMealybug.jsx";
import Thrips from "./pages/Diseases/Thrips.jsx";
import Aphids from "./pages/Diseases/Aphids.jsx";
import Anthracnose from "./pages/Diseases/Anthracnose.jsx";
import BacterialWilt from "./pages/Diseases/BacterialWilt.jsx";
import BlackSigatoka from "./pages/Diseases/BlackSigatoka.jsx";
import PapayaRingspot from "./pages/Diseases/PapayaRingspot.jsx";
import FusariumWilt from "./pages/Diseases/FusariumWilt.jsx";
import PowderyMildew from "./pages/Diseases/PowderyMildew.jsx";
import UpdateCoconutDiseases from "./pages/Diseases/UpdateCoconutDiseases.jsx";
import UpdateCropsDiseases from "./pages/Diseases/UpdateCropsDiseases.jsx";
import UpdateCoconutTreatments from "./pages/Diseases/UpdateCoconutTreatments.jsx";
import UpdateCropsTreatments from "./pages/Diseases/UpdateCropsTreatments.jsx";
import UpdateMaintenance from "./pages/Diseases/UpdateMaintenance.jsx";

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
import Gallery from "./pages/Products/Gallery.jsx";
import AddPackage from "./pages/Products/AddPackage.jsx";
import EditPackage from "./pages/Products/EditPackage.jsx";
import DetailsPage from './components/Products/Packaging/DetailsPage.jsx';

/**
 * field view
 */
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";
import VarietyCrop from "./pages/CropVarieties/VarietyCrop.jsx";
import CropVarietyForm from "./pages/CropVarieties/CropVarietyForm.jsx";
import Seedling from "./pages/CropVarieties/Seedling.jsx";
import Schedules from "./pages/CropVarieties/Schedules.jsx";
import ScheduleForm from "./pages/CropVarieties/ScheduleForm.jsx";
import LandPreparation from "./pages/CropVarieties/LandPreparation.jsx";
import AddSeedlingForm from "./pages/CropVarieties/AddSeedlingForm.jsx";
import PlantGrowth from "./pages/CropVarieties/plantGrowth.jsx";

// buyers
import BuyerDashboard from './pages/Buyer/BuyerDashboard.jsx';
import PaymentPage from './pages/PaymentPage'; 
import HomePage from './pages/HomePage';
import CartPage from './pages/Cart.jsx';
import MyOrders from './pages/MyOrders';


import BuyerDelivery from "./pages/Buyer/BuyerDelivery.jsx";
import BuyerDeliveryTable from "./pages/Buyer/BuyerDeliveryTable.jsx";
import UpdateDeliveryTable from "./pages/Buyer/UpdateDeliveryTable.jsx";

import BuyerInfo from "./pages/Buyer/BuyerInfo.jsx";
import BuyerInfoTable from "./pages/Buyer/BuyerInfoTable.jsx";
import UpdateBuyerInfo from "./pages/Buyer/UpdateInfoTable.jsx";
import BuyerPreOrderForm from './pages/Buyer/BuyerPreOrderForm';
import BuyerPreOrderTable from './pages/Buyer/BuyerPreOrderTable';
import UpdateBuyerPreOrderRequests from './pages/Buyer/UpdatePreOrderForm';


import PageError from "./pages/PageError.jsx";
import { element } from "prop-types";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* authentication */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* landing page and dashboard */}
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* sales and finance */}
          <Route
            path="/salesAndFinance/"
            element={<SalesAndFinanceDashboard />}
          />

          <Route path="/salesAndFinance/sales/" element={<SalesDashboard />} />
          <Route
            path="/salesAndFinance/sales/addSalesRecord"
            element={<AddSalesRecordDashboard />}
          />
          <Route
            path="/salesAndFinance/sales/viewSalesRecord"
            element={<ViewSalesRecordDashboard />}
          />
          <Route
            path="/salesAndFinance/sales/editSalesRecord/:id"
            element={<EditSalesDataPage />}
          />
          <Route
            path="/salesAndFinance/sales/analytics"
            element={<SalesAnalyticsPage />}
          />

          <Route
            path="/salesAndFinance/finance/"
            element={<FinanceDashboard />}
          />

          <Route
            path="/salesAndFinance/finance/add-transaction"
            element={<AddTransactionPage />}
          />
          <Route
            path="/salesAndFinance/finance/transaction-update/:id"
            element={<UpdateTransactionPage />}
          />
          <Route
            path="/salesAndFinance/finance/transaction-display"
            element={<TransactionDisplay />}
          />
          <Route
            path="/salesAndFinance/finance/analytics"
            element={<FinancialAnalyticsPage />}
          />
          <Route
            path="/salesAndFinance/finance/employeeSalary"
            element={<Esalary />}
          />

          <Route
            path="/salesAndFinance/finance/viewSalaryRecord"
            element={<ViewSalaryRecordPage />}
          />

          <Route
            path="/salesAndFinance/finance/EditEmployeeSalaryRecords/:id"
            element={<EditEmployeeSalaryRecords />} 
          />

          <Route
            path="/salesAndFinance/finance/valuation-dashboard"
            element={<ValuationDashboardPage />}
          />
          <Route
            path="/salesAndFinance/finance/add-new-valuation"
            element={<AddNewValuationPage />}
          />
          <Route
            path="/salesAndFinance/finance/edit-valuation/:id"
            element={<EditValuationPage />}
          />

          {/* inventory */}
          <Route
            path="/Inventory/FertilizerRecords"
            element={<FertilizerRecords />}
          />
          <Route
            path="/Inventory/EditFertilizerRecords/:id"
            element={<EditFertilizerRecord />}
          />
          <Route
            path="/Inventory/AddFertilizerRecord"
            element={<AddFertilizerRecord />}
          />
          <Route
            path="/Inventory/InventoryDashboard"
            element={<InventoryDashboard />}
          />
          <Route
            path="/Inventory/MaintenanceRecords"
            element={<MaintenanceRecords />}
          />
          <Route
            path="/Inventory/EditMaintenanceRecord/:id"
            element={<EditMaintenanceRecord />}
          />
          <Route
            path="/Inventory/AddMaintenanceRecord"
            element={<AddMaintenanceRecord />}
          />
          <Route
            path="/Inventory/EquipmentRecords"
            element={<EquipmentRecords />}
          />
          <Route
            path="/Inventory/EditEquipmentRecords/:id"
            element={<EditEquipmentRecord />}
          />
          <Route
            path="/Inventory/AddEquipmentRecord"
            element={<AddEquipmentRecord />}
          />
          <Route
            path="/Inventory/RequestPaymentRecords"
            element={<RequestPaymentRecords />}
          />
          <Route
            path="/Inventory/AddRequestPaymentRecord"
            element={<AddRequestPaymentRecord />}
          />
          <Route
            path="/Inventory/EditRequestPaymentRecords/:id"
            element={<EditRequestPaymentRecord />}
          />

           {/* employee */}
          <Route path="/employee/dashboard" element={<Edashboard />} />
          <Route path="/employee/registration" element={<Eregistration />} />
          <Route path="/employee/task" element={<EaddTask />} />
          <Route path="/employee/taskedit/:id" element={<EditTaskPage />} />
          <Route path="/employee/TaskListview" element={<ViewTaskList />} />
          <Route path="/employee/attendance" element={<GetAttendance />} />
          <Route path="/employee/employeelist" element={<EmployeeList />} />
          <Route
            path="/employee/attendanceList"
            element={<EattendenceList />}
          />
          <Route
            path="/employee/taskdetails/:id"
            element={<ViewTaskDetails />}
          />
          <Route
            path="/employee/veiwattendence/:id"
            element={<ViewOneAttendance />}
          />
          <Route
            path="/employee/editemployee/:id"
            element={<EditEmployeePage />}
          />
          <Route
            path="/employee/viewemployee/:id"
            element={<ViewOneEmployee />}
          />
          <Route path="/employee/editattendance" element = {<EditAtendence/>}/>


          {/* harvest */}
          <Route
            path="/harvest/harvestdashboard"
            element={<HarvestDashboard />}
          />
          <Route
            path="/harvest/harvest-schedule"
            element={<HarvestSchedule />}
          />
          <Route path="/harvest/yield" element={<YieldRecords />} />
          <Route
            path="/harvest/compliancechecklist"
            element={<ComplianceCheckList />}
          />
          <Route path="/yield/addrecords" element={<AddYieldRecord />} />
          <Route path="/harvest/addschedule" element={<AddHarvestSchedule />} />
          <Route path="/harvest/edit/:id" element={<EditHarvestSchedule />} />
          <Route path="/yield/editrecords/:id" element={<EditYieldRecords />} />
          <Route
            path="/compliance-checks/addrecords"
            element={<AddComplianceCheck />}
          />
          <Route
            path="/compliance-checks/editrecords/:id"
            element={<EditComplianceCheck />}
          />
          <Route path="/yield-bar-chart" element={<YieldBarChart />} />
          <Route path="/harvest/quality" element={<HarvestQuality />} />
          <Route path="/quality/addinspection" element={<AddInspection />} />
          <Route
            path="/quality/editinspection/:id"
            element={<EditInspection />}
          />

          {/* crop care */}
          <Route path="/diseases" element={<DiseasesDashboard />} />
          <Route path="/coconutInspections" element={<CoconutInspections />} />
          <Route path="/intercropInspections" element={<IntercropInspections />} />
          <Route path="/addCoconutDiseases" element={<AddCoconutDiseases />} />
          <Route path="/addCropDiseases" element={<AddCropsDiseases />} />
          <Route path="/coconutTreatments" element={<CoconutTreatments />} />
          <Route path="/intercropTreatments" element={<IntercropTreatments />} />
          <Route path="/coconutPests" element={<CoconutPests />} />
          <Route path="/RegularMaintenance" element={<RegularMaintenance />} />
          <Route path="/intercropPests" element={<IntercropPests />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/coconutLeafMiner" element={<CoconutLeafMiner />} />
          <Route path="/blackBeetle" element={<BlackBeetle />} />
          <Route path="/addCoconutTreatments" element={<AddCoconutTreatments />} />
          <Route path="/addIntercropTreatments" element={<AddIntercropTreatments />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/detailedOverview" element={<DetailedOverview />} />
          <Route path="/addMaintenance" element={<AddMaintenance />} />
          <Route path="/addProfile" element={<AddProfile />} />
          <Route path="/coconutMite" element={<CoconutMite />} />
          <Route path="/termite" element={<Termite />} />
          <Route path="/redWeevil" element={<RedWeevil />} />
          <Route path="/mammalianPests" element={<MammalianPests />} />
          <Route path="/budRot" element={<BudRot />} />
          <Route path="/leafSpot" element={<LeafSpot />} />
          <Route path="/stemBleeding" element={<StemBleeding />} />
          <Route path="/rootWilt" element={<RootWilt />} />
          <Route path="/lethalYellowing" element={<LethalYellowing />} />
          <Route path="/ganoderma" element={<Ganoderma />} />
          <Route path="/fruitFlies" element={<FruitFlies />} />
          <Route path="/bananaWeevil" element={<BananaWeevil />} />
          <Route path="/pineappleMealybug" element={<PineappleMealybug />} />
          <Route path="/papayaMealybug" element={<PapayaMealybug />} />
          <Route path="/thrips" element={<Thrips />} />
          <Route path="/aphids" element={<Aphids />} />
          <Route path="/anthracnose" element={<Anthracnose />} />
          <Route path="/bacterialWilt" element={<BacterialWilt />} />
          <Route path="/blackSigatoka" element={<BlackSigatoka />} />
          <Route path="/papayaRingspot" element={<PapayaRingspot />} />
          <Route path="/fusariumWilt" element={<FusariumWilt />} />
          <Route path="/powderyMildew" element={<PowderyMildew />} />
          <Route path="/updateCoconutDiseases/:id" element={<UpdateCoconutDiseases />} />
          <Route path="/updateCropsDiseases/:id" element={<UpdateCropsDiseases />} />
          <Route path="/updateCoconutTreatments/:id" element={<UpdateCoconutTreatments />} />
          <Route path="/updateCropsTreatments/:id" element={<UpdateCropsTreatments />} />
          <Route path="/updateMaintenance/:id" element={<UpdateMaintenance />} />

          {/* product new */}
          <Route
            path="/products/productdashboard"
            element={<ProductsDashboard />}
          />
          <Route
            path="/products/production-overview"
            element={<ProductionScheduleOverview />}
          />
          <Route
            path="/products/quality-control"
            element={<QualityControl />}
          />
          <Route path="/products/addschedule" element={<AddSchedule />} />
          <Route path="/products/editschedule/:id" element={<EditSchedule />} />
          <Route
            path="/products/addInspectionReport"
            element={<AddInspectionReport />}
          />
          <Route
            path="/products/editInspectionReport/:id"
            element={<EditInspectionReport />}
          />
          <Route
            path="/products/packaging-labeling"
            element={<PackagingLabeling />}
          />
          <Route path="/products/packaging" element={<Packaging />} />
          <Route
            path="/products/packaging-labeling/labeling"
            element={<Labeling />}
          />
          <Route path="/products/editPrice/:id" element={<EditPrice />} />
          <Route path="/products/addLabeling" element={<AddLabeling />} />
          <Route path="/products/editLabeling/:id" element={<EditLabeling />} />
          <Route path="/products/gallery" element={<Gallery />} />
          <Route path="/products/addPackage" element={<AddPackage />} />
          <Route path="/products/editPackage/:id" element={<EditPackage />} />
          <Route path="/share/:encodedData" element={<DetailsPage />} />

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
          
          {/* <Route path="/buyer-registration" element={<BuyerRegistrationForm />} /> */}
          {/* <Route path="/register-buyer" element={<BuyerRegistrationForm />} />
          <Route path="/buyert" element={<BuyerTable />} />
          <Route path="/profile" element={<Profile />} /> */}
      <Route path="/HomePage" element={<HomePage />} /> 
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/cart" element={<CartPage />} /> 
      <Route path="/MyOrders" element={<MyOrders />} /> 
      <Route path="/Bdelivery" element={<BuyerDelivery />} />
      <Route path="/Bdeliverytable" element={<BuyerDeliveryTable />} />
      <Route path="/updateDelivery/:id" element={<UpdateDeliveryTable />} />

      <Route path="/buyerinfo" element={<BuyerInfo />} />
      <Route path="/buyerinfotable" element={<BuyerInfoTable />} />
      <Route path="/updateBuyer/:id" element={<UpdateBuyerInfo />} /> 

        <Route path="/create-preorder" element={<BuyerPreOrderForm/> } />
      <Route path="/preorders" element={<BuyerPreOrderTable/>} />
      <Route path="/update-preorder/:id" element={<UpdateBuyerPreOrderRequests/>} />  

      <Route path="/buyerdashboard" element={<BuyerDashboard />} />


          {/* page not found & error page */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Route>
        <Route path="*" element={<PageError />} />
      </Routes>
    </AuthProvider>
  );
}
