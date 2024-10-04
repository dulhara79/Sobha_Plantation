import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditMaintenanceRecord = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Fetch record data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/maintenance/${id}`);
        const data = response.data;
        setRecord(data);

        // Convert dates to moment objects if they are valid
        const refferedDate = moment(data.reffereddate);
        const receivedDate = moment(data.receiveddate);

        if (refferedDate.isValid() && receivedDate.isValid()) {
          form.setFieldsValue({
            ...data,
            reffereddate: refferedDate,
            receiveddate: receivedDate,
          });
        } else {
          console.error('Invalid date format:', data.reffereddate, data.receiveddate);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      // Prepare payload with the correct date format
      const payload = {
        ...values,
        reffereddate: values.reffereddate ? moment(values.reffereddate).toISOString() : null,
        receiveddate: values.receiveddate ? moment(values.receiveddate).toISOString() : null,
      };

      // Send PUT request to update the record
      await axios.put(`http://localhost:5000/api/maintenance/${id}`, payload);

      notification.success({
        message: 'Success',
        description: 'Maintenance Record updated successfully!',
      });
      navigate('/Inventory/MaintenanceRecords'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Failed to update maintenance record:', error);
      notification.error({
        message: 'Error',
        description: `Failed to update maintenance record. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Maintenance Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Referred Date"
            name="reffereddate"
            rules={[{ required: true, message: 'Please select the referred date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

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

          <Form.Item
  label="Quantity"
  name="quantity"
  rules={[
    { required: true, message: 'Please enter the quantity!' },
    {
      validator(_, value) {
        if (!value || /^[1-9]\d*$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Quantity must be a whole number greater than 0!'));
      },
    },
  ]}
>
  <Input placeholder="Enter quantity" type="number" min={1} step={1} />
</Form.Item>

          <Form.Item
  label="Referred Location"
  name="referredlocation"
  rules={[
    { required: true, message: 'Please enter the referred location!' },
    {
      pattern: /^[A-Za-z\s&]+$/,
      message: 'Referred location can only contain letters, spaces, and the "&" symbol!',
    },
  ]}
>
  <Input type="text" placeholder="Enter referred location" />
</Form.Item>


          <Form.Item
            label="Received Date"
            name="receiveddate"
            rules={[{ required: true, message: 'Please select the received date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

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

export default EditMaintenanceRecord;
