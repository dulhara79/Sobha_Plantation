import React, { useEffect } from "react";
import { Button, Form, Input, DatePicker, Select, TimePicker, notification } from "antd";
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
  const { id } = useParams();

  const disablePastAndFutureDates = (current) => {
    return current && (current < moment().startOf("day") || current > moment().endOf("year"));
  };

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/harvest/${id}`);
        const data = response.data;
        form.setFieldsValue({
          cropType: data.cropType,
          harvestDate: moment(data.harvestDate),
          startTime: moment(data.startTime, "HH:mm"),
          endTime: moment(data.endTime, "HH:mm"),
          fieldNumber: data.fieldNumber,
          numberOfWorkers: data.numberOfWorkers,
        });
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchRecord();
  }, [id, form]);

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
          harvestDate: values.harvestDate.format("YYYY-MM-DD"),
          startTime: values.startTime.format("HH:mm"),
          endTime: values.endTime.format("HH:mm"),
          fieldNumber: values.fieldNumber,
          numberOfWorkers: values.numberOfWorkers,
        };

        await axios.put(`http://localhost:5000/api/harvest/${id}`, payload);

        Swal.fire("Updated!", "The harvest schedule has been updated.", "success");
        navigate("/harvest/harvest-schedule");
      } catch (error) {
        console.error("Failed to update harvest:", error.response?.data);
        Swal.fire("Error", `Failed to update harvest. ${error.response?.data?.message || "Please try again."}`, "error");
      }
    } else {
      Swal.fire("Cancelled", "The update was cancelled", "info");
    }
  };

  // Function to check if the time is within valid range
  const validateTimeRange = (time) => {
    if (time) {
      const hour = time.hour();
      return hour >= 8 && hour <= 18;
    }
    return false;
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />

        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-center">Edit Harvest Schedule</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              {/* Crop Type */}
              <Form.Item
                label="Crop Type"
                name="cropType"
                rules={[{ required: true, message: "Please select a crop type!" }]}
              >
                <Select placeholder="Select a crop type" style={{ width: "100%" }}>
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Pepper">Pepper</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                </Select>
              </Form.Item>

              {/* Harvest Date */}
              <Form.Item
                label="Harvest Date"
                name="harvestDate"
                rules={[{ required: true, message: "Please select the harvest date!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastAndFutureDates}
                  style={{ width: "100%" }}
                  inputReadOnly
                />
              </Form.Item>
              <Form.Item
  label="Start Time"
  name="startTime"
  rules={[
    { required: true, message: "Please select the start time!" },
    {
      validator(_, value) {
        if (!validateTimeRange(value)) {
          return Promise.reject(new Error("Start time must be between 08:00 and 18:00!"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <TimePicker
    format="HH:mm"
    style={{ width: "100%" }}
    inputReadOnly
    onChange={(time) => {
      form.setFieldsValue({ startTime: time });
    }}
    disabledHours={() => {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        if (i < 8 || i > 18) {
          hours.push(i);
        }
      }
      return hours;
    }}
  />
</Form.Item>

<Form.Item
  label="End Time"
  name="endTime"
  rules={[
    { required: true, message: "Please select the end time!" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        const startTime = getFieldValue("startTime");
        if (!value || (startTime && value.isBefore(startTime.clone().add(1, "hour")))) {
          return Promise.reject(new Error("End time must be at least 1 hour after the start time!"));
        }
        return Promise.resolve();
      },
    }),
    {
      validator(_, value) {
        if (!validateTimeRange(value)) {
          return Promise.reject(new Error("End time must be between 08:00 and 18:00!"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <TimePicker
    format="HH:mm"
    style={{ width: "100%" }}
    inputReadOnly
    onChange={(time) => {
      form.setFieldsValue({ endTime: time });
    }}
    disabledHours={() => {
      const startTime = form.getFieldValue("startTime");
      const hours = [];
      if (startTime) {
        const startHour = startTime.hour();
        for (let i = 0; i < 24; i++) {
          if (i <= startHour || i < 8 || i > 18) {
            hours.push(i);
          }
        }
      }
      return hours;
    }}
  />
</Form.Item>


              {/* Field Number */}
              <Form.Item
                label="Field Number"
                name="fieldNumber"
                rules={[{ required: true, message: "Please select a field number!" }]}
              >
                <Select placeholder="Select a field number" style={{ width: "100%" }}>
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
                rules={[{ required: true, message: "Please specify the number of workers!" }]}
              >
                <Input type="number" placeholder="Enter number of workers" min={1} />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Update Schedule
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
