import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";

export default function AddTransaction() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [subtype, setSubType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [method, setMethod] = useState("Cheque");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const today = new Date();

  const [validation, setValidation] = useState({
    amount: true,
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
    setSubType("Electricity Bill");
  };

  const validateAmount = (value) => {
    const regex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    return regex.test(value) && value.trim() !== "";
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^0-9]/g, "");
    setAmount(filteredValue);
    setValidation({ ...validation, amount: validateAmount(filteredValue) });
  };

  const handlePayeeChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^a-zA-Z  ]/g, "");
    setPayerPayee(filteredValue);
  };

  return (
    <SnackbarProvider>
      <form className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="w-full space-y-6">
          <h1 className="text-5xl font-bold text-center text-black mb-11">Add Transaction</h1>
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
                onChange={(e) => setSubType(e.target.value)}
                required
                id="subtype"
                className="block w-full h-8 p-2 mt-2 text-base text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              >
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
                id="date"
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
                required
                className="block w-full mt-2 text-base text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="amount"
                className="block text-base font-medium text-black"
              >
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                value={amount}
                required
                onChange={handleAmountChange}
                type="number"
                className={`block w-full mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600 text-base h-8 p-2 ${
                  validation.amount ? "" : "border-red-500"
                }`}
              />
              {!validation.amount && (
                <p className="mt-2 text-sm text-red-600">
                  Amount must be a positive number.
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-base font-medium text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full h-20 p-4 mt-2 text-base text-black border border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
                placeholder="Enter a brief description (max 300 characters)"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="payer_payee"
                className="block text-base font-medium text-black"
              >
                Payer / Payee
              </label>
              <input
                id="payer_payee"
                name="payer_payee"
                value={payerPayee}
                required
                onChange={handlePayeeChange}
                className="block w-full h-8 p-2 mt-2 text-base text-black border border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-liborder"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="method"
                className="block text-base font-medium text-black"
              >
                Payment Method
              </label>
              <select
                id="method"
                name="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="block w-full p-2 mt-2 text-base text-black border border-gray-900 rounded-md shadow-sm h-11 focus:ring-lime-600 focus:border-lime-600"
              >
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Card">Card</option>
              </select>
            </div>
          </div>
        </div>

        <div className="items-center justify-between w-full mt-10 space-x-4 lex">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-base font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSaveTransactionRecord}
            className="px-4 py-2 text-base font-medium text-white rounded-md shadow bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Transaction"}
          </button>
        </div>
      </form>
    </SnackbarProvider>
  );
}
