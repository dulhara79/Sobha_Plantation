import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

// Styled Components (same as before)
const Container = styled.div`
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: #ffff;
  border-radius: 8px;
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  margin: 0;
`;

const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  background-color: gray;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalSalaryButton = styled.button`
  background-color: #61b356;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4a9e45;
  }
`;

const CancelButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const SaveButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;


const EmployeeSalary = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    nic: '',
    type: '',
    startDate: '',  // Changed field name
    endDate: '',    // Changed field name
    basicDays: '',
    basicRate: '',
    designation: '',
    otHours: '',
    otRate: '',
    etfEpf: '',
    paymentDate: '',
    remark: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    // Employee Name
    if (!formData.employeeName || !/^[a-zA-Z\s]+$/.test(formData.employeeName)) {
      newErrors.employeeName = 'Employee Name is required and should only contain alphabetic characters.';
    }

    // NIC
    if (!/^\d{9}$/.test(formData.nic)) {
      newErrors.nic = 'NIC must be 9 digits long.';
    }

    // Type
    if (!formData.type) {
      newErrors.type = 'Type is required.';
    }

    // Start Date and End Date validation
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required.';
    } else if (isNaN(startDate.getTime())) {
      newErrors.startDate = 'Start Date is not valid.';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End Date is required.';
    } else if (isNaN(endDate.getTime())) {
      newErrors.endDate = 'End Date is not valid.';
    } else if (startDate > endDate) {
      newErrors.endDate = 'End Date must be after Start Date.';
    } else if (endDate < new Date()) {
      newErrors.endDate = 'End Date cannot be in the past.';
    }

    // Basic Days
    if (!/^\d+$/.test(formData.basicDays) || formData.basicDays < 1 || formData.basicDays > 31) {
      newErrors.basicDays = 'Basic Days must be a positive integer between 1 and 31.';
    }

    // Basic Rate
    if (formData.basicRate <= 0) {
      newErrors.basicRate = 'Basic Rate must be a positive number.';
    }

    // Designation
    if (!formData.designation) {
      newErrors.designation = 'Designation is required.';
    }

    // OT Hours
    if (formData.otHours < 0 || formData.otHours > 100) {
      newErrors.otHours = 'OT Hours must be a positive number and not exceed 100 hours.';
    }

    // OT Rate
    if (formData.otRate <= 0) {
      newErrors.otRate = 'OT Rate must be a positive number.';
    }

    // ETF/EPF (%)
    if (formData.etfEpf < 0 || formData.etfEpf > 100) {
      newErrors.etfEpf = 'ETF/EPF (%) must be between 0 and 100.';
    }

    // Payment Date
    if (new Date(formData.paymentDate) < new Date()) {
      newErrors.paymentDate = 'Payment Date cannot be in the past.';
    }

    // Remark
    if (formData.remark.length > 200) {
      newErrors.remark = 'Remark should not exceed 200 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Container>
      

      <FormContainer>
        <FormHeader>
          <FormTitle>Employee Salary</FormTitle>
          <GenerateButton>
            <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
            Generate Receipt
          </GenerateButton>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <InputField>
              <Label>Employee Name</Label>
              <Input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} />
              {errors.employeeName && <Error>{errors.employeeName}</Error>}
            </InputField>
            <InputField>
              <Label>NIC</Label>
              <Input type="text" name="nic" value={formData.nic} onChange={handleChange} />
              {errors.nic && <Error>{errors.nic}</Error>}
            </InputField>
            <InputField>
              <Label>Type</Label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Contractual">Contractual</option>
                <option value="Part-Time">Part-Time</option>
              </select>
              {errors.type && <Error>{errors.type}</Error>}
            </InputField>
            <InputField>
              <Label>Start Date</Label>
              <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              {errors.startDate && <Error>{errors.startDate}</Error>}
            </InputField>
            <InputField>
              <Label>End Date</Label>
              <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              {errors.endDate && <Error>{errors.endDate}</Error>}
            </InputField>
            <InputField>
              <Label>Basic Days</Label>
              <Input type="number" name="basicDays" value={formData.basicDays} onChange={handleChange} />
              {errors.basicDays && <Error>{errors.basicDays}</Error>}
            </InputField>
            <InputField>
              <Label>Basic Rate</Label>
              <Input type="number" name="basicRate" value={formData.basicRate} onChange={handleChange} />
              {errors.basicRate && <Error>{errors.basicRate}</Error>}
            </InputField>
            <InputField>
              <Label>Designation</Label>
              <select name="designation" value={formData.designation} onChange={handleChange}>
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Analyst">Analyst</option>
              </select>
              {errors.designation && <Error>{errors.designation}</Error>}
            </InputField>
            <InputField>
              <Label>OT Hours</Label>
              <Input type="number" name="otHours" value={formData.otHours} onChange={handleChange} />
              {errors.otHours && <Error>{errors.otHours}</Error>}
            </InputField>
            <InputField>
              <Label>OT Rate</Label>
              <Input type="number" name="otRate" value={formData.otRate} onChange={handleChange} />
              {errors.otRate && <Error>{errors.otRate}</Error>}
            </InputField>
            <InputField>
              <Label>ETF/EPF (%)</Label>
              <Input type="number" name="etfEpf" value={formData.etfEpf} onChange={handleChange} />
              {errors.etfEpf && <Error>{errors.etfEpf}</Error>}
            </InputField>
            <InputField>
              <Label>Payment Date</Label>
              <Input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} />
              {errors.paymentDate && <Error>{errors.paymentDate}</Error>}
            </InputField>
            <InputField style={{ gridColumn: 'span 3' }}>
              <Label>Remark</Label>
              <Input type="text" name="remark" value={formData.remark} onChange={handleChange} />
              {errors.remark && <Error>{errors.remark}</Error>}
            </InputField>
          </FormGrid>

          <ButtonGroup>
            <TotalSalaryButton>Total Salary: </TotalSalaryButton>
            <SaveButton type="submit">Save</SaveButton>
            <CancelButton type="button">Cancel</CancelButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default EmployeeSalary;
