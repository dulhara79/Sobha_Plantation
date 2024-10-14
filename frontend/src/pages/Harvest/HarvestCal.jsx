import React, { useState } from "react";
import { Button, Input, Form, Select } from "antd";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const HarvestCal = () => {
  const [estimate, setEstimate] = useState(null); // State to store the estimate
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Define yield per acre for different crop types
  const yieldData = {
    Coconut: 500,
    Papaya: 300,
    Pepper: 200,
    Pineapple: 400,
    Banana: 250,
  };

  // Function to handle form submission and perform estimation
  const handleSubmit = (values) => {
    const { area, yieldPerAcre } = values;
    const estimatedHarvest = area * yieldPerAcre;
    setEstimate(estimatedHarvest);
  };

  // Function to handle crop type selection and update yieldPerAcre
  const handleCropChange = (cropType) => {
    const yieldPerAcre = yieldData[cropType] || 0; // Get yield per acre for the selected crop type
    form.setFieldsValue({ yieldPerAcre }); // Update the form field value
  };

  return (
    <div>
      <Header />
      <Sidebar className="sidebar" />
      <div className="ml-[300px] p-5">
        <nav className="sticky z-10 bg-gray-100 bg-opacity-50 border-b top-16 backdrop-blur">
          <Breadcrumb
            items={[
              { href: "", title: <HomeOutlined /> },
              { title: "Harvest" },
              { title: "Estimate Calculator" },
            ]}
          />
        </nav>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Harvest Estimation Calculator</h1>

          {/* Form for harvest estimation */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Crop Type Input */}
            <Form.Item
              label="Crop Type"
              name="cropType"
              rules={[{ required: true, message: "Please select the crop type!" }]}
            >
              <Select
                placeholder="Select crop type"
                onChange={handleCropChange}
                options={[
                  { label: "Coconut", value: "Coconut" },
                  { label: "Papaya", value: "Papaya" },
                  { label: "Pepper", value: "Pepper" },
                  { label: "Pineapple", value: "Pineapple" },
                  { label: "Banana", value: "Banana" },
                ]}
              />
            </Form.Item>

            {/* Area Input */}
            <Form.Item
              label="Area (in acres)"
              name="area"
              rules={[{ required: true, message: "Please enter the area!" }]}
            >
              <Input type="number" placeholder="Enter area in acres" />
            </Form.Item>

            {/* Yield per Acre Input */}
            <Form.Item
              label="Expected Yield per Acre"
              name="yieldPerAcre"
              rules={[{ required: true, message: "Please enter yield per acre!" }]}
            >
              <Input type="number" placeholder="Enter expected yield per acre" disabled />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#60DB19" }}>
                Calculate Estimate
              </Button>
            </Form.Item>
          </Form>

          {/* Display the estimated harvest */}
          {estimate && (
            <div className="mt-6">
              <h2 className="text-xl">Estimated Harvest: {estimate} KG</h2>
            </div>
          )}

          {/* Back button */}
          <Button onClick={() => navigate("/harvest/yield")} style={{ marginTop: "20px" }}>
            Back to Yield Records
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HarvestCal;
