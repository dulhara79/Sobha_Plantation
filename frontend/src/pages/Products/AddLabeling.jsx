import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Select, message, DatePicker, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import Sidebar from '../../components/Sidebar';

const { Option } = Select;

const AddLabeling = () => {
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = ["productName", "labelingDate", "quantity", "status"];

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

  // Function to disable past dates
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

// Block further fields if the previous field has errors or is empty
const handleFieldChange = (name, value) => {
  const currentIndex = fields.indexOf(name);
  if (currentIndex > 0) {
    const previousField = fields[currentIndex - 1];
    if (errors[previousField] || !formData[previousField]) {
      return; // Block current field if previous has errors or is empty
    }
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

const handleFieldsError = (errorInfo) => {
  const newErrors = errorInfo.reduce((acc, { name, errors }) => {
    acc[name[0]] = errors.length > 0;
    return acc;
  }, {});
  setErrors(newErrors);
};

// Disable copy-pasting in input fields
const handlePreventPaste = (e) => {
  e.preventDefault();
  notification.warning({
    message: 'Paste Disabled',
    description: 'Copy-pasting is disabled for this field.',
  });
};

  const handleSubmit = async (values) => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    const result = await Swal.fire({
      title: "<strong>Confirmation Required</strong>",
      html: "Are you sure you want to submit this form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        html: 'swal-custom-html',
        confirmButton: 'swal-confirm-button', // Custom class for confirm button
        cancelButton: 'swal-cancel-button',
      },
      focusCancel: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post('http://localhost:5000/api/labeling', {
          ...values,
          labelingDate: values.labelingDate.format('YYYY-MM-DD'), // Format date properly
        });
        Swal.fire("Success", "Label added successfully!", "success");
        form.resetFields();
        setFormData({});
        navigate('/products/packaging-labeling/labeling');
      } catch (error) {
        console.error('Error adding labeling:', error);
        message.error('Failed to add labeling');
      }
    }
  };

  const handleCancel = () => {
    navigate('/products/packaging-labeling/labeling');
  };

  return (

    <div>
      <Sidebar className="sidebar" />
    <div style={{ padding: '24px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1D6660' }}>Add New Label</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFieldsChange={(_, allFields) => handleFieldsError(allFields)}
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
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please select a product type!' }]}
        >
          <Select
            placeholder="Select a product type"
            onChange={(value) => handleFieldChange('productName', value)}
          >
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
                disabled={!formData.productName} // Disable if productName is empty
                onChange={(date) => handleFieldChange('labelingDate', date)}
                inputReadOnly // Disable manual input for DatePicker
              />
            </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <InputNumber
                placeholder="Enter quantity"
                min={1}
                max={100}
                disabled={!formData.productName || !formData.labelingDate} 
                onChange={(value) => handleFieldChange('quantity', value)}
                style={{ width: '100%' }}
                parser={(value) => value.replace(/\D/g, '')} // Only allow digits
                onKeyPress={(e) => {
                  const key = e.key;
                  const currentValue = e.target.value;

                  // Only allow numbers between 0-9
                  if (!/[0-9]/.test(key)) {
                    e.preventDefault(); // Prevent non-numeric input
                  }

                  // Prevent typing a value greater than 100 or less than 1
                  if ((currentValue === '' && key === '0') || parseInt(currentValue + key) > 100) {
                    e.preventDefault();
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;

                  // If the value exceeds 100, reset it to 100 or if it's less than 1, reset it to 1
                  if (value > 100) {
                    form.setFieldsValue({ quantity: 100 });
                  } else if (value < 1) {
                    form.setFieldsValue({ quantity: 1 });
                  }
                }}
                onPaste={handlePreventPaste} // Prevent paste
              />
          </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select
            placeholder="Select status"
            disabled={!formData.productName || !formData.labelingDate || !formData.quantity} // Disable if quantity is empty
            onChange={(value) => handleFieldChange('status', value)}
          >
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
    </div>
  );
};

export default AddLabeling;
