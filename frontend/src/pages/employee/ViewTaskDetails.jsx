import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Breadcrumbs from "../../components/Employee/Breadcrumbss";

export default function ViewTaskDetails() {

    const breadcrumbItems = [
        { name: 'Employees', href: '/employees/home' },
        { name: 'Assign Tasks', href: '/employees/tasks' },
        { name: 'View Task Details', href: '/employees/tasks/viewTask' },
    ];

    const [TaskRecords, setTaskRecord] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/api/taskRecords/${id}`)
            .then((response) => {
                setTaskRecord(response.data);
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
                pdf.text("Task Details", 10, position);
                heightLeft -= position + 10;

                pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
                heightLeft -= imgHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
                    heightLeft -= imgHeight;
                }

                pdf.save('Task_Details.pdf');
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
                        <h3 className="text-base font-semibold leading-7 text-black-900">Task Details</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">All details of the given task.</p>
                    </div>
                    <div id="print-area">
                        <div className="mt-6 border-t border-gray-100">
                            {/* Adjusted to create two-column layout */}
                            <dl className="divide-y divide-gray-200 grid grid-cols-2 sm:grid-cols-2 gap-4">
                                <div className="px-4 py-6">
                                    <dt className="text-sm font-medium leading-6 text-black">Employee Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.emp_name}</dd>
                                </div>

                                <div className="px-4 py-6">
                                    <dt className="text-sm font-medium leading-6 text-black">Task</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.task}</dd>
                                </div>

                                <div className="px-4 py-6">
                                    <dt className="text-sm font-medium leading-6 text-black">Assign Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.assign_date}</dd>
                                </div>

                                <div className="px-4 py-6">
                                    <dt className="text-sm font-medium leading-6 text-black">Due Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.due_date}</dd>
                                </div>

                                <div className="px-4 py-6">
                                    <dt className="text-sm font-medium leading-6 text-black">Status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.task_status}</dd>
                                </div>

                                {/* Added Task Description into a new column */}
                                <div className="px-4 py-6 sm:col-span-2">
                                    <dt className="text-sm font-medium leading-6 text-black">Task Description</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700">{TaskRecords.task_des}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            onClick={handlePrint}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Print
                        </button>
                        <button
                            type="button" className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
