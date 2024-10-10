import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const GetEmpAttendance = () => {
  const [employees, setEmployees] = useState([]); // Added the missing employees state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All Types");
  const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        const formattedEmployees = response.data.map((employee) => ({
          id: employee._id,
          f_name: employee.firstName, // Adjusted to fit your field names
          l_name: employee.lastName, // Adjusted to fit your field names
        }));
        setEmployees(formattedEmployees); // Using the setEmployees state
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        enqueueSnackbar("Error fetching employees", { variant: "error" });
      });
  }, []);


    const handleAttendanceChange = async (employeeName, value) => {
        // Map the value to match the backend enum ('Present', 'Absent', 'Late')
        const statusMap = {
            Attend: 'Attend',
            Leave: 'Leave',
            //halfday: 'Half Day', // Adjust this as 'Late' or another value depending on your logic
        };
    
        const updatedAttendanceData = {
            ...attendanceData,
            [employeeName]: value,
        };
    
        setAttendanceData(updatedAttendanceData);
    
        try {
            const attendanceRecord = {
                name: employeeName,  // Map to 'name' for backend
                date: selectedDate,  // Map to 'date' for backend
                status: statusMap[value],  // Map the status correctly
            };
    
            await axios.post('http://localhost:5000/api/attendance', attendanceRecord);
            enqueueSnackbar('Attendance recorded successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error recording attendance', { variant: 'error' });
            console.error('Error updating attendance:', error);
        }
    };
    
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const updatedAttendanceData = {
      ...attendanceData,
      [employeeName]: value,
    };

    setAttendanceData(updatedAttendanceData);

    try {
      const attendanceRecord = {
        name: employeeName, // Map to 'name' for backend
        date: selectedDate, // Map to 'date' for backend
        status: statusMap[value], // Map the status correctly
      };

      await axios.post(
        "http://localhost:5000/api/attendance",
        attendanceRecord
      );
      enqueueSnackbar("Attendance recorded successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error recording attendance", { variant: "error" });
      console.error("Error updating attendance:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setSelectedTypeFilter(event.target.value);
  };

  const filteredRecords = employees.filter((employee) => {
    const fullName = `${employee.f_name} ${employee.l_name}`.toLowerCase();
    return (
        <div className="flex justify-center">
            <div className="w-1/4 bg-gray-100 p-4">
                <h2 className="text-lg font-semibold mb-4">Select Date</h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="cursor-pointer p-2 w-full border rounded"
                />
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-lg font-semibold mb-4">Daily Attendance</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Employee
                                </th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Attendance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRecords.map((employee) => (
                                <tr key={`${employee.f_name} ${employee.l_name}`}>
                                    <td className="px-4 py-2 whitespace-nowrap">{`${employee.f_name} ${employee.l_name}`}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-center">
                                        <div className="flex justify-center space-x-4">
                                            <label className="text-green-500">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${employee.f_name} ${employee.l_name}`}
                                                    value="Attend"
                                                    checked={attendanceData[`${employee.f_name} ${employee.l_name}`] === 'Attend'}
                                                    onChange={() => handleAttendanceChange(`${employee.f_name} ${employee.l_name}`, 'Attend')}
                                                />{' '}
                                                Attend
                                            </label>
                                            <label className="text-red-500">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${employee.f_name} ${employee.l_name}`}
                                                    value="Leave"
                                                    checked={attendanceData[`${employee.f_name} ${employee.l_name}`] === 'Leave'}
                                                    onChange={() => handleAttendanceChange(`${employee.f_name} ${employee.l_name}`, 'Leave')}
                                                />{' '}
                                                Leave
                                            </label>
                                         {/* <label className="text-yellow-500">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${employee.f_name}-${employee.l_name}`}
                                                    value="halfday"
                                                    checked={attendanceData[`${employee.f_name}-${employee.l_name}`] === 'halfday'}
                                                    onChange={() => handleAttendanceChange(`${employee.f_name}-${employee.l_name}`, 'halfday')}
                                                />{' '}
                                                Half Day
                                            </label> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  });

  return (
    <div className="flex justify-center">
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="mb-4 text-lg font-semibold">Select Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          className="w-full p-2 border rounded cursor-pointer"
        />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="mb-4 text-lg font-semibold">Daily Attendance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Employee
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                >
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((employee) => (
                <tr key={`${employee.f_name} ${employee.l_name}`}>
                  <td className="px-4 py-2 whitespace-nowrap">{`${employee.f_name} ${employee.l_name}`}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <div className="flex justify-center space-x-4">
                      <label className="text-green-500">
                        <input
                          type="radio"
                          name={`attendance-${employee.f_name} ${employee.l_name}`}
                          value="present"
                          checked={
                            attendanceData[
                              `${employee.f_name} ${employee.l_name}`
                            ] === "present"
                          }
                          onChange={() =>
                            handleAttendanceChange(
                              `${employee.f_name} ${employee.l_name}`,
                              "present"
                            )
                          }
                        />{" "}
                        Present
                      </label>
                      <label className="text-red-500">
                        <input
                          type="radio"
                          name={`attendance-${employee.f_name} ${employee.l_name}`}
                          value="absent"
                          checked={
                            attendanceData[
                              `${employee.f_name} ${employee.l_name}`
                            ] === "absent"
                          }
                          onChange={() =>
                            handleAttendanceChange(
                              `${employee.f_name} ${employee.l_name}`,
                              "absent"
                            )
                          }
                        />{" "}
                        Absent
                      </label>
                      <label className="text-yellow-500">
                        <input
                          type="radio"
                          name={`attendance-${employee.f_name} ${employee.l_name}`}
                          value="halfday"
                          checked={
                            attendanceData[
                              `${employee.f_name} ${employee.l_name}`
                            ] === "halfday"
                          }
                          onChange={() =>
                            handleAttendanceChange(
                              `${employee.f_name} ${employee.l_name}`,
                              "halfday"
                            )
                          }
                        />{" "}
                        Half Day
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetEmpAttendance;
