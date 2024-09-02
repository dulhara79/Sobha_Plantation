import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";

const EditTask = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    task: "",
    assign_date: "",
    due_date: "",
    task_des: "",
    task_status: "",
  });
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task data
    axios
      .get(`http://localhost:5000/api/taskRecords/${id}`)
      .then((response) => {
        const taskData = response.data;

        setFormData({
          emp_id: taskData.emp_id || "",
          emp_name: taskData.emp_name || "", // Set employee name
          task: taskData.task || "",
          assign_date: taskData.assign_date
            ? taskData.assign_date.split("T")[0]
            : "",
          due_date: taskData.due_date ? taskData.due_date.split("T")[0] : "",
          task_des: taskData.task_des || "",
          task_status: taskData.task_status || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        enqueueSnackbar("Error fetching task data", { variant: "error" });
      });

    // Fetch employees list
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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      if (validateForm()) {
        setIsSubmitting(true);
        try {
          await axios.put(
            `http://localhost:5000/api/taskRecords/${id}`,
            formData
          );
          enqueueSnackbar("Task updated successfully", { variant: "success" });
          navigate("/employee/TaskListview", { state: { highlighted: true } });
        } catch (error) {
          enqueueSnackbar("Error updating task", { variant: "error" });
          console.error("Error updating task:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Validate task
    if (!/^[a-zA-Z\s]*$/.test(formData.task)) {
      newErrors.task = "Task must only contain letters.";
      valid = false;
    }

    // Validate assign_date and due_date
    if (
      formData.assign_date &&
      formData.due_date &&
      new Date(formData.due_date) <= new Date(formData.assign_date)
    ) {
      newErrors.due_date = "Due date must be later than the assign date.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "emp_id") {
      const selectedEmployee = employees.find(
        (employee) => employee.id === value
      );
      if (selectedEmployee) {
        setFormData({ ...formData, emp_id: value, emp_name: selectedEmployee.name });
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mt-6 ml-80">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Edit Task
        </h1>
      </div>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-6/12 px-0 py-16 ml-1 space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Employee Name Field */}
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Employee Name
                </label>
                <div className="mt-2">
                  <select
                    name="emp_id"
                    value={formData.emp_id}
                    onChange={handleInputChange}
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

              {/* Other Fields */}
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Task
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="task"
                    value={formData.task}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.task ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.task && (
                    <p className="text-sm text-red-500">{errors.task}</p>
                  )}
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
                    value={formData.assign_date}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    value={formData.due_date}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.due_date ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.due_date && (
                    <p className="text-sm text-red-500">{errors.due_date}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Task Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="task_des"
                    value={formData.task_des}
                    onChange={handleInputChange}
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Task Status
                </label>
                <div className="mt-2">
                  <select
                    name="task_status"
                    value={formData.task_status}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Select task status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
