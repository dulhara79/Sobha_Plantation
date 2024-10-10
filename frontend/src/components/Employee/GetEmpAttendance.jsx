import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const GetEmpAttendance = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
    const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/employee")
            .then((response) => {
                const formattedEmployees = response.data.map((employee) => ({
                    id: employee._id,
                    f_name: employee.firstName,
                    l_name: employee.lastName,
                }));
                setEmployees(formattedEmployees);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                enqueueSnackbar("Error fetching employees", { variant: "error" });
            });
    }, []);

    const handleAttendanceChange = async (employeeName, value) => {
        const statusMap = {
            Attend: 'Attend',
            Leave: 'Leave',
        };
    
        const updatedAttendanceData = {
            ...attendanceData,
            [employeeName]: value,
        };
    
        setAttendanceData(updatedAttendanceData);
    
        try {
            const attendanceRecord = {
                name: employeeName,
                date: selectedDate,
                status: statusMap[value],
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

    const handleTypeFilterChange = (event) => {
        setSelectedTypeFilter(event.target.value);
    };

    const filteredRecords = employees.filter((employee) => {
        const fullName = `${employee.f_name} ${employee.l_name}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) &&
            (selectedTypeFilter === 'All Types' || employee.emp_type === selectedTypeFilter)
        );
    });

    return (
        <div className="flex justify-center">
            <div className="w-1/4 p-4 bg-gray-100">
                <h2 className="mb-4 text-lg font-semibold">Current Date</h2>
                <input
                    type="date"
                    value={selectedDate}
                    readOnly
                    className="w-full p-2 bg-gray-200 border rounded cursor-not-allowed"
                />
            </div>
            <div className="w-3/4 p-4">
                <h2 className="mb-4 text-lg font-semibold">Daily Attendance</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Employee
                                </th>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
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