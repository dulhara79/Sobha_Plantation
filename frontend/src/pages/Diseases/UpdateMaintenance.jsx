import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, DatePicker, Form, notification, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const UpdateMaintenance = () => {
    const [form] = Form.useForm();
    const [dateOfMaintenance, setDateOfMaintenance] = useState(null);
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
          const response = await axios.get(`http://localhost:5000/api/regularMaintenance/${id}`);
          const data = response.data.regularMaintenanceRecord;
    
          // Log response to check data
          console.log("Fetched data:", data);
    
          form.setFieldsValue({
            task: data.task || "",
            managerInCharge: data.managerInCharge || "",
            progress: data.progress || "",
            dateOfMaintenance: data.dateOfMaintenance ? moment(data.dateOfMaintenance) : null
          });
    
          setDateOfMaintenance(data.dateOfMaintenance ? moment(data.dateOfMaintenance) : null);
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
            dateOfMaintenance: dateOfMaintenance ? dateOfMaintenance.toISOString() : null,
        };
    
        await axios.put(`http://localhost:5000/api/regularMaintenance/${id}`, payload);
    
        notification.success({
            message: "Record Updated",
            description: "Record updated successfully.",
        });
    
        navigate("/RegularMaintenance");
        } catch (error) {
        notification.error({
            message: "Update Error",
            description: "Error updating record.",
        });
        }
    };

    //Cancel button function
    const handleCancel = () => {
        navigate("/RegularMaintenance");
    };

    return (
        <div>
          <Header />
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 ml-[300px] p-4 overflow-auto">
              
              <div className="mt-4">
                <Breadcrumb items={[{ href: "/diseases", title: <HomeOutlined /> }, { href: "", title: "Update current record for Maintenance" }]} />
              </div>
    
              <div className="mt-4 p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center">Maintenance Record</h1>

                <Form form={form} layout="vertical" className="mt-6" onFinish={handleSubmit}>
                    <Form.Item
                        label="Date of Maintenance"
                        name="dateOfMaintenance"
                        rules={[{ required: true, message: "Date of maintenance is required" }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            disabledDate={disableFutureDates}
                            value={dateOfMaintenance}
                            onChange={(date) => setDateOfMaintenance(date)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Task"
                        name="task"
                        rules={[
                            { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                            { required: true, message: "Task is required" }
                        ]}
                    >
                        <Input 
                        placeholder="Enter task name"
                        onKeyPress={handleAlphabeticKeyPress}/>
                    </Form.Item>

                    <Form.Item
                        label="Manager in Charge"
                        name="managerInCharge"
                        rules={[
                            { pattern: /^[a-zA-Z\s]*$/, message: "Only alphabetic characters are allowed." },
                            { required: true, message: "Manager in charge is required" }
                        ]}
                    >
                        <Input 
                        placeholder="Enter name of Manager in Charge"
                        onKeyPress={handleAlphabeticKeyPress}/>
                    </Form.Item>

                    <Form.Item
                        label="Progress"
                        name="progress"
                        rules={[{ required: true, message: "Progress is required" }]}
                    >
                        <Select placeholder="Select Progress">
                            <Option value="Pending">Pending</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="Completed">Completed</Option>
                        </Select>
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

export default UpdateMaintenance;