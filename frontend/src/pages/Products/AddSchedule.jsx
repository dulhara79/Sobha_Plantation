import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Form, InputNumber, DatePicker, Select, Button, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = ["productType", "quantity", "startDate", "endDate", "status", "progress"];

  // Disable date pickers based on current date and previous selections
  const disableEndDates = (current) => {
    const startDate = form.getFieldValue('startDate');
    return current && (current < moment().startOf('day') || current < startDate);
  };

  const disableStartDates = (current) => current && current < moment().startOf('day');

  const validateEndDate = (_, endDate) => {
    const startDate = form.getFieldValue('startDate');
    if (endDate && startDate && endDate.isBefore(startDate, 'day')) {
      return Promise.reject(new Error('End date must be the same as or after the start date.'));
    }
    return Promise.resolve();
  };

  const handleStatusChange = (status) => {
    if (status === 'Completed') {
      form.setFieldsValue({ progress: 100 }); // Auto-set progress to 100
    } else {
      form.setFieldsValue({ progress: undefined }); // Clear progress if status changes
    }
  };

  const handleSubmit = async (values) => {
    // Validate form fields
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "<strong>Confirmation Required</strong>",
      html: "Are you sure you want to submit this form?",
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
          startDate: values.startDate ? values.startDate.toISOString() : null,
          endDate: values.endDate ? values.endDate.toISOString() : null,
        };

        await axios.post('http://localhost:5000/api/production', payload);
        Swal.fire(
          "Success",
          "Product Schedule successfully!",
          "success"
        );
        form.resetFields();
        setFormData({});
        navigate('/products/production-overview');

      } catch (error) {
        notification.error({
          message: 'Error',
          description: `Failed to add production schedule. ${error.response?.data?.message || 'Please try again.'}`,
        });
      }
    }
  };

  const handleCancel = () => {
    navigate('/products/production-overview');
  };

  // Block further fields if the previous field has errors or is empty
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
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Add Production Schedule</h2>
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
            >
              <Option value="coconut-oil">Coconut Oil</Option>
              <Option value="coconut-water">Coconut Water</Option>
              <Option value="coconut-milk">Coconut Milk</Option>
              <Option value="coconut-cream">Coconut Cream</Option>
              <Option value="coir">Coir</Option>
              <Option value="shell-products">Shell Products</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <InputNumber
              placeholder="Enter quantity"
              min={1}
              max={100}
              disabled={!formData.productType} // Disable based on previous field
              onChange={(value) => handleFieldChange('quantity', value)} // Update value on change
              style={{ width: '100%' }} // Ensure it fits the layout
              parser={(value) => value.replace(/\D/g, '')} // Allow only numbers
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Prevent non-numeric input
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                // Clear input if invalid after focus loss
                if (value && (value < 1 || value > 100)) {
                  form.setFieldsValue({ quantity: undefined });
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disableStartDates}
              style={{ width: '100%' }}
              disabled={!formData.productType || !formData.quantity}
              inputReadOnly // Disable manual input
              onChange={(date) => handleFieldChange('startDate', date)}
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            dependencies={['startDate']}
            rules={[{ required: true, message: 'Please select the end date!' }, { validator: validateEndDate }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disableEndDates}
              style={{ width: '100%' }}
              disabled={!formData.productType || !formData.quantity || !formData.startDate} // Disable based on previous field
              inputReadOnly // Disable manual input
              onChange={(date) => handleFieldChange('endDate', date)}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select
              placeholder="Select status"
              onChange={(value) => {
                handleStatusChange(value);
                handleFieldChange('status', value);
              }}
              disabled={!formData.productType || !formData.quantity || !formData.startDate || !formData.endDate} // Disable based on previous field
            >
              <Option value="Scheduled">Scheduled</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Progress (%)"
            name="progress"
            rules={[{ required: true, message: 'Progress is required!' },
                     { type: 'number', min: 0, max: 100, message: 'Progress must be between 0 and 100!' }]}
          >
            <InputNumber
              placeholder="Enter progress percentage"
              onChange={(value) => handleFieldChange('progress', value)}
              disabled={!formData.productType || !formData.quantity || !formData.startDate || !formData.endDate || !formData.status} // Disable based on previous field
              min={0}
              max={100}
              style={{ width: '100%' }} // Ensure it fits the layout
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }} // Custom styles
              >
                Add Schedule
              </Button>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ width: '48%' }} // Ensure it fits the layout
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddSchedule;
