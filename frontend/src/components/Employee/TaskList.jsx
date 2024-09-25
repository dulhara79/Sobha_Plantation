import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  PencilSquareIcon,
  TrashIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { StyleSheet } from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { FaBan, FaCheck, FaHourglassStart, FaTools } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const TaskList = () => {
  const [TaskRecords, setTaskRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/taskRecords`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setTaskRecords(response.data.data);
        } else {
          console.error("Unexpected response structure:", response.data);
          console.log(typeof response.data);
          console.log(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with an error:", error.response);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        setLoading(false);
      });
  }, []);

  const handleDelete = (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task record?"
    );
    if (confirmDelete) {
      setLoading(true);
      axios
        .delete(`http://localhost:5000/api/taskRecords/${recordId}`)
        .then(() => {
          setTaskRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== recordId)
          );
          setLoading(false);
          enqueueSnackbar("Record Deleted successfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
          enqueueSnackbar("Failed to delete the record", { variant: "error" });
          setLoading(false);
        });
    }
  };

  const filteredRecords = TaskRecords.filter((record) =>
    Object.values(record).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        // Convert value to string and check if it includes the search query
        return String(value)
          .toLowerCase()
          .includes((searchQuery || "").toLowerCase());
      }
      return false;
    })
  );

  const generatePDF = () => {
    const input = document.getElementById("task-table");
    if (input) {
      const currentDate = new Date().toLocaleString("en-GB");

      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "mm", "a3");

          const recordCount = filteredRecords.length;
          const pageWidth = pdf.internal.pageSize.getWidth();
          const textWidth =
            (pdf.getStringUnitWidth("Task Details") *
              pdf.internal.getFontSize()) /
            pdf.internal.scaleFactor;
          const centerPosition = (pageWidth - textWidth) / 2;

          pdf.setFontSize(16);
          pdf.text("Task Details", centerPosition, 10);
          pdf.setFontSize(12);
          pdf.text(`As At: ${currentDate}`, centerPosition, 20);

          pdf.text(`Number of Tasks: ${recordCount}`, 10, 40);

          pdf.autoTable({
            html: "#task-table",
            startY: 70,
            theme: "grid",
          });

          pdf.save(`task-details_generatedAt_${currentDate}.pdf`);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else {
      console.error("Table element not found");
    }
  };

  const subtypeBorderColorMap = {
    pending: "border-lime-400",
    inprogress: "border-green-400",
    completed: "border-blue-400",
    onhold: "border-cyan-400",
    cancelled: "border-red-400",
  };

  function getBorderColorClass(task_status) {
    return subtypeBorderColorMap[task_status] || "border-gray-200"; // Default color
  }

  return (
    <div className="overflow-x-auto ">
      <div className="flex flex-row items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-lg font-semibold text-left ">Task Details</h1>
          <p className="mt-1 text-sm font-normal text-gray-500 0">
            Easily access stored task details within the system for thorough
            insights.
          </p>
          <div className="relative py-4 ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search all Tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm pl-10"
              style={{ paddingRight: "2.5rem" }}
            />
          </div>
        </div>

        <div>
          <Link
            to="/employee/task"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Add new task <span aria-hidden="true">&rarr;</span>
          </Link>
          <button
            onClick={generatePDF}
            className="ml-4 flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Generate Report
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-row bg-gray-200 h-30">
          <button
            value="pending"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="flex-grow overflow-hidden bg-yellow-100 flex flex-col justify-between items-center hover:w-[20%] hover:h-[105%] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center content-center justify-between h-full pt-4 pb-4 align-middle">
              <div className="w-8 h-8">
                <FaHourglassStart />
              </div>
              <dd className="text-xl font-semibold text-gray-900">Pending</dd>
            </div>
          </button>
          <button
            value="inprogress"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="flex-grow overflow-hidden bg-green-100 flex justify-center items-center hover:w-[20%] hover:h-[105%] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center content-center justify-between h-full pt-4 pb-4 align-middle ">
              <div className="w-8 h-8">
                <FaTools />
              </div>
              <div className="text-xl font-semibold text-gray-900">
                In Progress
              </div>
            </div>
          </button>
          <button
            value="completed"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="flex-grow overflow-hidden bg-blue-100 flex justify-center items-center hover:w-[20%] hover:h-[105%] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center content-center justify-between h-full pt-4 pb-4 align-middle ">
              <div className="w-8 h-8">
                <FaCheck />
              </div>
              <div className="text-xl font-semibold text-gray-900">
                Completed
              </div>
            </div>
          </button>
          <button
            value="onhold"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="flex-grow overflow-hidden bg-purple-100 flex justify-center items-center hover:w-[20%] hover:h-[105%] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center content-center justify-between h-full pt-4 pb-4 align-middle ">
              <div className="w-8 h-8">
                <GiPauseButton />
              </div>
              <div className="text-xl font-semibold text-gray-900">On Hold</div>
            </div>
          </button>
          <button
            value="cancelled"
            onClick={(e) => setSearchQuery(e.target.value)}
            className="flex-grow overflow-hidden bg-red-100 flex justify-center items-center hover:w-[20%] hover:h-[105%] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center content-center justify-between h-full pt-4 pb-4 align-middle ">
              <div className="w-8 h-8">
                <FaBan />
              </div>
              <div className="text-xl font-semibold text-gray-900">
                Cancelled
              </div>
            </div>
          </button>
        </div>
      </div>
      <br /> <br />
      <div className="overflow-x-auto">
        <table
          id="task-table"
          className="w-full text-sm text-left text-gray-500 rtl:text-right "
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-l-4 border-gray-500 shadow-md ">
            <tr className="">
              <th></th>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3">
                Assign Date
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Task Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="border-b border-green-400">
            {filteredRecords.map((record, index) => (
              <tr
                key={index}
                className={`divide-y border-l-4 ${getBorderColorClass(
                  record.task_status
                )}`}
              >
                <td></td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{record.emp_name}</td>
                <td className="px-6 py-4">{record.task}</td>
                <td className="px-6 py-4">
                  {record.assign_date.split("T")[0]}
                </td>
                <td className="px-6 py-4">{record.due_date.split("T")[0]}</td>
                <td className="px-6 py-4">{record.task_des}</td>
                <td className="px-6 py-4">{record.task_status}</td>

                <td className="py-4 text-right ">
                  <Link
                    to={`/employee/taskdetails/${record._id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <InformationCircleIcon
                      className="flex-none w-6 h-6 p-1 text-gray-800 bg-gray-300 rounded-full hover:bg-gray-500"
                      aria-hidden="true"
                    />
                  </Link>
                </td>
                <td className="py-4 text-right ">
                  <Link
                    to={`/employee/taskedit/${record._id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    <PencilSquareIcon
                      className="flex-none w-6 h-6 p-1 text-gray-800 bg-blue-200 rounded-full hover:bg-blue-500"
                      aria-hidden="true"
                    />
                  </Link>
                </td>

                <td className="py-4 text-right ">
                  <button
                    className="flex items-center"
                    onClick={() => handleDelete(record._id)}
                  >
                    <TrashIcon
                      className="flex-none w-6 h-6 p-1 text-gray-800 bg-red-200 rounded-full hover:bg-red-500"
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
export default TaskList;
