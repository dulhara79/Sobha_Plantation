import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddMaintenanceRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

  // Completion states for each field
  const [eqnameComplete, setEqnameComplete] = useState(false);
  const [referredDateComplete, setReferredDateComplete] = useState(false);
  const [quantityComplete, setQuantityComplete] = useState(false);
  const [referredLocationComplete, setReferredLocationComplete] = useState(false);
  const [receivedDateComplete, setReceivedDateComplete] = useState(false);
  const [statusComplete, setStatusComplete] = useState(false);

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Extract form values
      const { reffereddate, eqname, quantity, referredlocation, receiveddate, status } = values;

      await axios.post('http://localhost:5000/api/maintenance', {
        reffereddate,
        eqname,
        quantity,
        referredlocation,
        receiveddate,
        status,
      });

      // Handle success
      notification.success({
        message: 'Success',
        description: 'Maintenance record added successfully!',
      });
      setLoading(false);
      form.resetFields();  // Optionally reset the form after successful submission

      // Navigate to /Inventory/MaintenanceRecords page after successful submission
      navigate('/Inventory/MaintenanceRecords');
    } catch (error) {
      console.error('Error adding maintenance record:', error);
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'There was an error adding the maintenance record.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Maintenance Records</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={(changedFields, allFields) => {
            // Check completion status based on the form values
            const values = form.getFieldsValue();

            setEqnameComplete(!!values.eqname);
            setReferredDateComplete(!!values.reffereddate);
            setQuantityComplete(!!values.quantity);
            setReferredLocationComplete(!!values.referredlocation);
            setReceivedDateComplete(!!values.receiveddate);
            setStatusComplete(!!values.status);
          }}
        >
          {/* Equipment/Machine */}
          <Form.Item
            label="Equipment/Machine"
            name="eqname"
            rules={[{ required: true, message: 'Please select Equipment/Machine name!' }]}
          >
            <Select placeholder="Select a Equipment/Machine name">
              <Option value="Bush cutter">Bush cutter</Option>
              <Option value="4L diesel cans">4L diesel cans</Option>
              <Option value="Metal chemical sprayer">Metal chemical sprayer</Option>
              <Option value="4hp diesel water pump">4hp diesel water pump</Option>
              <Option value="Boots pairs">Boots pairs</Option>
              <Option value="8hp petrol hand tractor">8hp petrol hand tractor</Option>
              <Option value="1hp tube well pump">1hp tube well pump</Option>
            </Select>
          </Form.Item>

          {/* Referred Date */}
          <Form.Item
            label="Referred Date"
            name="reffereddate"
            rules={[{ required: true, message: 'Please select the referred date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabled={!eqnameComplete} // Enable only when eqname is selected
              disabledDate={disablePastDates}
            />
          </Form.Item>

          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: 'Please enter the quantity!' },
              { pattern: /^\d+$/, message: 'Quantity must be numeric' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (parseInt(value) >= 1 && parseInt(value) <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Quantity must be between 1 and 100!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter quantity" type="number" disabled={!referredDateComplete} />
          </Form.Item>

          {/* Referred Location */}
          <Form.Item
            label="Referred Location"
            name="referredlocation"
            rules={[{ required: true, message: 'Please enter the referred location!' }]}
          >
            <Input placeholder="Enter Referred Location" disabled={!quantityComplete} />
          </Form.Item>

          {/* Received Date */}
          <Form.Item
            label="Received Date"
            name="receiveddate"
            rules={[{ required: true, message: 'Please select the received date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabled={!referredLocationComplete} // Enable only when referred location is completed
              disabledDate={disablePastDates}
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status" disabled={!receivedDateComplete}>
              <Option value="progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} disabled={!statusComplete}>
              Add Records
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddMaintenanceRecord;
