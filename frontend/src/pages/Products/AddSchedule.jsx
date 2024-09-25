import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
    try {
      const payload = {
        ...values,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      };

      await axios.post('http://localhost:5000/api/production', payload);
      notification.success({
        message: 'Success',
        description: 'Production schedule added successfully!',
      });
      form.resetFields();
      navigate('/products/production-overview');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to add production schedule. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  const handleCancel = () => {
    navigate('/products/production-overview');
  };


  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Add Production Schedule</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select placeholder="Select a product type">
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
            <Input
              type="number"
              placeholder="Enter quantity"
              min="1"
              max="100"
              onChange={(e) => {
                const value = e.target.value;

                // Validate to prevent starting with 0 and out of range values (1-100)
                if (value === '' || value < 1 || value > 100) {
                  form.setFieldsValue({ quantity: undefined }); // Clear invalid input
                }
              }}
              onKeyPress={(e) => {
                const charCode = e.charCode || e.keyCode;
                const value = e.target.value;

                // Prevent entering non-numeric characters and '0' as the first digit
                if (charCode < 48 || charCode > 57 || (value.length === 0 && charCode === 48)) {
                  e.preventDefault();
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
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status" onChange={handleStatusChange}>
              <Option value="Scheduled">Scheduled</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Progress (%)"
            name="progress"
            rules={[{ required: true, message: 'Progress is required!' }]}
          >
            <Input
              type="number"
              placeholder="Enter progress percentage"
              onChange={(e) => {
                const value = e.target.value;
                // Validate to prevent out of range values (0-100)
                if (!/^(100|[0-9]{1,2})$/.test(value)) {
                  form.setFieldsValue({ progress: undefined }); // Clear invalid input
                }
              }}
              onKeyPress={(e) => {
                const charCode = e.charCode || e.keyCode;
                if (charCode < 48 || charCode > 57) {
                  e.preventDefault(); // Prevent entering non-numeric characters
                }
              }}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button type="primary" htmlType="submit" style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}>
                Add Schedule
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

export default AddSchedule;
