import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddFertilizerRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to validate progress value
  const validateProgress = (_, value) => {
    if (value < 0 || value > 100) {
      return Promise.reject(new Error('Progress must be between 0 and 100'));
    }
    return Promise.resolve();
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
        setLoading(true);
        // Extract form values
        const { addeddate, fertilizertype, quantity,unit, storagelocation,expireddate,status } = values;

        await axios.post('http://localhost:5000/api/fertilizers', {
          addeddate,
          fertilizertype,
          quantity,
          unit,
          storagelocation,
          expireddate,
          status
        });
        
        // Handle success, reset loading or form fields if needed
        notification.success({
            message: 'Success',
            description: 'record added successfully!',
        });
        setLoading(false);
        form.resetFields();  // Optionally reset the form after successful submission

       
        navigate('/Inventory/FertilizerRecords');
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
        <h2 className="mb-6 text-2xl font-bold text-center">Add Fertilizer/AgroChemical Records</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Fertilizer/Agrochemical Name "
            name="fertilizertype"
            rules={[{ required: true, message: 'Please select a fertilizer/agrochemical type!' }]}
          >
               <Select placeholder="Select a fertilizer/AgroChemical type">
              <Option value="Coconut fertilizer">Coconut fertilizer</Option>
              <Option value="Banana fertilizer">Banana fertilizer</Option>
              <Option value="Pepper fertilizer">Pepper fertilizer</Option>
              <Option value="Papaya fertilizer">Papaya fertilizer</Option>
              <Option value="Urea">Urea</Option>
              <Option value="Dolomite">Dolomite</Option>
              <Option value="YPM">YPM</Option> 
              <Option value="Booster K 45%">Booster K 45%</Option>
              <Option value="Daconil Chlorothalonil (chlorothalonil 500g/l SC) fungicide">Daconil Chlorothalonil (chlorothalonil 500g/l SC) fungicide</Option>
              <Option value="Marshal 20 SC (carbosulfan 200g/l SC) insecticide">Marshal 20 SC (carbosulfan 200g/l SC) insecticide</Option>
              <Option value="Mitsu Abamectin (abamectin 18g/l EC) insecticide">Mitsu Abamectin (abamectin 18g/l EC) insecticide</Option>
              <Option value="Alberts solution">Alberts solution</Option>
              <Option value="Crop Master solution">Crop Master solution</Option>
              <Option value="Oasis Thiram (thiuram disulfide) fungicide">Oasis Thiram (thiuram disulfide) fungicide</Option>
              <Option value="weeGlyphosate weedicideicide">Glyphosate weedicide</Option>
              <Option value="Rootone">Rootone</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Added Date"
            name="addeddate"
            rules={[{ required: true, message: 'Please select the added date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="unit"
            rules={[{ required: true, message: 'Please select unit!' }]}
          >
            <Select placeholder="Select unit">
              <Option value="l">l</Option>
              <Option value="ml">ml</Option>
              <Option value="kg">kg</Option>
              <Option value="g">g</Option>
   
            </Select>
          </Form.Item>
        
          <Form.Item
            label="Storage Location"
            name="storagelocation"
            rules={[{ required: true, message: 'Please enter the storage location!' }]}
          >
            <Input placeholder="Enter Storage Location" />
          </Form.Item>

          <Form.Item
            label="Expired Date"
            name="expireddate"
            rules={[{ required: true, message: 'Please select the expired date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="In Stock">In Stock</Option>
              <Option value="Out Of Stock">Out Of Stock</Option>
              <Option value="Expired">Expired</Option>
   
            </Select>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Records
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFertilizerRecord;