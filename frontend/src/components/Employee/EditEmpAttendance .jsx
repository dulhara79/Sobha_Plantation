import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

const EditEmpAttendance = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Fetch attendance whenever selectedDate changes
        fetchAttendance();
    }, [selectedDate]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/employee");
            const formattedEmployees = response.data.map((employee) => ({
                id: employee._id,
                f_name: employee.firstName,
                l_name: employee.lastName,
                emp_type: employee.emp_type,
            }));
            setEmployees(formattedEmployees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            enqueueSnackbar("Error fetching employees", { variant: "error" });
        }
    };

    const fetchAttendance = async () => {
        try {
            // Clear existing attendance data
            setAttendanceData({});
            const response = await axios.get(`http://localhost:5000/api/attendance?date=${selectedDate}`);
            console.log("Selected date: ", selectedDate);
            console.log("Attendance response: ", response.data);

            const attendanceMap = {};
            response.data.forEach(record => {
                attendanceMap[record.name] = {
                    _id: record._id,
                    status: record.status.charAt(0).toUpperCase() + record.status.slice(1).toLowerCase(),
                    date: record.date
                };
            });
            setAttendanceData(attendanceMap);
        } catch (error) {
            console.error("Error fetching attendance:", error);
            enqueueSnackbar("Error fetching attendance", { variant: "error" });
        }
    };

    const handleAttendanceChange = async (employeeName, value) => {
        const statusMap = {
            Attend: 'Attend',
            Leave: 'Leave',
        };

        try {
            const existingRecord = attendanceData[employeeName];
            if (!existingRecord) {
                throw new Error("No existing record found for this employee on this date");
            }

            const attendanceRecord = {
                name: employeeName,
                date: selectedDate,
                status: statusMap[value],
            };

            await axios.put(`http://localhost:5000/api/attendance/${existingRecord._id}`, attendanceRecord);
            setAttendanceData((prev) => ({
                ...prev,
                [employeeName]: {
                    ...existingRecord,
                    status: statusMap[value],
                },
            }));

            enqueueSnackbar('Attendance updated successfully', { variant: 'success' });
            setEditingId(null);
        } catch (error) {
            enqueueSnackbar('Error updating attendance: ' + error.message, { variant: 'error' });
            console.error('Error updating attendance:', error);
        }
    };

    const filteredRecords = employees.filter((employee) => {
        const fullName = `${employee.f_name} ${employee.l_name}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) &&
            (selectedTypeFilter === 'All Types' || employee.emp_type === selectedTypeFilter)
        );
    });

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'Attend':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Attend</span>;
            case 'Leave':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Leave</span>;
            default:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Not Recorded</span>;
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full p-4">
                <h2 className="text-lg font-semibold mb-4">Edit Attendance</h2>
                <div className="mb-4">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        className="cursor-pointer p-2 border rounded"
                    />
                </div>
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
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRecords.map((employee) => {
                                const employeeName = `${employee.f_name} ${employee.l_name}`;
                                const currentRecord = attendanceData[employeeName] || {};
                                const currentStatus = currentRecord.status || '';
                                return (
                                    <tr key={employee.id}>
                                        <td className="px-4 py-2 whitespace-nowrap">{employeeName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-center">
                                            {editingId === employee.id ? (
                                                <div className="flex justify-center space-x-4">
                                                    <label className="text-green-500">
                                                        <input
                                                            type="radio"
                                                            name={`attendance-${employee.id}`}
                                                            value="Attend"
                                                            checked={currentStatus.toLowerCase() === 'attend'}
                                                            onChange={() => handleAttendanceChange(employeeName, 'Attend')}
                                                        />{' '}
                                                        Attend
                                                    </label>
                                                    <label className="text-red-500">
                                                        <input
                                                            type="radio"
                                                            name={`attendance-${employee.id}`}
                                                            value="Leave"
                                                            checked={currentStatus.toLowerCase() === 'leave'}
                                                            onChange={() => handleAttendanceChange(employeeName, 'Leave')}
                                                        />{' '}
                                                        Leave
                                                    </label>
                                                </div>
                                            ) : (
                                                getStatusDisplay(currentStatus)
                                            )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-center">
                                            {editingId === employee.id ? (
                                                <button onClick={() => setEditingId(null)} className="text-green-600 hover:text-green-900">
                                                    <CheckIcon className="h-5 w-5" />
                                                </button>
                                            ) : (
                                                <button onClick={() => setEditingId(employee.id)} className="text-blue-600 hover:text-blue-900">
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EditEmpAttendance;
