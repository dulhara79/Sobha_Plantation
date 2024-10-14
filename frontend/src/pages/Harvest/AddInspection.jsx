import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2 for confirmation
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  notification,
  Row,
  Col,
} from "antd";
import moment from "moment";

const { Option } = Select;

const AddInspection = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = [
    "cropType",
    "checkDate",
    "qualityStatus",
    "qualityController",
  ];

  

// Validation function for Quality Controller
const validateQualityController = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Please enter the Quality Controller!"));
  }

  // Regex Explanation:
  // ^                  : Start of string
  // [A-Z][a-z]*        : First word starts with a capital letter followed by lowercase letters
  // (?:\s[A-Z][a-z]*)? : Optionally, a second word starting with a capital letter followed by lowercase letters
  // $                  : End of string (ensures no extra spaces)
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

  // Step 1: Remove any extra spaces (replace multiple spaces with a single space)
  inputValue = inputValue.replace(/\s+/g, ' ');

  // Step 2: Ensure only two words are allowed
  const words = inputValue.split(' '); // Split by space

  if (words.length > 2) {
    inputValue = words.slice(0, 2).join(' '); // Allow only two words
  }

  // Step 3: Format the first letter of each word to be capitalized and others lowercase
  inputValue = inputValue
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Update the form data and set the formatted value in the form field
  setFormData((prevFormData) => ({
    ...prevFormData,
    qualityController: inputValue,
  }));

  form.setFieldsValue({ qualityController: inputValue });
};


  // Confirm submission
  const handleSubmit = async (values) => {
    const isFormValid = form
      .getFieldsError()
      .every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    const result = await Swal.fire({
      title: "Confirmation Required",
      text: "Are you sure you want to submit this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        html: "swal-custom-html",
        confirmButton: "swal-confirm-button", // Custom class for confirm button
        cancelButton: "swal-cancel-button",
      },
      focusCancel: false,
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          ...values,
          checkDate: values.checkDate ? values.checkDate.toISOString() : null,
        };
        await axios.post("http://localhost:5000/api/quality", payload);
        Swal.fire("Success", "Inspection report added successfully!", "success");
        form.resetFields();
        navigate("/harvest/quality");
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to add inspection report.",
        });
      }
    }
  };

  const handleFieldChange = (name, value) => {
    const currentIndex = fields.indexOf(name);
    if (currentIndex > 0) {
      const previousField = fields[currentIndex - 1];
      if (errors[previousField] || !formData[previousField]) {
        return; // Block current field if previous has errors or is empty
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFieldsError = (errorInfo) => {
    const newErrors = errorInfo.reduce((acc, { name, errors }) => {
      acc[name[0]] = errors.length > 0;
      return acc;
    }, {});
    setErrors(newErrors);
  };

  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-grow">
      <Header />
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: "#1D6660" }}>
          Add Quality Inspection
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
            rules={[{ required: true, message: "Please select a crop type!" }]}
          >
            <Select
              placeholder="Select a crop type"
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
        // Disable future dates and dates older than 7 days from today
        const today = moment().startOf("day");
        const sevenDaysAgo = today.clone().subtract(7, "days");
        return current && (current > today || current < sevenDaysAgo);
      }}
      disabled={!formData.cropType} // Disable based on previous field
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
                  disabled={!formData.cropType || !formData.checkDate}
                >
                  <Option value="Passed">Passed</Option>
                  <Option value="Failed">Failed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Input field for Quality Controller */}
<Form.Item
  label="Quality Controller (Mr/Ms)"
  name="qualityController"
  rules={[{ validator: validateQualityController }]}
>
  <Input
    placeholder="Enter Quality Controller"
    style={{ width: "100%" }}
    disabled={
      !formData.cropType ||
      !formData.checkDate ||
      !formData.qualityStatus
    }
    onChange={handleQualityControllerChange}
    maxLength={25} // Restrict input length directly in the input field
  />
</Form.Item>


          {/* Parameters Section */}
          <h3>Parameters:</h3>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Ripeness"
                name={["parameters", "ripeness"]}
                rules={[
                  {
                    required: ["Papaya", "Banana", "Pineapple"].includes(formData.cropType),
                    message: "Ripeness is required for fruits!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Ripeness"
                  disabled={
                    !formData.cropType ||
                    !formData.checkDate ||
                    !formData.qualityStatus ||
                    !formData.qualityController
                  }
                  onChange={(value) => handleFieldChange("parameters.ripeness", value)}
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
                name={["parameters", "damage"]}
                rules={[
                  {
                    required: true,
                    message: "Damage assessment is required!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Damage Status"
                  disabled={
                    !formData.cropType ||
                    !formData.checkDate ||
                    !formData.qualityStatus ||
                    !formData.qualityController
                  }
                  onChange={(value) => handleFieldChange("parameters.damage", value)}
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block
            disabled={
              !formData.cropType ||
              !formData.checkDate ||
              !formData.qualityStatus ||
              !formData.qualityController
            }>
              Submit Report
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AddInspection;
