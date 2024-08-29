import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, DatePicker, InputNumber, notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddTransactionPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case 'transactionType':
        if (!value) {
          errors[name] = 'Transaction type is required.';
        }
        break;
      case 'amount':
        if (!value || value <= 0) {
          errors[name] = 'Amount must be a positive number.';
        }
        break;
      case 'date':
        if (!value) {
          errors[name] = 'Transaction date is required.';
        } else if (dayjs(value).isAfter(dayjs())) {
          errors[name] = 'Transaction date cannot be in the future.';
        }
        break;
      case 'entityModel':
        if (!value) {
          errors[name] = 'Entity model is required.';
        }
        break;
      case 'transactionCategory':
        if (!value) {
          errors[name] = 'Transaction category is required.';
        }
        break;
      case 'payeePayer':
        if (!value) {
          errors[name] = 'Payee/Payer is required.';
        }
        break;
      default:
        break;
    }

    return errors;
  };

  const onFinish = async (values) => {
    Modal.confirm({
      title: 'Confirm Transaction',
      content: 'Are you sure you want to add this transaction?',
      onOk: async () => {
        setLoading(true);
        try {
          const response = await axios.post('http://localhost:5000/api/salesAndFinance/finance/transaction', values);

          if (response.status === 201) {
            notification.success({
              message: 'Transaction Added',
              description: 'The transaction was successfully added.',
            });
            navigate('/transactions');
          } else {
            throw new Error('Failed to add transaction');
          }
        } catch (error) {
          notification.error({
            message: 'Transaction Failed',
            description: error.response ? error.response.data.message : error.message,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const onValuesChange = (changedValues, allValues) => {
    const newErrors = {};
    Object.keys(changedValues).forEach((key) => {
      const fieldErrors = validateField(key, changedValues[key]);
      Object.assign(newErrors, fieldErrors);
    });

    form.setFields(Object.keys(newErrors).map((key) => ({
      name: key,
      errors: newErrors[key] ? [newErrors[key]] : [],
    })));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Transaction Type"
        name="transactionType"
        rules={[{ required: true, message: 'Please select a transaction type!' }]}
      >
        <Select placeholder="Select transaction type">
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: 'Please enter the amount!' },
          { type: 'number', min: 1, message: 'Amount must be a positive number!' },
        ]}
      >
        <InputNumber min={1} prefix="LKR " />
      </Form.Item>

      <Form.Item
        label="Transaction Date"
        name="date"
        rules={[
          { required: true, message: 'Please select the transaction date!' },
          { validator: (_, value) => 
              value && dayjs(value).isAfter(dayjs())
              ? Promise.reject(new Error('Transaction date cannot be in the future!'))
              : Promise.resolve(),
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Entity Model"
        name="entityModel"
        rules={[{ required: true, message: 'Please select an entity model!' }]}
      >
        <Input placeholder="Enter entity model" />
      </Form.Item>

      <Form.Item
        label="Transaction Category"
        name="transactionCategory"
        rules={[{ required: true, message: 'Please select a transaction category!' }]}
      >
        <Select placeholder="Select category">
          <Option value="salary">Salary</Option>
          <Option value="purchase">Purchase</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Payee/Payer"
        name="payeePayer"
        rules={[{ required: true, message: 'Please enter the payee/payer!' }]}
      >
        <Input placeholder="Enter payee/payer" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} icon={loading ? <LoadingOutlined /> : null}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTransactionPage;
