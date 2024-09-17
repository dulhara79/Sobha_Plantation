import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const EditPrice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchLabelingPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/labeling-prices/${id}`);
        const { data } = response;
        form.setFieldsValue({
          ...data,
        });
      } catch (error) {
        console.error("Error fetching labeling price:", error); // Detailed error log
        notification.error({
          message: 'Error',
          description: 'Failed to fetch labeling price details.',
        });
      }
    };

    fetchLabelingPrice();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/labeling-prices/${id}`, values);
      notification.success({
        message: 'Success',
        description: 'Labeling price updated successfully!',
      });
      navigate('/products/packaging-labeling/labeling');
    } catch (error) {
      console.error("Error updating labeling price:", error); // Detailed error log
      notification.error({
        message: 'Error',
        description: 'Failed to update labeling price.',
      });
    }
  };

  const handleCancel = () => {
    navigate('/products/packaging-labeling/labeling');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Product Price</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please input the product type!' }]}
          >
            <Input placeholder="Enter product type" />
          </Form.Item>
          <Form.Item
            label="Unit Price (Rs)"
            name="unitPrice"
            rules={[{ required: true, message: 'Please input the unit price!' }]}
          >
            <Input type="number" placeholder="Enter unit price" />
          </Form.Item>
          <Form.Item
            label="Type Unit"
            name="typeUnit"
            rules={[{ required: true, message: 'Please input the type unit!' }]}
          >
            <Input placeholder="Enter type unit" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button type="primary" htmlType="submit" style={{ width: '48%' }}>
                Save
              </Button>
              <Button type="default" onClick={handleCancel} style={{ width: '48%' }}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditPrice;
