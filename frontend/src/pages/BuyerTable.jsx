import React from 'react'
import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
import UserManagementTable from '../components/UserManagementTable';

function BuyerTable() {
  return (
    <div>
     <Header />
      {/* <Sidebar style={{ width: '250px' }} /> */}
    
      <UserManagementTable />
    </div>
  );
}

export default BuyerTable;

