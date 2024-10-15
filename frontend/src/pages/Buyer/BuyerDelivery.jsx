import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddDeliveryRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State to track which fields are enabled
  const [isLastNameEnabled, setIsLastNameEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isAddressEnabled, setIsAddressEnabled] = useState(false);
  const [isCityEnabled, setIsCityEnabled] = useState(false);
  const [isCountryEnabled, setIsCountryEnabled] = useState(false);
  const [isPostalCodeEnabled, setIsPostalCodeEnabled] = useState(false);
  const [isPhoneEnabled, setIsPhoneEnabled] = useState(false);
  const [contactNumber, setContactNumber] = useState("");

  // Define validation rules
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
      pattern: /^[0-9]*$/,
      message: "Only numbers are allowed.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const phoneRule = [
    {
      pattern: /^[0][0-9]{9}$/, // Must start with 0 and have exactly 10 digits
      message: "Phone number must start with 0 and be exactly 10 digits.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const emailRule = [
    {
      pattern: /^[a-zA-Z0-9@.]*$/,
      message: "Only letters, numbers, '@', and '.' are allowed.",
    },
    {
      required: true,
      message: "Please enter your email",
    },
  ];

  // Capitalize first letter of names
  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  // Submit form handler
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, address, city, country, postalCode, phone } = values;

      await axios.post("http://localhost:5000/api/deliveryRecords", {
        firstName: capitalizeFirstLetter(firstName),
        lastName: capitalizeFirstLetter(lastName),
        email,
        address,
        city,
        country,
        postalCode,
        phone,
      });

      notification.success({
        message: "Record created successfully",
        description: "Record has been added successfully",
      });
      setLoading(false);
      form.resetFields();
      navigate("/Bdeliverytable");
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "An error occurred",
        description: "An error occurred while creating the record",
      });
    }
  };

  // Field enablement handlers
  const handleFirstNameChange = (e) => {
    setIsLastNameEnabled(!!e.target.value);
  };

  const handleLastNameChange = (e) => {
    setIsEmailEnabled(!!e.target.value);
  };

  const handleEmailChange = (e) => {
    setIsAddressEnabled(!!e.target.value);
  };

  const handleAddressChange = (e) => {
    setIsCityEnabled(!!e.target.value);
  };

  const handleCityChange = (e) => {
    setIsCountryEnabled(!!e.target.value);
  };

  const handleCountryChange = (e) => {
    setIsPostalCodeEnabled(!!e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setIsPhoneEnabled(!!e.target.value);
  };

  const handleCancel = () => {
    navigate("/Bdeliverytable");
  };

  // Helper functions to restrict input and paste
  const restrictInputToNumbers = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault(); // Prevent any non-numeric key
    }
  };

  const restrictInputToLetters = (e) => {
    const key = e.key;
    if (!/[a-zA-Z]/.test(key)) {
      e.preventDefault(); // Prevent non-letter keys
    }
  };

  const restrictInputToAlphanumeric = (e) => {
    const key = e.key;
    if (!/^[a-zA-Z0-9]*$/.test(key)) {
      e.preventDefault(); // Prevent non-alphanumeric keys
    }
  };

  const restrictInputToEmailChars = (e) => {
    const key = e.key;
    if (!/[a-zA-Z0-9@.]/.test(key)) {
      e.preventDefault(); // Prevent invalid email characters
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("0") && value.length <= 10) {
      setContactNumber(value); // Only allow 10 digits starting with 0
    }
  };

  const preventNonAlphabeticPaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^[a-zA-Z\s]*$/.test(paste)) {
      e.preventDefault(); // Prevent non-alphabetic pastes
    }
  };

  const preventNonNumericPaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^[0-9]*$/.test(paste)) {
      e.preventDefault(); // Prevent non-numeric pastes
    }
  };

  const restrictInputForAddress = (e) => {
    const key = e.key;
    if (!/^[a-zA-Z0-9\s]*$/.test(key)) {
      e.preventDefault(); // Prevent non-alphanumeric characters in address
    }
  };

  const preventInvalidAddressPaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^[a-zA-Z0-9\s]*$/.test(paste)) {
      e.preventDefault(); // Prevent invalid address paste
    }
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
          </nav>

          <div className="mt-4">
            <Breadcrumb
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: "Add New Delivery Record",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Add New Delivery Record
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter first name"
                  onChange={handleFirstNameChange}
                  onKeyPress={restrictInputToLetters}
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter last name"
                  onChange={handleLastNameChange}
                  disabled={!isLastNameEnabled}
                  onKeyPress={restrictInputToLetters}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={emailRule}
              >
                <Input
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  disabled={!isEmailEnabled}
                  onKeyPress={restrictInputToEmailChars}
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { 
                    required: true, 
                    message: "Address is required." 
                  },
                ]}
              >
                <Input
                  placeholder="Enter address"
                  onChange={handleAddressChange}
                  disabled={!isAddressEnabled}
                  onKeyPress={restrictInputForAddress}
                  onPaste={preventInvalidAddressPaste}
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="Enter your city"
                  onChange={handleCityChange}
                  disabled={!isCityEnabled}
                  onKeyPress={restrictInputToAlphanumeric}
                />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={alphabeticRule}
              >
                <Input
                  placeholder="Enter your country"
                  onChange={handleCountryChange}
                  disabled={!isCountryEnabled}
                  onKeyPress={restrictInputToLetters}
                  onPaste={preventNonAlphabeticPaste}
                />
              </Form.Item>

              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter your postal code"
                  onChange={handlePostalCodeChange}
                  disabled={!isPostalCodeEnabled}
                  onKeyPress={restrictInputToNumbers}
                  onPaste={preventNonNumericPaste}
                  maxLength={5}
                />
              </Form.Item>

              <Form.Item
                label="Phone number"
                name="phone"
                rules={phoneRule}
              >
                <Input
                  placeholder="Enter phone number"
                  value={contactNumber}
                  onChange={handlePhoneChange}
                  disabled={!isPhoneEnabled}
                  maxLength={10}
                  onKeyPress={restrictInputToNumbers}
                />
              </Form.Item>

              <div className="flex justify-between mt-6">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryRecords;
