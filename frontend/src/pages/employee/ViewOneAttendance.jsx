import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ViewOneAttendance() {
  const breadcrumbItems = [
    { name: "Employees", href: "/employees/home" },
    { name: "Attendance Marker", href: "/employees/attendance" },
    {
      name: "View Attendance Details",
      href: "/employees/attendance/viewAttendance",
    },
  ];

  const [AttendanceRecords, setAttendanceRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/attendance/${id}`)
      .then((response) => {
        console.log(response.data);
        setAttendanceRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (date) => {
    if (!date) return '';
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePrint = () => {
    const input = document.getElementById("print-area");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth() - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      pdf.setFontSize(20);
      pdf.text("Employee Attendance Details", 10, position);
      heightLeft -= position + 10;

      pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);
      heightLeft -= imgHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);
        heightLeft -= imgHeight;
      }

      pdf.save("Attendance_Details.pdf");
    });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <Header />
      <Sidebar />
      <div className={`ml-[300px]`}>
        <EmployeeNavbar />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="px-8 py-8">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-black-900">
              Attendance Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-black-500">
              Attendance details of the employee.
            </p>
          </div>
          <div id="print-area">
            <div className="mt-6 border-t border-black-100">
              <dl className="divide-y divide-black-200">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black-900">
                    Employee Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {AttendanceRecords.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black-900">
                    Date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatDate(AttendanceRecords.date)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black-900">
                    Attendance Status
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {AttendanceRecords.status}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black-900">
                    Record created at
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatDate(AttendanceRecords.createdAt)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black-900">
                    Record last updated at
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatDate(AttendanceRecords.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handlePrint}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Print
            </button>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-black-900"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
