import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, DatePicker, Select, Button, notification } from "antd";
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

  // Validate inspector name
  const validatequalityController = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter the quality Controller!"));
    }
    if (!/^[A-Z][a-z\s]*$/.test(value)) {
      return Promise.reject(
        new Error(
          "Quality Controller must start with an uppercase letter and only contain lowercase letters and spaces."
        )
      );
    }
    return Promise.resolve();
  };

  const handlequalityControllerChange = (e) => {
    const inputValue = e.target.value;

    // Only allow the first letter to be uppercase, and prevent lowercase as the first character
    let formattedValue = inputValue;

    // If the first character is lowercase, prevent it from being typed
    if (formattedValue.length === 1 && /[a-z]/.test(formattedValue)) {
      formattedValue = ""; // Disable lowercase first letter
    } else {
      // After the first letter, allow letters and spaces, but convert everything after the first letter to lowercase
      formattedValue = formattedValue
        .replace(/[^a-zA-Z\s]/g, "") // Remove non-letter characters and numbers
        .replace(/^([a-zA-Z])/, (m) => m.toUpperCase()) // Ensure first letter is uppercase
        .replace(/(?<=^[A-Z])([A-Z]+)/g, (m) => m.toLowerCase()); // Convert any remaining uppercase letters to lowercase
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      qualityController: formattedValue,
    }));

    // Update the form field value
    form.setFieldsValue({ qualityController: formattedValue });
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
    try {
      await axios.put(`http://localhost:5000/api/quality/${id}`, {
        ...values,
        checkDate: values.checkDate ? values.checkDate.toISOString() : null,
      });
      Swal.fire(
        "Success",
        "Inspection report updated successfully!",
        "success"
      );
      navigate("/harvest/quality");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error updating inspection report",
      });
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
              Edit Inspection Report
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
                rules={[
                  { required: true, message: "Please select a Crop Type!" },
                ]}
              >
                <Select
                  placeholder="Select a Crop Type"
                  onChange={(value) => handleFieldChange("cropType", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="coconut">Coconut</Option>
                  <Option value="banana">Banana</Option>
                  <Option value="papaya">Papaya</Option>
                  <Option value="pineapple">Pineapple</Option>
                  <Option value="pepper">Pepper</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="checkDate"
                label="Check Date"
                rules={[
                  { required: true, message: "Please select the checkDate!" },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disablePastDates}
                  onChange={(date) => handleFieldChange("checkDate", date)}
                  style={{ width: "100%" }}
                  inputReadOnly
                />
              </Form.Item>

              <Form.Item
                label="Quality Status"
                name="qualityStatus"
                rules={[
                  {
                    required: true,
                    message: "Please select the Quality Status!",
                  },
                ]}
              >
                <Select
                  placeholder="Select qualityStatus"
                  onChange={(value) =>
                    handleFieldChange("qualityStatus", value)
                  }
                  style={{ width: "100%" }}
                >
                  <Option value="Passed">Pass</Option>
                  <Option value="Failed">Fail</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Quality Controller(Mr/Ms)"
                name="qualityController"
                rules={[{ validator: validatequalityController }]}
              >
                <Input
                  placeholder="Enter inspector name"
                  style={{ width: "100%" }}
                  onChange={handlequalityControllerChange}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-between">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "48%",
                      backgroundColor: "#1D6660",
                      borderColor: "#1D6660",
                    }}
                  >
                    Update Report
                  </Button>
                  <Button
                    type="default"
                    onClick={handleCancel}
                    style={{ width: "48%" }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInspection;
