import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

// Styled Components
const Container = styled.div`
  max-width: 600px;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
  background-color: ${(props) => (props.primary ? '#4CAF50' : '#ccc')};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#45a049' : '#999')};
  }
`;

// Helper function for validations
const validateField = (name, value) => {
  const errors = {};

  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!/^[a-zA-Z]+$/.test(value)) {
        errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters.`;
      }
      break;
    case 'contactNumber':
      if (!/^\d{10}$/.test(value)) {
        errors[name] = 'Contact number must be 10 digits.';
      }
      break;
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[name] = 'Invalid email format.';
      }
      break;
    case 'nic':
      if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(value)) {
        errors[name] = 'NIC must be in old (9 digits and V/X) or new format (12 digits).';
      }
      break;
    case 'address':
      if (!/^[a-zA-Z0-9\s,.\-]+$/.test(value)) {
        errors[name] = 'Address can only contain letters, numbers, spaces, commas, dots, and hyphens.';
      }
      break;
    case 'hourlyRate':
      if (!/^[0-9]+$/.test(value) || value <= 0) {
        errors[name] = 'Hourly rate must be a positive number.';
      }
      break;
    default:
      break;
  }

  return errors;
};

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    nic: '',
    address: '',
    employeeType: '',
    hiredDate: new Date().toISOString().slice(0, 10),
    hourlyRate: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key]);
      newErrors = { ...newErrors, ...fieldErrors };
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate the field as the user types
    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // SweetAlert confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit this form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post('http://localhost:5000/api/employees', formData);
        Swal.fire('Success', 'Employee registered successfully!', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to register employee. Please try again.', 'error');
      }
    }
  };

  return (
    <Container>
      <Title>Employee Registration Form</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </FormGroup>
        <FormGroup>
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
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <p>{errors.contactNumber}</p>}
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
          <textarea
            name="address"
            placeholder="Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="employeeType"
            placeholder="Employee Type"
            value={formData.employeeType}
            onChange={handleChange}
          />
          {errors.employeeType && <p>{errors.employeeType}</p>}
          <input
            type="date"
            name="hiredDate"
            placeholder="Hired Date"
            value={formData.hiredDate}
            readOnly
            disabled
          />
        </FormGroup>
        <FormGroup>
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
          {errors.hourlyRate && <p>{errors.hourlyRate}</p>}
        </FormGroup>
        <ButtonGroup>
          <Button primary type="submit" disabled={!isFormValid}>
            Submit
          </Button>
          <Button type="button" onClick={() => setFormData({})}>
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default EmployeeRegistrationForm;
