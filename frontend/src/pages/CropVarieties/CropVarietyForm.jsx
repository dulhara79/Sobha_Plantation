import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, notification } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const CropVarietyForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('Form Values:', values);

      // Format plantationDate to ISO string
      const payload = {
        ...values,
        plantationDate: moment(values.plantationDate).toISOString(),
      };

      console.log('Payload to be sent:', payload);

      const response = await axios.post('http://localhost:5000/api/crop-varieties', payload);

      console.log('API Response:', response);

      notification.success({
        message: 'Success',
        description: 'Crop variety added successfully!',
      });

      form.resetFields();
      navigate('/varietyCrop');
    } catch (error) {
      console.error('API Error:', error);

      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        notification.error({
          message: 'Error',
          description: `Failed to add crop variety. Status: ${error.response.status}`,
        });
      } else if (error.request) {
        console.error('Error Request:', error.request);
        notification.error({
          message: 'Error',
          description: 'No response from server. Please try again later.',
        });
      } else {
        console.error('Error Message:', error.message);
        notification.error({
          message: 'Error',
          description: `Error Message: ${error.message}`,
        });
      }
    }
  };

  const validateAssignedPerson = (_, value) => {
    if (!value || /^[A-Za-z\s]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Assigned Person cannot include numbers or special characters.'));
  };

  const disabledDate = (current) => {
    // Disable past dates
    return current && current < moment().startOf('day');
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <LeftCircleOutlined onClick={() => navigate(-1)} className="text-lg cursor-pointer" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Plantation Form</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Assigned Person"
            name="assignedPerson"
            rules={[{ validator: validateAssignedPerson }]}
          >
            <Input placeholder="Enter Assigned Person" />
          </Form.Item>
          <Form.Item
            label="Field Name"
            name="fieldName"
            rules={[{ required: true, message: 'Please select a field name!' }]}
          >
            <Select placeholder="Select Field Name">
              <Option value="Field A">Field A</Option>
              <Option value="Field B">Field B</Option>
              <Option value="Field C">Field C</Option>
              <Option value="Field D">Field D</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Variety"
            name="varieties"
            rules={[{ required: true, message: 'Please select a variety!' }]}
          >
            <Select placeholder="Select Variety">
              <Option value="Dwarf Coconut">Dwarf Coconut</Option>
              <Option value="Tall Coconut">Tall Coconut</Option>
              <Option value="Hybrid Coconut">Hybrid Coconut</Option>
              <Option value="King Coconut">King Coconut</Option>
              <Option value="Banana">Banana</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Plantation Date"
            name="plantationDate"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              defaultValue={moment()}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select Status">
              <Option value="Planned">Planned</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button type="primary" htmlType="submit">Submit</Button>
              <Button type="default" htmlType="button" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CropVarietyForm;
