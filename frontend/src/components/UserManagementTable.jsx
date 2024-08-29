import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagementTable = () => {
  const columns = [
    { field: 'userName', headerName: 'UserName', width: 100 },
    { field: 'firstName', headerName: 'FirstName', width: 130 },
    { field: 'lastName', headerName: 'LastName', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'dob', headerName: 'DOB', width: 150 },
    { field: 'contactNo', headerName: 'Contact No', width: 150 },
    { field: 'district', headerName: 'District', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, userName: 'a1', firstName: 'Kmal', lastName: 'Perera', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Colombo' },
    { id: 2, userName: 'a2', firstName: 'Nimal', lastName: 'Subasinghe', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Colombo' },
    { id: 3, userName: 'a3', firstName: 'Sunil', lastName: 'Shantha', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Gampaha' },

    { id: 4, userName: 'a4', firstName: 'Amal', lastName: 'Perera', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Matara' },

    { id: 5, userName: 'a5', firstName: 'Janaka', lastName: 'Gunathileka', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Galle' },

    { id: 6, userName: 'a6', firstName: 'Kmal', lastName: 'Perera', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Kandy' },
    
    { id: 7, userName: 'a7', firstName: 'Vihanga', lastName: 'Perera', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Colombo' },
    { id: 8, userName: 'a8', firstName: 'Pushpitha', lastName: 'Perera', gender: 'Male', dob: '1997-08-15', contactNo: '047825869', district: 'Kandy' },
    { id: 9, userName: 'a9', firstName: 'Uvindu', lastName: 'Seneviratne', gender: 'Male', dob: '2002-10-06', contactNo: '0769922694', district: 'Colombo' },
  ];

  const handleEdit = (user) => {
    console.log('Edit user', user);
    // Logic to edit the user
  };

  const handleDelete = (userId) => {
    console.log('Delete user with id', userId);
    // Logic to delete the user
  };

  return (
    <div style={{
      height: 400,
      width: '80%',
      margin: '40px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      backgroundColor: '#fafafa',
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #ddd',
          },
        }}
      />
    </div>
  );
};

export default UserManagementTable;
