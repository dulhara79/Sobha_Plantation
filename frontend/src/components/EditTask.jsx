import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTask = () => {
    const [emp_id, setEmp_id] = useState('');
    const [task, setTask] = useState('');
    const [assign_date, setAssign_date] = useState('');
    const [due_date, setDue_date] = useState('');
    const [task_des, setTask_des] = useState('');
    const [task_status, setTask_status] = useState('');
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {id} = useParams(); // Extracting id from route parameters

    useEffect(() => {
        setLoading(true);
        axios.get(`https://Sobha_Plantation.vercel.app/taskRecords/${id}`)
            .then((response) => {

                setEmp_id(response.data.emp_id);
                setTask(response.data.task);
                setAssign_date(response.data.assign_date.split("T")[0]);
                setDue_date(response.data.due_date.split("T")[0]);
                setTask_des(response.data.task_des);
                setTask_status(response.data.task_status);
                setLoading(false);

            }).catch((error) => {
            setLoading(false);
            enqueueSnackbar('An error occurred. Please check the console.', {variant: 'error'});
            console.log(error);
        });
    }, [id]); // Adding id to dependency array


    const handleEdit = (e) => {
        e.preventDefault();
        const data = {
            emp_id,
            task,
            assign_date,
            due_date,
            task_des,
            task_status,
        };
        setLoading(true);
        axios
            .put(`https://Sobha_Plantation.vercel.app/taskRecords/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Record Update successfully', {variant: 'success'});
                navigate('/employees/tasks');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', {variant: 'error'});
                console.log(error);
            });
    };

    const handleCancel = () => {
        navigate(-1); // This will navigate back to the previous location in the history stack
    };

    return (

        <div className="pt-2">
            <div className="flex flex-col ml-80 mt-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Assign Tasks
                </h1>
            </div>
            <form className="flex flex-col items-center justify-center"  onSubmit={handleEdit}>
                <div className="space-y-12 px-0 py-16 w-6/12 ml-1">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Employee ID
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="emp_id"
                                        value={emp_id}
                                        onChange={(e) => setEmp_id(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Task
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="task"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Assign Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="assign_date"
                                        value={assign_date}
                                        onChange={(e) => setAssign_date(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Due Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={due_date}
                                        onChange={(e) => setDue_date(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>


                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Task Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="task_des"
                                        name="task_des"
                                        value={task_des}
                                        onChange={(e) => setTask_des(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Status
                                </label>
                                <select required className="w-full p-2 border rounded mb-4"
                                        name="task_status"
                                        value={task_status}
                                        onChange={(e) => setTask_status(e.target.value)}
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
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Assign Task
                        </button>

                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={handleCancel}>
                            Cancel
                        </button>

                    </div>
                </div>
            </form>
        </div>


    );

}

export default EditTask;