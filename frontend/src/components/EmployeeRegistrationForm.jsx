import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

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
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px; /* Reduced rounded corners */
    margin-bottom: 5px;
  }

  p {
    color: red;
    font-size: 12px;
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.primary ? "#4CAF50" : "#ccc")};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#45a049" : "#999")};
  }
`;

// Helper function for validations
const validateField = (name, value, formData) => {
  const errors = {};

  switch (name) {
    case "firstName":
    case "lastName":
      if (!/^[a-zA-Z]+$/.test(value)) {
        errors[name] = `${
          name === "firstName" ? "First" : "Last"
        } name can only contain letters.`;
      }
      break;
    case "contactNumber":
      if (!/^\d{10}$/.test(value)) {
        errors[name] = "Contact number must be 10 digits.";
      }
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[name] = "Invalid email format.";
      }
      break;
    case "nic":
      if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(value)) {
        errors[name] =
          "NIC must be in old (9 digits and V/X) or new format (12 digits).";
      } else if (!validateNICWithDOB(value, formData.dateOfBirth)) {
        errors[name] = "NIC does not match the date of birth.";
      }
      break;
    case "address":
      if (!/^[a-zA-Z0-9\s,.\-/]+$/.test(value)) {
        errors[name] =
          "Address can only contain letters, numbers, spaces, commas, dots, hyphens, and slashes.";
      }
      break;
    case "hourlyRate":
      if (!/^[0-9]+$/.test(value) || value <= 0) {
        errors[name] = "Hourly rate must be a positive number.";
      }
      break;
    case "dateOfBirth":
      const dob = new Date(value);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);
      if (dob > minDate) {
        errors[name] = "Employee must be at least 18 years old.";
      }
      break;
    default:
      break;
  }

  return errors;
};

// NIC validation against DOB according to Sri Lankan standards
const validateNICWithDOB = (nic, dob) => {
  if (!dob) return true; // Skip validation if DOB is not provided

  const dobYear = new Date(dob).getFullYear();
  const yearFromNIC = nic.length === 10 ? `19${nic.substr(0, 2)}` : nic.substr(0, 4);

  return dobYear === parseInt(yearFromNIC, 10);
};

const Eregistration = () => {
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
    hiredDate: new Date().toISOString().slice(0, 10), // Set to current date
    hourlyRate: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key], formData);
      newErrors = { ...newErrors, ...fieldErrors };
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Block further fields if the previous field has errors or is empty
    const fields = [
      "firstName",
      "lastName",
      "nic",
      "dateOfBirth",
      "gender",
      "contactNumber",
      "email",
      "address",
      "employeeType",
      "hourlyRate",
    ];
    const currentIndex = fields.indexOf(name);
    if (currentIndex > 0) {
      const previousField = fields[currentIndex - 1];
      if (errors[previousField] || !formData[previousField]) {
        return; // Block current field if previous has errors or is empty
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate the field as the user types
    const fieldErrors = validateField(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post("http://localhost:5000/api/employee", formData);
        Swal.fire("Success", "Employee registered successfully!", "success");
      } catch (error) {
        console.error("Error during Axios request:", error.response.data);
        Swal.fire("Error", "Failed to register employee. Please try again.", "error");
      }
    }
  };

  return (
    <Container>
      <Title>Employee Registration Form</Title>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={formData.nic}
              onChange={handleChange}
            />
            {errors.nic && <p>{errors.nic}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && <p>{errors.contactNumber}</p>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p>{errors.address}</p>}
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
              <option value="">Select Employee Type</option>
              <option value="permanent">Permanent</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="hiredDate">Hired Date</label>
            <input
              type="date"
              name="hiredDate"
              value={formData.hiredDate}
              disabled
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label htmlFor="hourlyRate">Hourly Rate</label>
            <input
              type="text"
              name="hourlyRate"
              placeholder="Hourly Rate"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
            {errors.hourlyRate && <p>{errors.hourlyRate}</p>}
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <Button type="button" onClick={() => setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            contactNumber: "",
            email: "",
            nic: "",
            address: "",
            employeeType: "",
            hiredDate: new Date().toISOString().slice(0, 10), // Reset to current date
            hourlyRate: "",
          })}>
            Reset
          </Button>
          <Button type="submit" primary disabled={!isFormValid}>
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default Eregistration;
