import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, DatePicker, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddLabeling = () => {
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch product types from backend
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labeling-prices');
        setProductTypes(response.data.data || []);
      } catch (error) {
        console.error('Error fetching product types:', error);
        message.error('Failed to fetch product types');
      }
    };

    fetchProductTypes();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/labeling', {
        ...values,
        labelingDate: values.labelingDate.format('YYYY-MM-DD'), // Ensure date is formatted properly
      });
      message.success('Label added successfully!');
      navigate('/products/packaging-labeling/labeling');
    } catch (error) {
      console.error('Error adding labeling:', error);
      message.error('Failed to add labeling');
    }
  };

  // Function to disable past dates
  const disabledDate = (current) => {
    // Can not select days before today and today itself
    return current && current < moment().startOf('day');
  };

  const handleCancel = () => {
    navigate('/products/packaging-labeling/labeling');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1D6660' }}>Add New Label</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please select a product type!' }]}
        >
          <Select placeholder="Select a product type">
            {productTypes.map(type => (
              <Option key={type._id} value={type.productType}>{type.productType}</Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="labelingDate"
              label="Labeling Date"
              rules={[{ required: true, message: 'Please select a labeling date!' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please input the quantity!' }]}
            >
              <Input type="number" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select placeholder="Select status">
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}
              >
                Add Label
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ width: '100%' }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLabeling;
