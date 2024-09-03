import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to validate progress value
  const validateProgress = (_, value) => {
    if (value < 0 || value > 100) {
      return Promise.reject(new Error('Progress must be between 0 and 100'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      // Prepare the payload with formatted dates
      const payload = {
        ...values,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      };

      // Send POST request to the API
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
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
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
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Scheduled">Scheduled</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Progress (%)"
            name="progress"
            rules={[
              { required: true, message: 'Please enter the progress!' },
              { validator: validateProgress },
            ]}
          >
            <Input type="number" placeholder="Enter progress percentage" />
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
