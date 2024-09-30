import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';

const { Option } = Select;

const EditInspectionReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = ["productType", "inspectionDate", "status", "inspectorName"];

  // Disable past dates but allow today
  const disablePastDates = (current) => current && current < moment().startOf('day');

  // Validate inspector name
  const validateInspectorName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter the inspector name!'));
    }
    if (!/^[A-Z][a-z]*$/.test(value)) {
      return Promise.reject(new Error('Inspector name must start with an uppercase letter and only contain lowercase letters.'));
    }
    return Promise.resolve();
  };

  const handleInspectorNameChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input starts with an uppercase letter
    if (inputValue.length === 0 || /^[A-Z]/.test(inputValue)) {
      // Prevent spaces and only allow letters
      let formattedValue = inputValue
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/[^a-zA-Z]/g, ''); // Remove non-letter characters

      setFormData((prevFormData) => ({
        ...prevFormData,
        inspectorName: formattedValue,
      }));

      // Update the form field value
      form.setFieldsValue({ inspectorName: formattedValue });
    } else {
      // If the first letter is not uppercase, reset the input to the previous valid value
      notification.warning({
        message: 'Invalid Input',
        description: 'The first letter must be uppercase.',
      });
      form.setFieldsValue({ inspectorName: formData.inspectorName }); // Restore the previous value
    }
  };

  // Disable copy/paste/cut for inspector name input
  const handleCopyPasteCut = (e) => {
    e.preventDefault();
    notification.warning({
      message: 'Action Disabled',
      description: 'Copy, Paste, and Cut actions are disabled for this field.',
    });
  };

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

  useEffect(() => {
    const fetchInspectionReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quality-control/${id}`);
        const { data } = response;
        form.setFieldsValue({
          ...data,
          inspectionDate: data.inspectionDate ? moment(data.inspectionDate) : null,
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error fetching inspection report',
        });
      }
    };

    fetchInspectionReport();
  }, [id, form]);

  const handleSubmit = async (values) => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0);
    if (!isFormValid) return;

    const result = await Swal.fire({
      title: "Confirmation Required",
      text: "Are you sure you want to update this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
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

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/quality-control/${id}`, {
          ...values,
          inspectionDate: values.inspectionDate ? values.inspectionDate.toISOString() : null,
        });
        Swal.fire('Success', 'Inspection report updated successfully!', 'success');
        navigate('/products/quality-control');
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error updating inspection report',
        });
      }
    }
  };

  const handleCancel = () => {
    navigate('/products/quality-control');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#1D6660' }}>Edit Inspection Report</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={(_, allFields) => handleFieldsError(allFields)}
        >
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[{ required: true, message: 'Please select a product type!' }]}
          >
            <Select
              placeholder="Select a product type"
              onChange={(value) => handleFieldChange('productType', value)}
              style={{ width: '100%' }}
            >
              <Option value="coconut-oil">Coconut Oil</Option>
              <Option value="coconut-water">Coconut Water</Option>
              <Option value="coconut-milk">Coconut Milk</Option>
              <Option value="coconut-cream">Coconut Cream</Option>
              <Option value="coir">Coir</Option>
              <Option value="shell-products">Shell Products</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="inspectionDate"
            label="Inspection Date"
            rules={[{ required: true, message: 'Please select the inspection date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
              onChange={(date) => handleFieldChange('inspectionDate', date)}
              style={{ width: '100%' }}
              inputReadOnly
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select
              placeholder="Select status"
              onChange={(value) => handleFieldChange('status', value)}
              style={{ width: '100%' }}
            >
              <Option value="Passed">Pass</Option>
              <Option value="Failed">Fail</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Inspector Name (Mr/Ms)"
            name="inspectorName"
            rules={[{ validator: validateInspectorName }]}
          >
            <Input
              placeholder="Enter inspector name"
              style={{ width: '100%' }}
              onChange={handleInspectorNameChange}
              onPaste={handleCopyPasteCut} // Disable paste
              onCut={handleCopyPasteCut} // Disable cut
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '48%', backgroundColor: '#1D6660', borderColor: '#1D6660' }}
              >
                Update Report
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

export default EditInspectionReport;
