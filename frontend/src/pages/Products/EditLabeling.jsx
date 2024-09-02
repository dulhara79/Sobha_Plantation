import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditLabeling = () => {
  const [form] = Form.useForm();
  const [productTypes, setProductTypes] = useState([]);
  const [labelingData, setLabelingData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch product types
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labeling-prices');
        if (response.data && response.data.data) {
          setProductTypes(response.data.data);
        } else {
          message.error('No product types found');
        }
      } catch (error) {
        console.error('Error fetching product types:', error);
        message.error('Failed to fetch product types');
      }
    };

    // Fetch labeling data for editing
    const fetchLabelingData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/labeling/${id}`);
        if (response.data && response.data.data) {
          const data = response.data.data;
          setLabelingData(data);
          form.setFieldsValue({
            ...data,
            labelingDate: moment(data.labelingDate),
          });
        } else {
          message.error('Labeling data not found');
        }
      } catch (error) {
        console.error('Error fetching labeling data:', error);
        message.error('Failed to fetch labeling data');
      }
    };

    fetchProductTypes();
    fetchLabelingData();
  }, [id, form]);

  const handleFinish = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/labeling/${id}`, {
        ...values,
        labelingDate: values.labelingDate.format('YYYY-MM-DD'),
      });
      message.success('Labeling updated successfully');
      navigate('/products/labeling');
    } catch (error) {
      console.error('Error updating labeling:', error);
      message.error('Failed to update labeling');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={labelingData}
      >
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please select a product' }]}
        >
          <Select placeholder="Select a product">
            {productTypes.map(pt => (
              <Option key={pt._id} value={pt.productType}>
                {pt.productType}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="labelingDate"
          label="Labeling Date"
          rules={[{ required: true, message: 'Please select a labeling date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter the quantity' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please enter the status' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditLabeling;
