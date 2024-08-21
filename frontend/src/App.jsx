import { Route, Routes } from 'react-router-dom'

import Test from './pages/Test.jsx'

import PageError from './pages/PageError.jsx'
export default function App() {
  return (
    <Routes>
         <Route path='test' element={<Test />} />

         <Route path='*' element={<PageError />} />
      </Routes>
  )
}
