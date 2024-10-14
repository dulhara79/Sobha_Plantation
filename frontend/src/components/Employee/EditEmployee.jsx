import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 5px;
    background-color: #f9f9f9;
  }
  p {
    color: red;
    font-size: 12px;
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;

// Helper function for NIC validation and extraction
const validateAndExtractNIC = (nic) => {
  let birthYear, birthMonth, birthDate, gender;

  if (/^\d{9}[vVxX]$/.test(nic)) {
    // Old NIC format (9 digits followed by 'v' or 'x')
    birthYear = parseInt("19" + nic.substr(0, 2));
    let daysInYear = parseInt(nic.substr(2, 3));
    gender = daysInYear > 500 ? "Female" : "Male";
    daysInYear = gender === "Female" ? daysInYear - 500 : daysInYear;

    // Calculate month and date
    for (let month = 0; month < 12; month++) {
      let daysInMonth = new Date(birthYear, month + 1, 0).getDate();
      if (daysInYear <= daysInMonth) {
        birthMonth = month + 1;
        birthDate = daysInYear;
        break;
      }
      daysInYear -= daysInMonth;
    }
  } else if (/^\d{12}$/.test(nic)) {
    // New NIC format (12 digits)
    birthYear = parseInt(nic.substr(0, 4));
    let daysInYear = parseInt(nic.substr(4, 3));
    gender = daysInYear > 500 ? "Female" : "Male";
    daysInYear = gender === "Female" ? daysInYear - 500 : daysInYear;

    // Calculate month and date
    for (let month = 0; month < 12; month++) {
      let daysInMonth = new Date(birthYear, month + 1, 0).getDate();
      if (daysInYear <= daysInMonth) {
        birthMonth = month + 1;
        birthDate = daysInYear;
        break;
      }
      daysInYear -= daysInMonth;
    }
  } else {
    return { valid: false, message: "NIC format is invalid." };
  }

  // Format date as YYYY-MM-DD
  const formattedDate = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDate.toString().padStart(2, '0')}`;

  return { 
    valid: true, 
    dateOfBirth: formattedDate, 
    gender: gender
  };
};

const formatDateToLocal = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust to local timezone
  return d.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
};

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    nic: "",
    address: "",
    employeeType: "",
    designation: "",
    hiredDate: "",
    hourlyRate: "",
  });

  const [errors, setErrors] = useState({});
  const [isNextFieldBlocked, setNextFieldBlocked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employee/${id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth.split("T")[0],
          gender: data.gender,
          contactNumber: data.contactNumber,
          email: data.email,
          nic: data.nic,
          address: data.address,
          employeeType: data.employeeType,
          designation: data.designation,
          hiredDate: formatDateToLocal(data.hiredDate),
          hourlyRate: data.hourlyRate,
        });
      })
      .catch(() => Swal.fire("Error", "Failed to fetch employee data", "error"));
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation (letters only)
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    else if (!/^[A-Za-z]+$/.test(formData.firstName)) newErrors.firstName = "First name must only contain letters.";

    // Last Name validation (letters only)
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    else if (!/^[A-Za-z]+$/.test(formData.lastName)) newErrors.lastName = "Last name must only contain letters.";

    // NIC validation
    if (!formData.nic) {
      newErrors.nic = "NIC is required.";
    } else {
      const nicValidation = validateAndExtractNIC(formData.nic);
      if (!nicValidation.valid) newErrors.nic = nicValidation.message;
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";

    // Gender validation
    if (!formData.gender) newErrors.gender = "Gender is required.";

    // Contact Number validation (10 digits)
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required.";
    else if (!/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = "Contact number must be exactly 10 digits.";

    // Email validation (contains @ and uses only lowercase letters)
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[0-9a-z]+@[a-z]+\.[a-z]+$/.test(formData.email)) newErrors.email = "Email format is invalid.";

    // Address validation (letters, spaces, ',', '.', '/')
    if (!formData.address) newErrors.address = "Address is required.";
    else if (!/^[A-Za-z\s,./0-9]+$/.test(formData.address)) newErrors.address = "Address contains invalid characters.";

    // Employee Type validation
    if (!formData.employeeType) newErrors.employeeType = "Employee type is required.";

    // Designation validation
    if (!formData.designation) newErrors.designation = "Designation is required.";

    // Hourly Rate validation (number only)
    if (
      !formData.hourlyRate ||                   // Check if the field is empty
      !/^\d+$/.test(formData.hourlyRate) ||     // Ensure only numbers (no letters, symbols, or decimals)
      Number(formData.hourlyRate) <= 0 ||       // Check if the value is positive
      Number(formData.hourlyRate) > 200000      // Ensure the value is ≤ 200000
    ) {
      newErrors.hourlyRate = "Hourly rate must be a positive number up to 200000.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nic') {
      // Handle NIC input
      if (/^\d{0,12}$/.test(value) || /^\d{0,9}[vVxX]?$/.test(value)) {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        
        // Extract date of birth and gender from NIC
        const nicInfo = validateAndExtractNIC(value);
        if (nicInfo.valid) {
          setFormData(prevFormData => ({
            ...prevFormData,
            dateOfBirth: nicInfo.dateOfBirth,
            gender: nicInfo.gender
          }));
        }
      }
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }
    setNextFieldBlocked(!validateForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
      Swal.fire("Success", "Employee updated successfully!", "success");
      navigate("/employee/employeelist");
      window.location.reload();
    } catch {
      Swal.fire("Error", "Failed to update employee", "error");
    }
  };

  return (
    <Container>
      <Title>Edit Employee</Title>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="nic">NIC</label>
            <input type="text" name="nic" value={formData.nic} onChange={handleChange} />
            {errors.nic && <ErrorMsg>{errors.nic}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} readOnly />
            {errors.dateOfBirth && <ErrorMsg>{errors.dateOfBirth}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="gender">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} disabled>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <ErrorMsg>{errors.gender}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="contactNumber">Contact Number</label>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <ErrorMsg>{errors.contactNumber}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="employeeType">Employee Type</label>
            <select name="employeeType" value={formData.employeeType} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.employeeType && <ErrorMsg>{errors.employeeType}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="designation">Designation</label>
            <select name="designation" value={formData.designation} onChange={handleChange}>
              <option value="">Select Designation</option>
              <option value="Farmer">Farmer</option>
              <option value="Security">Security</option>
              <option value="Pest and Disease Expert">Pest and Disease Expert</option>
            </select>
            {errors.designation && <ErrorMsg>{errors.designation}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="hourlyRate">Hourly Rate</label>
            <input type="text" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
            {errors.hourlyRate && <ErrorMsg>{errors.hourlyRate}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="hiredDate">Hired Date (Fixed)</label>
            <input type="text" name="hiredDate" value={formData.hiredDate} disabled />
          </FormGroup>
        </FormRow>

        <FormRow>
          <Button type="submit" disabled={isNextFieldBlocked}>
            Update Employee
          </Button>
        </FormRow>
      </form>
    </Container>
  );
};

export default EditEmployee;