import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from an API or a data source
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleGetAttendance = () => {
    navigate('/employee/attendance');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Attendance Details</h2>
      <p>Quickly access employee attendance data for valuable insights and analysis</p>

      {/* Search and Sort Fields */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField 
          variant="outlined" 
          placeholder="Search" 
          size="small" 
          style={{ marginRight: '10px', borderRadius: '15px', backgroundColor: '#f1f1f1' }} 
          InputProps={{ style: { borderRadius: 50 } }}
        />
        <FormControl variant="outlined" size="small" style={{ borderRadius: '15px', marginRight: '10px' }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            label="Sort by"
            defaultValue=""
            style={{ borderRadius: '15px', backgroundColor: '#f1f1f1' }}
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: '10px'
                }
              }
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>

        {/* Generate Report Button */}
        <Button 
          variant="contained" 
          color="success" 
          size="small" 
          style={{ marginLeft: 'auto', borderRadius: '15px', backgroundColor: 'lightgreen' }}
        >
          Generate Report
        </Button>
      </div>

      {/* Get Attendance Button */}
      <Button 
        variant="contained" 
        color="success" 
        size="small" 
        style={{ marginBottom: '20px', borderRadius: '15px', backgroundColor: 'lightgreen', float: 'right' }} 
        onClick={handleGetAttendance}
      >
        Get Attendance
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell style={{ color: row.status === 'present' ? 'blue' : 'red' }}>{row.status}</TableCell>
                <TableCell>
                  <IconButton aria-label="view">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceTable;
