import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";

const ETaskForm = () => {
  const [emp_id, setEmp_id] = useState("");
  const [emp_name, setEmp_name] = useState("");
  const [task, setTask] = useState("");
  const [assign_date, setAssign_date] = useState("");
  const [due_date, setDue_date] = useState("");
  const [task_des, setTask_des] = useState("");
  const [task_status, setTask_status] = useState("");
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  useEffect(() => {
    validateForm();
  }, [task, assign_date, due_date, task_des, task_status]);

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!/^[a-zA-Z\s]*$/.test(task)) {
      newErrors.task = "Task must only contain letters.";
      valid = false;
    } else {
      newErrors.task = "";
    }

    if (assign_date && due_date && new Date(due_date) <= new Date(assign_date)) {
      newErrors.due_date = "Due date must be later than the assign date.";
      valid = false;
    } else {
      newErrors.due_date = "";
    }

    if (!emp_id || !task || !assign_date || !due_date || !task_des || !task_status) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          emp_name,
          task,
          assign_date,
          due_date,
          task_des,
          task_status,
        };
        try {
          await axios.post("http://localhost:5000/api/taskRecords", data);
          enqueueSnackbar("Record Created successfully", { variant: "success" });
          navigate("/employee/TaskListview", { state: { highlighted: true } });
        } catch (error) {
          enqueueSnackbar("Error creating record", { variant: "error" });
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleEmployeeChange = (e) => {
    const selectedEmpId = e.target.value;
    const selectedEmp = employees.find((emp) => emp.id === selectedEmpId);
    setEmp_id(selectedEmpId);
    setEmp_name(selectedEmp ? selectedEmp.name : "");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleViewAllTasks = () => {
    navigate("/employee/TaskListview");
  };

  // Updated helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Updated helper function to get the last day of the current year
  const getLastDayOfYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-12-31`;
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mt-6 ml-80">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-3xl">
          Assign Tasks
        </h1>
        <button
          onClick={handleViewAllTasks}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-60"
        >
          View All Tasks
        </button>
      </div>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-6/12 px-0 py-16 ml-1 space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-black">
                  Employee Name
                </label>
                <div className="mt-2">
                  <select
                    name="emp_id"
                    value={emp_id}
                    onChange={handleEmployeeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <label className="block text-sm font-medium leading-6 text-black">
                  Task
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.task ? "border-red-500" : ""
                    }`}
                    required
                    disabled={!emp_id}
                  />
                  {errors.task && (
                    <p className="text-sm text-red-500">{errors.task}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-black">
                  Assign Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="assign_date"
                    value={assign_date}
                    min={getTodayDate()}
                    max={getLastDayOfYear()}
                    onChange={(e) => setAssign_date(e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.assign_date ? "border-red-500" : ""
                    }`}
                    required
                    disabled={!task}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-black">
                  Due Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="due_date"
                    value={due_date}
                    min={assign_date || getTodayDate()}
                    max={getLastDayOfYear()}
                    onChange={(e) => setDue_date(e.target.value)}
                    className={`block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.due_date ? "border-red-500" : ""
                    }`}
                    required
                    disabled={!assign_date}
                  />
                  {errors.due_date && (
                    <p className="text-sm text-red-500">{errors.due_date}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-black">
                  Task Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="task_des"
                    value={task_des}
                    onChange={(e) => setTask_des(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={!due_date}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-black">
                  Task Status
                </label>
                <div className="mt-2">
                  <select
                    name="task_status"
                    value={task_status}
                    onChange={(e) => setTask_status(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={!task_des}
                  >
                    <option value="">Select a status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ETaskForm;