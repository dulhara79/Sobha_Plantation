import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const AddCoconutTreatments = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const validateProgress = (_, value) => {
    if (value < 0 || value > 100) {
      return Promise.reject(new Error("Health Rate must be between 0 and 100"));
    }
    return Promise.resolve();
  };

  const [fieldValidity, setFieldValidity] = useState({
    dateOfTreatment: false,
    pestOrDisease: false,
    treatmentMethod: false,
    healthRate: false,
    treatedBy: false,
    notes: false,
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
      pattern: /^[0-9%]/,
      message: "Only numeric characters are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
    {
      validator: validateProgress, // Between 0 and 100
    },
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
  const regex = /^[A-Za-z0-9\s]*$/;
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

      //Extract values from the form
      const { dateOfTreatment, pestOrDisease, treatmentMethod, healthRate, treatedBy, notes } = values;

      await axios.post("http://localhost:5000/api/treatments", {
        dateOfTreatment,
        pestOrDisease,
        treatmentMethod,
        healthRate,
        treatedBy,
        notes,
      });
   
      notification.success({
        message: "Record added successfully",
        description: "Record has been added successfully",
      });
      setLoading(false);
      form.resetFields();

      navigate("/CoconutTreatments");
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
      notification.error({
        message: "Failed to add record",
        description: "An error occurred while adding the record."
      });
    }
  };

  const handleCancel = () => {
    navigate("/CoconutTreatments");
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
                  title: "Add New Record for Coconut Treatments",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Treatment Records - Coconuts
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
              onValuesChange={(_, values) => handleFieldChange(values)}
            >
              <Form.Item
                label="Date of Treatment"
                name="dateOfTreatment"
                rules={[
                  {
                    required: true,
                    message: "Please select a date of treatment.",
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
                          name: "dateOfTreatment",
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
                label="Pest or Disease"
                name="pestOrDisease"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter the pest or disease treated"
                  disabled={!fieldValidity.dateOfTreatment}
                  onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Treatment Method"
                name="treatmentMethod"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="Enter the treatment method"
                  disabled={!fieldValidity.pestOrDisease}
                  onKeyPress={handleAlphanumericKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Current Health Rate"
                name="healthRate"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter the current health rate"
                  disabled={!fieldValidity.treatmentMethod}
                  onKeyPress={handleNumericKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Treated By"
                name="treatedBy"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter name of the person who treated"
                  disabled={!fieldValidity.healthRate}
                  onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Notes"
                name="notes"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="If treatments are over, press More and add a detailed overview"
                  disabled={!fieldValidity.treatedBy}
                  onKeyPress={handleAlphanumericKeyPress}
                />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: "#236A64", color: "#fff" }}
                  disabled={!fieldValidity.notes}
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

export default AddCoconutTreatments;
