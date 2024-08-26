import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserTie, faCheckCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate


// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const WidgetRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;
`;

const Card = styled.div`
  background-color: #61b356;
  color: white;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 10px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: -40px;
  right: 0;
  &:hover {
    background-color: #333;
  }
`;

const EmployeeDash = () => {
  const [data, setData] = useState({
    totalEmployees: 20,
    permanentEmployees: 10,
    completedTasks: 10,
    totalTasks: 15,
  });
  const navigate = useNavigate(); // Step 1: Initialize navigate

  const handleViewAllTasks = () => {
    // Step 2: Create the click handler
    navigate('/employee/TaskListview'); // Use navigate to redirect
  };

  const handleViewAllEmployees = () => {
    navigate('/employee/list'); // Update the route as needed
  };

  useEffect(() => {
    // Fetch the data from your API
    // Example: axios.get('/api/dashboard').then((response) => setData(response.data));
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container>
      <Header>
        <div>
          <h2>Welcome Senuvi,</h2>
          <p>Today is {currentDate}</p>
        </div>
      </Header>

      <h3>Welcome to the Employee Management System.</h3>

      {/* First Row of Widgets */}
      <WidgetRow>
        <Card>
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <h4>Total No of Employees</h4>
          <p>{data.totalEmployees}</p>
        </Card>

        <Card>
          <FontAwesomeIcon icon={faUserTie} size="3x" />
          <h4>No of Permanent Employees</h4>
          <p>{data.permanentEmployees}</p>
        </Card>

        <Button onClick={handleViewAllEmployees}>View All Employees</Button>
      </WidgetRow>

      {/* Second Row of Widgets */}
      <WidgetRow>
        <Card>
          <FontAwesomeIcon icon={faCheckCircle} size="3x" />
          <h4>No of Completed Tasks</h4>
          <p>{data.completedTasks}</p>
        </Card>

        <Card>
          <FontAwesomeIcon icon={faTasks} size="3x" />
          <h4>Total No of Tasks</h4>
          <p>{data.totalTasks}</p>
        </Card>

        <Button onClick={handleViewAllTasks}>View All Tasks</Button> {/* Attach click handler */}
      </WidgetRow>
    </Container>
  );
};

export default EmployeeDash;
