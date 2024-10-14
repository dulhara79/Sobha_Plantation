import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, DatePicker, Select, Button, notification, Row, Col } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const { Option } = Select;

const EditInspection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = [
    "cropType",
    "checkDate",
    "qualityStatus",
    "qualityController",
  ];

  // Disable past dates but allow today
  const disablePastDates = (current) =>
    current && current < moment().startOf("day");

  // Validation function for Quality Controller
  const validateQualityController = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter the Quality Controller!"));
    }

    const nameRegex = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)?$/;

    if (!nameRegex.test(value)) {
      return Promise.reject(
        new Error(
          "Each name part must start with a capital letter, followed by lowercase letters, and only two words are allowed."
        )
      );
    }

    if (value.length > 25) {
      return Promise.reject(new Error("Name cannot exceed 25 characters!"));
    }

    return Promise.resolve();
  };

  // Handle input change for Quality Controller
  const handleQualityControllerChange = (e) => {
    let inputValue = e.target.value;

    // Step 1: Remove any extra spaces
    inputValue = inputValue.replace(/\s+/g, ' ');

    // Step 2: Ensure only two words are allowed
    const words = inputValue.split(' ');

    if (words.length > 2) {
      inputValue = words.slice(0, 2).join(' '); // Allow only two words
    }

    // Step 3: Format the first letter of each word to be capitalized
    inputValue = inputValue
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    setFormData((prevFormData) => ({
      ...prevFormData,
      qualityController: inputValue,
    }));

    form.setFieldsValue({ qualityController: inputValue });
  };

  const handleFieldChange = (name, value) => {
    if (name === "qualityStatus") {
      // When qualityStatus changes, set the ripeness and damage based on the status
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        parameters: {
          ...prevFormData.parameters, // Ensure other parameters stay the same
          ripeness: value === "Passed" ? "Ripe" : undefined,
          damage: value === "Passed" ? "None" : undefined,
        },
      }));
  
      // Update form fields as well for ripeness and damage
      form.setFieldsValue({
        parameters: {
          ripeness: value === "Passed" ? "Ripe" : undefined,
          damage: value === "Passed" ? "None" : undefined,
        },
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const handleFieldsError = (errorInfo) => {
    const newErrors = errorInfo.reduce((acc, { name, errors }) => {
      acc[name[0]] = errors.length > 0;
      return acc;
    }, {});
    setErrors(newErrors);
  };

  useEffect(() => {
    const fetchInspectionReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quality/${id}`
        );
        const { data } = response;
        form.setFieldsValue({
          ...data,
          checkDate: data.checkDate ? moment(data.checkDate) : null,
        });
        // Set formData based on fetched data
        setFormData({
          ...data,
          checkDate: data.checkDate ? moment(data.checkDate) : null,
          parameters: data.parameters || {},
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Error fetching inspection report",
        });
      }
    };

    fetchInspectionReport();
  }, [id, form]);

  const handleSubmit = async (values) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the Inspection report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          ...values,
          checkDate: values.checkDate
            ? moment(values.checkDate).toISOString()
            : null,
        };

        await axios.put(`http://localhost:5000/api/quality/${id}`, payload);

        notification.success({
          message: "Success",
          description: "Inspection report updated successfully!",
        });

        navigate("/harvest/quality");
      } catch (error) {
        console.error("Failed to update Inspection report:", error);

        notification.error({
          message: "Error",
          description: `Failed to update Inspection report. ${
            error.response?.data?.message || "Please try again."
          }`,
        });
      }
    } else {
      Swal.fire("Cancelled", "The update was cancelled", "info");
    }
  };

  const handleCancel = () => {
    navigate("/harvest/quality");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2
              className="mb-6 text-2xl font-bold text-center"
              style={{ color: "#1D6660" }}
            >
              Edit Quality Inspection 
            </h2>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              onFieldsChange={(_, allFields) => handleFieldsError(allFields)}
            >
              <Form.Item
                label="Crop Type"
                name="cropType"
                rules={[{ required: true, message: "Please select a Crop Type!" }]}
              >
                <Select
                  placeholder="Select a Crop Type"
                  onChange={(value) => handleFieldChange("cropType", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                  <Option value="Pepper">Pepper</Option>
                </Select>
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Check Date"
                    name="checkDate"
                    rules={[{ required: true, message: "Please select the check date!" }]}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      disabledDate={(current) => {
                        const today = moment().startOf("day");
                        const sevenDaysAgo = today.clone().subtract(7, "days");
                        return current && (current > today || current < sevenDaysAgo);
                      }}
                      onChange={(date) => handleFieldChange("checkDate", date)}
                      style={{ width: "100%" }}
                      inputReadOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="qualityStatus"
                    label="Quality Status"
                    rules={[{ required: true, message: "Please select the quality status!" }]}
                  >
                    <Select
                      placeholder="Select quality status"
                      onChange={(value) => handleFieldChange("qualityStatus", value)}
                      style={{ width: "100%" }}
                    >
                      <Option value="Passed">Passed</Option>
                      <Option value="Failed">Failed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Quality Controller (Mr/Ms)"
                name="qualityController"
                rules={[{ validator: validateQualityController }]}
              >
                <Input
                  placeholder="Enter Quality Controller"
                  style={{ width: "100%" }}
                  onChange={handleQualityControllerChange}
                  maxLength={25}
                />
              </Form.Item>
              
              {/* Parameters Section */}
              <h3>Parameters:</h3>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Ripeness"
                    name={['parameters', 'ripeness']}
                    rules={[{ required: formData.qualityStatus === "Failed", message: "Please select ripeness!" }]}
                  >
                    <Select
                      placeholder="Select ripeness"
                      onChange={(value) => handleFieldChange('parameters.ripeness', value)}
                      style={{ width: "100%" }}
                    >
                     {formData.qualityStatus === "Passed" ? (
                    <Option value="Ripe">Ripe</Option>
                  ) : (
                    <>
                      <Option value="Unripe">Unripe</Option>
                      <Option value="Overripe">Overripe</Option>
                    </>
                  )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Damage"
                    name={['parameters', 'damage']}
                    rules={[{ required: true , message: "Please select damage!" }]}
                  >
                    <Select
                      placeholder="Select damage"
                      onChange={(value) => handleFieldChange('parameters.damage', value)}
                      style={{ width: "100%" }}
                      
                    >
                      {formData.qualityStatus === "Passed" ? (
                    <Option value="None">None</Option>
                  ) : (
                    <>
                      <Option value="Minor">Minor</Option>
                      <Option value="Severe">Severe</Option>
                    </>
                  )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <div className="flex justify-between mt-6">
                <Button type="primary" htmlType="submit" disabled={Object.values(errors).some((e) => e)}>
                  Update
                </Button>
                <Button type="default" onClick={handleCancel}>
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

export default EditInspection;
