import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "antd";
import { useSnackbar, SnackbarProvider } from "notistack";
import moment from "moment";
import Swal from 'sweetalert2';

export default function EditTransaction() {
  const { id } = useParams(); // Get transaction ID from URL params
  const [transactionData, setTransactionData] = useState(null); // Store transaction data
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const previousDate = "";

  const [validation, setValidation] = useState({
    amount: true,
  });

  // New state to handle disabled status of each field
  const [fieldDisabled, setFieldDisabled] = useState({
    subtype: false,
    date: false,
    amount: false,
    description: false,
    payerPayee: false,
    method: false,
  });

  const [amountError, setAmountError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [payeeError, setPayeeError] = useState("");

  const [disabledSave, setDisabledSave] = useState(true);

  useEffect(() => {
    // Fetch existing transaction details to edit
    const fetchTransaction = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/salesAndFinance/finance/transaction/${id}`
        );
        const transaction = data.data;
        setTransactionData(transaction);
        setDate(moment(transaction.date));
        setType(transaction.type);
        setSubtype(transaction.subtype);
        setAmount(transaction.amount);
        setDescription(transaction.description);
        setPayerPayee(transaction.payer_payee);
        setMethod(transaction.method);
        //previousDate = moment(transaction.date);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };
    fetchTransaction();
  }, [id]);

    // Calculate the date boundaries
    const savedDate = transactionData ? moment(transactionData.date) : null;
    const threeWeeksBefore = savedDate ? moment(savedDate).subtract(3, "weeks") : null;
    const today = moment();

  // Function to disable dates that are outside the allowed range
  const disabledDate = (currentDate) => {
    // Disable today, future dates, and dates outside the three-week window
    if (!savedDate) return true; // Block all dates until the savedDate is loaded
    return currentDate > savedDate || currentDate < threeWeeksBefore || currentDate >= today;
  };

  const handleDateChange = (date) => {
    setDate(date ? date.toISOString() : "");
  };

  const handleSaveTransactionRecord = async (e) => {
    e.preventDefault();
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this transaction?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    });

    if (!result.isConfirmed) {
      return; // Exit if user cancels confirmation
    }

    // Validation
    if (!amount || amount <= 0) {
      enqueueSnackbar("Please enter a valid amount.", { variant: "error" });
      return;
    }

    const updatedData = {
      date,
      type,
      subtype,
      amount,
      description,
      payer_payee: payerPayee,
      method,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/salesAndFinance/finance/transaction/${id}`,
        updatedData
      );
      Swal.fire("Success!", "Transaction updated successfully.", "success");
      navigate("/salesAndFinance/finance/transaction-display");
    } catch (error) {
      console.error("Error updating transaction:", error);
      enqueueSnackbar("Failed to update transaction.", { variant: "error" });
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
    // setFieldDisabled({
    //   ...fieldDisabled,
    //   subtype: false, // Enable subtype when type is selected
    // });
  };

  const handleSubTypeChange = (e) => {
    setSubtype(e.target.value);
    // setFieldDisabled({
    //   ...fieldDisabled,
    //   date: false, // Enable amount when subtype is selected
    // });
  };

  // const handleDateChange = (date) => {
  //   setDate(date ? date.toISOString() : "");
  //   // setFieldDisabled({
  //   //   ...fieldDisabled,
  //   //   amount: false, // Enable amount when date is selected
  //   // });
  // };

  const validateAmount = (value) => {
    const regex = /^(?=.+)(?:[1-9]\d*|0)?(?: \d+)?$/;
    return regex.test(value) && value.trim() !== "";
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    const regex = /^[0-9.]*$/;
    if (!regex.test(value)) {
      console.error("Invalid amount input:", value);
      setAmountError("Invalid charactors in amount input");
      setDisabledSave(true);
    } else {
      setAmountError("");
      setDisabledSave(false);
    }
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    setAmount(filteredValue);
    setValidation({ ...validation, amount: validateAmount(filteredValue) });

    if (validateAmount(filteredValue)) {
      // setFieldDisabled({
      //   ...fieldDisabled,
      //   description: false, // Enable description when amount is valid
      // });
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid description input:", value);
      setDescriptionError("Invalid charactors in description input. Only letters and numbers are allowed.");
      setDisabledSave(true);
    } else {
      setDescriptionError("");
      setDisabledSave(false);
    }

    // Replace anything that is not a letter (a-z, A-Z) or a space with an empty string
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
  
    // Ensure the description is limited to 300 characters
    const isValid = filteredValue.length <= 300;
  
    // Set the filtered value to the state if it's valid (within the character limit)
    if (isValid) {
      setDescription(filteredValue);
    }
  
    // Enable the 'payerPayee' field if there is any valid description input
    if (filteredValue.length > 0) {
      // setFieldDisabled({
      //   ...fieldDisabled,
      //   payerPayee: false, // Enable payer/payee when description is filled
      // });
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
    
  };
  

  const handlePayeeChange = (e) => {
    const { value } = e.target;
    
    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid payee input:", value);
      setPayeeError("Invalid charactors in payee input. Only letters are allowed.");
      setDisabledSave(true);
    } else {
      setPayeeError("");
      setDisabledSave(false);
    }
    
    const filteredValue = value.replace(/[^a-zA-Z  ]/g, "");
    setPayerPayee(filteredValue);
    if (filteredValue.length > 0) {
      // setFieldDisabled({
      //   ...fieldDisabled,
      //   method: false, // Enable method when payer/payee is filled
      // });
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setDisabledSave(false);
  }

  return (
    <SnackbarProvider>
      <form className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="w-full space-y-6">
          <h1 className="text-5xl font-bold text-center text-black mb-11">
            Edit Transaction
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
                <option>{subtype}</option>
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
              name="date"
                value={date ? moment(date) : null}
                onChange={(date) => handleDateChange(date)}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
                disabled={fieldDisabled.date}
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
                type="text"
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
              {amountError && <span className="text-sm text-red-500">{amountError}</span>}
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
              {descriptionError && <span className="text-sm text-red-500">{descriptionError}</span>}
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
              {payeeError && <span className="text-sm text-red-500">{payeeError}</span>}
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
                // onChange={(e) => setMethod(e.target.value)}
                onChange={handleMethodChange}
                value={method}
                required
                id="method"
                disabled={fieldDisabled.method}
                className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              >
                <option>{method}</option>
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
              type="button"
              
              className="px-6 py-3 text-lg font-medium text-white border border-transparent rounded-lg shadow-sm bg-lime-700 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              disabled={disabledSave}
            >
              Update
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
