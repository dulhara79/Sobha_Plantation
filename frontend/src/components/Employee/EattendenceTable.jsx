import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'; 
import { useSnackbar } from "notistack";

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/attendance`)
      .then((response) => {
        if (response.data) {
          setAttendanceRecords(response.data);
        } else {
          setAttendanceRecords([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAttendanceRecords([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        const formattedEmployees = response.data.map((employee) => ({
          id: employee._id,
          name: `${employee.firstName} ${employee.lastName}`,
        }));

        setEmployees(formattedEmployees);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        enqueueSnackbar("Error fetching employees", { variant: "error" });
      });
  }, []);

  const handleDelete = (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );
    if (confirmDelete) {
      setLoading(true);
      axios
        .delete(`http://localhost:5000/api/attendance/${recordId}`)
        .then(() => {
          setAttendanceRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== recordId)
          );
          setLoading(false);
          enqueueSnackbar("Record Deleted successfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getImageDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleDownloadPDF = async () => {
    if (!startDate || !endDate || !employeeName || employeeName === "Select Employee") {
        enqueueSnackbar('Please select all required fields', { variant: 'error' });
        return;
    }

    const filteredRecords = attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        const dateRange = recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
        const selectedEmployee = employeeName === "All Employees" || record.name === employeeName;
        return dateRange && selectedEmployee;
    });

    const doc = new jsPDF();

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
      doc.setFontSize(14);
      doc.text("Sobha Plantation", 10, 10); // Align left

      doc.setFontSize(10);
      doc.text("317/23, Nikaweratiya,", 10, 15); // Address line 1
      doc.text("Kurunagala, Sri Lanka.", 10, 20); // Address line 2
      doc.text("Email: sobhaplantationsltd@gmail.com", 10, 25); // Email address line
      doc.text("Contact: 0112 751 757", 10, 30); // Contact number line

      if (logoDataURL) {
        doc.addImage(logoDataURL, 'PNG', pageWidth - 50, 10, 40, 10); // Align right (adjust the x position as needed)
      }

      doc.line(10, 35, pageWidth - 10, 35);
      
      // Footer with page number
      doc.setFontSize(10);
      doc.text(`Page ${data.pageNumber} of ${doc.internal.getNumberOfPages()}`, pageWidth - 30, pageHeight - 10);
    };

    // Add title and date range
    doc.setFontSize(12);
    doc.text(`Attendance Report`, 10, 45);
    doc.setFontSize(10);
    doc.text(`From ${startDate} To ${endDate}`, 10, 55);
    doc.text(`Employee: ${employeeName}`, 10, 65);

    const headers = ["Employee Name", "Date", "Status"];
    const tableData = filteredRecords.map(record => [
        record.name,
        record.date.split("T")[0],
        record.status
    ]);

    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 70,
        styles: { overflow: 'linebreak', columnWidth: 'wrap' },
        theme: 'grid',
        didDrawPage: drawHeaderFooter
    });

    doc.save('Attendance_report.pdf');
  }

const filteredRecords = attendanceRecords.filter((record) =>
    Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
);

  return (
    <div className="overflow-x-auto">
      <div className="px-8 py-4">
        <h1 className="text-lg font-semibold">Attendance Details</h1>
        <p className="text-sm text-gray-500">
          Quickly access employee attendance data for valuable insights and
          analysis
        </p>
      </div>

      <div className="flex flex-row justify-between  px-8 py-2 mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search attendance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-full px-6 py-1.5 pl-10"
          />
          <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
          >
            Generate Report
          </button>
          <Link
            to="/employee/attendance"
            className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
          >
            Get Attendance <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center px-8 py-2 mb-4">
        <div>
          <label className="text-sm mr-2">Employee Name:</label>
          <select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="rounded-lg border border-gray-300 px-6.5 py-1"
          >
            <option>Select Employee</option>
            <option value="All Employees">All Employees</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm mr-2">Start Date:</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-1"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm mr-2">End Date:</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-1"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div id="print-area">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
            <tr>
              <th></th>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="py-3">
                <span className="sr-only">Info</span>
              </th>
              <th scope="col" className="py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>

          <tbody className="border-b border-green-400">
            {filteredRecords.map((record, index) => (
              <tr key={index} className="divide-y border-l-4">
                <td></td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{record.name || "N/A"}</td>
                <td className="px-6 py-4">{record.date ? record.date.split("T")[0] : "N/A"}</td>
                <td className="px-6 py-4">{record.status || "N/A"}</td>

                <td className="py-4 text-right">
                  <Link
                    to={`/employee/veiwattendence/${record._id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <InformationCircleIcon
                      className="h-6 w-6 flex-none bg-gray-300 p-1 rounded-full text-gray-800 hover:bg-gray-500"
                      aria-hidden="true"
                    />
                  </Link>
                </td>
                <td className="py-4 text-right">
                  <Link to={`/employee/editattendance`}>
                    <PencilSquareIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                  </Link>
                </td>

                <td className="py-4 text-right">
                  <button className="flex items-center" onClick={() => handleDelete(record._id)}>
                    <TrashIcon className="h-6 w-6 flex-none bg-red-200 p-1 rounded-full text-gray-800 hover:bg-red-500" aria-hidden="true" />
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

export default AttendanceList;