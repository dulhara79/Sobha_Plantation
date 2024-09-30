import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const { Option } = Select;

const AddSchedule = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Completion states for each field
  const [harvestDateComplete, setHarvestDateComplete] = useState(false);
  const [fieldNumberComplete, setFieldNumberComplete] = useState(false);
  const [cropTypeComplete, setCropTypeComplete] = useState(false);
  const [quantityComplete, setQuantityComplete] = useState(false);
  const [treesPickedComplete, setTreesPickedComplete] = useState(false);
  const [storageLocationComplete, setStorageLocationComplete] = useState(false);

  const disableFutureDates = (current) => {
    return current && current >= moment().startOf('day');
  };

  const validateFieldNumber = (_, value) => {
    const pattern = /^(AA|BB|CC|DD)\d+$/;
    if (!value || pattern.test(value)) {
      setFieldNumberComplete(true);
      return Promise.resolve();
    }
    setFieldNumberComplete(false);
    return Promise.reject(new Error('Field number must be AA1, BB1, CC1, or DD1 format!'));
  };

  const validateStorageLocation = (_, value) => {
    const pattern = /^LL[1-4]$/;
    if (!value || pattern.test(value)) {
      setStorageLocationComplete(true);
      return Promise.resolve();
    }
    setStorageLocationComplete(false);
    return Promise.reject(new Error('Storage location must be LL1, LL2, LL3, or LL4!'));
  };

  const validateQuantity = (_, value) => {
    if (value >= 1) {
      setQuantityComplete(true);
      return Promise.resolve();
    }
    setQuantityComplete(false);
    return Promise.reject(new Error('Quantity must be at least 1!'));
  };

  const validateTreesPicked = (_, value) => {
    if (value >= 1) {
      setTreesPickedComplete(true);
      return Promise.resolve();
    }
    setTreesPickedComplete(false);
    return Promise.reject(new Error('Trees picked must be at least 1!'));
  };

  const handleHarvestDateChange = (date) => {
    if (date && date.isBefore(moment().startOf('day'))) {
      setHarvestDateComplete(true);
    } else {
      setHarvestDateComplete(false);
    }
  };

  const handleCropTypeChange = (value) => {
    if (value) {
      setCropTypeComplete(true);
    } else {
      setCropTypeComplete(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/yield', values);
      notification.success({
        message: 'Success',
        description: 'Yield record added successfully!',
      });
      setLoading(false);
      form.resetFields();
      navigate('/harvest/yield');
    } catch (error) {
      console.error('Error adding yield record:', error);
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'There was an error adding the yield record.',
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
            <h2 className="mb-6 text-2xl font-bold text-center">Add Yield Records</h2>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
    label="Harvest Date"
    name="harvestdate"
    rules={[
        { required: true, message: 'Please select a harvest date!' },
        {
            validator: (_, value) => {
                if (value && value.isBefore(moment().startOf('day'))) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Harvest date must be a past date!'));
            },
        },
    ]}
>
    <DatePicker
        format="YYYY-MM-DD"
        disabledDate={disableFutureDates} // This disables today and future dates
        onChange={handleHarvestDateChange}
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
                <Input placeholder="Enter field number" disabled={!harvestDateComplete} />
              </Form.Item>

              <Form.Item
                label="Crop Type"
                name="cropType"
                rules={[{ required: true, message: 'Please select a crop type!' }]}
              >
                <Select
                  placeholder="Select a crop type"
                  onChange={handleCropTypeChange}
                  disabled={!fieldNumberComplete}
                >
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
                <Input type="number" placeholder="Enter quantity" disabled={!cropTypeComplete} />
              </Form.Item>

              <Form.Item
                label="Trees Picked"
                name="treesPicked"
                rules={[
                  { required: true, message: 'Please enter the number of trees picked!' },
                  { validator: validateTreesPicked },
                ]}
              >
                <Input type="number" placeholder="Enter Trees Picked" disabled={!quantityComplete} />
              </Form.Item>

              <Form.Item
                label="Storage Location"
                name="storageLocation"
                rules={[
                  { required: true, message: 'Please enter the storage location!' },
                  { validator: validateStorageLocation },
                ]}
              >
                <Input placeholder="Enter Storage Location" disabled={!treesPickedComplete} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading} disabled={!storageLocationComplete}>
                  Add Records
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
