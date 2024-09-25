import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";

export default function AddTransaction() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("null");
  const [subtype, setSubType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [method, setMethod] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const today = new Date();

  const [validation, setValidation] = useState({
    amount: true,
  });

  // New state to handle disabled status of each field
  const [fieldDisabled, setFieldDisabled] = useState({
    subtype: true,
    amount: true,
    description: true,
    payerPayee: true,
    method: true,
  });

  const handleSaveTransactionRecord = async (e) => {
    e.preventDefault();

    if (
      !date ||
      !type ||
      !subtype ||
      !amount ||
      !description ||
      !payerPayee ||
      !method
    ) {
      enqueueSnackbar("Please fill in all fields.", { variant: "error" });
      return;
    }

    if (!amount || amount <= 0 || amount > 10000000) {
      enqueueSnackbar("Please enter a valid amount between 0 and 10 million.", {
        variant: "error",
      });
      return;
    }

    if (!date || new Date(date) > new Date()) {
      enqueueSnackbar("Please select a date on or before today.", {
        variant: "error",
      });
      return;
    }

    if (!description || description.length > 300) {
      enqueueSnackbar(
        "Please enter a description with less than 300 characters.",
        { variant: "error" }
      );
      return;
    }

    const data = {
      date,
      type,
      subtype,
      amount,
      description,
      payer_payee: payerPayee,
      method,
    };

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/salesAndFinance/finance/transaction/",
        data
      );
      setLoading(false);
      enqueueSnackbar("Transaction record has successfully saved.", {
        variant: "success",
      });
      navigate("/salesAndFinance/finance/transaction-display");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Transaction record saving failed.", {
        variant: "error",
      });
      console.error(error);
      navigate("/salesAndFinance/finance/transaction-display");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/production");
        const productData = response.data.data;

        console.log("Fetched productData:", productData);

        if (Array.isArray(productData)) {
          setProducts(productData);
          const types = productData.map((product) => product.productType);
          setProductTypes([...new Set(types)]);
        } else {
          console.error("Expected an array but received:", productData);

          setProductTypes([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setProductTypes([]);
      }
    };

    fetchProducts();
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFieldDisabled({
      ...fieldDisabled,
      subtype: false, // Enable subtype when type is selected
    });
  };

  const handleSubTypeChange = (e) => {
    setSubType(e.target.value);
    setFieldDisabled({
      ...fieldDisabled,
      amount: false, // Enable amount when subtype is selected
    });
  };

  const validateAmount = (value) => {
    const regex = /^(?=.+)(?:[1-9]\d*|0)?(?: \d+)?$/;
    return regex.test(value) && value.trim() !== "";
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    setAmount(filteredValue);
    setValidation({ ...validation, amount: validateAmount(filteredValue) });

    if (validateAmount(filteredValue)) {
      setFieldDisabled({
        ...fieldDisabled,
        description: false, // Enable description when amount is valid
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    // Replace anything that is not a letter (a-z, A-Z) or a space with an empty string
    const filteredValue = value.replace(/[^a-zA-Z ]/g, "");
  
    // Ensure the description is limited to 300 characters
    const isValid = filteredValue.length <= 300;
  
    // Set the filtered value to the state if it's valid (within the character limit)
    if (isValid) {
      setDescription(filteredValue);
    }
  
    // Enable the 'payerPayee' field if there is any valid description input
    if (filteredValue.length > 0) {
      setFieldDisabled({
        ...fieldDisabled,
        payerPayee: false, // Enable payer/payee when description is filled
      });
    }
  };
  

  const handlePayeeChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^a-zA-Z  ]/g, "");
    setPayerPayee(filteredValue);
    if (filteredValue.length > 0) {
      setFieldDisabled({
        ...fieldDisabled,
        method: false, // Enable method when payer/payee is filled
      });
    }
  };

  return (
    <SnackbarProvider>
      <form className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="w-full space-y-6">
          <h1 className="text-5xl font-bold text-center text-black mb-11">
            Add Transaction
          </h1>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
            <fieldset className="sm:col-span-4">
              <legend className="text-base font-medium text-black">
                Transaction Type
              </legend>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-x-3">
                  <input
                    id="income"
                    name="type"
                    type="radio"
                    value="income"
                    checked={type === "income"}
                    onChange={handleTypeChange}
                    className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
                  />
                  <label
                    htmlFor="income"
                    className="text-base font-medium text-gray-700"
                  >
                    Income
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="expense"
                    name="type"
                    type="radio"
                    value="expense"
                    checked={type === "expense"}
                    onChange={handleTypeChange}
                    className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
                  />
                  <label
                    htmlFor="expense"
                    className="text-base font-medium text-gray-700"
                  >
                    Expense
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="sm:col-span-2">
              <label
                htmlFor="subtype"
                className="block text-base font-medium text-gray-700"
              >
                Sub Type
              </label>
              <select
                name="subtype"
                onChange={handleSubTypeChange}
                value={subtype}
                required
                id="subtype"
                disabled={fieldDisabled.subtype}
                className="block w-full h-8 p-2 mt-2 text-base text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              >
                <option>Select a sub type</option>
                {type === "income" ? (
                  productTypes.length > 0 ? (
                    productTypes.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))
                  ) : (
                    <option>No products available</option>
                  )
                ) : (
                  <>
                    <option>Electricity Bill</option>
                    <option>Water Bill</option>
                    <option>Salary Payment</option>
                    <option>Machine Purchase</option>
                    <option>Transportation</option>
                    <option>Land Purchase</option>
                    <option>Other</option>
                  </>
                )}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="date"
                className="block text-base font-medium text-gray-700"
              >
                Date
              </label>
              <DatePicker
                value={date ? moment(date) : null}
                onChange={(date) => setDate(date ? date.toISOString() : "")}
                format="YYYY-MM-DD"
                disabledDate={(current) => current > moment()}
                className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="amount"
                className="block text-base font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                required
                id="amount"
                placeholder="LKR"
                disabled={fieldDisabled.amount}
                className={`block w-full h-8 p-2 mt-2 text-black border ${
                  validation.amount ? "border-gray-900" : "border-red-500"
                } rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600`}
              />
              {!validation.amount && (
                <span className="text-sm text-red-500">
                  Invalid amount. Please enter a number.
                </span>
              )}
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-base font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                required
                id="description"
                disabled={fieldDisabled.description}
                placeholder="Maximum 300 characters"
                className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="payer_payee"
                className="block text-base font-medium text-gray-700"
              >
                Payer/Payee
              </label>
              <input
                type="text"
                value={payerPayee}
                onChange={handlePayeeChange}
                required
                id="payer_payee"
                disabled={fieldDisabled.payerPayee}
                placeholder="Alphabetical characters only"
                className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="method"
                className="block text-base font-medium text-gray-700"
              >
                Method
              </label>
              <select
                name="method"
                onChange={(e) => setMethod(e.target.value)}
                value={method}
                required
                id="method"
                disabled={fieldDisabled.method}
                className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              >
                <option>Select a method</option>
                <option>Cheque</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-5 mt-10">
            <button
              onClick={handleSaveTransactionRecord}
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-lg font-medium text-white border border-transparent rounded-lg shadow-sm bg-lime-700 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 text-lg font-medium text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </SnackbarProvider>
  );
}
