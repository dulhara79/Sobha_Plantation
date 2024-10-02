import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message,
  notification,
} from "antd";
import Swal from "sweetalert2";
import moment from "moment";

const EditSalesRecord = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState(null);
  const [soldQuantity, setSoldQuantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [submitData, setSubmitData] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [productCompletedQty, setProductCompletedQty] = useState();
  const [productToGetQuantity, setProductToGetQuantity] = useState([]);
  const [unitType, setUnitType] = useState("");
  const [productError, setProductError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const navigate = useNavigate();

  // Fetch the sales data to edit
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/salesAndFinance/sales/tracking/getRecord/${id}`)
      .then((response) => {
        const data = response.data.data;
        setSubmitData(data);
        setUnitPrice(data.unitPrice);
        setSoldQuantity(data.quantitySold);
        form.setFieldsValue({
          product: data.product,
          saleDate: moment(data.saleDate),
          soldQuantity: data.quantitySold,
          unitPrice: data.unitPrice,
          totalAmount: data.revenueGenerated,
        });
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to fetch sales data", "error");
      });
  }, [id]);

  // Fetch the products for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/api/labeling-prices")
      .then((response) => setProducts(response.data.data || []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/labeling")
      .then((response) => setProductToGetQuantity(response.data.data || []))
      .catch(() => setProductToGetQuantity([]));
  }, []);

  // Handle product change
  const handleProductChange = (value) => {
    const selectedProduct = products.find(
      (product) => product.productType === value
    );
    const selectedProductQty = productToGetQuantity.find(
      (product) =>
        product.productName === value && product.status === "Completed"
    );

    if (selectedProduct && selectedProductQty) {
      setUnitPrice(selectedProduct.unitPrice);
      setProductCompletedQty(selectedProductQty.quantity);
      setUnitType(selectedProduct.typeUnit);
      form.setFieldsValue({
        unitPrice: selectedProduct.unitPrice,
        totalAmount: selectedProduct.unitPrice * soldQuantity,
        productToGetQuantity: selectedProductQty.quantity,
        unitType: selectedProduct.typeUnit,
      });
      setSubmitData((prev) => ({
        ...prev,
        product: value,
        unitPrice: selectedProduct.unitPrice,
        revenueGenerated: selectedProduct.unitPrice * soldQuantity,
      }));
      setProductError("");
    } else {
      setProductError("Product is not available for sale.");
      form.setFieldsValue({
        unitPrice: "",
        totalAmount: 0,
        productToGetQuantity: "",
        unitType: ""
      });
      setSubmitData((prev) => ({
        ...prev,
        product: value,
        unitPrice: 0,
        revenueGenerated: "",
        productToGetQuantity: "",
        unitType: "",
      }));
      setSubmitDisabled(true);
    }
  };

  // Handle sold quantity change
  const handleSoldQuantityChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9\b]+$/;
    if (!regex.test(value)) {
      setQuantityError("Invalid quantity. Only numbers are allowed.");
    } else {
      setQuantityError("");
    }

    const filteredValue = value.replace(/[^0-9]/g, "");
    setSoldQuantity(filteredValue);
    form.setFieldsValue({ soldQuantity: filteredValue });

    if (filteredValue > productCompletedQty) {
      setQuantityError("Sold quantity cannot exceed total quantity");
      setSubmitDisabled(true);
    } else if (filteredValue === "") {
      setQuantityError("Please enter a valid quantity");
      setSubmitDisabled(true);
    } else {
      setQuantityError("");
      setSubmitDisabled(false);

      // Calculate total amount
      if (filteredValue > 0 && unitPrice > 0) {
        const calculatedAmount = filteredValue * unitPrice;
        setTotalAmount(calculatedAmount);
        form.setFieldsValue({ totalAmount: calculatedAmount });
        setSubmitData((prev) => ({
          ...prev,
          quantitySold: filteredValue,
          revenueGenerated: calculatedAmount,
        }));
        setSubmitDisabled(false);
      } else {
        form.setFieldsValue({ totalAmount: 0 });
        setSubmitDisabled(true);
      }
    }
  };

  // Disable future dates
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSubmitData((prev) => ({ ...prev, saleDate: date }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Confirm changes to this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `http://localhost:5000/api/salesAndFinance/sales/tracking/${id}`,
          submitData
        );
        Swal.fire("Success", "Sales record updated successfully!", "success");
        navigate(-1); // Go back after success
      } catch (error) {
        notification.error({ message: "Error", description: "Failed to update sales record." });
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="product" label="Product Name">
          <Select onChange={handleProductChange} value={submitData.product}>
            {products.map((product) => (
              <Select.Option key={product._id} value={product.productType}>
                {product.productType}
              </Select.Option>
            ))}
          </Select>
          {productError && <span style={{ color: "red" }}>{productError}</span>}
        </Form.Item>

        <Form.Item name="saleDate" label="Sale Date">
          <DatePicker
            disabledDate={disabledDate}
            onChange={handleDateChange}
            defaultValue={moment(submitData.saleDate)}
          />
        </Form.Item>

        <Form.Item name="soldQuantity" label="Sold Quantity">
          <Input
            type="text"
            value={soldQuantity}
            onChange={handleSoldQuantityChange}
          />
          {quantityError && 
            <span style={{ color: "red" }}>{quantityError}</span>
          }
        </Form.Item>

        {/* <Form.Item name="unitType" label="Unit Type">
          <Input type="text" value={unitType} readOnly />
        </Form.Item>

        <Form.Item name="productToGetQuantity" label="Total Quantity">
          <Input type="text" value={productCompletedQty} readOnly />
        </Form.Item> */}

        <Form.Item name="unitPrice" label="Unit Price">
          <Input value={unitPrice} readOnly />
        </Form.Item>

        <Form.Item name="totalAmount" label="Total Amount">
          <Input value={totalAmount} readOnly />
        </Form.Item >

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={submitDisabled}>
            Update Record
          </Button>
          <Button type="primary" htmlType="button" onClick={handleCancel}>
            Cancel Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditSalesRecord;
