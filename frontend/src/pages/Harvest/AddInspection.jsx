import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 for confirmation
import { Form, Input, DatePicker, Select, Button, notification, Row, Col } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddInspection = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = ["cropType", "checkDate", "qualityStatus", "qualityController"];

  // Disable past dates but allow today
  const disablePastDates = (current) => current && current < moment().startOf('day');

  // Validate inspector name
  const validatequalityController = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter the Quality Controller!'));
    }
    if (!/^[A-Z][a-z\s]*$/.test(value)) {
      return Promise.reject(new Error('Quality Controller name must start with an uppercase letter and only contain lowercase letters and spaces.'));
    }
    return Promise.resolve();
  };

  const handlequalityControllerChange = (e) => {
    const inputValue = e.target.value;
  
    // Only allow the first letter to be uppercase, and prevent lowercase as the first character
    let formattedValue = inputValue;
  
    // If the first character is lowercase, prevent it from being typed
    if (formattedValue.length === 1 && /[a-z]/.test(formattedValue)) {
      formattedValue = ''; // Disable lowercase first letter
    } else {
      // After the first letter, allow letters and spaces, but convert everything after the first letter to lowercase
      formattedValue = formattedValue
        .replace(/[^a-zA-Z\s]/g, '') // Remove non-letter characters and numbers
        .replace(/^([a-zA-Z])/, (m) => m.toUpperCase()) // Ensure first letter is uppercase
        .replace(/(?<=^[A-Z])([A-Z]+)/g, (m) => m.toLowerCase()); // Convert any remaining uppercase letters to lowercase
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      qualityController: formattedValue,
    }));
  
    // Update the form field value
    form.setFieldsValue({ qualityController: formattedValue });
  };
  

  // Confirm submission
  const handleSubmit = async (values) => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    const result = await Swal.fire({
      title: "Confirmation Required",
      text: "Are you sure you want to submit this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        html: 'swal-custom-html',
        confirmButton: 'swal-confirm-button', // Custom class for confirm button
      cancelButton: 'swal-cancel-button',
      },
      focusCancel: false,
    });

    console.log("Form data:", formData);
    console.log("result.isConfirmed:", result.isConfirmed);
    
    if (result.isConfirmed) {
      try {
        const payload = {
          ...values,
          checkDate: values.checkDate ? values.checkDate.toISOString() : null,
        };
        await axios.post('http://localhost:5000/api/quality', payload);
        Swal.fire('Success', 'Inspection report added successfully!', 'success');
        form.resetFields();
        navigate('/harvest/quality');
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to add inspection report.',
        });
      }
    }
  };

  const handleFieldChange = (name, value) => {
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
  };

  const handleFieldsError = (errorInfo) => {
    const newErrors = errorInfo.reduce((acc, { name, errors }) => {
      acc[name[0]] = errors.length > 0;
      return acc;
    }, {});
    setErrors(newErrors);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Add Inspection</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={(_, allFields) => handleFieldsError(allFields)}
        >
          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: 'Please select a crop type!' }]}
          >
            <Select
              placeholder="Select a crop type"
              onChange={(value) => handleFieldChange('cropType', value)}
              style={{ width: '100%' }}
            >
              <Option value="Coconut">Coconut</Option>
              <Option value="Banana">Banana</Option>
              <Option value="Papaya">Papaya</Option>
              <Option value="Pineapple">Pineapple</Option>
              <Option value="Pepper">Pepper</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Check Date"
                name="checkDate"
                rules={[{ required: true, message: 'Please select the check date!' }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastDates}
                  disabled={!formData.cropType} // Disable based on previous field
                  onChange={(date) => handleFieldChange('checkDate', date)}
                  style={{ width: '100%' }}
                  inputReadOnly
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="qualityStatus"
                label="qualityStatus"
                rules={[{ required: true, message: 'Please select the qualityStatus!' }]}
              >
                <Select
                  placeholder="Select qualityStatus"
                  onChange={(value) => handleFieldChange('qualityStatus', value)}
                  style={{ width: '100%' }}
                  disabled={!formData.cropType || !formData.checkDate}
                >
                  <Option value="Passed">Passed</Option>
                  <Option value="Failed">Failed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Quality Controller (Mr/Ms)"
            name="qualityController"
            rules={[
              { validator: validatequalityController },
            ]}
          >
            <Input
              placeholder="Enter Quality Controller"
              style={{ width: '100%' }}
              disabled={!formData.cropType || !formData.checkDate || !formData.qualityStatus}
              onChange={handlequalityControllerChange} // Updated handler for validation
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}
              >
                Add Report
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddInspection;
