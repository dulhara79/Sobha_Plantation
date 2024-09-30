import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification, InputNumber } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2'; // Import SweetAlert2

const { Option } = Select;

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = ["productType", "quantity", "startDate", "endDate", "status", "progress"];

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

  const validateProgress = (_, value) => {
    const status = form.getFieldValue('status');
    if (status === 'Completed' && value !== 100) {
      return Promise.reject(new Error('Progress must be 100 when status is Completed'));
    }
    if (value < 0 || value > 100) {
      return Promise.reject(new Error('Progress must be between 0 and 100'));
    }
    return Promise.resolve();
  };

  const validateQuantity = (_, value) => {
    if (value === undefined || value === null) {
      return Promise.reject(new Error('Quantity is required.'));
    }
    if (value < 1) {
      return Promise.reject(new Error('Quantity must be at least 1.'));
    }
    if (value > 100) {
      return Promise.reject(new Error('Quantity must not exceed 100.'));
    }
    return Promise.resolve();
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/production/${id}`);
        const { data } = response;
        form.setFieldsValue({
          ...data,
          startDate: data.startDate ? moment(data.startDate) : null,
          endDate: data.endDate ? moment(data.endDate) : null,
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error fetching schedule',
        });
      }
    };

    fetchSchedule();
  }, [id, form]);

  const handleStatusChange = (status) => {
    if (status === 'Completed') {
      form.setFieldsValue({ progress: 100 }); // Auto-set progress to 100
    } else {
      form.setFieldsValue({ progress: undefined }); // Clear progress if status changes
    }
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

// Allow pasting only valid values
const handlePaste = (e, validationFn) => {
  const pasteData = e.clipboardData.getData('text');
  if (!validationFn(pasteData)) {
    e.preventDefault();
    notification.error({
      message: 'Invalid Paste',
      description: 'The pasted value is invalid for this field.',
    });
  }
};

  const handleSubmit = async (values) => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

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
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
      },
      focusCancel: false,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/production/${id}`, {
          ...values,
          startDate: values.startDate ? values.startDate.toISOString() : null,
          endDate: values.endDate ? values.endDate.toISOString() : null,
        });
        Swal.fire('Success', 'Production schedule updated successfully!', 'success');
        navigate('/products/production-overview');
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error updating schedule',
        });
      }
    }
  };

  const handleCancel = () => {
    navigate('/products/production-overview');
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Edit Production Schedule</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={handleFieldsError}
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select placeholder="Select a product type" 
            onChange={(value) => handleFieldChange("productType", value)}
            onPaste={(e) => handlePaste(e, value => ['coconut-oil', 'coconut-water', 'coconut-milk', 'coconut-cream', 'coir', 'shell-products'].includes(value))}
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
                onChange={(value) => handleFieldChange('quantity', value)}
                style={{ width: '100%' }}
                parser={(value) => value.replace(/\D/g, '')} // Only allow digits
                onKeyPress={(e) => {
                  const key = e.key;
                  const currentValue = e.target.value;

                  // Only allow numbers between 0-9
                  if (!/[0-9]/.test(key)) {
                    e.preventDefault(); // Prevent non-numeric input
                  }

                  // Prevent typing a value greater than 100 or less than 1
                  if ((currentValue === '' && key === '0') || parseInt(currentValue + key) > 100) {
                    e.preventDefault();
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;

                  // If the value exceeds 100, reset it to 100 or if it's less than 1, reset it to 1
                  if (value > 100) {
                    form.setFieldsValue({ quantity: 100 });
                  } else if (value < 1) {
                    form.setFieldsValue({ quantity: 1 });
                  }
                }}
                onPaste={(e) => handlePaste(e, value => !isNaN(value) && value >= 1 && value <= 100)}
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
              inputReadOnly // Disable manual input
              onChange={(date) => handleFieldChange("startDate", date)}
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
              inputReadOnly // Disable manual input
              onChange={(date) => handleFieldChange("endDate", date)}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
            onChange={(status) => {
              handleStatusChange(status);
              handleFieldChange("status", status);
            }}
          >
            <Select
              placeholder="Select status"
              onChange={(value) => {
                handleStatusChange(value);
                handleFieldChange('status', value);
              }}
              
            >
              <Option value="Scheduled">Scheduled</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Progress (%)"
            name="progress"
            rules={[
              { required: true, message: 'Progress is required!' },
              { type: 'number', min: 0, max: 100, message: 'Progress must be between 0 and 100!' },
            ]}
          >

          <InputNumber
                placeholder="Enter progress percentage"
                onChange={(value) => handleFieldChange('progress', value)}
                min={0}
                max={100}
                style={{ width: '100%' }}
                onKeyPress={(e) => {
                  const key = e.key;
                  const currentValue = e.target.value;

                  // Only allow numbers between 0-9
                  if (!/[0-9]/.test(key)) {
                    e.preventDefault();
                  }

                  // Prevent typing a value greater than 100
                  if (currentValue + key > 100 || currentValue + key < 0) {
                    e.preventDefault();
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;

                  // If the value exceeds 100, reset it to 100 or if it's less than 0, reset it to 0
                  if (value > 100) {
                    form.setFieldsValue({ progress: 100 });
                  } else if (value < 0) {
                    form.setFieldsValue({ progress: 0 });
                  }
                }}
                onPaste={(e) => handlePaste(e, value => !isNaN(value) && value >= 0 && value <= 100)}
            />
          </Form.Item>

          <div className="flex justify-between mt-4">
            <Button type="primary" htmlType="submit" 
            style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}>
              Update Shedule
            </Button>
            <Button type="default" onClick={handleCancel}
            style={{ width: '48%' }}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditSchedule;
