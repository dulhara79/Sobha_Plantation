import React, { useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditYieldRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the record ID from the route parameters

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };

  useEffect(() => {
    // Fetch the existing yield record data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/yield/${id}`);
        const data = response.data;
        form.setFieldsValue({
          id: data.id,
          harvestdate: moment(data.harvestdate),
          cropType: data.cropType,
          ageofYieldDate: data.ageofYieldDate,
          quantity: data.quantity,
          wayPicked: data.wayPicked,
          treesPicked: data.treesPicked,
          storageLocation: data.storageLocation,
        });
      } catch (error) {
        console.error('Failed to fetch yield record:', error);
        notification.error({
          message: 'Error',
          description: `Failed to fetch yield record. ${error.response?.data?.message || 'Please try again.'}`,
        });
      }
    };

    fetchData();
  }, [form, id]);

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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Edit Yield Record</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please enter the ID!' }]}
          >
            <Input type="text" placeholder="Enter ID" />
          </Form.Item>

          <Form.Item
            label="Harvest Date"
            name="harvestdate"
            rules={[{ required: true, message: 'Please select the harvest date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
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
            label="Age of Yield Date"
            name="ageofYieldDate"
            rules={[{ required: true, message: 'Please enter the age of Yield Date!' }]}
          >
            <Input type="number" placeholder="Enter age of Yield Date" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity!' }]}
          >
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            label="Way Picked"
            name="wayPicked"
            rules={[{ required: true, message: 'Please enter the way picked!' }]}
          >
            <Input type="text" placeholder="Enter way picked" />
          </Form.Item>

          <Form.Item
            label="Trees Picked"
            name="treesPicked"
            rules={[{ required: true, message: 'Please enter the number of trees picked!' }]}
          >
            <Input type="number" placeholder="Enter number of trees picked" />
          </Form.Item>

          <Form.Item
            label="Storage Location"
            name="storageLocation"
            rules={[{ required: true, message: 'Please enter the storage location!' }]}
          >
            <Input type="text" placeholder="Enter storage location" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Record
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditYieldRecord;
