import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, notification } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const UpdateBuyerDeliveryRecords = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters

  const [loading, setLoading] = useState(false);

  const [isLastNameEnabled, setIsLastNameEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isAddressEnabled, setIsAddressEnabled] = useState(false);
  const [isCityEnabled, setIsCityEnabled] = useState(false);
  const [isCountryEnabled, setIsCountryEnabled] = useState(false);
  const [isPostalCodeEnabled, setIsPostalCodeEnabled] = useState(false);
  const [isPhoneEnabled, setIsPhoneEnabled] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8090/api/deliveryRecords/${id}`);
        const data = response.data.BuyerDeliveryRecord;

        form.setFieldsValue({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          postalCode: data.postalCode || "",
          phone: data.phone || "",
        });
        setIsLastNameEnabled(!!data.firstName);
        setIsEmailEnabled(!!data.lastName);
        setIsAddressEnabled(!!data.email);
        setIsCityEnabled(!!data.address);
        setIsCountryEnabled(!!data.city);
        setIsPostalCodeEnabled(!!data.country);
        setIsPhoneEnabled(!!data.postalCode);
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

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await axios.put(`http://localhost:8090/api/deliveryRecords/${id}`, values);

      notification.success({
        message: "Record Updated",
        description: "Record has been updated successfully",
      });

      form.resetFields();
      navigate("/Bdeliverytable");
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
    navigate("/Bdeliverytable");
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
                  title: "Update Buyer Delivery Record",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">
              Update Buyer Delivery Record
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
                label="Phone Number"
                name="phone"
                rules={phoneRule}
              >
                <Input
                  placeholder="Enter your phone number"
                  disabled={!isPhoneEnabled}
                  onKeyPress={restrictInputToNumbers}
                  onPaste={preventNonNumericPaste}
                  maxLength={10} // Limit input to 10 characters
                />
              </Form.Item>

              <div className="flex justify-end mt-6">
                <Button
                  className="mr-4"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBuyerDeliveryRecords;


