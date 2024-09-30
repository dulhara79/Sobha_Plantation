import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditRequestPaymentRecord = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const [formattedAmount, setFormattedAmount] = useState(''); // For formatted amount
  const navigate = useNavigate();
  const { id } = useParams();

  // Disable past dates
  const disablePastDates = (current) => current && current < moment().startOf('day');

  // Fetch record data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/requests/${id}`);
        const data = response.data;
        setRecord(data);

        const submittedDate = moment(data.submitteddate);
        if (submittedDate.isValid()) {
          form.setFieldsValue({
            ...data,
            submitteddate: submittedDate,
          });
        } else {
          console.error('Invalid date format:', data.submitteddate);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  // Format amount as Rs.100.00
  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formatted = parseFloat(value).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    setFormattedAmount(formatted.replace('₹', 'Rs.'));
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        submitteddate: values.submitteddate ? moment(values.submitteddate).toISOString() : null,
      };

      await axios.put(`http://localhost:5000/api/requests/${id}`, payload);

      notification.success({
        message: 'Success',
        description: 'Record updated successfully!',
      });
      navigate('/Inventory/RequestPaymentRecords');
    } catch (error) {
      console.error('Failed to update record:', error);
      notification.error({
        message: 'Error',
        description: `Failed to update record. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Request Payment Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          {/* Section */}
          <Form.Item
            label="Section"
            name="section"
            rules={[{ required: true, message: 'Please select a section!' }]}
          >
            <Select placeholder="Select a section">
              <Option value="fertilizer">Fertilizer</Option>
              <Option value="equipment">Equipment</Option>
              <Option value="agro chemical">Agro Chemical</Option>
            </Select>
          </Form.Item>

          {/* Item */}
          <Form.Item
            label="Item"
            name="item"
            rules={[{ required: true, message: 'Please select an item!' }]}
          >
            <Select placeholder="Select an item">
              <Option value="Coconut fertilizer">Coconut fertilizer</Option>
              <Option value="Banana fertilizer">Banana fertilizer</Option>
              <Option value="Pepper fertilizer">Pepper fertilizer</Option>
              <Option value="Papaya fertilizer">Papaya fertilizer</Option>
              <Option value="Urea">Urea</Option>
              <Option value="Dolomite">Dolomite</Option>
              {/* Add other options as needed */}
            </Select>
          </Form.Item>

          {/* Amount */}
          {/* Amount */}
<Form.Item
  label="Amount"
  name="amount"
  rules={[
    { required: true, message: 'Please enter the amount!' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Amount must be a numeric value' }, // Updated pattern to allow decimals
    ({ getFieldValue }) => ({
      validator(_, value) {
        const amount = parseFloat(value);
        if (!value || (amount >= 50.00 && amount <= 500000.00)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Amount must be between Rs.50.00 and Rs.500,000.00!'));
      },
    }),
  ]}
>
  <Input
    value={formattedAmount}
    onChange={handleAmountChange}
    placeholder="Enter amount"
    type="text" // Set type to text to allow formatted input
  />
</Form.Item>


          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
          >
            <Input type="text" placeholder="Enter description" />
          </Form.Item>

          {/* Submitted Date */}
          <Form.Item
            label="Submitted Date"
            name="submitteddate"
            rules={[{ required: true, message: 'Please select the submitted date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Paid">Paid</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Record
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditRequestPaymentRecord;
