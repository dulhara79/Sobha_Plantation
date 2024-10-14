import React, { useEffect } from 'react';
import { Form, Select, InputNumber, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


const { Option } = Select;

const PlantGrowthForm = ({ editingRecord, onFormSubmitSuccess }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Block all non-numeric inputs
  const blockNonNumericInput = (e) => {
    // Allow control keys like backspace, delete, arrow keys, and tab
    if (
      e.key !== 'Backspace' &&
      e.key !== 'Tab' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Delete' &&
      !/^\d$/.test(e.key) // Block anything that is not a number
    ) {
      e.preventDefault();
    }
  };

  // Submit form handler
  const handleFormSubmit = async (values) => {
    try {
      let response;
      if (editingRecord) {
        // Update plant growth record
        response = await axios.put(`http://localhost:5000/api/plant-growth/${editingRecord._id}`, values);
        if (response.status === 200) {
          message.success('Plant growth record updated successfully!');
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
      } else {
        // Create new plant growth record
        response = await axios.post('http://localhost:5000/api/plant-growth', values);
        if (response.status === 201) {
          message.success('Plant growth record created successfully!');
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
      }

      onFormSubmitSuccess();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to save data';
      message.error(`Error: ${errorMessage}`);
    }
    navigate(-1);
  };

  // Load existing data into form when editingRecord is present
  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue(editingRecord);
    }
  }, [editingRecord, form]);

  // Cancel button handler to navigate back to the previous page
  const handleCancel = () => {
    navigate(-1);
  };

  const formContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formStyle = {
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div>
         <Header />
         <Sidebar />
    <div style={formContainerStyle}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        style={formStyle}
      >
        <Form.Item
          label="Plant Type"
          name="plantType"
          rules={[{ required: true, message: 'Please select plant type!' }]}
        >
          <Select>
            <Option value="Coconut">Coconut</Option>
            <Option value="Banana">Banana</Option>
            <Option value="Pepper">Pepper</Option>
            <Option value="Pineapple">Pineapple</Option>
            <Option value="Papaya">Papaya</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Field Name"
          name="fieldName"
          rules={[{ required: true, message: 'Please select field name!' }]}
        >
          <Select>
            <Option value="Field A">Field A</Option>
            <Option value="Field B">Field B</Option>
            <Option value="Field C">Field C</Option>
            <Option value="Field D">Field D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Height (cm)"
          name="height"
          rules={[{ required: true, message: 'Please enter height!' }]}
        >
          <InputNumber
            min={0}
            onChange={(value) => form.setFieldsValue({ height: value })}
            onKeyDown={blockNonNumericInput}  // Block all non-numeric inputs
          />
        </Form.Item>

        <Form.Item
          label="Number of Leaves"
          name="numberOfLeaves"
          rules={[{ required: true, message: 'Please enter number of leaves!' }]}
        >
          <InputNumber
            min={0}
            onChange={(value) => form.setFieldsValue({ numberOfLeaves: value })}
            onKeyDown={blockNonNumericInput}  // Block all non-numeric inputs
          />
        </Form.Item>

        <Form.Item
          label="Leaf Size"
          name="leafSize"
          rules={[{ required: true, message: 'Please select leaf size!' }]}
        >
          <Select>
            <Option value="Small">Small</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Large">Large</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Health Issues"
          name="healthIssues"
          rules={[{ required: true, message: 'Please select health issues!' }]}
        >
          <Select>
            <Option value="None">None</Option>
            <Option value="Pests">Pests</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default PlantGrowthForm;
