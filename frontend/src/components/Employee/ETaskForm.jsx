import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';  // Import SweetAlert

const ETaskForm = () => {
    const [emp_id, setEmp_id] = useState('');
    const [task, setTask] = useState('');
    const [assign_date, setAssign_date] = useState('');
    const [due_date, setDue_date] = useState('');
    const [task_des, setTask_des] = useState('');
    const [task_status, setTask_status] = useState('');
    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState({
        task: '',
        assign_date: '',
        due_date: '',
        task_des: '',
        task_status: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/employee')
            .then(response => {
                const formattedEmployees = response.data.map(employee => ({
                    id: employee._id,
                    name: `${employee.firstName} ${employee.lastName}`
                }));
                setEmployees(formattedEmployees);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                enqueueSnackbar('Error fetching employees', { variant: 'error' });
            });
    }, []);

    useEffect(() => {
        validateForm();
    }, [task, assign_date, due_date, task_des, task_status]);

    const validateForm = () => {
        let valid = true;
        let newErrors = { ...errors };

        // Validate task
        if (!/^[a-zA-Z\s]*$/.test(task)) {
            newErrors.task = 'Task must only contain letters.';
            valid = false;
        } else {
            newErrors.task = '';
        }

        // Validate assign_date and due_date
        if (assign_date && due_date && new Date(due_date) <= new Date(assign_date)) {
            newErrors.due_date = 'Due date must be later than the assign date.';
            valid = false;
        } else {
            newErrors.due_date = '';
        }

        // Check if all required fields are filled
        if (!emp_id || !task || !assign_date || !due_date || !task_des || !task_status) {
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // SweetAlert confirmation
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit this form?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit it!",
            cancelButtonText: "No, cancel!",
        });

        if (result.isConfirmed) {
            if (validateForm()) {
                setIsSubmitting(true);
                const data = {
                    emp_id,
                    task,
                    assign_date,
                    due_date,
                    task_des,
                    task_status,
                };
                axios
                    .post('http://localhost:5000/api/taskRecords', data)
                    .then(() => {
                        enqueueSnackbar('Record Created successfully', { variant: 'success' });
                        navigate('/employees/tasks', { state: { highlighted: true } });
                    })
                    .catch((error) => {
                        enqueueSnackbar('Error creating record', { variant: 'error' });
                        console.error(error);
                    })
                    .finally(() => {
                        setIsSubmitting(false);
                    });
            }
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleViewAllTasks = () => {
        navigate('/employee/TaskListview');
    };

    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];  // Returns date in 'YYYY-MM-DD' format
    };

    return (
        <div className="pt-2">
            <div className="flex justify-between items-center ml-80 mt-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Assign Tasks
                </h1>
                <button
                    onClick={handleViewAllTasks}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-60"
                >
                    View All Tasks
                </button>
            </div>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="space-y-12 px-0 py-16 w-6/12 ml-1">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Employee Name
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="emp_id"
                                        value={emp_id}
                                        onChange={(e) => setEmp_id(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <option value="">Select an employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.id}>
                                                {employee.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="task"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.task ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.task && <p className="text-red-500 text-sm">{errors.task}</p>}
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Assign Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="assign_date"
                                        value={assign_date}
                                        min={getTodayDate()}  // Set minimum date to today
                                        onChange={(e) => setAssign_date(e.target.value)}
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.assign_date ? 'border-red-500' : ''}`}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Due Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={due_date}
                                        min={assign_date || getTodayDate()}  // Set minimum date to assign_date or today
                                        onChange={(e) => setDue_date(e.target.value)}
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.due_date ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date}</p>}
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="task_des"
                                        value={task_des}
                                        onChange={(e) => setTask_des(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task Status
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="task_status"
                                        value={task_status}
                                        onChange={(e) => setTask_status(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <option value="">Select status</option>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ETaskForm;
