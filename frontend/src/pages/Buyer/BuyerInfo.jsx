import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification, Select, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const AddInfoRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isNextFieldDisabled, setIsNextFieldDisabled] = useState({
    lastName: true,
    userName: true,
    password: true,
    confirmPassword: true,
    gender: true,
    dob: true,
    number: true,
    email: true,
  });

  // Validation rules
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
  // const numericRule = [
  //   {
  //     pattern: /^[0-9]*$/,
  //     message: "Only numbers are allowed.",
  //   },
  //   {
  //     required: true,
  //     message: "This field is required.",
  //   },
  // ];

  const emailRule = [
    {
      type: "email",
      message: "The input is not a valid E-mail!",
    },
    {
      required: true,
      message: "Please input your E-mail!",
    },
  ];

  const passwordRule = [
    {
      required: true,
      message: "Please enter a password.",
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "Password must be at least 8 characters, include one uppercase letter, and one number.",
    },
  ];
  

  const confirmPasswordRule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("Password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  const phoneRule = [
    {
      pattern: /^[0-9]{10}$/,
      message: "Phone number must be exactly 10 digits.",
    },
    {
      required: true,
      message: "Please enter your phone number.",
    },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const { firstName, lastName, userName, Password, ConfirmPassword, Gender, DOB, Number, email } = values;

      await axios.post("http://localhost:8090/api/buyerInfo", {
        firstName,
        lastName,
        userName,
        Password,
        ConfirmPassword,
        Gender,
        DOB: DOB.format("YYYY-MM-DD"), 
        Number,
        email,
      });

      notification.success({
        message: "Record created successfully",
        description: "Record has been added successfully",
      });
      setLoading(false);
      form.resetFields();
      navigate("/buyerinfotable");
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "An error occurred",
        description: "An error occurred while creating the record",
      });
    }
  };

  const handleFieldChange = (changedValues) => {
    const fieldName = Object.keys(changedValues)[0];
    const fieldValid = form.getFieldValue(fieldName) && form.isFieldTouched(fieldName);

    switch (fieldName) {
      case "firstName":
        setIsNextFieldDisabled((prev) => ({ ...prev, lastName: !fieldValid }));
        break;
      case "lastName":
        setIsNextFieldDisabled((prev) => ({ ...prev, userName: !fieldValid }));
        break;
      case "userName":
        setIsNextFieldDisabled((prev) => ({ ...prev, password: !fieldValid }));
        break;
      case "Password":
        setIsNextFieldDisabled((prev) => ({ ...prev, confirmPassword: !fieldValid }));
        break;
      case "ConfirmPassword":
        setIsNextFieldDisabled((prev) => ({ ...prev, gender: !fieldValid }));
        break;
      case "Gender":
        setIsNextFieldDisabled((prev) => ({ ...prev, dob: !fieldValid }));
        break;
      case "DOB":
        setIsNextFieldDisabled((prev) => ({ ...prev, number: !fieldValid }));
        break;
      case "Number":
        setIsNextFieldDisabled((prev) => ({ ...prev, email: !fieldValid }));
        break;
      default:
        break;
    }
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
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
                  title: "Add New Buyer Record ",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">Add New Buyer Record</h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
              onValuesChange={handleFieldChange}
            >
              <Form.Item label="First Name" name="firstName" rules={alphabeticRule}>
                <Input placeholder="Enter first name" />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName" rules={alphabeticRule}>
                <Input placeholder="Enter last name" disabled={isNextFieldDisabled.lastName} />
              </Form.Item>

              <Form.Item label="User Name" name="userName" rules={alphabeticNumericRule}>
                <Input placeholder="Enter User Name" disabled={isNextFieldDisabled.userName} />
              </Form.Item>

              <Form.Item
  label="Password"
  name="Password"
  rules={passwordRule}
>
  <Input.Password placeholder="Enter a Password" disabled={isNextFieldDisabled.password} />
</Form.Item>


              <Form.Item
  label="Confirm Password"
  name="ConfirmPassword"
  dependencies={['Password']}
  rules={[confirmPasswordRule]}
>
  <Input.Password placeholder="Confirm your Password" disabled={isNextFieldDisabled.confirmPassword} />
</Form.Item>


              <Form.Item label="Gender" name="Gender" rules={[{ required: true, message: "Please select your gender" }]}>
                <Select placeholder="Select your Gender" disabled={isNextFieldDisabled.gender}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Prefer not to say"</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="DOB" rules={[{ required: true, message: "Please select your date of birth" }]}>
                <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} disabled={isNextFieldDisabled.dob} />
              </Form.Item>

              <Form.Item label="Number" name="Number" rules={phoneRule}>
                <Input placeholder="Enter your phone number" disabled={isNextFieldDisabled.number} />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={emailRule}>
                <Input placeholder="Enter your email" disabled={isNextFieldDisabled.email} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
                <Button type="default" onClick={() => navigate("/buyerinfotable")} className="ml-2">
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

export default AddInfoRecords;
