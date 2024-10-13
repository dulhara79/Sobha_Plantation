import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ScheduleForm = () => {
  const [disableFields, setDisabledFields] = useState({
    plantationDate: true,
    assignedTeam: true,
    fieldName: true,
    cropVariety: true,
    seedsUsed: true,
    status: true,
  });

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    plantationDate: "",
    assignedTeam: "",
    fieldName: "",
    cropVariety: "Coconut",
    scheduledDate: today,
    seedsUsed: "",
    status: "Planned",
  });

  const [errors, setErrors] = useState({
    assignedTeam: "",
    seedsUsed: "",
  });

  const navigate = useNavigate();

  const oneYearFromToday = new Date();
  oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);
  const maxDate = oneYearFromToday.toISOString().split("T")[0];

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (currentDate >= today) {
      setDisabledFields((prev) => ({
        ...prev,
        plantationDate: false,
      }));
    }
  }, [today]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === "plantationDate") {
      setDisabledFields((prev) => ({
        ...prev,
        assignedTeam: false,
      }));
    }

    if (name === "fieldName") {
      if (value.trim() !== "") {
        setDisabledFields((prev) => ({
          ...prev,
          cropVariety: false,
        }));
      } else {
        setDisabledFields((prev) => ({
          ...prev,
          cropVariety: true,
        }));
      }
    }

    if (name === "assignedTeam") {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); 
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignedTeam: filteredValue !== value ? "Assigned Team should contain only letters and spaces." : "",
      }));

      if (filteredValue.trim() !== "") {
        setDisabledFields((prev) => ({
          ...prev,
          fieldName: false,
          seedsUsed: false,
          status: false,
        }));
      } else {
        setDisabledFields((prev) => ({
          ...prev,
          fieldName: true,
          seedsUsed: true,
          status: true,
        }));
      }
    }

    if (name === "seedsUsed") {
      if (value === "" || value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          seedsUsed: "Seeds Used must be a positive number.",
        }));
        filteredValue = "";
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, seedsUsed: "" }));
      }
    }

    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.seedsUsed === "" || formData.seedsUsed <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        seedsUsed: "Seeds Used must be a positive number.",
      }));
      return;
    }
  
    if (errors.assignedTeam || errors.seedsUsed) {
      Swal.fire("Error", "Please correct the errors before submitting.", "error");
      return;
    }
  
    try {
      // Submit the schedule data
      await axios.post("http://localhost:5000/api/schedules", formData);
  
      // Send the email
      await axios.post("http://localhost:5000/api/send-email", { formData });
  
      Swal.fire({
        title: "Success!",
        text: "Schedule created successfully and email sent!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "Something went wrong", "error");
    }
  };
  

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose any unsaved data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, stay",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

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

  const buttonStyle = {
    padding: "10px 20px",
    width: "120px",
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
    backgroundColor: "#f44336",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
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
          min={today}
          max={maxDate}
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
          <option value="">Select Field</option>
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
          disabled
          required
          style={inputStyle}
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
          min="1"
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

      <div style={{ textAlign: "center" }}>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        <button type="button" style={cancelButtonStyle} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
