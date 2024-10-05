import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const AddMaintenance = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validateProgress = (_, value) => {
    if (value < 0 || value > 100) {
      return Promise.reject(new Error("Progress Rate must be between 0 and 100"));
    }
    return Promise.resolve();
  };

  const [fieldValidity, setFieldValidity] = useState({
    dateOfMaintenance: false,
    task: false,
    managerInCharge: false,
    progress: false,
  });

  const handleFieldChange = (changedFields) => {
    const updatedFieldValidity = { ...fieldValidity };
    Object.keys(changedFields).forEach((field) => {
      updatedFieldValidity[field] = !!changedFields[field];
    });
    setFieldValidity(updatedFieldValidity);
  }; 

  const disableFutureDates = (current) => {
    return current && current > moment().endOf("day");
  };

  const alphabeticNumericRule = [
    {
      pattern: /^[a-zA-Z0-9\s]*$/,
      message: "Only alphabetic characters and numbers are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const alphabeticRule = [
    {
      pattern: /^[a-zA-Z\s]*$/,
      message: "Only alphabetic characters are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const numericRule = [
    {
      pattern: /^[0-9]/,
      message: "Only numeric characters are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
    {
      validator: validateProgress,
    }

  ];

    // Alphabetic characters only (A-Z, a-z, space)
const handleAlphabeticKeyPress = (e) => {
  const regex = /^[A-Za-z\s]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphabetic characters
    setErrorMessage("Only alphabetic characters are allowed."); // Set error message
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Numeric characters only (0-9)
const handleNumericKeyPress = (e) => {
  const regex = /^[0-9%]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-numeric characters
    setErrorMessage("Only numeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Alphanumeric characters only (A-Z, a-z, 0-9)
const handleAlphanumericKeyPress = (e) => {
  const regex = /^[A-Za-z0-9\s%]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphanumeric characters
    setErrorMessage("Only alphanumeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const { dateOfMaintenance, task, managerInCharge, progress } = values;

      await axios.post("http://localhost:5000/api/regularMaintenance", {
        dateOfMaintenance,
        task,
        managerInCharge,
        progress
      });

      notification.success({
        message: "Success",
        description: "Maintenance record added successfully.",
      });
      setLoading(false);
      form.resetFields();

      navigate("/RegularMaintenance");
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "An error occurred",
        description: "An error occurred while adding the maintenance record.",
      });
    }
  };

  const handleCancel = () => {
    navigate("/RegularMaintenance");
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          <nav className="flex items-center justify-between p-4 bg-transparent">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
              <Link
                to="/diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Home
              </Link>
              <Link
                to="/CoconutInspections"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Inspections
              </Link>
              <Link
                to="/CoconutTreatments"
                className="text-[#236A64] font-semibold"
              >
                Treatments
              </Link>
              <Link
                to="/CoconutPests"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pests and Diseases
              </Link>
              <Link
                to="/RegularMaintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              {/* <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link> */}
            </div>
          </nav>

          <div className="mt-4">
            <Breadcrumb
              items={[
                {
                  href: "/diseases",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Add New Record for Maintenance",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              New Maintenance Record
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
              onValuesChange={(_, values) => handleFieldChange(values)}
            >
              <Form.Item
                label="Date of Maintenance"
                name="dateOfMaintenance"
                rules={[
                  {
                    required: true,
                    message: "Please select a date of maintenance.",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disableFutureDates}
                  onChange={(date, dateString) => {
                    if (date && date > moment()) {
                      form.setFields([
                        {
                          name: "dateOfMaintenance",
                          errors: [
                            "Please select a date that is not in the future.",
                          ],
                        },
                      ]);
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Task"
                name="task"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter the task"
                  disabled={!fieldValidity.dateOfMaintenance}
                  onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Manager in Charge"
                name="managerInCharge"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter the name of the manager in charge"
                  disabled={!fieldValidity.task}
                  onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Progress"
                name="progress"
                rules={[
                  {
                    required: true,
                    message: "Please select the progress status.",
                  },
                ]}
              >
                <Select placeholder="Select progress status" disabled={!fieldValidity.managerInCharge}>
                  <Option value="Pending">Pending</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>


              <div className="flex justify-center mt-4 space-x-4">
              <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: "#236A64", color: "#fff" }}
                  disabled={!fieldValidity.progress}
                >
                  Submit
                </Button>
                <Button type="default" htmlType="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenance;
