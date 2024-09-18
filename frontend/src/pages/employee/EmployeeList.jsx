import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { InformationCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { useSnackbar } from "notistack";
import { Button, Table } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
import Breadcrumbs from '../../components/Employee/Breadcrumbss';

const EmployeeList = () => {
    const [employeeRecords, setEmployeeRecords] = useState([]);
    const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/employee`)
            .then((response) => {
                setEmployeeRecords(response.data || []);
                setFilteredEmployeeRecords(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (recordId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axios.delete(`http://localhost:5000/api/employee/${recordId}`)
                    .then(() => {
                        setEmployeeRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
                        setFilteredEmployeeRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
                        setLoading(false);
                        enqueueSnackbar('Record Deleted successfully', { variant: 'success' });
                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading(false);
                    });
            }
        });
    };

    const handleDownloadPDF = () => {
        if (filteredEmployeeRecords.length === 0) {
            enqueueSnackbar('No employee records to generate report', { variant: 'error' });
            return;
        }

        const doc = new jsPDF();
        doc.text(`Employee Report`, 10, 10);

        const headers = ["First Name", "Last Name", "Date of Birth", "Gender", "Contact Number", "Email", "NIC", "Address", "Employee Type", "Hired Date", "Hourly Rate"];
        const tableData = filteredEmployeeRecords.map(record => [
            record.firstName,
            record.lastName,
            dayjs(record.dateOfBirth).format('YYYY-MM-DD'),
            record.gender,
            record.contactNumber,
            record.email,
            record.nic,
            record.address,
            record.employeeType,
            dayjs(record.hiredDate).format('YYYY-MM-DD'),
            record.hourlyRate
        ]);

        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: 20,
            styles: { overflow: 'linebreak', columnWidth: 'wrap' },
            theme: 'striped'
        });

        doc.save('Employee_report.pdf');
    };

    const handleSearch = () => {
        getFilteredEmployeeRecords(searchQuery);
    };

    const getFilteredEmployeeRecords = (searchQuery) => {
        if (Array.isArray(employeeRecords) && employeeRecords.length > 0) {
            const filtered = employeeRecords.filter((record) => {
                const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();

                return (
                    fullName.includes(searchQuery.toLowerCase()) ||
                    record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.contactNumber.includes(searchQuery)
                );
            });
            setFilteredEmployeeRecords(filtered);
        } else {
            setFilteredEmployeeRecords([]);
        }
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (text) => dayjs(text).format('YYYY-MM-DD'),
            sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Employee Type',
            dataIndex: 'employeeType',
            key: 'employeeType',
        },
        {
            title: 'Hired Date',
            dataIndex: 'hiredDate',
            key: 'hiredDate',
            render: (text) => dayjs(text).format('YYYY-MM-DD'),
            sorter: (a, b) => new Date(a.hiredDate) - new Date(b.hiredDate),
        },
        {
            title: 'Hourly Rate',
            dataIndex: 'hourlyRate',
            key: 'hourlyRate',
            sorter: (a, b) => a.hourlyRate - b.hourlyRate,
        },
        {
            title: 'Info',
            key: 'info',
            render: (text, record) => (
                <InformationCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            ),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <PencilIcon className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700" />
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <TrashIcon
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(record._id)}
                />
            ),
        }
    ];

    const dataSource = filteredEmployeeRecords.map(record => ({ ...record, key: record._id }));
    const breadcrumbItems = [
        { name: 'Employees', href: '/employees/home' },
        { name: 'Registration', href: '/employees/registration' },
    ];


    return (
        <div className="">
            <Header />
            <Sidebar />
            <div className="ml-[300px] ">
           
                <EmployeeNavbar />
                <Breadcrumbs items={breadcrumbItems} />
                <div className="p-8 ">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-semibold">Employee Details</h1>
                        <Link to="/employee/registration">
                            <Button type="primary">Add New Employee</Button>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500">Manage employee information and generate reports.</p>

                    <div className="flex items-center my-4 gap-2">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="border rounded-md p-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={handleDownloadPDF}
                            icon={<DownOutlined />}
                        >
                            Export PDF
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        pagination={{ pageSize: 8 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
