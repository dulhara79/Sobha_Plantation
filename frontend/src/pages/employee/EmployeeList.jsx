import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { InformationCircleIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { useSnackbar } from "notistack";
import { DatePicker, Select, Button, Table } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import EmployeeNavbar from '../../components/Employee/EmployeeNavbar';
const { RangePicker } = DatePicker;
const { Option } = Select;

const EmployeeList = () => {
    const [employeeRecords, setEmployeeRecords] = useState([]);
    const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');
    const [dateRange, setDateRange] = useState([null, null]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    // Define employee types
    const employeeTypes = ['Full-Time', 'Part-Time', 'Contract']; // Example types

    // Fetch employee data
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
        if (employeeRecords.length === 0) {
            enqueueSnackbar('No employee records to generate report', { variant: 'error' });
            return;
        }

        const doc = new jsPDF();
        doc.text(`Employee Report`, 10, 10);

        const headers = ["First Name", "Last Name", "Date of Birth", "Gender", "Contact Number", "Email", "NIC", "Address", "Employee Type", "Hired Date", "Hourly Rate"];
        const tableData = employeeRecords.map(record => [
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
        getFilteredEmployeeRecords(searchQuery, selectedTypeFilter, dateRange);
    };

    const handleFilterChange = (value) => {
        setSelectedTypeFilter(value);
        getFilteredEmployeeRecords(searchQuery, value, dateRange);
    };

    const handleDateChange = (dates) => {
        setDateRange(dates);
        getFilteredEmployeeRecords(searchQuery, selectedTypeFilter, dates);
    };

    const getFilteredEmployeeRecords = (searchQuery, selectedTypeFilter, dateRange) => {
        if (Array.isArray(employeeRecords) && employeeRecords.length > 0) {
            const filtered = employeeRecords.filter((record) => {
                const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();
                const hiredDate = dayjs(record.hiredDate).startOf('day');
                const [startDate, endDate] = dateRange;
                const withinDateRange = startDate && endDate ? hiredDate.isBetween(dayjs(startDate).startOf('day'), dayjs(endDate).endOf('day'), 'day', '[)') : true;

                return (
                    (fullName.includes(searchQuery.toLowerCase()) || record.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
                    (selectedTypeFilter === 'All Types' || record.employeeType === selectedTypeFilter) &&
                    withinDateRange
                );
            });
            setFilteredEmployeeRecords(filtered);
        } else {
            setFilteredEmployeeRecords([]);
        }
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            sorter: (a, b) => a.index - b.index,
        },
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
            filters: employeeTypes.map(type => ({ text: type, value: type })),
            onFilter: (value, record) => record.employeeType === value,
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

        <div className="p-8">
            <h1 className={"ml-[310px] text-lg font-semibold"}>Employee Details</h1>
            <p className={"ml-[310px] text-sm text-gray-500"}>Manage employee information and generate reports.</p>

            <div className={"ml-[310px] flex items-center my-4 space-x-4"}>
                <Select
                    defaultValue="All Types"
                    style={{ width: 120 }}
                    onChange={handleFilterChange}
                    allowClear
                >
                    <Option value="All Types">All Types</Option>
                    {employeeTypes.map(type => (
                        <Option key={type} value={type}>{type}</Option>
                    ))}
                </Select>

                        <RangePicker
                            format="YYYY-MM-DD"
                            onChange={handleDateChange}
                        />

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-r"
                    >
                        <SearchOutlined />
                    </button>
                </div>
            </div>
            <div className={`ml-[310px] overflow-x-auto`}>

                <div className={`ml-[310px] overflow-x-auto`}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: true }}
                    />

            <Button
                type="primary"
                className="mt-4"
                onClick={handleDownloadPDF}
            >
                Download PDF
            </Button>
        </div>
    </div>
    </div>
    </div>
    );
};

export default EmployeeList;
