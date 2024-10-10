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
  const [orderDate, setorderDate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters


  // Fetch record by ID
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/buyerPreOrder/${id}`);
        const data = response.data.PreOrderRecord;

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
        orderDate(data.orderDate ? moment(data.orderDate
          
        ) : null);
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

      await axios.put(`http://localhost:8090/api/buyerPreOrder/${id}`, payload);

      notification.success({
        message: "Record updated successfully",
        description: "Record has been updated successfully",
      });

      navigate("/BuyerPreOrderTable");
    } catch (error) {
      notification.error({
        message: "Update Error",
        description: "An error occurred while updating the record.",
      });
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate("/BuyerPreOrderTable");
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
                label="Date of Inspection"
                name="dateOfInspection"
                rules={[{ required: true, message: "Please select a date of inspection." }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disableFutureDates}
                  value={dateOfInspection}
                  onChange={(date) => setDateOfInspection(date)}
                />
              </Form.Item>
              
              <Form.Item
                label="Section of Land"
                name="sectionOfLand"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Select placeholder="Select section of land">
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="D">D</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Identified Pest"
                name="identifiedPest"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input placeholder="Enter identified pest" />
              </Form.Item>

              <Form.Item
                label="Identified Disease"
                name="identifiedDisease"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input placeholder="Enter identified PreOrder" />
              </Form.Item>

              <Form.Item
                label="Inspected By"
                name="inspectedBy"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input placeholder="Enter name of inspector" />
              </Form.Item>

              <Form.Item
                label="Inspection Result"
                name="inspectionResult"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input placeholder="Enter the inspection result" />
              </Form.Item>

              <Form.Item
                label="Suggested Re-Inspection Date"
                name="suggestedReInspectionDate"
                rules={[{ required: true, message: "Please select a re-inspection date." }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disablePastDates}
                  value={suggestedReInspectionDate}
                  onChange={(date) => setSuggestedReInspectionDate(date)}
                />
              </Form.Item>

              <div className="flex justify-center mt-4 space-x-4">
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#236A64", color: "#fff" }}>Submit</Button>
                <Button type="default" htmlType="button" onClick={handleCancel}>Cancel</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateBuyerPreOrderRecords;