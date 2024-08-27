// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { InformationCircleIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { Link } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { useSnackbar } from "notistack";

// const EmployeeList = () => {
//     const [RegistrationRecords, setRegistrationRecords] = useState([]); // Initialized as an empty array
//     const [employeeRecords, setEmployeeRecords] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const { enqueueSnackbar } = useSnackbar();
//     const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);
//     const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');

//     // Fetch employee data
//     useEffect(() => {
//         setLoading(true);
//         axios
//             .get(`http://localhost:5000/api/employee`)
//             .then((response) => {
//                 setRegistrationRecords(response.data.data); // Ensure data is set correctly
//                 setEmployeeRecords(response.data.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleDelete = (recordId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this employee record?");
//         if (confirmDelete) {
//             setLoading(true);
//             axios
//                 .delete(`http://localhost:5000/api/employee/${recordId}`)
//                 .then(() => {
//                     setRegistrationRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
//                     setLoading(false);
//                     enqueueSnackbar('Record Deleted successfully', { variant: 'success' });
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }
//     };

//     const handleDownloadPDF = () => {
//         if (employeeRecords.length === 0) {
//             enqueueSnackbar('No employee records to generate report', { variant: 'error' });
//             return;
//         }

//         const doc = new jsPDF();
//         doc.text(`Employee Report`, 10, 10);

//         const headers = ["First Name", "Last Name", "Date of Birth", "Gender", "Contact Number", "Email", "NIC", "Address", "Employee Type", "Hired Date", "Hourly Rate"];
//         const tableData = [headers];

//         employeeRecords.forEach(record => {
//             const rowData = [
//                 record.firstName,
//                 record.lastName,
//                 record.dateOfBirth,
//                 record.gender,
//                 record.contactNumber,
//                 record.email,
//                 record.nic,
//                 record.address,
//                 record.employeeType,
//                 record.hiredDate,
//                 record.hourlyRate
//             ];
//             tableData.push(rowData);
//         });

//         doc.autoTable({
//             head: [headers],
//             body: tableData.slice(1),
//             startY: 20,
//             styles: { overflow: 'linebreak', columnWidth: 'wrap' },
//             theme: 'striped'
//         });

//         doc.save('Employee_report.pdf');
//     };

//     const getFilteredEmployeeRecords = (searchQuery, selectedTypeFilter) => {
//         // Add check if RegistrationRecords is an array and not empty
//         if (Array.isArray(RegistrationRecords) && RegistrationRecords.length > 0) {
//             const filtered = RegistrationRecords.filter((record) => {
//                 const fullName = `${record.f_name} ${record.l_name}`.toLowerCase();
//                 return (
//                     fullName.includes(searchQuery.toLowerCase()) &&
//                     (selectedTypeFilter === 'All Types' || record.emp_type === selectedTypeFilter)
//                 );
//             });
//             setFilteredEmployeeRecords(filtered);
//         } else {
//             setFilteredEmployeeRecords([]); // Ensure state is updated with an empty array if no records
//         }
//     };

//     useEffect(() => {
//         getFilteredEmployeeRecords(searchQuery, selectedTypeFilter);
//     }, [searchQuery, selectedTypeFilter, RegistrationRecords]);

//     const filteredRecords = filteredEmployeeRecords.length > 0 ? filteredEmployeeRecords : employeeRecords;

//     const employeeTypes = Array.isArray(RegistrationRecords) ? [...new Set(RegistrationRecords.map((record) => record.emp_type))] : [];

//     return (
//         <div className="overflow-x-auto">
//             <div className="px-8 py-4">
//                 <h1 className="text-lg font-semibold">Employee Details</h1>
//                 <p className="text-sm text-gray-500">Manage employee information and generate reports.</p>
//             </div>

//             <div className="flex flex-row justify-between px-8 py-2 mb-3">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search employees..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="border border-gray-300 rounded-full px-6 py-1.5 pl-10"
//                     />
//                     <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
//                 </div>

//                 <div className="flex items-center space-x-2">
//                     <button onClick={handleDownloadPDF}
//                         className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50">
//                         Generate Report
//                     </button>
//                     <Link to="/employees/add"
//                         className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50">
//                         Add Employee <span aria-hidden="true">&rarr;</span>
//                     </Link>
//                 </div>
//             </div>

//             <div id="print-area">
//                 <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-l-4 border-gray-500 shadow-md">
//                         <tr>
//                             <th></th>
//                             <th scope="col" className="px-6 py-3">No</th>
//                             <th scope="col" className="px-6 py-3">First Name</th>
//                             <th scope="col" className="px-6 py-3">Last Name</th>
//                             <th scope="col" className="px-6 py-3">Date of Birth</th>
//                             <th scope="col" className="px-6 py-3">Gender</th>
//                             <th scope="col" className="px-6 py-3">Contact Number</th>
//                             <th scope="col" className="px-6 py-3">Email</th>
//                             <th scope="col" className="px-6 py-3">NIC</th>
//                             <th scope="col" className="px-6 py-3">Address</th>
//                             <th scope="col" className="px-6 py-3">Employee Type</th>
//                             <th scope="col" className="px-6 py-3">Hired Date</th>
//                             <th scope="col" className="px-6 py-3">Hourly Rate</th>
//                             <th scope="col" className="py-3"><span className="sr-only">Info</span></th>
//                             <th scope="col" className="py-3"><span className="sr-only">Delete</span></th>
//                         </tr>
//                     </thead>

//                     <tbody className="border-b border-green-400">
//                         {filteredRecords.map((record, index) => (
//                             <tr key={index} className="border-l-4 divide-y">
//                                 <td></td>
//                                 <td className="px-6 py-4">{index + 1}</td>
//                                 <td className="px-6 py-4">{record.firstName}</td>
//                                 <td className="px-6 py-4">{record.lastName}</td>
//                                 <td className="px-6 py-4">{record.dateOfBirth.split("T")[0]}</td>
//                                 <td className="px-6 py-4">{record.gender}</td>
//                                 <td className="px-6 py-4">{record.contactNumber}</td>
//                                 <td className="px-6 py-4">{record.email}</td>
//                                 <td className="px-6 py-4">{record.nic}</td>
//                                 <td className="px-6 py-4">{record.address}</td>
//                                 <td className="px-6 py-4">{record.employeeType}</td>
//                                 <td className="px-6 py-4">{record.hiredDate.split("T")[0]}</td>
//                                 <td className="px-6 py-4">{record.hourlyRate}</td>
//                                 <td className="px-6 py-4">
//                                     <Link to={`/employees/${record._id}`}><InformationCircleIcon className="w-6 h-6 text-gray-600 hover:text-blue-500" /></Link>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <button onClick={() => handleDelete(record._id)}><TrashIcon className="w-6 h-6 text-red-600 hover:text-red-800" /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default EmployeeList;
