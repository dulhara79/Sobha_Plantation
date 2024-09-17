import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSeedlingForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/seedlings', values);
      notification.success({ message: 'Seedling added successfully!' });
      form.resetFields();
      navigate('/seedlings'); // Redirect to the seedling list or any other page
    } catch (error) {
      notification.error({ message: 'Error adding seedling', description: error.response?.data?.message || error.message });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Seedling</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Seedling Type"
            name="seedlingType"
            rules={[{ required: true, message: 'Please enter the seedling type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Current Quantity"
            name="currentQuantity"
            rules={[{ required: true, message: 'Please enter the current quantity!' }, { type: 'number', min: 1, message: 'Quantity must be greater than 0!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Minimum Stock"
            name="minStock"
            rules={[{ required: true, message: 'Please enter the minimum stock!' }, { type: 'number', min: 1, message: 'Minimum stock must be greater than 0!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Add Seedling
            </Button>
            <Button
              type="default"
              onClick={handleCancel}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddSeedlingForm;
