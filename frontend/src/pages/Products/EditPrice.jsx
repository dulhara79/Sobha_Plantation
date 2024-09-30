import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, notification, InputNumber } from 'antd';
import Swal from 'sweetalert2';

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
        console.error("Error fetching labeling price:", error);
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
      Swal.fire("Success", "Unit price updated successfully!", "success");
      navigate('/products/packaging-labeling/labeling');
    } catch (error) {
      console.error("Error updating labeling price:", error);
      notification.error({
        message: 'Error',
        description: 'Failed to update labeling price.',
      });
    }
  };

  const handleCancel = () => {
    navigate('/products/packaging-labeling/labeling');
  };

  const handleUnitPriceChange = (value) => {
    // If value is less than 0, set to 0
    if (value < 0) {
      form.setFieldsValue({ unitPrice: 0 });
    } else {
      form.setFieldsValue({ unitPrice: value });
    }
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
            rules={[{ required: true, message: 'Product type cannot be changed!' }]}
          >
            <Input placeholder="Enter product type" disabled />
          </Form.Item>
          
          <Form.Item
  label="Unit Price (Rs)"
  name="unitPrice"
  rules={[
    { required: true, message: 'Please input the unit price!' },
    {
      type: 'number',
      min: 0,
      message: 'Unit price cannot be negative!',
    },
  ]}
>
  <InputNumber
    placeholder="Enter unit price"
    min={0} // Set minimum value to 0
    style={{ width: '100%' }}
    onChange={(value) => {
      // If the value is not a valid number, set to undefined
      if (isNaN(value)) {
        form.setFieldsValue({ unitPrice: undefined });
      } else {
        // If the value is a valid number, set it to the form
        form.setFieldsValue({ unitPrice: value < 0 ? 0 : value });
      }
    }} 
    onBlur={(e) => {
      const value = e.target.value;
      // Clear input if invalid after focus loss
      if (value && value < 0) {
        form.setFieldsValue({ unitPrice: undefined });
      }
    }}
  />
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
              <Button type="primary" htmlType="submit"
                style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}
              >
                Update price
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
