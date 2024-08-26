import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ETaskForm = () => {
    const [formData, setFormData] = useState({
        emp_id: '',
        task: '',
        assign_date: '',
        due_date: '',
        task_des: '',
        task_status: '',
    });
    const [employees, setEmployees] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // Fetch employee list when the component mounts
    useEffect(() => {
        axios.get('https://Sobha_Plantation-backend.vercel.app/employees')
            .then(response => {
                setEmployees(response.data); // Assuming response.data is an array of employees
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                enqueueSnackbar('Error fetching employees', { variant: 'error' });
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://Sobha_Plantation-backend.vercel.app/taskRecords', formData)
            .then(() => {
                enqueueSnackbar('Record Created successfully', { variant: 'success' });
                navigate('/employees/tasks', { state: { highlighted: true } });
            })
            .catch((error) => {
                enqueueSnackbar('Error', { variant: 'error' });
                console.error('Error creating task record:', error);
            });
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back
    };

    return (
        <div className="pt-2">
            <div className="flex flex-col ml-80 mt-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Assign Tasks
                </h1>
            </div>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="space-y-12 px-0 py-16 w-6/12 ml-1">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* Employee Dropdown */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Employee Name
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="emp_id"
                                        value={formData.emp_id}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <option value="">Select an employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee._id} value={employee._id}>
                                                {employee.name} {/* Adjust according to your employee object */}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Task Input */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="task"
                                        value={formData.task}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Assign Date Input */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Assign Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="assign_date"
                                        value={formData.assign_date}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Due Date Input */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Due Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={formData.due_date}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Task Description Input */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="task_des"
                                        name="task_des"
                                        value={formData.task_des}
                                        onChange={handleChange}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Task Status Input */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Status
                                </label>
                                <select
                                    name="task_status"
                                    value={formData.task_status}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                >
                                    <option value="">Select status</option>
                                    <option value="pending">Pending</option>
                                    <option value="inprogress">In progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="onhold">On hold</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    {/* Buttons for Submit and Cancel */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Assign Task
                        </button>
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ETaskForm;
