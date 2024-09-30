import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const UpdateCoconutDiseases = () => {
  const [form] = Form.useForm();
  const [dateOfInspection, setDateOfInspection] = useState(null);
  const [suggestedReInspectionDate, setSuggestedReInspectionDate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters

  // Disable future dates
  const disableFutureDates = (current) => current && current > moment().endOf("day");

  // Disable past dates
  const disablePastDates = (current) => current && current < moment().startOf("day");

    // Alphabetic characters only (A-Z, a-z, space)
const handleAlphabeticKeyPress = (e) => {
  const regex = /^[A-Za-z\s]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphabetic characters
    setErrorMessage("Only alphabetic characters are allowed."); // Set error message
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Numeric characters only (0-9)
const handleNumericKeyPress = (e) => {
  const regex = /^[0-9]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-numeric characters
    setErrorMessage("Only numeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

// Alphanumeric characters only (A-Z, a-z, 0-9)
const handleAlphanumericKeyPress = (e) => {
  const regex = /^[A-Za-z0-9\s%]*$/;
  if (!regex.test(e.key)) {
    e.preventDefault(); // Prevent non-alphanumeric characters
    setErrorMessage("Only alphanumeric characters are allowed.");
  } else {
    setErrorMessage(""); // Clear message when valid input is entered
  }
};

  // Fetch record by ID
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/diseases/${id}`);
        const data = response.data.diseaseRecord;

        // Set form values including DatePicker values
        form.setFieldsValue({
          sectionOfLand: data.sectionOfLand || "",
          identifiedPest: data.identifiedPest || "",
          identifiedDisease: data.identifiedDisease || "",
          inspectedBy: data.inspectedBy || "",
          inspectionResult: data.inspectionResult || "",
          dateOfInspection: data.dateOfInspection ? moment(data.dateOfInspection) : null,
          suggestedReInspectionDate: data.suggestedReInspectionDate ? moment(data.suggestedReInspectionDate) : null,
        });

        // Update state with DatePicker values
        setDateOfInspection(data.dateOfInspection ? moment(data.dateOfInspection) : null);
        setSuggestedReInspectionDate(data.suggestedReInspectionDate ? moment(data.suggestedReInspectionDate) : null);
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
        dateOfInspection: dateOfInspection ? dateOfInspection.toISOString() : null,
        suggestedReInspectionDate: suggestedReInspectionDate ? suggestedReInspectionDate.toISOString() : null,
      };

      await axios.put(`http://localhost:8090/api/diseases/${id}`, payload);

      notification.success({
        message: "Record updated successfully",
        description: "Record has been updated successfully",
      });

      navigate("/CoconutInspections");
    } catch (error) {
      notification.error({
        message: "Update Error",
        description: "An error occurred while updating the record.",
      });
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate("/CoconutInspections");
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-[300px] p-4 overflow-auto">
          <nav className="flex items-center justify-between p-4 bg-transparent">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-800">
              <LeftOutlined className="text-xl" />
            </button>
            <div className="flex space-x-4">
              <Link to="/diseases" className="text-[#3CCD65] hover:text-[#2b8f57]">Home</Link>
              <Link to="/CoconutInspections" className="text-[#3CCD65] hover:text-[#2b8f57]">Inspections</Link>
              <Link to="/CoconutTreatments" className="text-[#236A64] font-semibold">Treatments</Link>
              <Link to="/CoconutPests" className="text-[#3CCD65] hover:text-[#2b8f57]">Pests and Diseases</Link>
              <Link to="/RegularMaintenance" className="text-[#3CCD65] hover:text-[#2b8f57]">Maintenance</Link>
              {/* <Link to="/UserProfile" className="text-[#3CCD65] hover:text-[#2b8f57]">My Profile</Link> */}
            </div>
          </nav>

          <div className="mt-4">
            <Breadcrumb items={[{ href: "/diseases", title: <HomeOutlined /> }, { href: "", title: "Update current record for Coconut Diseases" }]} />
          </div>

          <div className="mt-4 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center">Pest / Disease Records - Coconuts</h1>

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
                <Input 
                placeholder="Enter identified pest"
                onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Identified Disease"
                name="identifiedDisease"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input 
                placeholder="Enter identified disease"
                onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Inspected By"
                name="inspectedBy"
                rules={[
                  { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input 
                placeholder="Enter name of inspector"
                onKeyPress={handleAlphabeticKeyPress}
                />
              </Form.Item>

              <Form.Item
                label="Inspection Result"
                name="inspectionResult"
                rules={[
                  { pattern: /^[a-zA-Z0-9\s%]*$/, message: "Only alpha-numeric characters and % are allowed." },
                  { required: true, message: "This field is required." }
                ]}
              >
                <Input 
                placeholder="Enter the inspection result"
                onKeyPress={handleAlphanumericKeyPress}
                />
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

              <div className="flex justify-center space-x-4 mt-4">
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

export default UpdateCoconutDiseases;
