import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const { Option } = Select;

const EditHarvestSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the record ID from the route parameters

  const disablePastAndFutureDates = (current) => {
    return current && (current < moment().startOf("day") || current > moment().endOf("year"));
  };

  // Fetch harvest schedule data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/harvest/${id}`
        );
        const data = response.data;

        form.setFieldsValue({
          cropType: data.cropType,
          harvestdate: moment(data.harvestDate), // Ensure field name matches backend
          startTime: data.startTime,
          endTime: data.endTime,
          fieldNumber: data.fieldNumber,
          numberOfWorkers: data.numberOfWorkers,
        });
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchRecord();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the harvest schedule?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          cropType: values.cropType,
          harvestDate: values.harvestdate.format("YYYY-MM-DD"), // Ensure this matches backend
          startTime: values.startTime,
          endTime: values.endTime,
          fieldNumber: values.fieldNumber,
          numberOfWorkers: values.numberOfWorkers,
        };

        const response = await axios.put(
          `http://localhost:5000/api/harvest/${id}`,
          payload
        );

        Swal.fire(
          "Updated!",
          "The harvest schedule has been updated.",
          "success"
        );
        navigate("/harvest/harvest-schedule"); // Redirect after successful update
      } catch (error) {
        console.error("Failed to update harvest:", error.response?.data);
        Swal.fire(
          "Error",
          `Failed to update harvest. ${
            error.response?.data?.message || "Please try again."
          }`,
          "error"
        );
      }
    } else {
      Swal.fire("Cancelled", "The update was cancelled", "info");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />

        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-center">
              Edit Harvest Schedule
            </h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="Crop Type"
                name="cropType"
                rules={[
                  { required: true, message: "Please select a crop type!" },
                ]}
              >
                <Select placeholder="Select a crop type">
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Pepper">Pepper</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Harvest Date"
                name="harvestdate"
                rules={[
                  {
                    required: true,
                    message: "Please select the harvest date!",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastAndFutureDates}
                />
              </Form.Item>

              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please enter the Start Time!" },
                ]}
              >
                <Input type="time" placeholder="Enter Start Time" />
              </Form.Item>

              <Form.Item
                label="End Time"
                name="endTime"
                rules={[
                  { required: true, message: "Please enter End Time!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        moment(value, "HH:mm").isAfter(
                          moment(getFieldValue("startTime"), "HH:mm")
                        )
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("End time must be after Start Time!")
                      );
                    },
                  }),
                ]}
              >
                <Input type="time" placeholder="Enter End Time" />
              </Form.Item>

              <Form.Item
                label="Field Number"
                name="fieldNumber"
                rules={[
                  { required: true, message: "Please enter the Field Number!" },
                ]}
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
                rules={[
                  { required: true, message: "Number of workers is required!" },
                  {
                    pattern: /^\d+$/,
                    message: "Number of workers must be numeric",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const parsedValue = parseInt(value, 10);
                      if (!value || (parsedValue >= 1 && parsedValue <= 40)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Number of workers must be between 1 and 40!")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter Number of Workers"
                  onPaste={(e) => e.preventDefault()} // Prevent pasting
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Record
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHarvestSchedule;
