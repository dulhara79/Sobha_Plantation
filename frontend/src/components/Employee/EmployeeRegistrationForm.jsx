import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import moment from "moment";

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
  background-color: ${(props) => (props.primary ? "#4CAF50" : "#ccc")};
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.primary ? "#45a049" : "#999")};
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
      console.log(value);

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
      if (!/^[a-zA-Z0-9\s,\/]+$/.test(value)) {
        errors[name] =
          "Address can only contain letters, numbers, spaces, commas, and slashes.";
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
      minDate.setFullYear(minDate.getFullYear() - 18); // Ensure the employee is at least 18 years old
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
  const yearFromNIC =
    nic.length === 10 ? `19${nic.substr(0, 2)}` : nic.substr(0, 4);
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
    designation: "",
    hiredDate: new Date().toISOString().slice(0, 10), // Set to current date
    hourlyRate: "",
  });
  const [errors, setErrors] = useState({});
  const [allowedYear, setAllowedYear] = useState(null);

  // Update allowed year based on NIC input
  const handleNICChange = (value) => {
    let yearFromNIC = null;
    if (/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(value)) {
      yearFromNIC =
        value.length === 10 ? `19${value.substr(0, 2)}` : value.substr(0, 4);
      setAllowedYear(parseInt(yearFromNIC, 10));
    } else {
      setAllowedYear(null); // Reset if NIC is invalid
    }
  };

  // set values to the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [designation, setDesignation] = useState("");
  const [hiredDate, setHiredDate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //disabled Fields
  const [disabledFields, setDisabledFields] = useState({
    firstName: false,
    lastName: true,
    dateOfBirth: true,
    gender: true,
    contactNumber: true,
    email: true,
    nic: true,
    address: true,
    employeeType: true,
    designation: true,
    hiredDate: true, // Set to current date
    hourlyRate: true,
    submitted: true,
  });

  // handle changes
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    let filteredValue = value.replace(/[^a-zA-Z]/g, "");
    let fLetter = filteredValue.slice(0, 1);
    fLetter = fLetter.toUpperCase();
    filteredValue = fLetter + filteredValue.slice(1);
    setFirstName(filteredValue);
    setDisabledFields({
      ...disabledFields,
      lastName: false,
    });
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    let filteredValue = value.replace(/[^a-zA-Z]/g, "");
    let fLetter = filteredValue.slice(0, 1);
    fLetter = fLetter.toUpperCase();
    filteredValue = fLetter + filteredValue.slice(1);
    setLastName(filteredValue);
    setDisabledFields({
      ...disabledFields,
      nic: false,
    });
  };

  // NIC Validation: Allows numbers and 'V', 'X', 'v', 'x' for old NICs
  const handleNicChange = (e) => {
    const input = e.target.value;
    let filteredValue = input.replace(/[^0-9xXvV]/g, ""); // Allow only numbers, 'V', 'X'
    const oldNicRegex = /^[0-9]{9}[xXvV]?$/;
    const newNicRegex = /^[0-9]{12}$/;

    if (filteredValue.length > 12) {
      filteredValue = filteredValue.substring(0, 12); // Restrict to 12 characters
    }

    if(oldNicRegex.test(filteredValue)){
      filteredValue = filteredValue.filteredValue.substring(0, 10);
    }

    if (oldNicRegex.test(filteredValue) || newNicRegex.test(filteredValue)) {
      setNic(filteredValue);
      setAllowedYear(filteredValue.length === 12 ? filteredValue.substring(0, 4) : `19${filteredValue.substring(0, 2)}`);
    } else {
      setNic(filteredValue);
    }
    setDisabledFields({
      ...disabledFields,
      dateOfBirth: false,
    });
  };

  // Handle Date of Birth Change: Restrict DOB to match NIC
  const handleDateOfBirthChange = (e) => {
    const inputDate = e.target.value;
    const birthYear = new Date(inputDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (birthYear === parseInt(allowedYear) && age >= 18) {
      setDateOfBirth(inputDate);
      setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "Invalid date of birth or age less than 18.",
      }));
    }

    setDisabledFields({
      ...disabledFields,
      gender: false,
    });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setDisabledFields({
      ...disabledFields,
      contactNumber: false,
    });
  };

  const handleContactNumberChange = (e) => {
    const input = e.target.value;
    let filteredValue = input.replace(/[^0-9]/g, ""); // Allow only numbers
    filteredValue = filteredValue.substring(0, 10); // Restrict to 10 characters
    setContactNumber(filteredValue);
    setDisabledFields({
      ...disabledFields,
      email: false,
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9a-zA-Z.@]/g, ""); // Remove spaces
    setEmail(filteredValue);
    setDisabledFields({
      ...disabledFields,
      address: false,
    });
  };

const handleAddressChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9a-zA-Z\s,./]/g, ""); // Remove spaces
    setAddress(filteredValue);
    setDisabledFields({
      ...disabledFields,
      employeeType: false,
    });
  };

  const handleEmployeeTypeChange = (e) => {
    const value = e.target.value;
    setEmployeeType(value);
    setDisabledFields({
      ...disabledFields,
      designation: false,
    });

  };  

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
    setDisabledFields({
      ...disabledFields,
      hourlyRate: false,
    });
  };

  const handleHourlyRateChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers
    setHourlyRate(filteredValue);
    setDisabledFields({
      ...disabledFields,
      submitted: false,
    });
  };

  const data = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    gender: gender,
    contactNumber: contactNumber,
    email: email,
    nic: nic,
    address: address,
    employeeType: employeeType,
    designation: designation,
    hiredDate: hiredDate,
    hourlyRate: hourlyRate,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validateForm();
    // if (Object.keys(errors).length > 0) return;

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
        await axios.post("http://localhost:5000/api/employee", data);
        console.log(data);
        Swal.fire("Success", "Employee registered successfully!", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          "Failed to register employee. Please try again.",
          "error"
        );
      }
    }
  };



  // Sequential validation logic
  const isFormValidTillField = (fieldName) => {
    const fieldOrder = [
      "firstName",
      "lastName",
      "nic",
      "dateOfBirth",
      "gender",
      "contactNumber",
      "email",
      "address",
      "employeeType",
      "designation",
      "hiredDate",
      "hourlyRate",
    ];
    const index = fieldOrder.indexOf(fieldName);
    for (let i = 0; i < index; i++) {
      const field = fieldOrder[i];
      if (errors[field] || !formData[field]) return false;
    }
    return true;
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key], formData);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!isFormValidTillField(name)) return; // Block input if the previous fields are invalid

    // Prevent typing invalid characters
    if (validateField(name, value, formData)[name]) return;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Special handling for NIC field to dynamically set the year for DOB
    if (name === "nic") {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      handleNICChange(value); // Adjust year when NIC is valid
      return; // Skip further validation until full NIC is entered
    }

    // Validate the field as the user types
    const fieldErrors = validateField(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
  };


  return (
    <Container>
      <Title>Employee Registration Form</Title>
      {/* onSubmit={handleSubmit} */}
      <form >
        <FormRow>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              disabled={disabledFields.firstName}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              disabled={disabledFields.lastName}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </FormGroup>
        </FormRow>

        {/* NIC and Date of Birth */}
        <FormRow>
          <FormGroup>
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={nic}
              onChange={handleNicChange}
              disabled={disabledFields.nic}
            />
            {errors.nic && <p>{errors.nic}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              max={allowedYear ? `${allowedYear}-12-31` : undefined}
              min={allowedYear ? `${allowedYear}-01-01` : undefined}
              disabled={disabledFields.dateOfBirth}
            />
            {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
          </FormGroup>
        </FormRow>

        {/* Gender and Contact Number */}
        <FormRow>
          <FormGroup>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              disabled={disabledFields.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={handleContactNumberChange}
              disabled={disabledFields.contactNumber}
            />
            {errors.contactNumber && <p>{errors.contactNumber}</p>}
          </FormGroup>
        </FormRow>

        {/* Email and Address */}
        <FormRow>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              disabled={disabledFields.email}
            />
            {errors.email && <p>{errors.email}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleAddressChange}
              disabled={disabledFields.address}
            />
            {errors.address && <p>{errors.address}</p>}
          </FormGroup>
        </FormRow>

        {/* Employee Type and Designation */}
        <FormRow>
          <FormGroup>
            <label htmlFor="employeeType">Employee Type</label>
            <select
              name="employeeType"
              value={employeeType}
              onChange={handleEmployeeTypeChange}
              disabled={disabledFields.employeeType}
            >
              <option value="">Select Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.employeeType && <p>{errors.employeeType}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="designation">Designation</label>
            <select
              name="designation"
              value={designation}
              onChange={handleDesignationChange}
              disabled={disabledFields.designation}
            >
              <option value="">Select Designation</option>
              <option value="Farmer">Farmer</option>
              <option value="Supervisor">Supervisor</option>
            </select>
            {errors.designation && <p>{errors.designation}</p>}
          </FormGroup>
        </FormRow>

        {/* Hired Date and Hourly Rate */}
        <FormRow>
          <FormGroup>
            <label htmlFor="hiredDate">Hired Date</label>
            {/* <input
              type="date"
              name="hiredDate"
              value={formData.hiredDate}
              disabled={true}
            /> */}

            {/* value={date ? moment(date) : null} */}
            <DatePicker
              name="hiredDate"
              value={moment()}
              format="YYYY-MM-DD"
              className="block w-full h-8 p-2  mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              disabledDate={(current) => current !== moment()}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="hourlyRate">Hourly Rate</label>
            <input
              type="text"
              name="hourlyRate"
              placeholder="Hourly Rate"
              value={hourlyRate}
              onChange={handleHourlyRateChange}
              disabled={disabledFields.hourlyRate}
            />
            {errors.hourlyRate && <p>{errors.hourlyRate}</p>}
          </FormGroup>
        </FormRow>

        {/* Form submission buttons */}
        <ButtonGroup>
          <Button type="button" onClick={handleSubmit} disabled={disabledFields.submitted} primary>
            Register
          </Button>
          <Button type="button" onClick={() => console.log("Form cleared!")}>
            Clear Form
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default Eregistration;
