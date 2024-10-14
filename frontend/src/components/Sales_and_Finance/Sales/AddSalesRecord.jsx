import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


const AddSalesRecord = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState(null);
  const [unitType, setUnitType] = useState(null);
  const [isDateDisabled, setDateDisabled] = useState(true);
  const [isQuantityDisabled, setQuantityDisabled] = useState(true);
  const [quantityError, setQuantityError] = useState("");
  const [soldQuantity, setSoldQuantity] = useState(null);
  const [productToGetQuantity, setProductToGetQuantity] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [productError, setProductError] = useState("");
  const [selectedProductID, setSelectedProductID] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitData, setSubmitData] = useState({
    product: "",
    saleDate: "",
    quantitySold: "",
    unitPrice: "",
    revenueGenerated: "",
  });
  const [autoSaveTransaction, setAutoSaveTransaction] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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

    if (filteredValue > totalQuantity) {
      setQuantityError("Sold quantity cannot exceed total quantity");
      setSubmitDisabled(true);
    } else if (filteredValue === "") {
      setQuantityError("Please enter a valid quantity");
      setSubmitDisabled(true);
    } else {
      setQuantityError("");
      setSubmitDisabled(false);
    }

    // Calculate total amount
    if (filteredValue > 0 && unitPrice > 0) {
      const totalAmount = filteredValue * unitPrice;
      form.setFieldsValue({ totalAmount });
      setSubmitData({
        ...submitData,
        quantitySold: filteredValue,
        revenueGenerated: totalAmount,
      });
    } else {
      form.setFieldsValue({ totalAmount: 0 });
    }
  };

  console.log("totalQuantity-soldQuantity", totalQuantity-soldQuantity);

  const handleDateChange = (date) => {
    setSubmitData({ ...submitData, saleDate: date.format("YYYY-MM-DD") });
    setQuantityDisabled(!date);
  };

  const threeWeekBefore = moment().subtract(3, "weeks");
  console.log("threeWeekBefore:", threeWeekBefore);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/labeling-prices"
        );
        setProducts(response.data.data || []);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/labeling");
        setProductToGetQuantity(response.data.data || []);
      } catch (error) {
        setProductToGetQuantity([]);
      }
    };

    fetchCompletedProducts();
  }, []);

  

  const handleProductChange = (value) => {
    const selectedProduct = products.find(
      (product) => product.productType === value
    );
    const selectedProductQty = productToGetQuantity.find(
      (product) => 
        product.productName === value && product.status === "Completed"
    );

    

    if (selectedProduct && selectedProductQty) {
      if (selectedProductQty.quantity === 0) {
        setProductError("No quantity available for this product");
        setSubmitDisabled(true);
      } else {
        setProductError("");
      }

      setUnitPrice(selectedProduct.unitPrice);
      setUnitType(selectedProduct.typeUnit);
      setTotalQuantity(selectedProductQty.quantity);
      console.log("selectedProductQty.id", selectedProductQty._id);
      setSelectedProductID(selectedProductQty._id);
      form.setFieldsValue({
        unitType: selectedProduct.typeUnit,
        unitPrice: selectedProduct.unitPrice,
        productToGetQuantity: selectedProductQty.quantity,
      });
      setSubmitData({
        product: selectedProduct.productType,
        unitPrice: selectedProduct.unitPrice,
      });
      setDateDisabled(false);
    } else {
      setUnitPrice("");
      setUnitType("");
      setTotalQuantity("");
      setDateDisabled(true);
      setQuantityDisabled(true);
      setSubmitDisabled(true);
      setProductError("No quantity available for this product");
    }
  };

  // const handleSubmit = async () => {
  //   const result = await Swal.fire({
  //     title: "Confirmation Required",
  //     text: "Are you sure you want to submit this report?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, submit it!",
  //     cancelButtonText: "No, cancel!",
  //   });

  //   if (autoSaveTransaction) {
  //     const transactionData = {
  //       date: submitData.saleDate,
  //       type: "income",
  //       subtype: "sales",
  //       amount: submitData.revenueGenerated,
  //       description: "Sales record automatically saved",
  //       payer_payee: "Customer",
  //       method: "Automated Entry",
  //     };

  //     handleSaveTransactionRecord(transactionData);
  //   }

  //   if (result.isConfirmed) {
  //     try {
  //       console.log(submitData);
  //       await axios.post(
  //         "http://localhost:5000/api/salesAndFinance/sales/tracking",
  //         submitData
  //       );
  //       Swal.fire("Success", "Sales record added successfully!", "success");
  //       form.resetFields();
  //     } catch (error) {
  //       notification.error({
  //         message: "Error",
  //         description: "Failed to add sales record.",
  //       });
  //     }
  //   }
  // };

  // const handleSubmit = async () => {
  //   const result = await Swal.fire({
  //     title: "Confirmation Required",
  //     text: "Are you sure you want to submit this report?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, submit it!",
  //     cancelButtonText: "No, cancel!",
  //   });
  
  //   if (autoSaveTransaction) {
  //     const transactionData = {
  //       date: submitData.saleDate,
  //       type: "income",
  //       subtype: "sales",
  //       amount: submitData.revenueGenerated,
  //       description: "Sales record automatically saved",
  //       payer_payee: "Customer",
  //       method: "Automated Entry",
  //     };
  
  //     handleSaveTransactionRecord(transactionData);
  //   }
  
  //   if (result.isConfirmed) {
  //     try {
  //       console.log(submitData);
  //       await axios.post(
  //         "http://localhost:5000/api/salesAndFinance/sales/tracking",
  //         submitData
  //       );
  //       Swal.fire("Success", "Sales record added successfully!", "success");
  
  //       // Clear the form fields after successful submission
  //       form.resetFields();
        
  //       // Disable further submissions
  //       setSubmitDisabled(true);
  //     } catch (error) {
  //       notification.error({
  //         message: "Error",
  //         description: "Failed to add sales record.",
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Confirmation Required",
      text: "Are you sure you want to submit this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    });
  
    if (result.isConfirmed) {
      try {
        // Update the labeling data when submitting the form
        if (selectedProductID && totalQuantity !== null && soldQuantity !== null) {
          await axios.put(`http://localhost:5000/api/labeling/${selectedProductID}`, {
            productName: submitData.product,
            labelingDate: submitData.saleDate,
            status: "Completed",
            quantity: totalQuantity - soldQuantity,
          });
        }
  
        // Submit the sales record data
        await axios.post("http://localhost:5000/api/salesAndFinance/sales/tracking", submitData);
  
        Swal.fire("Success", "Sales record added successfully!", "success");
        form.resetFields();
        setSubmitDisabled(true);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to add sales record.",
        });
      }
    }
  };
  

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
        message.info("Form reset successfully.");
        navigate(-1);
      }
    });
  };

  // useEffect(() => {
  //   try {
  //     axios.put(`http://localhost:5000/api/labeling/${selectedProductID}`, {
  //       // selectedProductID: selectedProductID,
  //       productName: submitData.product,
  //       labelingDate: submitData.saleDate,
  //       status: "Completed",
  //       quantity: totalQuantity - soldQuantity,
  //     });
  //     navigate(''); // Navigate back to the Labeling page
  //   } catch (error) {
  //     console.error('Error updating labeling details:', error);
  //   }
  // }, [selectedProductID]);

  const handleSaveTransactionRecord = (transactionData) => {
    console.log(
      "Transaction Data:handleSaveTransactionRecord ",
      transactionData
    );
    axios
      .post(
        "http://localhost:5000/api/salesAndFinance/finance/transaction",
        transactionData
      )
      .then(() => {
        // setLoading(false);
        // message.success("Transaction record has automatically saved.");
        enqueueSnackbar("Transaction record has automatically saved.", {
          variant: "success",
        });
      })
      .catch((error) => {
        // setLoading(false);
        console.log("Transaction Data:", transactionData);
        // message.error("Automatic Transaction record saving failed.");
        enqueueSnackbar("Automatic Transaction record saving failed.", {
          variant: "error",
        });
        console.log("transaction auto save error: " + error);
      });
  };

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item name="product" label="Product Name">
          <Select placeholder="Select a product" onChange={handleProductChange}>
            {products.map((product) => (
              <Select.Option key={product._id} value={product.productType}>
                {product.productType}
              </Select.Option>
            ))}
          </Select>
          {productError && <span style={{ color: "red" }}>{productError}</span>}
        </Form.Item>

        <Form.Item
          name="saleDate"
          label="Sale Date"
          rules={[{ required: true, message: "Please select a sale date" }]}
        >
          <DatePicker
            disabled={isDateDisabled}
            disabledDate={(current) =>
              current &&
              (current < moment(threeWeekBefore) || current > moment())
            }
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
            onChange={handleSoldQuantityChange}
            disabled={isQuantityDisabled}
          />
          {quantityError && (
            <span style={{ color: "red" }}>{quantityError}</span>
          )}
        </Form.Item>

        <Form.Item name="unitType" label="Unit Type">
          <Input type="text" value={unitType} readOnly />
        </Form.Item>

        <Form.Item name="productToGetQuantity" label="Total Quantity">
          <Input type="text" value={totalQuantity} readOnly />
        </Form.Item>

        <Form.Item name="unitPrice" label="Unit Price">
          <Input type="number" value={unitPrice} readOnly />
        </Form.Item>

        <Form.Item name="totalAmount" label="Total Amount">
          <Input type="number" readOnly />
        </Form.Item>
      </Form>

      {/* <div>
        <Button
          className="bg-lime-400 hover:bg-black"
          htmlType="submit"
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          Add Record
        </Button>
        <Button type="default" htmlType="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div> */}

      <div className="flex items-center justify-between">
        {/* Auto Save Transaction */}
        <div className="container box-border sticky flex items-center h-auto gap-10 p-4 px-4 py-1 pl-4 mx-auto bg-gray-200 border-4 rounded-full">
          <label className="">
            Automatically save to transactions
            <input
              className="ml-4 mr-1 bg-white border-gray-300 rounded-full size-6 form-checkbox text-lime-600 focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-50 hover:bg-lime-100 checked:bg-lime-500"
              type="checkbox"
              checked={autoSaveTransaction}
              onChange={(e) => setAutoSaveTransaction(e.target.checked)}
            />
          </label>
          <button
            className="px-4 py-1 rounded-full bg-lime-200 hover:bg-lime-400"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Add Record
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-1 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSalesRecord;
