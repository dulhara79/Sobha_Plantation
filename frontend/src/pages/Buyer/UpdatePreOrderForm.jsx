import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const updateBuyerPreOrderRecords = () => {
  const [form] = Form.useForm();
  const [orderDate, setOrderDate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters
  
  // Validation rules
  const alphabeticNumericRule = [
    {
      pattern: /^[a-zA-Z0-9/\s]*$/,
      message: "Only alphabetic characters, numbers, spaces, and '/' are allowed.",
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

  // Fetch record by ID
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buyerPreOrder/${id}`);
        const data = response.data.BuyerPreOrderRecord;        ;
        console.log("Record data:", response);
        // Set form values including DatePicker values
        form.setFieldsValue({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          productType: data.productType || "",
          productQuantity: data.productQuantity || "",
          orderDate: data.orderDate ? moment(data.orderDate) : null,
        });
        
        // Update state with DatePicker values
        setOrderDate(data.orderDate ? moment(data.orderDate) : null);
      } catch (error) {
        notification.error({
          message: "Fetch Error",
          description: error.response?.data?.message || "Error fetching record data.",
        });
      }
    };

    fetchRecord();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        orderDate: values.orderDate.toISOString(),
      };

      await axios.put(`http://localhost:5000/api/buyerPreOrder/${id}`, payload);

      notification.success({
        message: "Record updated successfully",
        description: "Record has been updated successfully",
      });

      navigate("/preorders");
    } catch (error) {
      notification.error({
        message: "Update Error",
        description: "An error occurred while updating the record.",
      });
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate("/preorders");
  };

  // Placeholder functions for input handlers
  const handleNameChange = (e) => {
    console.log("Name changed:", e.target.value);
  };

  const restrictInputToLetters = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[a-zA-Z]/.test(char)) {
      e.preventDefault();
    }
  };

  const preventNonAlphabeticPaste = (e) => {
    const clipboardData = e.clipboardData.getData("text/plain");
    if (!/^[a-zA-Z\s]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  const restrictInputToNumbers = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  };

  const preventNonNumericPaste = (e) => {
    const clipboardData = e.clipboardData.getData("text/plain");
    if (!/^[0-9]*$/.test(clipboardData)) {
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

  // Disable all past and today's dates for the date picker
  const disablePastAndTodayDates = (current) => {
    return current && current <= moment().endOf('day'); // Disable all past dates and today
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
                  title: "Update Pre Order Record",
                },
              ]}
            />
          </div>

          <div className="p-6 mt-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-center">Update Pre Order Record </h1>

            <Form form={form} layout="vertical" className="mt-6" onFinish={handleSubmit}>
              
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
                  onKeyPress={restrictInputToNumbers}
                  onPaste={preventNonNumericPaste} 
                  maxLength={10}
                />
              </Form.Item>  

              <Form.Item
                label="Address"
                name="address"
                rules={alphabeticNumericRule}
              >
                <Input
                  placeholder="Enter address"
                  onKeyPress={restrictInputForAddress} 
                  onPaste={preventInvalidAddressPaste} 
                />
              </Form.Item>

              <Form.Item
                label="Product Type"
                name="productType"
                rules={[{ required: true, message: "Please select your product type" }]}
              >
                <Select placeholder="Select your product type">
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
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastAndTodayDates}
                  onChange={(date) => setOrderDate(date)}
                />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#236A64", color: "#fff" }}>Submit</Button>
                
                <Button type="default" onClick={handleCancel}>Cancel</Button>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateBuyerPreOrderRecords;
