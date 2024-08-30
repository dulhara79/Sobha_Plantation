import React from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
      // Check if the values have the correct date format
      const payload = {
        ...values,
        startDate: values.startDate ? moment(values.startDate).toISOString() : null,
        endDate: values.endDate ? moment(values.endDate).toISOString() : null,
      };

      // Send POST request to the API
      await axios.post('http://localhost:5000/api/yield', payload);
      notification.success({
        message: 'Success',
        description: 'Yield Record added successfully!',
      });
      form.resetFields();
      navigate('/harvest/yield');
    } catch (error) {
      // Log detailed error information
      console.error('Failed to add yield record:', error.response || error.message);
      notification.error({
        message: 'Error',
        description: `Failed to add yield record. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Yield Records</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
             <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please enter the age of Yield Date!' }]}
          >
            <Input type="number" placeholder="Enter " />
          </Form.Item>
          <Form.Item
            label="Crop Type "
            name="cropType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select placeholder="Select a crop type">
              <Option value="coconut">Coconut</Option>
              <Option value="banana">Banana</Option>
              <Option value="pepper">Pepper</Option>
              <Option value="papaya">Papaya</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Harvest Date"
            name="harvestdate"
            rules={[{ required: true, message: 'Please select the harvest date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Age of Yield Datentity"
            name="ageofYieldDate"
            rules={[{ required: true, message: 'Please enter the age of Yield Date!' }]}
          >
            <Input type="number" placeholder="Enter age" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the age of Yield Date!' }]}
          >
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>
          <Form.Item
            label="Way Picked"
            name="wayPicked"
            rules={[{ required: true, message: 'Please enter the age of Yield Date!' }]}
          >
            <Input type="string" placeholder="Enter Way Picked" />
          </Form.Item>
          <Form.Item
            label="Trees Picked"
            name="treesPicked"
            rules={[{ required: true, message: 'Please enter the age of Trees Picked!' }]}
          >
            <Input type="string" placeholder="Enter Trees Picked" />
          </Form.Item>
          <Form.Item
            label="TStorage Location"
            name="storageLocation"
            rules={[{ required: true, message: 'Please enter the age of Storage Location!' }]}
          >
            <Input type="string" placeholder="Enter Storage Location" />
          </Form.Item>

          

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Records
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddSchedule;
