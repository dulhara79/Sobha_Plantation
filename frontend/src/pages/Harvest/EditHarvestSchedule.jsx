// src/pages/harvest/EditHarvestSchedule.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, DatePicker, TimePicker, Button, notification, Card, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Item: FormItem } = Form;

const EditHarvestSchedule = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false); // For submit button loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Extracting harvestId from URL

  // Fetch harvest schedule data
  const fetchHarvestSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/harvest/${id}`);
      if (response.data.success) {
        const data = response.data.data;
        form.setFieldsValue({
          harvestId: data.harvestId,
          cropType: data.cropType,
          harvestDate: moment(data.harvestDate),
          startTime: moment(data.startTime, 'HH:mm'),
          endTime: moment(data.endTime, 'HH:mm'),
          fieldNumber: data.fieldNumber,
          estimatedYield: data.estimatedYield,
          numberOfWorkers: data.numberOfWorkers,
          harvestMethod: data.harvestMethod,
        });
      } else {
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      console.error('Error fetching harvest schedule:', error);
      notification.error({ message: 'Failed to fetch harvest schedule' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHarvestSchedule();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/harvest/${id}`, {
        ...values,
        harvestDate: values.harvestDate.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
      });
      if (response.data.success) {
        notification.success({ message: 'Harvest schedule updated successfully!' });
        navigate('/harvest/schedule'); // Redirect after successful update
      } else {
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      console.error('Error updating harvest schedule:', error);
      notification.error({ message: 'Error updating harvest schedule' });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="edit-harvest-schedule" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card title="Edit Harvest Schedule" bordered={false} style={{ width: '100%' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <FormItem name="harvestId" label="Harvest ID" rules={[{ required: true }]}>
              <Input disabled />
            </FormItem>
            <FormItem name="cropType" label="Crop Type" rules={[{ required: true }]}>
              <Input />
            </FormItem>
            <FormItem name="harvestDate" label="Harvest Date" rules={[{ required: true }]}>
              <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
            </FormItem>
            <FormItem name="startTime" label="Start Time" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </FormItem>
            <FormItem name="endTime" label="End Time" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </FormItem>
            <FormItem name="fieldNumber" label="Field Number" rules={[{ required: true }]}>
              <Input type="number" />
            </FormItem>
            <FormItem name="estimatedYield" label="Estimated Yield" rules={[{ required: true }]}>
              <Input type="number" />
            </FormItem>
            <FormItem name="numberOfWorkers" label="Number of Workers" rules={[{ required: true }]}>
              <Input type="number" />
            </FormItem>
            <FormItem name="harvestMethod" label="Harvest Method" rules={[{ required: true }]}>
              <Input />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={submitLoading} style={{ width: '100%' }}>
                Update Schedule
              </Button>
            </FormItem>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default EditHarvestSchedule;
