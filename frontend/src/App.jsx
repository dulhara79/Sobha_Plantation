import { Route, Routes } from 'react-router-dom'

import FinanceAddRecordDashboard from './pages/Finance/FinanceAddRecordDashboard.jsx'
import FinanceAnalyseDashboard from './pages/Finance/FinanceAnalyseDashboardTem.jsx'
import FinanceDashboard from './pages/Finance/FinanceDashboardTemplate.jsx'
import FinanceViewAllRecordDashboard from './pages/Finance/FinanceViewAllRecordDashb.jsx'
import FinanceBudgetDashboardTempl from './pages/Finance/FinanceBudgetDashboardTempl.jsx'
import FinanceValuationDashboardT from './pages/Finance/FinanceValuationDashboardT.jsx'

import SalesDashboard from './pages/Sales/SalesDashboard.jsx'
export default function App() {
  return (
    <Routes>
        <Route path="/finance/finance/add-record" element={<FinanceAddRecordDashboard />} />
        <Route path="/finance/finance/analyse" element={<FinanceAnalyseDashboard />} />
        <Route path="/finance/finance/dashboard" element={<FinanceDashboard />} />
        <Route path="/finance/finance/all-records" element={<FinanceViewAllRecordDashboard />} />
        <Route path="/finance/finance/budget-dashboard" element={<FinanceBudgetDashboardTempl />} />
        <Route path="/finance/finance/valuation" element={<FinanceValuationDashboardT />} />

         <Route path="/finance/sales/dashboard" element={<SalesDashboard />} />
      </Routes>
  )
}
