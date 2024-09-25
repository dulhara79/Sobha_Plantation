import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const { Option } = Select;

const EditYieldRecord = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the record ID from the route parameters

  // Function to disable past dates
  const disableFutureDates = (current) => {
    return current && current >= moment().startOf('day');
  };
  // Fetch record data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/yield/${id}`);
        setRecord(response.data);
        form.setFieldsValue({
          ...response.data,
          harvestdate: moment(response.data.harvestdate),
        });
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  const validateFieldNumber = (_, value) => {
    const pattern = /^(AA|BB|CC|DD)\d+$/;
    if (!value || pattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Field number must be AA1, BB1, CC1, or DD1 format!'));
  };

  const validateQuantity = (_, value) => {
    if (value >= 1) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Quantity must be at least 1!'));
  };

  const validateTreesPicked = (_, value) => {
    if (value >= 1) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Trees picked must be at least 1!'));
  };

  const validateStorageLocation = (_, value) => {
    const pattern = /^LL[1-4]$/;
    if (!value || pattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Storage location must be LL1, LL2, LL3, or LL4!'));
  };

  const handleSubmit = async (values) => {
    try {
      // Prepare payload with the correct date format
      const payload = {
        ...values,
        harvestdate: values.harvestdate ? moment(values.harvestdate).toISOString() : null,
      };

      // Send PUT request to update the record
      await axios.put(`http://localhost:5000/api/yield/${id}`, payload);
      notification.success({
        message: 'Success',
        description: 'Yield Record updated successfully!',
      });
      navigate('/harvest/yield'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Failed to update yield record:', error);
      notification.error({
        message: 'Error',
        description: `Failed to update yield record. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex h-screen">
         <Sidebar />
    <div className="flex flex-col flex-grow">
          <Header />
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Yield Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Harvest Date"
            name="harvestdate"
            rules={[{ required: true, message: 'Please select the harvest date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disableFutureDates}
            />
          </Form.Item>

          <Form.Item
            label="Field Number"
            name="fieldNumber"
            rules={[
              { required: true, message: 'Please enter the field number!' },
              { validator: validateFieldNumber },
            ]}
          >
            <Input placeholder="Enter field number" />
          </Form.Item>

          <Form.Item
            label="Crop Type"
            name="cropType"
            rules={[{ required: true, message: 'Please select a crop type!' }]}
          >
            <Select placeholder="Select a crop type">
              <Option value="coconut">Coconut</Option>
              <Option value="banana">Banana</Option>
              <Option value="pepper">Pepper</Option>
              <Option value="papaya">Papaya</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: 'Please enter the quantity!' },
              { validator: validateQuantity },
            ]}
          >
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            label="Trees Picked"
            name="treesPicked"
            rules={[
              { required: true, message: 'Please enter the number of trees picked!' },
              { validator: validateTreesPicked },
            ]}
          >
            <Input type="number" placeholder="Enter number of trees picked" />
          </Form.Item>

          <Form.Item
            label="Storage Location"
            name="storageLocation"
            rules={[
              { required: true, message: 'Please enter the storage location!' },
              { validator: validateStorageLocation },
            ]}
          >
            <Input type="text" placeholder="Enter storage location" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Record
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
   </div>
  );
};

export default EditYieldRecord;
