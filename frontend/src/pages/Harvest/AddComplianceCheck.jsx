import React, { useState } from "react";
import { Form, Input, Button, Switch, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddComplianceCheck = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/compliance-checks",
        values
      );
      if (response.status === 201) {
        notification.success({
          message: "Success",
          description: "Compliance check added successfully!",
        });
        form.resetFields(); // Reset form fields after successful submission
        navigate("/harvest/compliancechecklist");
      } else {
        notification.error({
          message: "Error",
          description: "There was an error adding the compliance check.",
        });
      }
    } catch (error) {
      console.error(
        "Error adding compliance check:",
        error.response?.data?.message || error.message
      );
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message ||
          "There was an error adding the compliance check.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Add Compliance Check
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ isActive: false }} // Set default value for isActive
        >
          <Form.Item
            label="Criteria Name"
            name="criteriaName"
            rules={[
              { required: true, message: "Please enter the criteria name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Active" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Last Updated"
            name="lastUpdated"
            rules={[
              { required: true, message: "Please enter the last updated date" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Compliance Check
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddComplianceCheck;
