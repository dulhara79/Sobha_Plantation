import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { InputNumber } from "antd";
import Swal from "sweetalert2";

const { Option } = Select;

const EditYieldRecord = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the record ID from the route parameters

  // Function to disable past dates
  const disableFutureDates = (current) => {
    return current && current >= moment().startOf("day");
  };
  // Fetch record data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/yield/${id}`
        );
        setRecord(response.data);
        form.setFieldsValue({
          ...response.data,
          harvestdate: moment(response.data.harvestdate),
        });
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };
    fetchRecord();
  }, [id, form]);

  const handleSubmit = async (values) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the yield record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        // Prepare payload with the correct date format
        const payload = {
          ...values,
          harvestdate: values.harvestdate
            ? moment(values.harvestdate).toISOString()
            : null,
        };

        // Send PUT request to update the record
        await axios.put(`http://localhost:5000/api/yield/${id}`, payload);

        // Show success notification
        notification.success({
          message: "Success",
          description: "Yield Record updated successfully!",
        });

        // Redirect to the yield list page after successful update
        navigate("/harvest/yield");
      } catch (error) {
        console.error("Failed to update yield record:", error);

        // Show error notification
        notification.error({
          message: "Error",
          description: `Failed to update yield record. ${
            error.response?.data?.message || "Please try again."
          }`,
        });
      }
    } else {
      // Show cancelled alert
      Swal.fire("Cancelled", "The update was cancelled", "info");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-center">
              Edit Yield Record
            </h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="Harvest Date"
                name="harvestdate"
                rules={[
                  {
                    required: true,
                    message: "Please select the harvest date!",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disableFutureDates}
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
                <Select placeholder="Select a crop type">
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
                rules={[
                  { required: true, message: "Please enter the quantity!" },
                  {
                    validator: (_, value) => {
                      if (value && value >= 1) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Quantity must be at least 1!")
                      );
                    },
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter quantity"
                  min={1} // Minimum value set to 1
                  style={{ width: "100%" }} // Full width input
                  onPaste={(e) => e.preventDefault()} // Prevent pasting
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input
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
                    message: "Please enter the number of trees picked!",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Number of trees picked must be numeric",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        (parseInt(value) >= 1 && parseInt(value) <= 1000000)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Trees Picked must be between 1 and 1,000,000!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter number of trees picked"
                  onPaste={(e) => e.preventDefault()} // Prevent pasting
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Storage Location"
                name="storageLocation"
                rules={[
                  {
                    required: true,
                    message: "Please enter the storage location!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a Storage Location"
                  style={{ width: "100%" }} // Enable only when harvest date is selected
                >
                  <Option value="LL1">LL1</Option>
                  <Option value="LL2">LL2</Option>
                  <Option value="LL3">LL3</Option>
                  <Option value="LL4">LL4</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Record
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditYieldRecord;
