import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 for confirmation
import { Form, Input, DatePicker, Select, Button, notification, Row, Col } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddInspectionReport = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = ["productType", "inspectionDate", "status", "inspectorName"];

  // Disable past dates but allow today
  const disablePastDates = (current) => current && current < moment().startOf('day');

  // Validate inspector name
  const validateInspectorName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter the inspector name!'));
    }
    if (!/^[A-Z][a-z\s]*$/.test(value)) {
      return Promise.reject(new Error('Inspector name must start with an uppercase letter and only contain lowercase letters and spaces.'));
    }
    return Promise.resolve();
  };

  const handleInspectorNameChange = (e) => {
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
      inspectorName: formattedValue,
    }));
  
    // Update the form field value
    form.setFieldsValue({ inspectorName: formattedValue });
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
          inspectionDate: values.inspectionDate ? values.inspectionDate.toISOString() : null,
        };
        await axios.post('http://localhost:5000/api/quality-control', payload);
        Swal.fire('Success', 'Inspection report added successfully!', 'success');
        form.resetFields();
        navigate('/products/quality-control');
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

  const handleCancel = () => {
    navigate('/products/quality-control');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Add Inspection Report</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={(_, allFields) => handleFieldsError(allFields)}
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select
              placeholder="Select a product type"
              onChange={(value) => handleFieldChange('productType', value)}
              style={{ width: '100%' }}
            >
              <Option value="coconut-oil">Coconut Oil</Option>
              <Option value="coconut-water">Coconut Water</Option>
              <Option value="coconut-milk">Coconut Milk</Option>
              <Option value="coconut-cream">Coconut Cream</Option>
              <Option value="coir">Coir</Option>
              <Option value="shell-products">Shell Products</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inspectionDate"
                label="Inspection Date"
                rules={[{ required: true, message: 'Please select the inspection date!' }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastDates}
                  disabled={!formData.productType} // Disable based on previous field
                  onChange={(date) => handleFieldChange('inspectionDate', date)}
                  style={{ width: '100%' }}
                  inputReadOnly
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select the status!' }]}
              >
                <Select
                  placeholder="Select status"
                  onChange={(value) => handleFieldChange('status', value)}
                  style={{ width: '100%' }}
                  disabled={!formData.productType || !formData.inspectionDate}
                >
                  <Option value="Passed">Pass</Option>
                  <Option value="Failed">Fail</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Inspector Name (Mr/Ms)"
            name="inspectorName"
            rules={[
              { validator: validateInspectorName },
            ]}
          >
            <Input
              placeholder="Enter inspector name"
              style={{ width: '100%' }}
              disabled={!formData.productType || !formData.inspectionDate || !formData.status}
              onChange={handleInspectorNameChange} // Updated handler for validation
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}
              >
                Add Report
              </Button>
              <Button type="default" onClick={handleCancel} style={{ width: '48%' }}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddInspectionReport;
