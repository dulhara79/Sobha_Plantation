import React from "react";
import { Route, Routes } from "react-router-dom";



// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// finance
import SalesAndFinanceDashboard from "./pages/SalesAndFinance/SalesAndFinanceDashboard.jsx";
import SalesDashboard from "./pages/SalesAndFinance/Sales/SalesDashboard.jsx";
import AddSalesRecordDashboard from "./pages/SalesAndFinance/Sales/AddSalesRecordDashboard.jsx";
import FinanceDashboard from "./pages/SalesAndFinance/Finance/FinanceDashboard.jsx";

// inventory

// employee
import Edashboard from "./pages/employee/Edashboard.jsx";
import Eregistration from "./pages/employee/Eregistration.jsx";
import Esalary from "./pages/employee/Esalary";
import EaddTask from "./pages/employee/EaddTask.jsx";
import EditTaskPage from "./pages/employee/EditTaskPage.jsx";
import ViewTaskList from "./pages/employee/ViewTaskList.jsx";
import GetAttendance from "./pages/employee/GetAttendance.jsx";

// harvest
import HarvestDashboard from "./pages/Harvest/HarvestDashboard";
import HarvestSchedule from"./pages/Harvest/HarvestSchedule";
// crop care

// product
import ProductsDashboard from "./pages/Products/ProductsDashboard.jsx";
import ProductionScheduleOverview from "./pages/Products/ProductionScheduleOverview.jsx";
import QualityControl from "./pages/Products/QualityControl.jsx";
import AddSchedule from "./pages/Products/AddSchedule.jsx";

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";
import VarietyCrop from "./pages/CropVarieties/varietyCrop.jsx";
import CropVarietyForm from "./pages/CropVarieties/CropVarietyForm.jsx";
import Seedling from "./pages/CropVarieties/Seedling.jsx";
import Schedules from "./pages/CropVarieties/Schedules.jsx";
import ScheduleForm from "./pages/CropVarieties/ScheduleForm.jsx";
import LandPreparation from "./pages/CropVarieties/LandPreparation.jsx";

// buyers


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
      <Route path="/salesAndFinance/finance/" element={<FinanceDashboard />} />

      {/* inventory */}

      {/* employee */}
      <Route path="/employee/dashboard" element={<Edashboard/>}/>
      <Route path="/employee/registration" element= {<Eregistration/>}/>
      <Route path="/employee/salary" element= {<Esalary/>}/>
      <Route path="/employee/task" element= {<EaddTask/>}/>
      <Route path="/employee/taskedit" element= {<EditTaskPage/>}/>
      <Route path="/employee/TaskListview" element= {<ViewTaskList/>}/>
      <Route path="/employee/attendance" element= {<GetAttendance/>}/>

      {/* harvest */}
      <Route path="/harvest/harvestdashboard" element={<HarvestDashboard />} />
      <Route path="/harvest/harvest-schedule" element={<HarvestSchedule />} />
      {/* crop care */}

      {/* product */}
      <Route path="/products/productdashboard" element={<ProductsDashboard />} />
      <Route path="/products/production-overview" element={<ProductionScheduleOverview />} />
      <Route path="/products/quality-control" element={<QualityControl />} />
      <Route path="/products/addschedule" element={<AddSchedule />} />

      {/* field view  */}
      <Route path="/cultivationDashboard" element={<CultivationDashboard />} />
      <Route path="/varietyCrop" element={<VarietyCrop />} />
      <Route path="cvForm" element={<CropVarietyForm />} />
      <Route path="seedlingDistribution" element={<Seedling />} />
      <Route path="schedules" element={<Schedules />} />
      <Route path="scheduleForm" element={<ScheduleForm />} />
      <Route path="landPreparation" element={<LandPreparation />} />
        
      {/* buyers */}

      {/* page not found & error page */}
      {/* <Route path="/test" element={<Test />} /> */}

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
