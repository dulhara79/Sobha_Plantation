import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Select, TimePicker, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddHarvestSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

  // Define disableFields state (or object)
  const [disableFields, setDisableFields] = useState({
    harvestDate: false,
    startTime: false,
    endTime: false,
    fieldNumber: false,
    numberOfWorkers: false,
  });

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Extract form values
      const { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers } = values;

      // Log the values to ensure they are correct
      console.log('Form Values:', values);
      console.log('Start Time:', startTime ? startTime.format('HH:mm') : 'Not Provided');
      console.log('End Time:', endTime ? endTime.format('HH:mm') : 'Not Provided');

      // Post request with formatted time values
      await axios.post('http://localhost:5000/api/harvest', {
        cropType,
        harvestDate,
        startTime: startTime ? startTime.format('HH:mm') : null,
        endTime: endTime ? endTime.format('HH:mm') : null,
        fieldNumber,
        numberOfWorkers
      });

      // Handle success
      notification.success({
        message: 'Success',
        description: 'Harvest Schedule added successfully!',
      });
      setLoading(false);
      form.resetFields();  // Optionally reset the form after successful submission

      // Navigate to /harvest/harvest-schedule page after successful submission
      navigate('/harvest/harvest-schedule');
    } catch (error) {
      console.error('Error adding harvest schedule:', error);
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'There was an error adding the harvest schedule.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Harvest Schedule</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          {/* Crop Type */}
          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: "Please select a crop type!" }]}
          >
            <Select placeholder="Select a crop type">
              <Option value="Coconut">Coconut</Option>
              <Option value="Banana">Banana</Option>
              <Option value="Pepper">Pepper</Option>
              <Option value="Papaya">Papaya</Option>
            </Select>
          </Form.Item>

          {/* Harvest Date */}
          <Form.Item
            label="Harvest Date"
            name="harvestDate"
            rules={[{ required: true, message: "Please select the harvest date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" disabledDate={disablePastDates} disabled={disableFields.harvestDate} />
          </Form.Item>

          {/* Start Time */}
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select the start time!" }]}
          >
            <TimePicker format="HH:mm" disabled={disableFields.startTime} />
          </Form.Item>

          {/* End Time */}
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[
              { required: true, message: "Please select the end time!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isAfter(getFieldValue("startTime"))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("End time must be after the start time!"));
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" disabled={disableFields.endTime} />
          </Form.Item>

          {/* Field Number */}
          <Form.Item
            label="Field Number"
            name="fieldNumber"
            rules={[{ required: true, message: "Please select a Field number" }]}
          >
            <Select placeholder="Select a Field number" disabled={disableFields.fieldNumber}>
              <Option value="AA1">AA1</Option>
              <Option value="BB1">BB1</Option>
              <Option value="CC1">CC1</Option>
              <Option value="DD1">DD1</Option>
            </Select>
          </Form.Item>

          {/* Number of Workers */}
          <Form.Item
            label="Number of Workers"
            name="numberOfWorkers"
            rules={[
              { required: true, message: "Number of workers is required" },
              { pattern: /^\d+$/, message: "Number of workers must be numeric" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Number of workers must be between 1 and 99!"));
                },
              }),
            ]}
          >
            <Input placeholder="Enter Number of Workers" type="number" disabled={disableFields.numberOfWorkers} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Schedule
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddHarvestSchedule;
