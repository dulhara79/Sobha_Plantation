import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import Swal from "sweetalert2";
import moment from "moment";

const AddSalesRecord = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState(null);
  const [isDateDisabled, setDateDisabled] = useState(true);
  const [isQuantityDisabled, setQuantityDisabled] = useState(true);
  const [isAddDisabled, setAddDisabled] = useState(true);
  const [quantityError, setQuantityError] = useState("");
  const [soldQuantity, setSoldQuantity] = useState("");

  const handleOsldQuantityChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    setSoldQuantity(filteredValue);

    form.setFieldsValue({ soldQuantity: filteredValue });

    // Set error message for invalid quantity or unrealistic values
    if (filteredValue > 100000) {
      setQuantityError("Please enter a realistic quantity");
    } else {
      setQuantityError("");
    }

    // Calculate total amount if quantity is valid
    if (filteredValue > 0 && unitPrice > 0) {
      const totalAmount = filteredValue * unitPrice;
      form.setFieldsValue({ totalAmount: totalAmount });
    } else {
      form.setFieldsValue({ totalAmount: 0 });
    }

    // Disable the "Add" button if no valid quantity is entered
    setAddDisabled(!filteredValue || filteredValue <= 0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/labeling-prices");
        const productData = response.data.data;

        if (Array.isArray(productData)) {
          setProducts(productData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Handle Product Selection and set Unit Price
  const handleProductChange = (value) => {
    const selectedProduct = products.find((product) => product.productType === value);
    if (selectedProduct) {
      setUnitPrice(selectedProduct.unitPrice);
      form.setFieldsValue({ unitPrice: selectedProduct.unitPrice });
      setDateDisabled(false); // Enable date field
    } else {
      setUnitPrice(null);
      setDateDisabled(true);
      setQuantityDisabled(true);
      setAddDisabled(true);
    }
  };

  // Handle Date Selection
  const handleDateChange = (date) => {
    if (date) {
      setQuantityDisabled(false); // Enable sold quantity field
    } else {
      setQuantityDisabled(true);
      setAddDisabled(true);
    }
  };

  // Handle Quantity Change
  const handleQuantityChange = (e) => {
    let { value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, ""); // Allow only numeric values

    form.setFieldsValue({ soldQuantity: filteredValue });

    // Set error message for invalid quantity or unrealistic values
    if (filteredValue > 100000) {
      setQuantityError("Please enter a realistic quantity");
    } else {
      setQuantityError("");
    }

    // Calculate total amount if quantity is valid
    if (filteredValue > 0 && unitPrice > 0) {
      const totalAmount = filteredValue * unitPrice;
      form.setFieldsValue({ totalAmount: totalAmount });
    } else {
      form.setFieldsValue({ totalAmount: 0 });
    }

    // Disable the "Add" button if no valid quantity is entered
    setAddDisabled(!filteredValue || filteredValue <= 0);
  };

  // Handle Form Submission
  const onFinish = async (values) => {
    console.log();
    
    Swal.fire({
      title: "Confirm Data",
      html: `<strong>Product Name:</strong> ${values.product}<br/>
             <strong>Sale Date:</strong> ${values.saleDate.format(
               "YYYY-MM-DD"
             )}<br/>
             <strong>Sold Quantity:</strong> ${values.soldQuantity}<br/>
             <strong>Unit Price:</strong> ${values.unitPrice}<br/>
             <strong>Total Amount:</strong> ${values.totalAmount}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Perform backend submission here
          await axios.post("http://localhost:5000/api/salesAndFinance/sales/tracking", {
            product: values.product,              // Ensure this is an ObjectId
            saleDate: values.saleDate.format("YYYY-MM-DD"),  // Date formatting
            quantitySold: values.soldQuantity,    // Number
            unitPrice: values.unitPrice,          // Number
            revenueGenerated: values.totalAmount, // Number
          });
          

          message.success("Data submitted successfully!");
          form.resetFields();
          setDateDisabled(true);
          setQuantityDisabled(true);
          setAddDisabled(true);
        } catch (error) {
          console.error("Failed to submit data:", error);
          message.error("Data submission failed.");
        }
      }
    });
  };

  // Handle Cancel Button
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose the entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        form.resetFields();
        setDateDisabled(true);
        setQuantityDisabled(true);
        setAddDisabled(true);
        message.info("Form reset successfully.");
      }
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="product"
        label="Product Name"
        rules={[{ required: true, message: "Please select a product name" }]}
      >
        <Select placeholder="Select a product" onChange={handleProductChange}>
          {products.map((product) => (
            <Select.Option key={product._id} value={product.productType}>
              {product.productType}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="saleDate"
        label="Sale Date"
        rules={[{ required: true, message: "Please select a sale date" }]}
      >
        <DatePicker
          disabled={isDateDisabled}
          disabledDate={(current) => current && current > moment().endOf("day")}
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        name="soldQuantity"
        label="Sold Quantity"
        rules={[{ required: true, message: "Please enter a valid quantity" }]}
      >
        <Input
          type="text"
          value={soldQuantity}
          onChange={handleOsldQuantityChange}
          disabled={isQuantityDisabled}
        />
        {quantityError && <span style={{ color: "red" }}>{quantityError}</span>}
      </Form.Item>

      <Form.Item name="unitPrice" label="Unit Price">
        <Input type="number" value={unitPrice} readOnly />
      </Form.Item>

      <Form.Item name="totalAmount" label="Total Amount">
        <Input type="number" readOnly />
      </Form.Item>

      <Form.Item>
        <Button className="bg-lime-400 hover:bg-black"  htmlType="submit" disabled={isAddDisabled}>
          Add Record
        </Button>
        <Button type="default" htmlType="button" onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSalesRecord;
