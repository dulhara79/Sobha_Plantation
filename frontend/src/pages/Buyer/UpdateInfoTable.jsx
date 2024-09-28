
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification, DatePicker, Select  } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import moment from 'moment';

const { Option } = Select;

const UpdateBuyerInfoRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters

  const [loading, setLoading] = useState(false);

  // Validation rules
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

  // Fetch the record data from the backend
  useEffect(() => { 
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8090/api/buyerInfo/${id}`);
        const data = response.data.BuyerInfoRecord
        console.log("response.data: " + response.data.InfoRecord);
        console.log(response.data.BuyerInfoRecord);
        
        
        
        // Set form values with the fetched data
        form.setFieldsValue({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          UserName: data.UserName || "",
          Password: data.Password || "",
          ConfirmPassword: data.ConfirmPassword || "",
          Gender: data.Gender || "",
          DOB: data.DOB || "",
          Number: data.Number || "",
            email: data.email || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
        setLoading(false);
        notification.error({
          message: "Error",
          description: "Could not fetch the record data.",
        });
      }
    };

    fetchData();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Make a PUT request to update the record
      await axios.put(`http://localhost:8090/api/buyerInfo/${id}`, values);

      notification.success({
        message: "Record Updated",
        description: "Record has been updated successfully",
      });

      form.resetFields();
      navigate("/BInfotable");
      setLoading(false);
    } catch (error) {
      console.error("An error occurred: ", error);
      setLoading(false);
      notification.error({
        message: "Error",
        description: "An error occurred while updating the record",
      });
    }
  };

  const handleCancel = () => {
    navigate("/BInfotable");
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
                  title: "Update Record",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Update Buyer Info Record
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleSubmit}
            >
              <Form.Item label="First Name" name="firstName" rules={alphabeticRule}>
                <Input placeholder="Enter first name" />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName" rules={alphabeticRule}>
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Form.Item label="User Name" name="userName" rules={alphabeticRule}>
                <Input placeholder="Enter User Name" />
              </Form.Item>

              <Form.Item label="Password" name="Password" rules={alphabeticNumericRule}>
                <Input type="password" placeholder="Enter a Password" />
              </Form.Item>

              <Form.Item label="Confirm Password" name="ConfirmPassword" rules={alphabeticNumericRule}>
                <Input type="password" placeholder="Confirm your Password" />
              </Form.Item>

              <Form.Item label="Gender" name="Gender" rules={[{ required: true, message: "Please select your gender" }]}>
                <Select placeholder="Select your Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Prefer not to say</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date of Birth" name="DOB" rules={[{ required: true, message: "Please select your date of birth" }]}>
              <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} disabled/>
              </Form.Item>

              <Form.Item label="Number" name="Number" rules={numericRule}>
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
                <Button type="default" onClick={handleCancel} className="ml-2">
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

export default UpdateBuyerInfoRecords;

