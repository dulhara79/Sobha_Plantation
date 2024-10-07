import React, { useState } from 'react'; 
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const { Option } = Select;

const AddRequestPaymentRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Define loading state for managing form submission
  const [loading, setLoading] = useState(false);

  // Completion states for fields
  const [sectionComplete, setSectionComplete] = useState(false);
  const [itemComplete, setItemComplete] = useState(false);
  const [amountComplete, setAmountComplete] = useState(false);
  const [descriptionComplete, setDescriptionComplete] = useState(false);
  const [submittedDateComplete, setSubmittedDateComplete] = useState(false);
  const [statusComplete, setStatusComplete] = useState(false);

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Extract form values
      const { section, item, amount, description, submitteddate, status } = values;

      await axios.post('http://localhost:5000/api/requests', {
        section,
        item,
        amount,
        description,
        submitteddate,
        status,
      });

      // Handle success, reset loading or form fields if needed
      notification.success({
        message: 'Success',
        description: 'Record added successfully!',
      });
      setLoading(false);
      form.resetFields();  // Optionally reset the form after successful submission

      navigate('/Inventory/RequestPaymentRecords');
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Request Payment Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          onFieldsChange={() => {
            const values = form.getFieldsValue();
            setSectionComplete(!!values.section);
            setItemComplete(!!values.item);
            setAmountComplete(!!values.amount);
            setDescriptionComplete(!!values.description);
            setSubmittedDateComplete(!!values.submitteddate);
            setStatusComplete(!!values.status);
          }}
        >
          {/* Section */}
          <Form.Item
            label="Section"
            name="section"
            rules={[{ required: true, message: 'Please select a section!' }]}
          >
            <Select placeholder="Select a section">
              <Option value="fertilizer">Fertilizer</Option>
              <Option value="equipment">Equipment</Option>
              <Option value="agro chemical">Agro Chemical</Option>
            </Select>
          </Form.Item>

          {/* Item */}
          <Form.Item
            label="Item"
            name="item"
            rules={[{ required: true, message: 'Please select an item!' }]}
          >
            <Select placeholder="Select an item" disabled={!sectionComplete}>
              <Option value="Coconut fertilizer">Coconut fertilizer</Option>
              <Option value="Banana fertilizer">Banana fertilizer</Option>
              <Option value="Pepper fertilizer">Pepper fertilizer</Option>
              <Option value="Papaya fertilizer">Papaya fertilizer</Option>
              <Option value="Urea">Urea</Option>
              <Option value="Dolomite">Dolomite</Option>
              <Option value="YPM">YPM</Option>
              <Option value="Booster K 45%">Booster K 45%</Option>
              <Option value="Daconil Chlorothalonil fungicide">Daconil Chlorothalonil fungicide</Option>
              <Option value="Marshal 20 SC insecticide">Marshal 20 SC insecticide</Option>
              <Option value="Mitsu Abamectin insecticide">Mitsu Abamectin insecticide</Option>
              <Option value="Alberts solution">Alberts solution</Option>
              <Option value="Crop Master solution">Crop Master solution</Option>
              <Option value="Oasis Thiram fungicide">Oasis Thiram fungicide</Option>
              <Option value="Glyphosate weedicide">Glyphosate weedicide</Option>
              <Option value="Rootone">Rootone</Option>
              <Option value="Bush cutter">Bush cutter</Option>
              <Option value="4L diesel cans">4L diesel cans</Option>
              <Option value="Metal chemical sprayer">Metal chemical sprayer</Option>
              <Option value="4hp diesel water pump">4hp diesel water pump</Option>
              <Option value="Boots pairs">Boots pairs</Option>
              <Option value="8hp petrol hand tractor">8hp petrol hand tractor</Option>
              <Option value="1hp tube well pump">1hp tube well pump</Option>
            </Select>
          </Form.Item>

          {/* Amount */}
          <Form.Item
  label="Amount"
  name="amount"
  rules={[
    { required: true, message: 'Please enter the amount!' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Amount must be a numeric value' }, // Updated pattern to allow decimals
    ({ getFieldValue }) => ({
      validator(_, value) {
        const amount = parseFloat(value);
        if (!value || (amount >= 50 && amount <= 500000)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Amount must be between 50.00 and 500,000.00!'));
      },
    }),
  ]}
>
  <Input placeholder="Enter amount" type="number" disabled={!itemComplete} />
</Form.Item>


          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
          >
            <Input placeholder="Enter description" disabled={!amountComplete} />
          </Form.Item>

          {/* Submitted Date */}
          <Form.Item
            label="Submitted Date"
            name="submitteddate"
            rules={[{ required: true, message: 'Please select the submitted date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                const today = moment().startOf('day');
                const fiveDaysAgo = moment().subtract(5, 'days').startOf('day');
                return current && (current < fiveDaysAgo || current > today);
              }}
              disabled={!descriptionComplete}
            />
          </Form.Item>
      

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status" disabled={!submittedDateComplete}>
              <Option value="Pending">Pending</Option>
              <Option value="Paid">Paid</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} disabled={!statusComplete}>
              Add Record
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
       </div>
       </div>
  );
};

export default AddRequestPaymentRecord;
