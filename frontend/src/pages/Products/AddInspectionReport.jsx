import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification, Row, Col } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddInspectionReport = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Function to disable past dates but allow today
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to validate inspector name
  const validateInspectorName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter the inspector name'));
    }
    if (!/^[A-Z][a-z\s]*$/.test(value)) {
      return Promise.reject(new Error('Inspector name must start with an uppercase letter and only contain lowercase letters and spaces after the first letter'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        inspectionDate: values.inspectionDate ? values.inspectionDate.toISOString() : null,
      };
      await axios.post('http://localhost:5000/api/quality-control', payload);
      notification.success({
        message: 'Success',
        description: 'Inspection report added successfully!',
      });
      form.resetFields();
      navigate('/products/quality-control');
    } catch (error) {
      console.error('Error adding inspection report:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to add inspection report',
      });
    }
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
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select placeholder="Select a product type" style={{ width: '100%' }}>
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
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select the status!' }]}
              >
                <Select placeholder="Select status" style={{ width: '100%' }}>
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
              { required: true, message: 'Please enter the inspector name!' },
              { validator: validateInspectorName },
            ]}
          >
            <Input 
              placeholder="Enter inspector name" 
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button type="primary" htmlType="submit" style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}>
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
