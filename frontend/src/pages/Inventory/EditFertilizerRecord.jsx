import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditFertilizerRecord = () => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Fetch record data
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/fertilizers/${id}`);
        const data = response.data;
        setRecord(data);

        // Convert dates to moment objects if they are valid
        const addedDate = moment(data.addeddate);
        const expiredDate = moment(data.expireddate);

        if (addedDate.isValid() && expiredDate.isValid()) {
          form.setFieldsValue({
            ...data,
            addeddate: addedDate,
            expireddate: expiredDate,
          });
        } else {
          console.error('Invalid date format:', data.addeddate, data.expireddate);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      // Prepare payload with the correct date format
      const payload = {
        ...values,
        addeddate: values.addeddate ? moment(values.addeddate).toISOString() : null,
        expireddate: values.expireddate ? moment(values.expireddate).toISOString() : null,
      };

      // Send PUT request to update the record
      await axios.put(`http://localhost:5000/api/fertilizers/${id}`, payload);

      notification.success({
        message: 'Success',
        description: ' Record updated successfully!',
      });
      navigate('/Inventory/FertilizerRecords'); // Redirect to the list page after successful update
    } catch (error) {
      console.error('Failed to update record:', error);
      notification.error({
        message: 'Error',
        description: `Failed to update record. ${error.response?.data?.message || 'Please try again.'}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Fertilizer/AgroChemical Record</h2>
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
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Fertilizer/Agrochemical Name "
            name="fertilizertype"
            rules={[{ required: true, message: 'Please select a fertilizer/agrochemical type!' }]}
          >
            <Select placeholder="Select a fertilizer type">
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
            <Input type="text" placeholder="Enter storage location" />
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
            <Button type="primary" htmlType="submit">
              Update Record
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditFertilizerRecord;
