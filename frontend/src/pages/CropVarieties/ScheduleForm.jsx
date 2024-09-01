import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const ScheduleForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [plantationDate, setPlantationDate] = useState(null);

  // Function to disable past dates
  const disablePastDates = current => {
    return current && current < moment().startOf('day');
  };

  // Function to disable future dates after the plantation date
  const disableFutureDates = current => {
    if (!plantationDate) return false;
    return current && current > moment(plantationDate).endOf('day');
  };

  const handleFinish = async (values) => {
    try {
      // Convert DatePicker moment objects to ISO strings
      const formattedValues = {
        ...values,
        plantationDate: values.plantationDate ? values.plantationDate.toISOString() : null,
        scheduledDate: values.scheduledDate ? values.scheduledDate.toISOString() : null,
      };

      console.log('Sending data:', formattedValues); // Debug: Check the data being sent

      await axios.post('http://localhost:5000/api/schedules', formattedValues);
      notification.success({ message: 'Schedule created successfully!' });
      form.resetFields();
    } catch (error) {
      console.error('Error creating schedule:', error); // Debug: Log the error
      notification.error({ message: 'Error creating schedule.', description: error.message });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Update plantationDate and reset the scheduledDate field when plantationDate changes
  const onPlantationDateChange = (date) => {
    setPlantationDate(date);
    form.setFieldsValue({ scheduledDate: null }); // Reset scheduledDate when plantationDate changes
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Schedule</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            status: 'Planned',
          }}
        >
          <Form.Item
            label="Plantation Date"
            name="plantationDate"
            rules={[{ required: true, message: 'Please select a plantation date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              onChange={onPlantationDateChange}
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item
            label="Assigned Team"
            name="assignedTeam"
            rules={[{ required: true, message: 'Please enter the assigned team!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Field Name"
            name="fieldName"
            rules={[{ required: true, message: 'Please select a field name!' }]}
          >
            <Select>
              <Option value="Field A">Field A</Option>
              <Option value="Field B">Field B</Option>
              <Option value="Field C">Field C</Option>
              <Option value="Field D">Field D</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Crop Variety"
            name="cropVariety"
            rules={[{ required: true, message: 'Please select a crop variety!' }]}
          >
            <Select>
              <Option value="Coconut">Coconut</Option>
              <Option value="Banana">Banana</Option>
              <Option value="Pineapple">Pineapple</Option>
              <Option value="Papaya">Papaya</Option>
              <Option value="Pepper">Pepper</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Scheduled Date"
            name="scheduledDate"
            rules={[{ required: true, message: 'Please select a scheduled date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              disabledDate={disableFutureDates}
            />
          </Form.Item>

          <Form.Item
            label="Seeds Used"
            name="seedsUsed"
            rules={[
              { required: true, message: 'Please enter the number of seeds used!' },
              { type: 'number', min: 1, message: 'Seeds used must be greater than zero!' }
            ]}
          >
            <Input type="number" min="1" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Option value="Planned">Planned</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
            <Button
              type="default"
              onClick={handleCancel}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ScheduleForm;
