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
    border-radius: 3px; /* Reduced rounded corners */
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

// EditEmployee Component
const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from route parameters
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
    hourlyRate: ""
  });

  const [errors, setErrors] = useState({});
  const [isNextFieldBlocked, setNextFieldBlocked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the employee data by ID
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
          hiredDate: data.hiredDate.split("T")[0], // Hired date is uneditable
          hourlyRate: data.hourlyRate
        });
      })
      .catch(error => {
        Swal.fire("Error", "Failed to fetch employee data", "error");
      });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    // Validation for fields
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!/^[A-Za-z]+$/.test(formData.firstName)) newErrors.firstName = "First name must only contain letters.";
    
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!/^[A-Za-z]+$/.test(formData.lastName)) newErrors.lastName = "Last name must only contain letters.";

    if (!formData.nic) newErrors.nic = "NIC is required.";
    // Add NIC validation logic

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";

    if (!formData.gender) newErrors.gender = "Gender is required.";

    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required.";
    if (!/^\d+$/.test(formData.contactNumber)) newErrors.contactNumber = "Contact Number must only contain numbers.";

    if (!formData.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email format is invalid.";

    if (!formData.address) newErrors.address = "Address is required.";

    if (!formData.employeeType) newErrors.employeeType = "Employee Type is required.";

    if (!formData.designation) newErrors.designation = "Designation is required.";

    if (!formData.hourlyRate || isNaN(formData.hourlyRate)) newErrors.hourlyRate = "Hourly Rate must be a number.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    setNextFieldBlocked(!validateForm()); // Block next fields if validation fails
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
      Swal.fire("Success", "Employee updated successfully!", "success");
      navigate("/employee/employeelist");
      window.location.reload(); // This forces the table to fetch updated data
    } catch (error) {
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
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              
            />
            {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <label htmlFor="employeeType">Employee Type</label>
            <select
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="designation">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="Farmer">Farmer</option>
              <option value="Security">Security</option>
              <option value="Pest and Disease Expert">Pest and Disease Expert</option>
            </select>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <label htmlFor="hourlyRate">Hourly Rate</label>
            <input
              type="text"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="hiredDate">Hired Date (Fixed)</label>
            <input
              type="text"
              name="hiredDate"
              value={formData.hiredDate}
              disabled
            />
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
