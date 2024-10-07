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

  // Phone rule with exactly 10 digits required
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
      const { firstName, lastName, email, address, city, country, postalCode, phone } = values;

      await axios.post("http://localhost:5000/api/deliveryRecords", {
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
    navigate("/Bdeliverytable");
  };

  // Helper functions to lock key presses for specific fields
  const restrictInputToNumbers = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault(); // Prevent any non-numeric key
    }
    
    // Prevent input if the value already has 10 digits
    if (contactNumber.length >= 10 && /[0-9]/.test(key)) {
      e.preventDefault();
    }
  };
  
  const handlePhoneChange = (e) => {
    const value = e.target.value;
  
    // Restrict to 10 digits only
    if (value.length <= 10) {
      setContactNumber(value);
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
                  onKeyPress={restrictInputToLetters} 
                onPaste={preventNonAlphabeticPaste} 
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
                  onPaste={preventNonAlphabeticPaste} 
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
                  onKeyPress={restrictInputToAlphanumeric} 
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
                  onKeyPress={restrictInputToLetters} // Only allow letters
                  onPaste={preventNonAlphabeticPaste} // Prevent non-letter paste
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
                  onKeyPress={restrictInputToNumbers} // Only allow numbers
                  onPaste={preventNonNumericPaste} // Prevent non-numeric paste
                />
              </Form.Item>

              <Form.Item
  label="Phone"
  name="phone"
  rules={phoneRule}
>
  <Input
    placeholder="Enter your phone number"
    disabled={!isPhoneEnabled}
    onKeyPress={restrictInputToNumbers} // Restrict to numbers only and prevent more than 10 digits
    onPaste={preventNonNumericPaste}    // Prevent non-numeric paste
    value={contactNumber}               // Controlled input for the phone number
    onChange={handlePhoneChange}        // Update the state with valid input
  />
</Form.Item>


              <Form.Item>
  <Button
    type="primary"
    htmlType="submit"
    loading={loading}
    style={{ backgroundColor: "#236A64", color: "#fff", padding: '0 24px' }} // Padding to adjust button width
  >
    Submit
  </Button>
  <Button
    type="default"
    onClick={handleCancel}
    style={{ marginLeft: '16px', padding: '0 24px' }} // Add space between buttons and padding
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

export default AddDeliveryRecords;
