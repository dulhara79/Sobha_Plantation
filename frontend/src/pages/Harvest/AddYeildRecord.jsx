import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Select, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { InputNumber } from "antd";

const { Option } = Select;

const AddSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = [
    "harvestdate",
    "fieldNumber",
    "cropType",
    "quantity",
    "treesPicked",
    "storageLocation",
  ];

  const disableDateRange = (current) => {
    // Disable future dates and allow only dates from today to 7 days ago
    const oneWeekAgo = moment().subtract(7, "days").startOf("day");
    return current && (current > moment().endOf("day") || current < oneWeekAgo);
  };

  const validateQuantity = (_, value) => {
    if (value >= 1) {
      setQuantityComplete(true);
      return Promise.resolve();
    }
    setQuantityComplete(false);
    return Promise.reject(new Error("Quantity must be at least 1!"));
  };

  const handleSubmit = async (values) => {
    // Validate form fields
    const isFormValid = form
      .getFieldsError()
      .every(({ errors }) => errors.length === 0);
    if (!isFormValid) return; // Exit if there are validation errors

    // Display confirmation modal
    const result = await Swal.fire({
      title: "Confirmation Required",
      text: "Are you sure you want to submit this yield record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        html: "swal-custom-html",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      focusCancel: false,
    });

    console.log("Form data:", formData);
    console.log("result.isConfirmed:", result.isConfirmed);

    if (result.isConfirmed) {
      try {
        const payload = {
          ...values,
          harvestDate: values.harvestdate
            ? values.harvestdate.toISOString()
            : null,
        };

        // Send the API request
        await axios.post("http://localhost:5000/api/yield", payload);

        // Show success message using SweetAlert2
        Swal.fire("Success", "Yield record added successfully!", "success");

        // Reset form fields and navigate to the desired page
        form.resetFields();
        navigate("/harvest/yield");
      } catch (error) {
        console.error("Error adding yield record:", error);

        // Show error notification
        notification.error({
          message: "Error",
          description: "Failed to add the yield record.",
        });
      } finally {
        setLoading(false); // Stop the loading spinner
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
            <h2 className="mb-6 text-2xl font-bold text-center">
              Add Yield Records
            </h2>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              nFieldsChange={(_, allFields) => handleFieldsError(allFields)}
            >
             <Form.Item
  label="Harvest Date"
  name="harvestdate"
  rules={[
    { required: true, message: "Please select a harvest date!" },
    {
      validator: (_, value) => {
        if (value && value.isBefore(moment().startOf("day"))) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Harvest date must be within the last week!")
        );
      },
    },
  ]}
>
  <DatePicker
    format="YYYY-MM-DD"
    disabledDate={disableDateRange} // Apply the new date range validation
    onChange={(date) => handleFieldChange("harvestdate", date)}
    style={{ width: "100%" }}
    inputReadOnly
  />
</Form.Item>
              <Form.Item
                label="Field Number"
                name="fieldNumber"
                rules={[
                  { required: true, message: "Please select a field number!" },
                ]}
              >
                <Select
                  placeholder="Select a field number"
                  disabled={!formData.harvestdate} // Enable only when crop type is selected
                  onChange={(value) => handleFieldChange("fieldNumber", value)}
                  style={{ width: "100%" }} // Enable only when harvest date is selected
                >
                  <Option value="AA1">AA1</Option>
                  <Option value="BB1">BB1</Option>
                  <Option value="CC1">CC1</Option>
                  <Option value="DD1">DD1</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Crop Type"
                name="cropType"
                rules={[
                  { required: true, message: "Please select a crop type!" },
                ]}
              >
                <Select
                  placeholder="Select a crop type"
                  onChange={(value) => handleFieldChange("cropType", value)}
                  disabled={!formData.harvestdate || !formData.fieldNumber}
                  style={{ width: "100%" }}
                >
                  <Option value="Coconut">Coconut</Option>
                  <Option value="Banana">Banana</Option>
                  <Option value="Pepper">Pepper</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Quantity is required!" }]}
              >
                <InputNumber
                  placeholder="Quantity Picked"
                  min={1} // Minimum value set to 1
                  disabled={
                    !formData.harvestdate ||
                    !formData.fieldNumber ||
                    !formData.cropType
                  } // Disable based on other fields
                  onChange={(value) => handleFieldChange("quantity", value)} // Update field value on change
                  style={{ width: "100%" }} // Make input full width
                  parser={(value) => value.replace(/\D/g, "")} // Ensure only numbers are entered
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                  onPaste={(e) => e.preventDefault()} // Prevent pasting
                  onBlur={(e) => {
                    const value = e.target.value;
                    // Clear input if it's invalid on blur (less than 1)
                    if (value && value < 1) {
                      form.setFieldsValue({ quantity: undefined });
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Trees Picked"
                name="treesPicked"
                rules={[
                  {
                    required: true,
                    message: "Number of trees picked is required!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter Number of Trees Picked"
                  min={1} // Minimum value set to 1
                  max={100000000}
                  disabled={
                    !formData.harvestdate ||
                    !formData.fieldNumber ||
                    !formData.cropType ||
                    !formData.quantity
                  } // Disable based on other fields
                  onChange={(value) => handleFieldChange("treesPicked", value)} // Update field value on change
                  style={{ width: "100%" }} // Make input full width
                  parser={(value) => value.replace(/\D/g, "")} // Ensure only numbers are entered
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                  onPaste={(e) => e.preventDefault()} // Prevent pasting
                  onBlur={(e) => {
                    const value = e.target.value;
                    // Clear input if it's invalid on blur (less than 1)
                    if (value && value < 1) {
                      form.setFieldsValue({ treesPicked: undefined });
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Storage Location"
                name="storageLocation"
                rules={[
                  { required: true, message: "Please select a field number!" },
                ]}
              >
                <Select
                  placeholder="Select a Storage Location"
                  disabled={
                    !formData.harvestdate ||
                    !formData.fieldNumber ||
                    !formData.cropType ||
                    !formData.quantity ||
                    !formData.treesPicked
                  }
                  onChange={(value) =>
                    handleFieldChange("storageLocation", value)
                  }
                  style={{ width: "100%" }} // Enable only when harvest date is selected
                >
                  <Option value="LL1">LL1</Option>
                  <Option value="LL2">LL2</Option>
                  <Option value="LL3">LL3</Option>
                  <Option value="LL4">LL4</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  disabled={
                    !formData.harvestdate ||
                    !formData.fieldNumber ||
                    !formData.cropType ||
                    !formData.quantity ||
                    !formData.treesPicked ||
                    !formData.storageLocation
                  }
                >
                  Add Records
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
