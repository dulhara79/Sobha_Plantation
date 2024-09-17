import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const EditLabeling = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch existing labeling data for editing
    const fetchLabelingData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/labeling/${id}`);
        const { data } = response;
        form.setFieldsValue({
          ...data,
          labelingDate: data.labelingDate ? moment(data.labelingDate) : null,
          quantity: data.quantity,
          productName: data.productName,
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch labeling data',
        });
      }
    };

    fetchLabelingData();
  }, [id, form]);

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/labeling/${id}`, {
        ...values,
        labelingDate: values.labelingDate.format('YYYY-MM-DD'),
      });
      message.success('Labeling details updated successfully');
      navigate('/products/packaging-labeling/labeling'); // Navigate back to the Labeling page
    } catch (error) {
      console.error('Error updating labeling details:', error);
      message.error('Failed to update labeling details');
    }
  };

  const handleCancel = () => {
    navigate('/products/packaging-labeling/labeling');
  };

  // Define disabledDate function to disable certain dates
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Labeling Details</h2>
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Product Name"
            name="productName"
          >
            <Select placeholder="Select a product type" disabled>
              <Option value="coconut-oil">Coconut Oil</Option>
              <Option value="coconut-water">Coconut Water</Option>
              <Option value="coconut-milk">Coconut Milk</Option>
              <Option value="coconut-cream">Coconut Cream</Option>
              <Option value="coir">Coir</Option>
              <Option value="shell-products">Shell Products</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Labeling Date"
            name="labelingDate"
            rules={[{ required: true, message: 'Please select a labeling date' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <Input type="number" placeholder="Quantity" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
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

export default EditLabeling;
