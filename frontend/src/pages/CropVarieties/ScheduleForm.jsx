import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScheduleForm = () => {
  const [disableFields, setDisabledFields] = useState({
    plantationDate: true, // Initially disabled
    assignedTeam: true,
    fieldName: true,
    cropVariety: true,
    scheduledDate: true,
    seedsUsed: true,
    status: true,
  });

  const [formData, setFormData] = useState({
    plantationDate: "",
    assignedTeam: "",
    fieldName: "", // Initially empty
    cropVariety: "Coconut", // default value for crop variety
    scheduledDate: "",
    seedsUsed: "",
    status: "Planned", // default value for status
  });

  const [errors, setErrors] = useState({
    assignedTeam: "",
    seedsUsed: "",
  });

  const navigate = useNavigate();

  // Calculate the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Check if today's date has been reached or passed
    const currentDate = new Date().toISOString().split("T")[0];
    if (currentDate >= today) {
      setDisabledFields((prev) => ({
        ...prev,
        plantationDate: false, // Enable plantation date if it's today or later
      }));
    }
  }, [today]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Enable fields based on the plantationDate field
    if (name === "plantationDate") {
      setDisabledFields((prev) => ({
        ...prev,
        assignedTeam: false,
      }));
    }

    // Enable the fieldName input to enable cropVariety
    if (name === "fieldName") {
      if (value.trim() !== "") {
        setDisabledFields((prev) => ({
          ...prev,
          cropVariety: false, // Enable cropVariety if fieldName is filled
        }));
      } else {
        setDisabledFields((prev) => ({
          ...prev,
          cropVariety: true, // Disable cropVariety if fieldName is empty
        }));
      }
    }

    // Enable other fields once assignedTeam is filled
    if (name === "assignedTeam") {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignedTeam: filteredValue !== value ? "Assigned Team should contain only letters and spaces." : "",
      }));

      if (filteredValue.trim() !== "") {
        setDisabledFields((prev) => ({
          ...prev,
          fieldName: false,
          scheduledDate: false,
          seedsUsed: false,
          status: false,
        }));
      } else {
        setDisabledFields((prev) => ({
          ...prev,
          fieldName: true,
          scheduledDate: true,
          seedsUsed: true,
          status: true,
        }));
      }
    }

    // Real-time validation for the "Seeds Used" field
    if (name === "seedsUsed") {
      if (value === "" || value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          seedsUsed: "Seeds Used must be a positive number.",
        }));
        filteredValue = ""; // Clear the value if invalid
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, seedsUsed: "" }));
      }
    }

    // Update the form data
    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (formData.seedsUsed === "" || formData.seedsUsed <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        seedsUsed: "Seeds Used must be a positive number.",
      }));
      return;
    }

    if (errors.assignedTeam || errors.seedsUsed) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/schedules", formData);
      alert("Schedule created successfully!");
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("There was an error creating the schedule!", error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  // Internal CSS for styling the form
  const formStyle = {
    width: "300px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  // Button styles with same size for both
  const buttonStyle = {
    padding: "10px 20px",
    width: "120px", // Same width for both buttons
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "center",
    marginRight: "10px",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Red color for cancel button
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none", // Hide the default arrow of the dropdown
  };

  const errorStyle = {
    color: "red",
    marginBottom: "10px",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label style={labelStyle}>Plantation Date:</label>
        <input
          type="date"
          name="plantationDate"
          value={formData.plantationDate}
          onChange={handleChange}
          disabled={disableFields.plantationDate}
          required
          style={inputStyle}
          min={today} // Set min attribute to today's date to disable past dates
        />
      </div>

      <div>
        <label style={labelStyle}>Assigned Team:</label>
        <input
          type="text"
          name="assignedTeam"
          value={formData.assignedTeam}
          onChange={handleChange}
          disabled={disableFields.assignedTeam}
          required
          style={inputStyle}
        />
        {errors.assignedTeam && <p style={errorStyle}>{errors.assignedTeam}</p>}
      </div>

      <div>
        <label style={labelStyle}>Field Name:</label>
        <select
          name="fieldName"
          value={formData.fieldName}
          onChange={handleChange}
          disabled={disableFields.fieldName}
          required
          style={selectStyle}
        >
          <option value="">Select Field</option> {/* Add a default empty option */}
          <option value="Field A">Field A</option>
          <option value="Field B">Field B</option>
          <option value="Field C">Field C</option>
          <option value="Field D">Field D</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Crop Variety:</label>
        <select
          name="cropVariety"
          value={formData.cropVariety}
          onChange={handleChange}
          disabled={disableFields.cropVariety}
          required
          style={selectStyle}
        >
          <option value="Coconut">Coconut</option>
          <option value="Papaya">Papaya</option>
          <option value="Banana">Banana</option>
          <option value="Pepper">Pepper</option>
          <option value="Pineapple">Pineapple</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Scheduled Date:</label>
        <input
          type="date"
          name="scheduledDate"
          value={formData.scheduledDate}
          onChange={handleChange}
          disabled={disableFields.scheduledDate}
          required
          style={inputStyle}
          max={today} // Set max attribute to today's date
        />
      </div>

      <div>
        <label style={labelStyle}>Seeds Used:</label>
        <input
          type="number"
          name="seedsUsed"
          value={formData.seedsUsed}
          onChange={handleChange}
          disabled={disableFields.seedsUsed}
          required
          style={inputStyle}
        />
        {errors.seedsUsed && <p style={errorStyle}>{errors.seedsUsed}</p>}
      </div>

      <div>
        <label style={labelStyle}>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={disableFields.status}
          required
          style={selectStyle}
        >
          <option value="Planned">Planned</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        <button type="button" onClick={handleCancel} style={cancelButtonStyle}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
