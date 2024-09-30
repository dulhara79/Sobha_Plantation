import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";  // Import dayjs for date validation

const { Option } = Select;

const AddInfoRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isNextFieldDisabled, setIsNextFieldDisabled] = useState({
    lastName: true,
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

      const { firstName, lastName, Gender, DOB, Number, email } = values;

      await axios.post("http://localhost:8090/api/buyerInfo", {
        firstName,
        lastName,
        Gender,
        DOB,
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

  
  // To prevent non-numeric values from being pasted into numeric fields
  const preventNonNumericPaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    if (!/^[0-9]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  // To prevent non-letter values from being pasted into letter-only fields
  const preventNonAlphabeticPaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    if (!/^[a-zA-Z\s]*$/.test(clipboardData)) {
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
                  title: "Add New Buyer Record",
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
                <Input placeholder="Enter first name" 
                
                onKeyPress={restrictInputToLetters} 
              onPaste={preventNonAlphabeticPaste} 
                
                
                />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName" rules={alphabeticRule}>
                <Input
                  placeholder="Enter last name"
                  disabled={isNextFieldDisabled.lastName}
                  onKeyPress={restrictInputToLetters} 
                  onPaste={preventNonAlphabeticPaste}
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="Gender"
                rules={[{ required: true, message: "Please select your gender" }]}
              >
                <Select
                  placeholder="Select your Gender"
                  disabled={isNextFieldDisabled.gender}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Prefer not to say</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="DOB"
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth",
                  },
                  {
                    validator: (_, value) =>
                      value && dayjs(value).isAfter(dayjs())
                        ? Promise.reject(new Error("Future dates are not allowed"))
                        : Promise.resolve(),
                  },
                ]}
              >
                <Input
                  type="date"
                  disabled={isNextFieldDisabled.dob}
                  max={dayjs().format("YYYY-MM-DD")} // Disable future dates
                />
              </Form.Item>

              <Form.Item label="Phone Number" name="Number" rules={phoneRule}>
                <Input
                  placeholder="Enter your phone number"
                  onKeyPress={restrictInputToNumbers} 
                  onPaste={preventNonNumericPaste}
                  
                  disabled={isNextFieldDisabled.number}
                />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={emailRule}>
                <Input placeholder="Enter your email" disabled={isNextFieldDisabled.email} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
                <Button
                  type="default"
                  onClick={() => navigate("/buyerinfotable")}
                  className="ml-2"
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

export default AddInfoRecords;
