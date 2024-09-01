import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditInspectionReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Function to disable past dates
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

  useEffect(() => {
    const fetchInspectionReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quality-control/${id}`);
        const { data } = response;
        form.setFieldsValue({
          ...data,
          inspectionDate: data.inspectionDate ? moment(data.inspectionDate) : null,
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error fetching inspection report',
        });
      }
    };

    fetchInspectionReport();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/quality-control/${id}`, {
        ...values,
        inspectionDate: values.inspectionDate ? values.inspectionDate.toISOString() : null,
      });
      notification.success({
        message: 'Success',
        description: 'Inspection report updated successfully!',
      });
      navigate('/products/quality-control');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error updating inspection report',
      });
    }
  };

  const handleCancel = () => {
    navigate('/products/quality-control');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Inspection Report</h2>
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

          <Form.Item
            label="Inspection Date"
            name="inspectionDate"
            rules={[{ required: true, message: 'Please select the inspection date!' }]}
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
            <Select placeholder="Select status" style={{ width: '100%' }}>
              <Option value="Passed">Pass</Option>
              <Option value="Failed">Fail</Option>
            </Select>
          </Form.Item>

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
              <Button type="primary" htmlType="submit" style={{ width: '48%' }}>
                Update Report
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

export default EditInspectionReport;
