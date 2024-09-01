import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Select, TimePicker, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const postData = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/api/harvest", data);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle in handleSubmit
  }
};

const AddHarvestSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [disableFields, setDisableFields] = useState({
    cropType: true,
    harvestDate: true,
    startTime: true,
    endTime: true,
    fieldNumber: true,
    numberOfWorkers: true,
  });

  // Prevent selecting past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleFieldChange = (changedValues, allValues) => {
    setDisableFields({
      cropType: !allValues.harvestId,
      harvestDate: !allValues.cropType,
      startTime: !allValues.harvestDate,
      endTime: !allValues.startTime,
      fieldNumber: !allValues.endTime,
      numberOfWorkers: !allValues.fieldNumber,
    });
  };

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);

    const formattedData = {
      ...values,
      harvestDate: values.harvestDate
        ? moment(values.harvestDate).startOf("day").toISOString()
        : "",
      startTime: values.startTime ? values.startTime.format("HH:mm") : "",
      endTime: values.endTime ? values.endTime.format("HH:mm") : "",
    };

    console.log("Formatted Data:", formattedData);

    try {
      await postData(formattedData);
      notification.success({
        message: "Success",
        description: "Harvest schedule added successfully!",
      });
      form.resetFields();
      setDisableFields({
        cropType: true,
        harvestDate: true,
        startTime: true,
        endTime: true,
        fieldNumber: true,
        numberOfWorkers: true,
      });
      navigate("/harvest/harvest-schedule");
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to add harvest schedule. Please try again.",
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
          onValuesChange={handleFieldChange}
          scrollToFirstError
        >
          {/* Harvest ID */}
          <Form.Item
            label="Harvest ID"
            name="harvestId"
            rules={[
              { required: true, message: "Harvest ID is required" },
              { min: 3, message: "Harvest ID must be at least 3 characters long" },
              { pattern: /^[A-Za-z0-9]+$/, message: "Harvest ID can only include alphanumeric characters" },
            ]}
          >
            <Input placeholder="Enter Harvest ID" />
          </Form.Item>

          {/* Crop Type */}
          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: "Please select a crop type!" }]}
          >
            <Select placeholder="Select a crop type" disabled={disableFields.cropType}>
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
            rules={[
              { required: true, message: "Field number is required" },
              { pattern: /^\d+$/, message: "Field number must be numeric" },
              { min: 3, message: "Field number must have at least 3 digits" },
            ]}
          >
            <Input placeholder="Enter Field Number" disabled={disableFields.fieldNumber} />
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
