import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const UpdateCoconutTreatments = () => {
  const [form] = Form.useForm();
  const [dateOfTreatment, setDateOfTreatment] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameters

  // Disable future dates
  const disableFutureDates = (current) => current && current > moment().endOf("day");

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
  const regex = /^[0-9%]*$/;
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
        const response = await axios.get(`http://localhost:8090/api/treatments/${id}`);
        const data = response.data.treatmentRecord;

        // Set form values including DatePicker values
        form.setFieldsValue({
            pestOrDisease: data.pestOrDisease || "",
            treatmentMethod: data.treatmentMethod || "",
            healthRate: data.healthRate || "",
            treatedBy: data.treatedBy || "",
            notes: data.notes || "",
            dateOfTreatment: data.dateOfTreatment ? moment(data.dateOfTreatment) : null,
        });

        // Update state with DatePicker values
        setDateOfTreatment(data.dateOfTreatment ? moment(data.dateOfTreatment) : null);
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
        dateOfTreatment: dateOfTreatment ? dateOfTreatment.toISOString() : null,
      };

      await axios.put(`http://localhost:8090/api/treatments/${id}`, payload);

      notification.success({
        message: "Record updated successfully",
        description: "Record has been updated successfully",
      });

      navigate("/CoconutTreatments");
    } catch (error) {
      notification.error({
        message: "Update Error",
        description: "An error occurred while updating the record.",
      });
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate("/CoconutTreatments");
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
            <h1 className="text-2xl font-bold text-center">Treatment Records - Coconuts</h1>

            <Form form={form} layout="vertical" className="mt-6" onFinish={handleSubmit}>
              <Form.Item
                label="Date of Treatment"
                name="dateOfTreatment"
                rules={[{ required: true, message: "This field is required" }]}
                >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disableFutureDates}
                  value={dateOfTreatment}
                  onChange={(date) => setDateOfTreatment(date)}
                />
                </Form.Item>

                <Form.Item
                label="Pest / Disease"
                name="pestOrDisease"
                rules={[
                    { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                    { required: true, message: "This field is required" }
                ]}
                >
                <Input 
                placeholder="Enter the pest or disease treated"
                onKeyPress={handleAlphabeticKeyPress}                
                />
                </Form.Item>

                <Form.Item
                label="Treatment Method"
                name="treatmentMethod"
                rules={[
                    { pattern: /^[a-zA-Z0-9\s]*$/, message: "Only alphabetic characters and numbers are allowed." },
                    { required: true, message: "This field is required" }
                ]}
                >
                <Input 
                placeholder="Enter the treatment method used"
                onKeyPress={handleAlphanumericKeyPress} />
                </Form.Item>

                <Form.Item
                label="Health Rate"
                name="healthRate"
                rules={[
                    { pattern: /^[0-9%]/, message: "Only numbers are allowed." },
                    { required: true, message: "This field is required" }
                ]}
                >
                <Input placeholder="Enter the health rate"
                onKeyPress={handleNumericKeyPress} />
                </Form.Item>

                <Form.Item
                label="Treated By"
                name="treatedBy"
                rules={[
                    { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                    { required: true, message: "This field is required" }
                ]}
                >
                <Input 
                placeholder="Enter the name of the person who treated the plant"
                onKeyPress={handleAlphabeticKeyPress} />
                </Form.Item>

                <Form.Item
                label="Notes"
                name="notes"
                rules={[
                    { pattern: /^[a-zA-Z0-9\s%]*$/, message: "Only alphabetic characters, numbers and % are allowed." },
                    { required: true, message: "This field is required" }
                ]}
                >
                <Input.TextArea placeholder="Enter any additional notes"
                onKeyPress={handleAlphanumericKeyPress} />
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

export default UpdateCoconutTreatments;
