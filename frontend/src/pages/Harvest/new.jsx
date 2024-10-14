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

  const disableHarvestDate = () => {
    return !formData.cropType; // Enable harvest date only if crop type is selected
  };

  const disableFieldNumber = () => {
    return !formData.harvestdate; // Enable field number only if harvest date is selected
  };

  const disableQuantity = () => {
    return !formData.fieldNumber; // Enable quantity only if field number is selected
  };

  const disableUnit = () => {
    return !formData.quantity; // Enable unit only if quantity is selected
  };

  const disableTreesPicked = () => {
    return !formData.unit; // Enable trees picked only if unit is selected
  };

  const disableStorageLocation = () => {
    return !formData.treesPicked; // Enable storage location only if trees picked is selected
  };

  const handleSubmit = async (values) => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return; // Exit if there are validation errors

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
    });

    if (result.isConfirmed) {
      try {
        const payload = {
          ...values,
          harvestDate: values.harvestdate ? values.harvestdate.toISOString() : null,
        };

        await axios.post("http://localhost:5000/api/yield", payload);

        Swal.fire("Success", "Yield record added successfully!", "success");
        form.resetFields();
        navigate("/harvest/yield");
      } catch (error) {
        console.error("Error adding yield record:", error);
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-center">Add Yield Records</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
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
                  <Option value="Pepper">Pepper</Option>
                  <Option value="Papaya">Papaya</Option>
                  <Option value="Pineapple">Pineapple</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Harvest Date"
                name="harvestdate"
                rules={[{ required: true, message: "Please select a harvest date!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabled={disableHarvestDate()} // Enable based on crop type selection
                  onChange={(date) => handleFieldChange("harvestdate", date)}
                  style={{ width: "100%" }}
                  inputReadOnly
                  disabledDate={(current) => current && current.format("YYYY-MM-DD") !== "2024-10-10"}
                />
              </Form.Item>

              <Form.Item
                label="Field Number"
                name="fieldNumber"
                rules={[{ required: true, message: "Please select a field number!" }]}
              >
                <Select
                  placeholder="Select a field number"
                  disabled={disableFieldNumber()} // Enable only when harvest date is selected
                  onChange={(value) => handleFieldChange("fieldNumber", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="AA1">AA1</Option>
                  <Option value="BB1">BB1</Option>
                  <Option value="CC1">CC1</Option>
                  <Option value="DD1">DD1</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantity"
                required
              >
                <Input.Group compact>
                  <Form.Item
                    name="quantity"
                    noStyle
                    rules={[{ required: true, message: "Quantity is required!" }]}
                  >
                    <InputNumber
                      placeholder="Quantity Picked"
                      min={1}
                      disabled={disableQuantity()} // Disable based on other fields
                      onChange={(value) => handleFieldChange("quantity", value)}
                      style={{ width: "70%" }}
                      parser={(value) => value.replace(/\D/g, "")}
                    />
                  </Form.Item>

                  <Form.Item
                    name="unit"
                    noStyle
                    rules={[{ required: true, message: "Please select a unit!" }]}
                  >
                    <Select
                      placeholder="Unit"
                      style={{ width: "30%" }}
                      disabled={disableUnit()} // Disable based on quantity field
                      onChange={(value) => handleFieldChange("unit", value)}
                    >
                      <Option value="Kg">Kg</Option>
                      <Option value="MetricTon">Metric Ton</Option>
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                label="Trees Picked"
                name="treesPicked"
                rules={[
                  { required: true, message: "Number of trees picked is required!" },
                ]}
              >
                <InputNumber
                  placeholder="Enter Number of Trees Picked"
                  min={1}
                  disabled={disableTreesPicked()} // Disable based on unit field
                  onChange={(value) => handleFieldChange("treesPicked", value)}
                  style={{ width: "100%" }}
                  parser={(value) => value.replace(/\D/g, "")}
                />
              </Form.Item>

              <Form.Item
                label="Storage Location"
                name="storageLocation"
                rules={[
                  { required: true, message: "Please select a storage location!" },
                ]}
              >
                <Select
                  placeholder="Select a Storage Location"
                  disabled={disableStorageLocation()} // Disable based on trees picked field
                  onChange={(value) => handleFieldChange("storageLocation", value)}
                  style={{ width: "100%" }}
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
                    !formData.cropType ||
                    !formData.harvestdate ||
                    !formData.fieldNumber ||
                    !formData.quantity ||
                    !formData.unit ||
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
