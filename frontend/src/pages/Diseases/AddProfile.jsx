import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Input,
  DatePicker,
  Form,
  Upload,
  Select,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
// import { post } from "../../api/api";

const { Option } = Select;

const AddProfile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [fieldValidity, setFieldValidity] = useState({
    userName: false,
    dateOfBirth: false,
    gender: false,
    email: false,
    contactNumber: false,
    address: false,
  });

  const [profileImage, setProfileImage] = useState(null); // State to hold the selected image

  const disableFutureDates = (current) => {
    return current && current > moment().endOf("day");
  };

  const alphabeticNumericRule = [
    {
      pattern: /^[a-zA-Z0-9\s]*$/,
      message: "Only alphabetic characters and numbers are allowed.",
    },
    {
      required: false,
    },
  ];

  const alphabeticRule = [
    {
      pattern: /^[a-zA-Z\s]*$/,
      message: "Only alphabetic characters are allowed.",
    },
    {
      required: false,
    },
  ];

  const numericRule = [
    {
      pattern: /[0-9]{10,15}/,
      message: "Contact number should have between 10 to 15 digits.",
    },
    {
      required: false,
    },
  ];

  const emailRule = [
    {
      type: "email",
      message: "The input is not a valid email address.",
    },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Email should be in the format 'abc@gmail.com'.",
    },
    {
      required: false,
    },
  ];

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("contactNumber", values.contactNumber);
    formData.append("address", values.address);
    if (profileImage) {
      formData.append("profileImage", profileImage); // Append the selected image to the form data
    }

    try {
      await post("/harvest", formData);
      navigate("/UserProfile");
    } catch (error) {
      console.error("Error creating user record:", error);
    }
  };

  const handleCancel = () => {
    navigate("/UserProfile");
  };

  const handleFieldChange = (changedFields, allFields) => {
    const newFieldValidity = { ...fieldValidity };

    allFields.forEach((field) => {
      if (field.errors.length === 0 && field.value) {
        newFieldValidity[field.name[0]] = true;
      } else {
        newFieldValidity[field.name[0]] = false;
      }
    });

    setFieldValidity(newFieldValidity);
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done" || file.status === "uploading") {
      setProfileImage(file.originFileObj); // Update state with the selected image file
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
                to="/pests-diseases"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Pests and Diseases
              </Link>
              <Link
                to="/maintenance"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                Maintenance
              </Link>
              <Link
                to="/UserProfile"
                className="text-[#3CCD65] hover:text-[#2b8f57]"
              >
                My Profile
              </Link>
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
                  title: "Add New Details for User",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Update User Details
            </h1>

            <Form
              form={form}
              layout="vertical"
              className="mt-6"
              onFinish={handleFinish}
              onFieldsChange={handleFieldChange}
            >
              <Form.Item label="Profile Image">
                <Upload
                  beforeUpload={(file) => {
                    const isImage = ["image/jpeg", "image/png"].includes(
                      file.type
                    );
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isImage) {
                      message.error("You can only upload JPG/PNG file!");
                    }
                    if (!isLt2M) {
                      message.error("Image must be smaller than 2MB!");
                    }
                    return isImage && isLt2M; // Prevent uploading if the file is invalid
                  }}
                  onChange={handleImageChange}
                  maxCount={1}
                  accept="image/*"
                  listType="picture-card"
                >
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="profile"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label="User Name"
                name="userName"
                rules={alphabeticRule}
                required={false}
              >
                <Input placeholder="Enter the name of the user" />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        // Handle the case where no date is selected (if needed)
                        return Promise.resolve();
                      }

                      const age = moment().diff(value, "years");
                      if (age < 18) {
                        return Promise.reject(
                          new Error("You must be at least 18 years old.")
                        );
                      }
                      return Promise.resolve(); // Valid date
                    },
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disableFutureDates}
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: false,
                    message: "Please select your gender.",
                  },
                ]}
              >
                <Select placeholder="Select your gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Prefer Not To Say">Prefer Not To Say</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={emailRule}
                required={false}
              >
                <Input placeholder="Enter the email of the user" />
              </Form.Item>

              <Form.Item
                label="Contact Number"
                name="contactNumber"
                rules={numericRule}
                required={false}
              >
                <Input placeholder="Enter the contact number of the user" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={alphabeticNumericRule}
                required={false}
              >
                <Input placeholder="Enter the address of the user" />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="primary"
                  htmlType="submit"
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

export default AddProfile;
