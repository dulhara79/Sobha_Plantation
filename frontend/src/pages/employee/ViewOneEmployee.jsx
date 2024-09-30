import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ViewOneEmpDetails() {
  const breadcrumbItems = [
    { name: 'Employees', href: '/employees/home' },
    { name: 'Registration', href: '/employees/registration' },
    { name: 'View Employee Details', href: '/employees/registration/viewEmployee' },
  ];

  const [RegistrationRecords, setRegistrationRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/employee/${id}`)
      .then((response) => {
        console.log(response.data);  // Check the response data
        setRegistrationRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  

  const handlePrint = () => {
    const input = document.getElementById('print-area');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth() - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
        pdf.setFontSize(20);
        pdf.text("Employee Details", 10, position);
        heightLeft -= position + 10;

        pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
        heightLeft -= imgHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
          heightLeft -= imgHeight;
        }

        pdf.save('Emp_Details.pdf');
      });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1); // This will navigate back to the previous location in the history stack
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
            <h3 className="text-base font-semibold leading-7 text-black">Employee Details</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-black">Personal details of the employee.</p>
          </div>
          <div id="print-area">
          <div className="mt-6 border-t border-black">
  <div className="grid grid-cols-2 gap-6">
    {/* Left Column */}
    <dl className="divide-y divide-black">
      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">First Name</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.firstName}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Date of Birth</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{new Date(RegistrationRecords.dateOfBirth).toLocaleDateString("en-GB")}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Contact Number</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.contactNumber}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">NIC</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.nic}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Employee Type</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.employeeType}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Hired Date</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{new Date(RegistrationRecords.hiredDate).toLocaleDateString("en-GB")}</dd>
      </div>
    </dl>

    {/* Right Column */}
    <dl className="divide-y divide-black">
      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Last Name</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.lastName}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Gender</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.gender}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Email</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.email}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Address</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.address}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Designation</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.designation}</dd>
      </div>

      <div className="px-4 py-6">
        <dt className="text-sm font-medium leading-6 text-black">Hourly Rate</dt>
        <dd className="mt-1 text-sm leading-6 text-black">{RegistrationRecords.hourlyRate}</dd>
      </div>
    </dl>
  </div>
</div>

          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handlePrint}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Print
            </button>
            <button
              type="button" className="text-sm font-semibold leading-6 text-black"
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
