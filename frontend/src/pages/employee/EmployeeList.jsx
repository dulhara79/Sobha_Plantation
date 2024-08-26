import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    PencilSquareIcon,
    TrashIcon,
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { StyleSheet } from '@react-pdf/renderer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import EmployeeNavbar from '../../components/EmployeeNavbar';
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const pdfStyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

const EmployeeList = () => {
    const [RegistrationRecords, setRegistrationRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
    const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/api/employee`)
            .then((response) => {
                setRegistrationRecords(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const getFilteredEmployeeRecords = (searchQuery, selectedTypeFilter) => {
        const filtered = RegistrationRecords.filter((record) => {
            const fullName = `${record.f_name} ${record.l_name}`.toLowerCase();
            return (
                fullName.includes(searchQuery.toLowerCase()) &&
                (selectedTypeFilter === 'All Types' || record.emp_type === selectedTypeFilter)
            );
        });
        setFilteredEmployeeRecords(filtered);
    };

    useEffect(() => {
        getFilteredEmployeeRecords(searchQuery, selectedTypeFilter);
    }, [searchQuery, selectedTypeFilter]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this registration record?');
        if (confirmDelete) {
            setLoading(true);
            axios
                .delete(`http://localhost:5000/api/employee${id}`)
                .then(() => {
                    setRegistrationRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
                    setLoading(false);
                    enqueueSnackbar('Record Deleted successfully', { variant: 'success' });
                })
                .catch((error) => {
                    console.log(error);
                    // Handle error
                });
        }
    };

    const filteredRecords = RegistrationRecords.filter((record) =>
        Object.values(record).some((value) => {
            if (typeof value === 'string' || typeof value === 'number') {
                return String(value).toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        }) && (selectedTypeFilter === 'All Types' || record.emp_type === selectedTypeFilter)
    );

    const employeeTypes = [...new Set(RegistrationRecords.map((record) => record.emp_type))];

    const generatePDF = () => {
        const input = document.getElementById('registration-table');
        if (input) {
            const currentDate = new Date().toLocaleString('en-GB');

            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('l', 'mm', 'a3');

                    const recordCount = filteredRecords.length;
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const textWidth =
                        pdf.getStringUnitWidth('Employee Details') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                    const centerPosition = (pageWidth - textWidth) / 2;

                    pdf.setFontSize(16);
                    pdf.text('Employee Details', centerPosition, 10);
                    pdf.setFontSize(12);
                    pdf.text(`As At: ${currentDate}`, centerPosition, 20);

                    pdf.text(`Number of Employees: ${recordCount}`, 10, 40);

                    pdf.autoTable({
                        html: '#registration-table',
                        startY: 70,
                        theme: 'grid',
                    });

                    pdf.save(`Employee-details_generatedAt_${currentDate}.pdf`);
                })
                .catch((error) => {
                    console.error('Error generating PDF:', error);
                });
        } else {
            console.error('Table element not found');
        }
    };

    function getBorderColorClass(emp_type) {
        return subtypeBorderColorMap[emp_type] || 'border-gray-200';
    }

    const subtypeBorderColorMap = {
        permanent: 'border-cyan-400',
        contract: 'border-yellow-400',
        trainee: 'border-red-400',
        seasonal: 'border-purple-400',
        casual: 'border-lime-400',
    };

    return (
        <div className="">
            <Header/>
            <Sidebar/>
            <div className={`ml-[300px]`}>
            <Breadcrumb
          items={[
              {
                  href: "",
                  title: <HomeOutlined />,
                },
            ]}
        />
            <EmployeeNavbar className="" />
        </div>
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h1 className={`ml-[310px] text-lg font-semibold text-left`}>Employee Details</h1>
                    <p className={`ml-[310px] mt-1 text-sm font-normal text-gray-500`}>Easily access stored employee details within the system for thorough insights.</p>
                    <div className={`ml-[310px] py-4 relative`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="text-gray-500 h-4 w-4"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search all employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm pl-8"
                            style={{paddingRight: '2.5rem'}}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedTypeFilter}
                        onChange={(e) => setSelectedTypeFilter(e.target.value)}
                        className="appearance-none rounded-full bg-white px-7 py-1.5 text-sm text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <option value="All Types">All Types</option>
                        {employeeTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <Link to="/employee/registration"
                        className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                        Add new employee <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <button
                        onClick={generatePDF}
                        className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                        Generate Report
                    </button>
                </div>
            </div>

            <div className={`ml-[310px] overflow-x-auto`}>
                <table id="registration-table" className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                        <tr>
                            <th></th>
                            <th scope="col" className="px-6 py-3">No</th>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">DOB</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                            <th scope="col" className="px-6 py-3">Contact No</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">NIC</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Employee type</th>
                            <th scope="col" className="px-6 py-3">Work Qualifications</th>
                            <th scope="col" className="px-6 py-3">Hired Date</th>
                            <th scope="col" className="px-6 py-3">Hourly Rate</th>
                            <th scope="col" className="py-3">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record, index) => (
                            <tr key={record._id} className={`ml-[300px] bg-white border-b border-l-4 ${getBorderColorClass(record.emp_type)}`}>
                                <td className="py-3">
                                    <InformationCircleIcon
                                        className="h-5 w-5 text-gray-500 hover:text-cyan-500 cursor-pointer"
                                        onClick={() => alert(JSON.stringify(record, null, 2))}
                                    />
                                </td>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{record.f_name}</td>
                                <td className="px-6 py-4">{record.l_name}</td>
                                <td className="px-6 py-4">{record.dob}</td>
                                <td className="px-6 py-4">{record.gender}</td>
                                <td className="px-6 py-4">{record.contact_no}</td>
                                <td className="px-6 py-4">{record.email}</td>
                                <td className="px-6 py-4">{record.nic}</td>
                                <td className="px-6 py-4">{record.address}</td>
                                <td className="px-6 py-4">{record.emp_type}</td>
                                <td className="px-6 py-4">{record.work_qualifications}</td>
                                <td className="px-6 py-4">{record.hired_date}</td>
                                <td className="px-6 py-4">{record.hourly_rate}</td>
                                <td className="py-3">
                                    <Link to={`/employees/registration/updateEmployee/${record._id}`}>
                                        <PencilSquareIcon className="h-5 w-5 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                                    </Link>
                                </td>
                                <td className="py-3">
                                    <TrashIcon
                                        className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer"
                                        onClick={() => handleDelete(record._id)}
                                    />
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
