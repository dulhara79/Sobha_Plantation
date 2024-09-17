
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditRequestPaymentRecord = () => {
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
        const response = await axios.get(`http://localhost:5000/api/requests/${id}`);
        const data = response.data;
        setRecord(data);

        // Convert dates to moment objects if they are valid
        const submittedDate = moment(data.submitteddate);
       

        if (submittedDate.isValid()) {
          form.setFieldsValue({
            ...data,
            submitteddate: submittedDate,
          
          });
        } else {
          console.error('Invalid date format:', data.submitteddate);
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
        submitteddate: values.submitteddate ? moment(values.submitteddate).toISOString() : null,
        
      };

      // Send PUT request to update the record
      await axios.put(`http://localhost:5000/api/requests/${id}`, payload);

      notification.success({
        message: 'Success',
        description: ' Record updated successfully!',
      });
      navigate('/Inventory/RequestPaymentRecords'); // Redirect to the list page after successful update
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
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Request Payment Records </h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Section "
            name="section"
            rules={[{ required: true, message: 'Please select a section !' }]}
          >
               <Select placeholder="Select a section ">
              <Option value="fertilizer">fertilizer</Option>
              <Option value="equipment">equipment</Option>
              <Option value="agro chemical">agro chemical</Option>
        
            
            </Select>
          </Form.Item>


              <Form.Item
              label="Item "
              name="item"
              rules={[{ required: true, message: 'Please select an item !' }]}
>
             <Select placeholder="Select an item " >
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
              <Option value="Glyphosate weedicide">Glyphosate weedicide</Option>
              <Option value="Rootone">Rootone</Option>
              { /*<Option value="Bush cutter">Bush cutter</Option>
              <Option value="4L disel cans">4L disel cans</Option>
              <Option value="Metal chemical sprayer">Metal chemical sprayer</Option>
              <Option value="4hp diesel water pump">4hp diesel water pump</Option>
              <Option value="Boots pairs">Boots pairs</Option>
              <Option value="8hp petrol hand tractor">8hp petrol hand tractor</Option>
              <Option value="1hp tube well pump">1hp tube well pump</Option> */}
           </Select>
          </Form.Item>

             <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: 'Please enter the amount!' }]}
            >
             <Input placeholder="Enter amount"
               type="number"
            
             />
            </Form.Item>
       
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="submitted Date"
            name="submitteddate"
            rules={[{ required: true, message: 'Please select the submitted date!' }]}
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
              <Option value="Pending">Pending</Option>
              <Option value="Paid">Paid</Option>        
   
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

export default EditRequestPaymentRecord;

