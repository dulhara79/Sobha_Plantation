import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import Swal from 'sweetalert2';
import moment from 'moment';

const AddSalesRecord = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/production");
      const productData = response.data.data;

      // Log the productData to understand its structure
      console.log("Fetched productData:", productData);

      // Check if the productData is an array
      if (Array.isArray(productData)) {
        setProducts(productData);
        // Extract product types from the products
        const types = productData.map((product) => product.productType);
        setProductTypes([...new Set(types)]); // Ensure unique product types
      } else {
        console.error("Expected an array but received:", productData);
        // Optionally, handle non-array response here
        setProductTypes([]); // Clear product types if response is not as expected
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Optionally, handle errors here
      setProductTypes([]); // Clear product types if fetching fails
    }
  };

  fetchProducts();
}, []);

  const calculateTotalAmount = () => {
    const soldQuantity = form.getFieldValue('soldQuantity');
    const unitPrice = form.getFieldValue('unitPrice');
    if (soldQuantity > 0 && unitPrice > 0) {
      form.setFieldsValue({ totalAmount: soldQuantity * unitPrice });
    }
  };

  const onFinish = (values) => {
    const selectedProduct = products.find(product => product._id === values.product);
    
    Swal.fire({
      title: 'Confirm Data',
      html: `<strong>Product Name:</strong> ${selectedProduct.name}<br/>
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
        name="product"
        label="Product Name"
        rules={[{ required: true, message: 'Please select a product name' }]}
      >
        <Select
          placeholder="Select a product name"
        >
          {productTypes && productTypes.length > 0 ? (
            productTypes.map(productTypes => (
              <Select.Option key={productTypes} value={productTypes}>
                {productTypes}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="" disabled>
              No products available
            </Select.Option>
          )}
          {/* {type === "income" ? (
                  productTypes.length > 0 ? (
                    productTypes.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))
                  ) : (
                    <option>No products available</option>
                  )
                ) */}
        </Select>
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
