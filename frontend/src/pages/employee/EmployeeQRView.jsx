import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Spin } from 'antd';
import dayjs from 'dayjs';

const EmployeeQRView = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!employee) {
    return <div className="mt-8 text-center">Employee not found.</div>;
  }

  return (
    <div className="container px-4 mx-auto mt-8">
      <Card title="Employee Details" className="shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p><strong>Name:</strong> {`${employee.firstName} ${employee.lastName}`}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Contact Number:</strong> {employee.contactNumber}</p>
            <p><strong>NIC:</strong> {employee.nic}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Date of Birth:</strong> {dayjs(employee.dateOfBirth).format('YYYY-MM-DD')}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Employee Type:</strong> {employee.employeeType}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Hired Date:</strong> {dayjs(employee.hiredDate).format('YYYY-MM-DD')}</p>
            <p><strong>Hourly Rate:</strong> {employee.hourlyRate}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployeeQRView;