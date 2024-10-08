import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  InformationCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useSnackbar } from "notistack";
import { Button, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

const EmployeeList = () => {
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [filteredEmployeeRecords, setFilteredEmployeeRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/employee`)
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

  useEffect(() => {
    getFilteredEmployeeRecords(searchQuery);
  }, [searchQuery, employeeRecords]);

  const handleDelete = (recordId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`http://localhost:5000/api/employee/${recordId}`)
          .then(() => {
            setEmployeeRecords((prevRecords) =>
              prevRecords.filter((record) => record._id !== recordId)
            );
            setFilteredEmployeeRecords((prevRecords) =>
              prevRecords.filter((record) => record._id !== recordId)
            );
            setLoading(false);
            enqueueSnackbar("Record Deleted successfully", {
              variant: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    });
  };

  const handleViewEmployee = (id) => {
    navigate(`/employee/viewemployee/${id}`);
  };

  const handleAddNewEmployee = () => {
    navigate("/employee/registration");
  };

  const handleEditEmployee = (id) => {
    navigate(`/employee/editemployee/${id}`);
  };

  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleString("en-GB");
    const doc = new jsPDF("landscape");

    // Load the logo image
    const logoUrl = '../src/assets/logo.png';
    let logoDataURL;
    try {
      logoDataURL = await getImageDataURL(logoUrl);
    } catch (error) {
      console.error('Failed to load the logo image:', error);
    }

    // Function to draw header, footer, and horizontal line
    const drawHeaderFooter = (data) => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Header with logo
      if (logoDataURL) {
        doc.addImage(logoDataURL, 'PNG', 10, 10, 40, 10);
      }
      doc.setFontSize(12);
      doc.text("Employee Details", pageWidth - 15, 15, { align: 'right' });
      doc.line(10, 25, pageWidth - 10, 25);

      // Footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
    };

    const columns = [
      { header: "First Name", dataKey: "firstName" },
      { header: "Last Name", dataKey: "lastName" },
      { header: "Date of Birth", dataKey: "dateOfBirth" },
      { header: "Gender", dataKey: "gender" },
      { header: "Contact Number", dataKey: "contactNumber" },
      { header: "Email", dataKey: "email" },
      { header: "NIC", dataKey: "nic" },
      { header: "Address", dataKey: "address" },
      { header: "Employee Type", dataKey: "employeeType" },
      { header: "Designation", dataKey: "designation" },
      { header: "Hired Date", dataKey: "hiredDate" },
      { header: "Hourly Rate", dataKey: "hourlyRate" },
    ];

    const rows = filteredEmployeeRecords.map((record) => ({
      firstName: record.firstName,
      lastName: record.lastName,
      dateOfBirth: dayjs(record.dateOfBirth).format("YYYY-MM-DD"),
      gender: record.gender,
      contactNumber: record.contactNumber,
      email: record.email,
      nic: record.nic,
      address: record.address,
      employeeType: record.employeeType,
      designation: record.designation,
      hiredDate: dayjs(record.hiredDate).format("YYYY-MM-DD"),
      hourlyRate: record.hourlyRate,
    }));

    doc.setFontSize(16);
    doc.text("Employee Details", 140, 40, null, null, "center");
    doc.setFontSize(12);
    doc.text(`As At: ${currentDate}`, 140, 50, null, null, "center");
    doc.text(`Number of Employees: ${rows.length}`, 15, 60);

    autoTable(doc, {
      columns,
      body: rows,
      startY: 70,
      theme: "grid",
      didDrawPage: drawHeaderFooter,
    });

    doc.save(`Employee-details_${currentDate}.pdf`);
  };

  const getFilteredEmployeeRecords = (searchQuery) => {
    if (Array.isArray(employeeRecords) && employeeRecords.length > 0) {
      const filtered = employeeRecords.filter((record) => {
        const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();
        const search = searchQuery.toLowerCase();

        return (
          fullName.includes(search) ||
          record.email.toLowerCase().includes(search) ||
          record.nic.toLowerCase().includes(search) ||
          record.contactNumber.includes(search) ||
          record.dateOfBirth.includes(search) ||
          record.gender.toLowerCase().includes(search) ||
          record.address.toLowerCase().includes(search) ||
          record.employeeType.toLowerCase().includes(search) ||
          record.designation.toLowerCase().includes(search) ||
          record.hiredDate.includes(search) ||
          record.hourlyRate.toString().includes(search)
        );
      });
      setFilteredEmployeeRecords(filtered);
    } else {
      setFilteredEmployeeRecords([]);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.dateOfBirth).isBefore(b.dateOfBirth),
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "NIC", dataIndex: "nic", key: "nic" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Employee Type", dataIndex: "employeeType", key: "employeeType" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    {
      title: "Hired Date",
      dataIndex: "hiredDate",
      key: "hiredDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Hourly Rate", dataIndex: "hourlyRate", key: "hourlyRate" },
    {
      title: "Info",
      key: "info",
      render: (text, record) => (
        <InformationCircleIcon
          className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => handleViewEmployee(record._id)}
        />
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <PencilIcon
          className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => handleEditEmployee(record._id)}
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <TrashIcon
          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => handleDelete(record._id)}
        />
      ),
    },
  ];

  const breadcrumbItems = [
    { name: "Employees", href: "/employees/home" },
    { name: "Registration", href: "/employees/registration" },
  ];

  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-[300px]">
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="ml-[40px]">
          <div className="employee-list">
            <div className="content">
              <h1 className="text-lg font-semibold text-left">
                Employee Details
              </h1>
              <p className="mt-1 text-sm font-normal text-gray-500">
                Easily access stored employee details within the system for
                thorough insights.
              </p>

              <div className="flex justify-between mb-4">
                <div className="search-bar">
                  <Input
                    type="text"
                    placeholder="Search by name, email, NIC, or contact number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 300 }}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="primary" onClick={handleAddNewEmployee}>
                    Add New Employee
                  </Button>
                  <Button type="primary" onClick={generateReport}>
                    Generate Report
                  </Button>
                </div>
              </div>

              <Table
                id="employee-table"
                columns={columns}
                dataSource={filteredEmployeeRecords}
                loading={loading}
                rowKey={(record) => record._id}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;