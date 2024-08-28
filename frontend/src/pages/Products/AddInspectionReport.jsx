import React from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddInspectionReport = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to validate inspector name
  const validateInspectorName = (_, value) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error('Inspector Name is required'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      // Convert inspectionDate to ISO string
      const payload = {
        ...values,
        inspectionDate: values.inspectionDate ? moment(values.inspectionDate).toISOString() : null,
      };

      // Send POST request to the API
      await axios.post('http://localhost:5000/api/quality-control', payload);
      notification.success({
        message: 'Success',
        description: 'Inspection report added successfully!',
      });
      form.resetFields();
      navigate('/products/quality-control');
    } catch (error) {
      // Log detailed error information
      console.error('Failed to add inspection report:', error.response?.data || error.message);
      notification.error({
        message: 'Error',
        description: `Failed to add inspection report. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Inspection Report</h2>
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
            label="Inspection Date"
            name="inspectionDate"
            rules={[{ required: true, message: 'Please select the inspection date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Inspector Name"
            name="inspectorName"
            rules={[
              { required: true, message: 'Please enter the inspector name!' },
              { validator: validateInspectorName },
            ]}
          >
            <Input placeholder="Enter inspector name" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Passed">Passed</Option>
              <Option value="Failed">Failed</Option>
              {/* Add more status options as needed */}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Report
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddInspectionReport;
