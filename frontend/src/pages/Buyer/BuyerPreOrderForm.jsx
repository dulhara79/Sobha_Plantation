import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const AddPreOrderRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State to track which fields are enabled
  const [isPhoneNumberEnabled, setIsPhoneNumberEnabled] = useState(false);
  const [isAddressEnabled, setIsAddressEnabled] = useState(false);
  const [isProductTypeEnabled, setIsProductTypeEnabled] = useState(false);
  const [isProductQuantityEnabled, setIsProductQuantityEnabled] = useState(false);
  const [isorderDateEnabled, setIsorderDateEnabled] = useState(false);

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
      pattern: /^[0-9]{10}$/,
      message: "Phone number must be exactly 10 digits.",
    },
    {
      required: true,
      message: "This field is required.",
    },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { name, phoneNumber, address, productType, productQuantity, orderDate } = values;

      await axios.post("http://localhost:8090/api/buyerPreOrder", {
        name,
        phoneNumber,
        address,
        productType,
        productQuantity,
        orderDate,
      });

      notification.success({
        message: "Record created successfully",
        description: "Record has been added successfully",
      });
      setLoading(false);
      form.resetFields();
      navigate("/preorders");
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "An error occurred",
        description: "An error occurred while creating the record",
      });
    }
  };

  const handleNameChange = (e) => {
    setIsPhoneNumberEnabled(!!e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setIsAddressEnabled(!!e.target.value);
  };

  const handleAddressChange = (e) => {
    setIsProductTypeEnabled(!!e.target.value);
  };

  const handleProductTypeChange = (value) => {
    setIsProductQuantityEnabled(!!value);
  };

  const handleProductQuantityChange = (e) => {
    setIsorderDateEnabled(!!e.target.value);
  };

  const handleCancel = () => {
    navigate("/preorders");
  };

  const restrictInputToNumbers = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault();
    }
  };

  const restrictInputToLetters = (e) => {
    const key = e.key;
    if (!/[a-zA-Z]/.test(key)) {
      e.preventDefault();
    }
  };

  const restrictInputToAlphanumeric = (e) => {
    const key = e.key;
    if (!/^[a-zA-Z0-9]*$/.test(key)) {
      e.preventDefault();
    }
  };

  const preventNonNumericPaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    if (!/^[0-9]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  const preventNonAlphabeticPaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    if (!/^[a-zA-Z\s]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  // Address field input handler: allows letters, numbers, spaces, and "/"
  const restrictInputForAddress = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[a-zA-Z0-9/\s]/.test(char)) {
      e.preventDefault();
    }
  };

  const preventInvalidAddressPaste = (e) => {
    const clipboardData = e.clipboardData.getData("text/plain");
    if (!/^[a-zA-Z0-9/\s]*$/.test(clipboardData)) {
      e.preventDefault();
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
                  title: "Add New PreOrder ",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Add New PreOrder Record
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={alphabeticRule}
              >
                <Input 
                  placeholder="Enter Name" 
                  onChange={handleNameChange} 
                  onKeyPress={restrictInputToLetters} 
                  onPaste={preventNonAlphabeticPaste} 
                />
              </Form.Item>
              
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={phoneRule}
              >
                <Input
                  placeholder="Enter your phone number"
                  disabled={!isPhoneNumberEnabled}
                  onChange={handlePhoneNumberChange}
                  onKeyPress={restrictInputToNumbers}
                  onPaste={preventNonNumericPaste} 
                  maxLength={10}
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
                  disabled={!isAddressEnabled}
                  onChange={handleAddressChange}
                  onKeyPress={restrictInputForAddress} 
                  onPaste={preventInvalidAddressPaste} 
                  
                />
              </Form.Item>

              <Form.Item
                label="Product Type"
                name="productType"
                rules={[{ required: true, message: "Please select your product type" }]}
              >
                <Select
                  placeholder="Select your product type"
                  onChange={handleProductTypeChange}
                  disabled={!isProductTypeEnabled}
                >
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                  <Option value="BlackPepper">Black Pepper</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Product Quantity (Kg)"
                name="productQuantity"
                rules={numericRule}
              >
                <Input
                  placeholder="Enter product quantity"
                  disabled={!isProductQuantityEnabled}
                  onChange={handleProductQuantityChange}
                  onKeyPress={restrictInputToNumbers}
                  onPaste={preventNonNumericPaste} 
                />
              </Form.Item>

              <Form.Item
                label="Order Date"
                name="orderDate"
                rules={[
                  {
                    required: true,
                    message: "Please select your order date",
                  },
                  {
                    validator: (_, value) =>
                      value && dayjs(value).isBefore(dayjs().add(1, "day"), "day")
                        ? Promise.reject(new Error("Past dates and today's date are not allowed"))
                        : Promise.resolve(),
                  },
                ]}
              >
                <Input
                  type="date"
                  disabled={!isorderDateEnabled}
                  min={dayjs().add(1, "day").format("YYYY-MM-DD")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCancel}
                  className="ml-4"
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreOrderRecords;
