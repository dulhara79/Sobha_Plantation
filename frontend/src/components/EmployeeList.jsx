import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InformationCircleIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useSnackbar } from "notistack";

const EmployeeList = () => {
    const [employeeRecords, setEmployeeRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://elemahana-backend.vercel.app/employees`)
            .then((response) => {
                setEmployeeRecords(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (recordId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee record?");
        if (confirmDelete) {
            setLoading(true);
            axios
                .delete(`https://elemahana-backend.vercel.app/employees/${recordId}`)
                .then(() => {
                    setEmployeeRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
                    setLoading(false);
                    enqueueSnackbar('Record Deleted successfully', { variant: 'success' });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleDownloadPDF = () => {
        if (employeeRecords.length === 0) {
            enqueueSnackbar('No employee records to generate report', { variant: 'error' });
            return;
        }

        const doc = new jsPDF();
        doc.text(`Employee Report`, 10, 10);

        const headers = ["First Name", "Last Name", "Date of Birth", "Gender", "Contact Number", "Email", "NIC", "Address", "Employee Type", "Hired Date", "Hourly Rate"];
        const tableData = [headers];

        employeeRecords.forEach(record => {
            const rowData = [
                record.firstName,
                record.lastName,
                record.dateOfBirth,
                record.gender,
                record.contactNumber,
                record.email,
                record.nic,
                record.address,
                record.employeeType,
                record.hiredDate,
                record.hourlyRate
            ];
            tableData.push(rowData);
        });

        doc.autoTable({
            head: [headers],
            body: tableData.slice(1),
            startY: 20,
            styles: { overflow: 'linebreak', columnWidth: 'wrap' },
            theme: 'striped'
        });

        doc.save('Employee_report.pdf');
    };

    const filteredRecords = employeeRecords.filter((record) =>
        Object.values(record).some((value) => {
            if (typeof value === 'string' || typeof value === 'number') {
                return String(value).toLowerCase().includes((searchQuery || '').toLowerCase());
            }
            return false;
        })
    );

    return (
        <div className="overflow-x-auto">
            <div className="px-8 py-4">
                <h1 className="text-lg font-semibold">Employee Details</h1>
                <p className="text-sm text-gray-500">Manage employee information and generate reports.</p>
            </div>

            <div className="flex flex-row justify-between px-8 py-2 mb-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded-full px-6 py-1.5 pl-10"
                    />
                    <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>

                <div className="flex items-center space-x-2">
                    <button onClick={handleDownloadPDF}
                        className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50">
                        Generate Report
                    </button>
                    <Link to="/employees/add"
                        className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50">
                        Add Employee <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>

            <div id="print-area">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                        <tr>
                            <th></th>
                            <th scope="col" className="px-6 py-3">No</th>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Date of Birth</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                            <th scope="col" className="px-6 py-3">Contact Number</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">NIC</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Employee Type</th>
                            <th scope="col" className="px-6 py-3">Hired Date</th>
                            <th scope="col" className="px-6 py-3">Hourly Rate</th>
                            <th scope="col" className="py-3"><span className="sr-only">Info</span></th>
                            <th scope="col" className="py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>

                    <tbody className="border-b border-green-400">
                        {filteredRecords.map((record, index) => (
                            <tr key={index} className="divide-y border-l-4">
                                <td></td>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{record.firstName}</td>
                                <td className="px-6 py-4">{record.lastName}</td>
                                <td className="px-6 py-4">{record.dateOfBirth.split("T")[0]}</td>
                                <td className="px-6 py-4">{record.gender}</td>
                                <td className="px-6 py-4">{record.contactNumber}</td>
                                <td className="px-6 py-4">{record.email}</td>
                                <td className="px-6 py-4">{record.nic}</td>
                                <td className="px-6 py-4">{record.address}</td>
                                <td className="px-6 py-4">{record.employeeType}</td>
                                <td className="px-6 py-4">{record.hiredDate.split("T")[0]}</td>
                                <td className="px-6 py-4">{record.hourlyRate}</td>

                                <td className="py-4 text-right">
                                    <Link to={`/employees/view/${record._id}`}
                                        className="font-medium text-blue-600  hover:underline">
                                        <InformationCircleIcon
                                            className="h-6 w-6 flex-none bg-gray-300 p-1 rounded-full text-gray-800 hover:bg-gray-500"
                                            aria-hidden="true" />
                                    </Link>
                                </td>

                                <td className="py-4 text-right">
                                    <button className="flex items-center" onClick={() => handleDelete(record._id)}>
                                        <TrashIcon
                                            className="h-6 w-6 flex-none bg-red-200 p-1 rounded-full text-gray-800 hover:bg-red-500"
                                            aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
