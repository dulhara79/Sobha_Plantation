import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message, notification, InputNumber, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

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
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    try {
      await axios.put(`http://localhost:5000/api/labeling/${id}`, {
        ...values,
        labelingDate: values.labelingDate.format('YYYY-MM-DD'),
      });
      Swal.fire('Success', 'Inspection report updated successfully!', 'success');
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
    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1D6660' }}>Edit Labeling Details</h2>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: 'Please select a product type!' }]}
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
            name="labelingDate"
            label="Labeling Date"
            rules={[
              { required: true, message: 'Please select a labeling date!' },
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Please select a labeling date!')),
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              onChange={(date) => handleFieldChange('labelingDate', date)}
              inputReadOnly // Disable manual input for DatePicker
            />
          </Form.Item>


        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: 'Please input the quantity!' },
            {
              type: 'number',
              min: 1,
              max: 100,
              message: 'Quantity must be between 1 and 100!',
            },
          ]}
        >
          <InputNumber
            placeholder="Enter quantity"
            min={1}
            max={100}
            style={{ width: '100%' }}
            onBlur={(e) => {
              const value = e.target.value;
              // Clear input if invalid after focus loss
              if (value && (value < 1 || value > 100)) {
                form.setFieldsValue({ quantity: undefined });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select placeholder="Select status">
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}>
                Save
              </Button>
            </Col>
            <Col span={12}>
              <Button type="default" onClick={handleCancel} style={{ width: '100%' }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditLabeling;
