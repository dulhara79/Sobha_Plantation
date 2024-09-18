import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"; // Import SearchIcon
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useSnackbar } from "notistack";

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/attendance`)
      .then((response) => {
        if (response.data) {
          setAttendanceRecords(response.data); // Adjust based on the actual response
        } else {
          setAttendanceRecords([]); // Fallback in case of unexpected data structure
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAttendanceRecords([]); // Set empty array on error
        setLoading(false);
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

  const handleDownloadPDF = () => {
    if (
      !startDate ||
      !endDate ||
      !employeeName ||
      employeeName === "Select Employee"
    ) {
      enqueueSnackbar(" Please select all required fields", {
        variant: "error",
      });
      return;
    }

    const filteredRecords = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.e_date);
      const dateRange =
        recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
      const selectedEmployee =
        employeeName === "All Employees" || record.e_name === employeeName;
      return dateRange && selectedEmployee;
    });

    const doc = new jsPDF();
    doc.text(`Attendance Report`, 10, 10);
    doc.text(`From ${startDate} To ${endDate}`, 10, 20);
    doc.text(`Employee :  ${employeeName}`, 10, 30);

    const headers = ["Employee Name", "Date", "Status"];
    const tableData = [headers];

    filteredRecords.forEach((record) => {
      const rowData = [record.e_name, record.e_date, record.att_status];
      tableData.push(rowData);
    });

    doc.autoTable({
      head: [headers],
      body: tableData.slice(1),
      startY: 40,
      styles: { overflow: "linebreak", columnWidth: "wrap" },
      theme: "striped",
    });

    doc.save("Attendance_report.pdf");
  };

  const filteredRecords =
    attendanceRecords && attendanceRecords.length > 0
      ? attendanceRecords.filter((record) =>
          Object.values(record).some((value) => {
            if (typeof value === "string" || typeof value === "number") {
              return String(value)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            }
            return false;
          })
        )
      : [];

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
            className="border border-gray-300 rounded-full px-6 py-1.5 pl-10" // Adjust padding to accommodate icon
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

      <div className="flex flex-row justify-between items-center px-8 py-2 mb-4 ">
        <div>
          <label className="text-sm mr-2">Employee Name:</label>
          <select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="rounded-lg border border-gray-300 px-6.5 py-1"
          >
            <option>Select Employee</option>
            <option value="All Employees">All Employees</option>
            <option value="Amal Subasinghe">Amal Subasinghe</option>
            <option value="Hemapala Kuruvita">Hemapala Kuruvita</option>
            <option value="Kamani Hewage">Kamani Hewage</option>
            <option value="Chatura Pahathgama">Chatura Pahathgama</option>
            <option value="Thushari Liyanagama">Thushari Liyanagama</option>
            <option value="Senanai Rathnapitiya">Senanai Rathnapitiya</option>
            <option value="Ajith Nanayakkara">Ajith Nanayakkara</option>
            <option value="Sumeda Pathirana">Sumeda Pathirana</option>
            <option value="Nimal Anandha">Nimal Anandha</option>
            <option value="Priyantha Perera">Priyantha Perera</option>
            <option value="Sarath Jayasekara">Sarath Jayasekara</option>
            <option value="Sasiru Gamalath">Sasiru Gamalath</option>
            <option value="Jeewani Liyanage">Jeewani Liyanage</option>
            <option value="Nayanakantha Jayamaha">Nayanakantha Jayamaha</option>
            <option value="Muditha Ranasinghe">Muditha Ranasinghe</option>
            <option value="Rohitha Rathnayaka">Rohitha Rathnayaka</option>
            <option value="Manjula Sooriyaarachi">Manjula Sooriyaarachi</option>
            <option value="Wasantha Kalubowila">Wasantha Kalubowila</option>
            <option value="Nadeeka Wijethunga">Nadeeka Wijethunga</option>
            <option value="Praboth Athuraliya">Praboth Athuraliya</option>
            <option value="Lalith Karunasiri">Lalith Karunasiri</option>
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
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>

          <tbody className="border-b border-green-400">
            {filteredRecords.map((record, index) => (
              <tr key={index} className="divide-y border-l-4">
                <td></td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4">{record.date.split("T")[0]}</td>
                <td className="px-6 py-4">{record.status}</td>

                <td className=" py-4 text-right">
                  <Link
                    to={`/employee/viewattendance/${record._id}`} // Corrected route
                    className="font-medium text-blue-600  hover:underline"
                  >
                    <InformationCircleIcon
                      className="h-6 w-6 flex-none bg-gray-300 p-1 rounded-full text-gray-800 hover:bg-gray-500"
                      aria-hidden="true"
                    />
                  </Link>
                </td>

                <td className="py-4 text-right">
                  <button
                    className="flex items-center"
                    onClick={() => handleDelete(record._id)}
                  >
                    <TrashIcon
                      className="h-6 w-6 flex-none bg-red-200 p-1 rounded-full text-gray-800 hover:bg-red-500"
                      aria-hidden="true"
                    />
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
