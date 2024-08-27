import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
// import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import moment from 'moment';

const AddSalesRecord = ({ products }) => {
  const [form] = Form.useForm();
  const [filteredProductIDs, setFilteredProductIDs] = useState([]);
  const [productType, setProductType] = useState('');

  const onProductNameChange = (productName) => {
    const selectedProduct = products.find(product => product.name === productName);
    if (selectedProduct) {
      setFilteredProductIDs(selectedProduct.ids);
      setProductType(selectedProduct.type);
    } else {
      setFilteredProductIDs([]);
      setProductType('');
    }
  };

  const calculateTotalAmount = () => {
    const soldQuantity = form.getFieldValue('soldQuantity');
    const unitPrice = form.getFieldValue('unitPrice');
    if (soldQuantity > 0 && unitPrice > 0) {
      form.setFieldsValue({ totalAmount: soldQuantity * unitPrice });
    }
  };

  const onFinish = (values) => {
    Swal.fire({
      title: 'Confirm Data',
      html: `<strong>Product Name:</strong> ${values.productName}<br/>
             <strong>Product ID:</strong> ${values.productID}<br/>
             <strong>Product Type:</strong> ${values.productType}<br/>
             <strong>Sale Date:</strong> ${values.saleDate.format('YYYY-MM-DD')}<br/>
             <strong>Sold Quantity:</strong> ${values.soldQuantity}<br/>
             <strong>Unit Price:</strong> ${values.unitPrice}<br/>
             <strong>Total Amount:</strong> ${values.totalAmount}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Send data to backend
        message.success('Data submitted successfully!');
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ transactionType: 'Debit' }}
    >
      <Form.Item
        name="productName"
        label="Product Name"
        rules={[{ required: true, message: 'Please select a product name' }]}
      >
        <Select
          placeholder="Select a product name"
          onChange={onProductNameChange}
        >
          {products && products.length > 0 ? (
            products.map(product => (
              <Select.Option key={product.name} value={product.name}>
                {product.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="" disabled>
              No products available
            </Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name="productID"
        label="Product ID"
        rules={[{ required: true, message: 'Please select a product ID' }]}
      >
        <Select placeholder="Select a product ID">
          {filteredProductIDs.length > 0 ? (
            filteredProductIDs.map(id => (
              <Select.Option key={id} value={id}>
                {id}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="" disabled>
              No IDs available
            </Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name="productType"
        label="Product Type"
      >
        <Input value={productType} readOnly />
      </Form.Item>

      <Form.Item
        name="saleDate"
        label="Sale Date"
        rules={[{ required: true, message: 'Please select a sale date' }]}
      >
        <DatePicker
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
      </Form.Item>

      <Form.Item
        name="soldQuantity"
        label="Sold Quantity"
        rules={[{ required: true, message: 'Please enter the quantity', type: 'number', min: 1 }]}
      >
        <Input type="number" onChange={calculateTotalAmount} />
      </Form.Item>

      <Form.Item
        name="unitPrice"
        label="Unit Price"
        rules={[{ required: true, message: 'Please enter the unit price', type: 'number', min: 0 }]}
      >
        <Input type="number" onChange={calculateTotalAmount} />
      </Form.Item>

      <Form.Item
        name="totalAmount"
        label="Total Amount"
      >
        <Input type="number" readOnly />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!form.isFieldsTouched()}>
          Add
        </Button>
        <Button type="default" htmlType="button">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

// Ensure default props to prevent errors
AddSalesRecord.defaultProps = {
  products: [],
};

export default AddSalesRecord;
