import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddEquipmentRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

  // Completion states for each field
  const [equipmentTypeComplete, setEquipmentTypeComplete] = useState(false);
  const [addedDateComplete, setAddedDateComplete] = useState(false);
  const [quantityComplete, setQuantityComplete] = useState(false);
  const [storageLocationComplete, setStorageLocationComplete] = useState(false);
  const [statusComplete, setStatusComplete] = useState(false);

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to validate quantity to be a positive integer
  const validateQuantity = (_, value) => {
    if (value <= 0) {
      return Promise.reject(new Error('Quantity must be greater than 0!'));
    }
    return Promise.resolve();
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Extract form values
      const { addeddate, equipmenttype, quantity, storagelocation, status } = values;

      await axios.post('http://localhost:5000/api/equipments', {
        addeddate,
        equipmenttype,
        quantity,
        storagelocation,
        status
      });
      
      // Handle success
      notification.success({
        message: 'Success',
        description: 'Record added successfully!',
      });
      setLoading(false);
      form.resetFields();  // Optionally reset the form after successful submission
      navigate('/Inventory/EquipmentRecords');
    } catch (error) {
      console.error('Error adding record:', error);
      setLoading(false);
      notification.error({
        message: 'Error',
        description: 'There was an error adding the record.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Equipment/Machine Records</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={(changedFields, allFields) => {
            // Check completion status based on the form values
            const values = form.getFieldsValue();

            setEquipmentTypeComplete(!!values.equipmenttype);
            setAddedDateComplete(!!values.addeddate);
            setQuantityComplete(!!values.quantity);
            setStorageLocationComplete(!!values.storagelocation);
            setStatusComplete(!!values.status);
          }}
        >
          {/* Equipment/Machine Name */}
          <Form.Item
            label="Equipment/Machine Name"
            name="equipmenttype"
            rules={[{ required: true, message: 'Please select an equipment/machine type!' }]}
          >
            <Select placeholder="Select a equipment/machine type">
              <Option value="Bush cutter">Bush cutter</Option>
              <Option value="4L diesel cans">4L diesel cans</Option>
              <Option value="Metal chemical sprayer">Metal chemical sprayer</Option>
              <Option value="4hp diesel water pump">4hp diesel water pump</Option>
              <Option value="Boots pairs">Boots pairs</Option>
              <Option value="8hp petrol hand tractor">8hp petrol hand tractor</Option>
              <Option value="1hp tube well pump">1hp tube well pump</Option>
            </Select>
          </Form.Item>

          {/* Added Date */}
          <Form.Item
            label="Added Date"
            name="addeddate"
            rules={[{ required: true, message: 'Please select the added date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
              disabled={!equipmentTypeComplete} // Enable only when equipment type is selected
            />
          </Form.Item>

          {/* Quantity */}
       {/* Quantity */}
       <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: 'Please enter the quantity!' },
              { pattern: /^\d+$/, message: 'Quantity must be numeric' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (parseInt(value) >= 1 && parseInt(value) <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Quantity must be between 1 and 100!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter quantity" type="number" disabled={!addedDateComplete} />
          </Form.Item>


          {/* Storage Location */}
          <Form.Item
            label="Storage Location"
            name="storagelocation"
            rules={[{ required: true, message: 'Please enter the storage location!'}]}
           
          >
          <Select placeholder="Select Storage Location" disabled={!quantityComplete}>
              <Option value="warehouse1">warehouse1</Option>
              <Option value="warehouse2">warehouse2</Option>
              <Option value="warehouse3">warehouse3</Option>
            </Select>
            
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select status" disabled={!storageLocationComplete}>
              <Option value="In Stock">In Stock</Option>
              <Option value="Out Of Stock">Out Of Stock</Option>
              <Option value="Maintenance">Maintenance</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} disabled={!statusComplete}>
              Add Records
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddEquipmentRecord;
