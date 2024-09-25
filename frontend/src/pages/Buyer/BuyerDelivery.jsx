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

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, address, city, country, postalCode, phone } = values;

      await axios.post("http://localhost:8090/api/deliveryRecords", {
        firstName,
        lastName,
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
    navigate("/BuyerDeliveryTable");
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
              {/* Your navigation links */}
            </div>
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
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  disabled={!isEmailEnabled}
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="Enter address"
                  onChange={handleAddressChange}
                  disabled={!isAddressEnabled}
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
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter your phone number"
                  disabled={!isPhoneEnabled}
                />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: "#236A64", color: "#fff" }}
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

export default AddDeliveryRecords;
