import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch, notification } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditComplianceCheck = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Fetch existing compliance check data
  useEffect(() => {
    const fetchComplianceCheck = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/compliance-checks/${id}`
        );
        form.setFieldsValue({
          ...response.data,
          lastUpdated: response.data.lastUpdated
            ? new Date(response.data.lastUpdated).toISOString().slice(0, 16)
            : "",
        });
      } catch (error) {
        console.error(
          "Error fetching compliance check:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchComplianceCheck();
  }, [form, id]);

  // Handle form submission
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        lastUpdated: values.lastUpdated
          ? new Date(values.lastUpdated).toISOString()
          : null,
      };

      const response = await axios.put(
        `http://localhost:5000/api/compliance-checks/${id}`,
        payload
      );
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Compliance check updated successfully!",
        });
        navigate("/harvest/compliancechecklist"); // Redirect to the list page
      } else {
        notification.error({
          message: "Error",
          description: "There was an error updating the compliance check.",
        });
      }
    } catch (error) {
      console.error(
        "Error updating compliance check:",
        error.response?.data?.message || error.message
      );
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message ||
          "There was an error updating the compliance check.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Edit Compliance Check
        </h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              Update Compliance Check
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditComplianceCheck;
