import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddFertilizerRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

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

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
        setLoading(true);
        // Extract form values
        const { addeddate, fertilizertype, quantity, storagelocation,expireddate } = values;

        await axios.post('http://localhost:5000/api/fertilizers', {
          addeddate,
          fertilizertype,
          quantity,
          storagelocation,
          expireddate
        });
        
        // Handle success, reset loading or form fields if needed
        notification.success({
            message: 'Success',
            description: 'Fertilizer record added successfully!',
        });
        setLoading(false);
        form.resetFields();  // Optionally reset the form after successful submission

        // Navigate to /harvest/yield page after successful submission
        navigate('/Inventory/FertilizerRecords');
    } catch (error) {
        console.error('Error adding fertilizer record:', error);
        setLoading(false);
        notification.error({
            message: 'Error',
            description: 'There was an error adding the fertilizer record.',
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Fertilizer Records</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Fertilizer Type "
            name="fertilizertype"
            rules={[{ required: true, message: 'Please select a fertilizer type!' }]}
          >
            <Select placeholder="Select a fertilizer type">
              <Option value="coconut">Coconut</Option>
              <Option value="banana">Banana</Option>
              <Option value="pepper">Pepper</Option>
              <Option value="papaya">Papaya</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Added Date"
            name="addeddate"
            rules={[{ required: true, message: 'Please select the added date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>
         
        
          <Form.Item
            label="Storage Location"
            name="storagelocation"
            rules={[{ required: true, message: 'Please enter the storage location!' }]}
          >
            <Input placeholder="Enter Storage Location" />
          </Form.Item>

          <Form.Item
            label="Expired Date"
            name="expireddate"
            rules={[{ required: true, message: 'Please select the expired date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Records
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFertilizerRecord;