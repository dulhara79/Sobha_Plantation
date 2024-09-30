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
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
      },
      focusCancel: false,
    });

    try {
      await axios.put(`http://localhost:5000/api/labeling/${id}`, {
        ...values,
        labelingDate: values.labelingDate.format('YYYY-MM-DD'),
      });
      Swal.fire('Success', 'Label updated successfully!', 'success');
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
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <InputNumber
                placeholder="Enter quantity"
                min={1}
                max={100}
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
              Update Label
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
