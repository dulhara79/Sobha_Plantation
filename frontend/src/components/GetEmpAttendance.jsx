import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';


const GetEmpAttendance = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
    const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`https://elemahana-backend.vercel.app/employeeRecords`);
                const employeeRecords = response.data.data;
                setFilteredEmployeeRecords(employeeRecords);
            } catch (error) {
                console.error('Error loading employee records:', error);
            }
        };

        loadData();
    }, []);

    const handleAttendanceChange = async (employeeName, value) => {
        const updatedAttendanceData = {
            ...attendanceData,
            [employeeName]: value,
        };

        setAttendanceData(updatedAttendanceData);

        try {
            const attendanceRecord = {
                e_name: employeeName,
                e_date: selectedDate,
                att_status: value,
            };

            await axios.post('https://elemahana-backend.vercel.app/attendanceRecords', attendanceRecord);
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

    const filteredRecords = filteredEmployeeRecords.filter((employee) => {
        const fullName = `${employee.f_name} ${employee.l_name}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) &&
            (selectedTypeFilter === 'All Types' || employee.emp_type === selectedTypeFilter)
        );
    });

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
                            <tr key={`${employee.f_name}-${employee.l_name}`}>
                                <td className="px-4 py-2 whitespace-nowrap">{`${employee.f_name} ${employee.l_name}`}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-center">
                                    <div className="flex justify-center space-x-4">
                                        <label className="text-green-500">
                                            <input
                                                type="radio"
                                                name={`attendance-${employee.f_name}-${employee.l_name}`}
                                                value="present"
                                                checked={attendanceData[`${employee.f_name}-${employee.l_name}`] === 'present'}
                                                onChange={() => handleAttendanceChange(`${employee.f_name}-${employee.l_name}`, 'present')}
                                            />{' '}
                                            Present
                                        </label>
                                        <label className="text-red-500">
                                            <input
                                                type="radio"
                                                name={`attendance-${employee.f_name}-${employee.l_name}`}
                                                value="absent"
                                                checked={attendanceData[`${employee.f_name}-${employee.l_name}`] === 'absent'}
                                                onChange={() => handleAttendanceChange(`${employee.f_name}-${employee.l_name}`, 'absent')}
                                            />{' '}
                                            Absent
                                        </label>
                                        <label className="text-yellow-500">
                                            <input
                                                type="radio"
                                                name={`attendance-${employee.f_name}-${employee.l_name}`}
                                                value="halfday"
                                                checked={attendanceData[`${employee.f_name}-${employee.l_name}`] === 'halfday'}
                                                onChange={() => handleAttendanceChange(`${employee.f_name}-${employee.l_name}`, 'halfday')}
                                            />{' '}
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

