import React from 'react';
import { Button, Form, Input, DatePicker, Select, TimePicker, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const postData = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/harvest', data);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle in handleSubmit
  }
};

const AddHarvestSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Prevent selecting past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  const handleSubmit = async (values) => {
    // Log values to check if all data is present
    console.log('Form Values:', values);

    const formattedData = {
      ...values,
      harvestDate: values.harvestDate ? moment(values.harvestDate).startOf('day').toISOString() : '', // Ensure the date is in the correct format
      startTime: values.startTime ? values.startTime.format('HH:mm') : '',
      endTime: values.endTime ? values.endTime.format('HH:mm') : '',
    };

    console.log('Formatted Data:', formattedData);

    try {
      await postData(formattedData);
      notification.success({
        message: 'Success',
        description: 'Harvest schedule added successfully!',
      });
      form.resetFields();
      navigate('/harvest/harvest-schedule');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to add harvest schedule. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Harvest Schedule</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Harvest ID"
            name="harvestId"
            rules={[
              { required: true, message: 'Harvest ID is required' },
              { min: 3, message: 'Harvest ID must be at least 3 characters long' },
            ]}
          >
            <Input placeholder="Enter Harvest ID" minLength={3} />
          </Form.Item>

          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: 'Please select a crop type!' }]}
          >
            <Select placeholder="Select a crop type">
              <Option value="Coconut">Coconut</Option>
              <Option value="Banana">Banana</Option>
              <Option value="Pepper">Pepper</Option>
              <Option value="Papaya">Papaya</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Harvest Date"
            name="harvestDate"
            rules={[{ required: true, message: 'Please select the harvest date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" disabledDate={disablePastDates} />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: 'Please select the start time!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: 'Please select the end time!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Field Number"
            name="fieldNumber"
            rules={[
              { required: true, message: 'Field number is required' },
              { pattern: /^\d+$/, message: 'Field number must be numeric' },
              { min: 3, message: 'Field number must be greater than 0' },
            ]}
          >
            <Input placeholder="Enter Field Number" />
          </Form.Item>

          <Form.Item
            label="Estimated Yield"
            name="estimatedYield"
            rules={[
              { required: true, message: 'Estimated yield is required' },
              { pattern: /^\d+$/, message: 'Estimated yield must be numeric' },
            ]}
          >
            <Input placeholder="Enter Estimated Yield" type="number" />
          </Form.Item>

          <Form.Item
            label="Number of Workers"
            name="numberOfWorkers"
            rules={[
              { required: true, message: 'Number of workers is required' },
              { pattern: /^\d+$/, message: 'Number of workers must be numeric' },
            ]}
          >
            <Input placeholder="Enter Number of Workers" type="number" minLength={2} />
          </Form.Item>

          <Form.Item
            label="Harvest Method"
            name="harvestMethod"
            rules={[{ required: true, message: 'Please select the harvest method!' }]}
          >
            <Select placeholder="Select harvest method">
              <Option value="Manual">Manual</Option>
              <Option value="Mechanical">Mechanical</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Schedule
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddHarvestSchedule;
