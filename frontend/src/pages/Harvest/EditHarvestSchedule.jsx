import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditHarvestSchedule = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the record ID from the route parameters

  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Fetch harvest schedule data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/harvest/${id}`);
        const data = response.data;

        setRecord(data);
        form.setFieldsValue({
          cropType: data.cropType,
          harvestdate: moment(data.harvestDate), // Ensure field name matches backend
          startTime: data.startTime,
          endTime: data.endTime,
          fieldNumber: data.fieldNumber,
          numberOfWorkers: data.numberOfWorkers,
        });
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Prepare payload with the correct date format
      const payload = {
        cropType: values.cropType,
        harvestDate: values.harvestdate.format('YYYY-MM-DD'), // Ensure this matches backend
        startTime: values.startTime,
        endTime: values.endTime,
        fieldNumber: values.fieldNumber,
        numberOfWorkers: values.numberOfWorkers,
      };
  
      console.log('Submitting payload:', payload);
  
      // Send PUT request to update the record
      const response = await axios.put(`http://localhost:5000/api/harvest/${id}`, payload);
  
      notification.success({
        message: 'Success',
        description: 'Harvest updated successfully!',
      });
      navigate('/harvest/harvest-schedule'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Failed to update harvest:', error.response?.data);
      notification.error({
        message: 'Error',
        description: `Failed to update harvest. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Harvest Schedule</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: 'Please select a crop type!' }]}
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
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: 'Please enter the Start Time!' }]}
          >
            <Input type="time" placeholder="Enter Start Time" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: 'Please enter End Time!' }]}
          >
            <Input type="time" placeholder="Enter End Time" />
          </Form.Item>

          <Form.Item
            label="Field Number"
            name="fieldNumber"
            rules={[{ required: true, message: 'Please enter the Field Number!' }]}
          >
            <Select placeholder="Select a field number">
              <Option value="AA1">AA1</Option>
              <Option value="BB1">BB1</Option>
              <Option value="CC1">CC1</Option>
              <Option value="DD1">DD1</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of Workers"
            name="numberOfWorkers"
            rules={[{ required: true, message: 'Please enter the Number of Workers!' }]}
          >
            <Input type="number" placeholder="Enter Number of Workers" />
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

export default EditHarvestSchedule;
