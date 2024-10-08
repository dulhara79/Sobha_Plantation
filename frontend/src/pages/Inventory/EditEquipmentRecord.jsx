import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const { Option } = Select;

const EditEquipmentRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/equipments/${id}`);
        const data = response.data;

        // Convert dates to moment objects if they are valid
        const addedDate = moment(data.addeddate);
        if (addedDate.isValid()) {
          form.setFieldsValue({
            ...data,
            addeddate: addedDate,
          });
        } else {
          console.error('Invalid date format:', data.addeddate);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  const validateQuantity = (_, value) => {
    if (!value || value < 1) {
      return Promise.reject(new Error('Quantity must be greater than 0!'));
    }
    return Promise.resolve();
  };

  const validateStorageLocation = (_, value) => {
    if (!value || value.length < 3) {
      return Promise.reject(new Error('Storage location must be at least 3 characters!'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        addeddate: values.addeddate ? moment(values.addeddate).toISOString() : null,
      };

      await axios.put(`http://localhost:5000/api/equipments/${id}`, payload);

      notification.success({
        message: 'Success',
        description: 'Record updated successfully!',
      });
      navigate('/Inventory/EquipmentRecords'); 
    } catch (error) {
      console.error('Failed to update record:', error);
      notification.error({
        message: 'Error',
        description: `Failed to update record. ${error.response?.data?.message || 'Please try again.'}`,
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
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Equipment/Machine Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
        <Form.Item
  label="Added Date"
  name="addeddate"
  rules={[{ required: true, message: 'Please select the added date!' }]}
>
  <DatePicker
    format="YYYY-MM-DD"
    disabledDate={(current) => {
      const today = moment().startOf('day');
      const fiveDaysAgo = moment().subtract(5, 'days').startOf('day');
      return current && (current < fiveDaysAgo || current > today);
    }}
  />
</Form.Item>


          <Form.Item
            label="Equipment/Machine Name"
            name="equipmenttype"
            rules={[{ required: true, message: 'Please select an equipment/machine type!' }]}
          >
            <Select placeholder="Select an equipment/machine type">
              <Option value="Bush cutter">Bush cutter</Option>
              <Option value="4L diesel cans">4L diesel cans</Option>
              <Option value="Metal chemical sprayer">Metal chemical sprayer</Option>
              <Option value="4hp diesel water pump">4hp diesel water pump</Option>
              <Option value="Boots pairs">Boots pairs</Option>
              <Option value="8hp petrol hand tractor">8hp petrol hand tractor</Option>
              <Option value="1hp tube well pump">1hp tube well pump</Option>
            </Select>
          </Form.Item>

          <Form.Item
  label="Quantity"
  name="quantity"
  rules={[
    { required: true, message: 'Please enter the quantity!' },
    {
      validator(_, value) {
        if (!value || (/^[1-9]\d*$/.test(value) && value <= 50)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Quantity must be a whole number between 1 and 50!'));
      },
    },
  ]}
>
  <Input placeholder="Enter quantity" type="number" min={1} max={50} step={1} />
</Form.Item>



          <Form.Item
            label="Storage Location"
            name="storagelocation"
            rules={[{ required: true, message: 'Please enter the storage location!' }]}
          >
             <Select placeholder="Select Storage Location">
              <Option value="warehouse1">warehouse1</Option>
              <Option value="warehouse2">warehouse2</Option>
              <Option value="warehouse3">warehouse3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="In Stock">In Stock</Option>
              <Option value="Out Of Stock">Out Of Stock</Option>
              <Option value="Maintenance">Maintenance</Option>
            </Select>
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

export default EditEquipmentRecord;
