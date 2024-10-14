import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  faUsers,
  faUserTie,
  faCheckCircle,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "../../components/Employee/PieChartComponent";
import DateTimeDisplay from "../../components/Employee/DateTimeDisplay";

// Styled Components (unchanged)
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
  margin-bottom: 40px;
  position: relative;
`;

const Card = styled.div`
  background-color: #61b356;
  color: white;
  width: 490px;
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

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const EmployeeDash = () => {
  const [taskRecords, setTaskRecords] = useState([]);
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalEmployees: 0,
    permanentEmployees: 0,
    completedTasks: 0,
    totalTasks: 0,
  });
  const navigate = useNavigate();

  const handleViewAllTasks = () => {
    navigate("/employee/TaskListview");
  };

  const handleViewAllEmployees = () => {
    navigate("/employee/employeelist");
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`http://localhost:5000/api/taskRecords`),
      axios.get(`http://localhost:5000/api/employee`),
    ])
      .then(([taskResponse, employeeResponse]) => {
        if (taskResponse.data && Array.isArray(taskResponse.data.data)) {
          setTaskRecords(taskResponse.data.data);
          updateTaskStats(taskResponse.data.data);
        }
        if (employeeResponse.data && Array.isArray(employeeResponse.data)) {
          setEmployeeRecords(employeeResponse.data);
          updateEmployeeStats(employeeResponse.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const updateTaskStats = (tasks) => {
    const completedTasks = tasks.filter(
      (task) => task.task_status === "Completed"
    ).length;
    setData((prevData) => ({
      ...prevData,
      completedTasks: completedTasks,
      totalTasks: tasks.length,
    }));
  };

  const updateEmployeeStats = (employees) => {
    const permanentEmployees = employees.filter(
      (employee) => employee.employeeType === "Permanent"
    ).length;
    setData((prevData) => ({
      ...prevData,
      totalEmployees: employees.length,
      permanentEmployees: permanentEmployees,
    }));
  };

  const formatPieChartData = () => {
    const employeeTypeCounts = { Permanent: 0, Contract: 0 };

    employeeRecords.forEach((employee) => {
      if (employee.employeeType in employeeTypeCounts) {
        employeeTypeCounts[employee.employeeType] += 1;
      }
    });

    return Object.entries(employeeTypeCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const formatPieChartData1 = () => {
    const statusCounts = { Completed: 0, "In Progress": 0, Pending: 0 };

    taskRecords.forEach((task) => {
      if (task.task_status in statusCounts) {
        statusCounts[task.task_status] += 1;
      }
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
     {/* Welcome message section with DateTimeDisplay */}
     <div className="flex flex-col shadow-[1px_3px_20px_2px_rgba(0,_0,_0,_0.2)] rounded-6xl bg-gray-100 p-5 max-w-full gap-5">
          <div className="flex flex-row items-center justify-between">
            <DateTimeDisplay />
            <div className="flex items-center">
              <NotificationsIcon className="text-3xl" />
            </div>
          </div>
        </div>

      {/* <h3>Welcome to the Employee Management System.</h3> */}
      {/* Pie Chart */}
      <ChartContainer>
        <PieChartComponent
          title="Employee Type Distribution"
          data={formatPieChartData()}
          loading={loading}
        />

        <PieChartComponent
          title="Task Status Distribution"
          data={formatPieChartData1()}
          loading={loading}
        />
      </ChartContainer>

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

        <Button onClick={handleViewAllTasks}>View All Tasks</Button>
      </WidgetRow>
    </Container>
  );
};

export default EmployeeDash;
