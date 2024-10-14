import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";
import Swal from "sweetalert2";

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

  const threeWeekBefore = moment().subtract(3, "weeks");
  console.log("threeWeekBefore:", threeWeekBefore);

  const [validation, setValidation] = useState({
    amount: true,
  });

  // New state to handle disabled status of each field
  const [fieldDisabled, setFieldDisabled] = useState({
    subtype: true,
    date: true,
    amount: true,
    description: true,
    payerPayee: true,
    method: true,
  });

  const [amountError, setAmountError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [payeeError, setPayeeError] = useState("");

  const [disabledSave, setDisabledSave] = useState(true);

  // const handleSaveTransactionRecord = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !date ||
  //     !type ||
  //     !subtype ||
  //     !amount ||
  //     !description ||
  //     !payerPayee ||
  //     !method
  //   ) {
  //     enqueueSnackbar("Please fill in all fields.", { variant: "error" });
  //     return;
  //   }

  //   if (!amount || amount <= 0 || amount > 10000000) {
  //     enqueueSnackbar("Please enter a valid amount between 0 and 10 million.", {
  //       variant: "error",
  //     });
  //     return;
  //   }

  //   if (!date || new Date(date) > new Date()) {
  //     enqueueSnackbar("Please select a date on or before today.", {
  //       variant: "error",
  //     });
  //     return;
  //   }

  //   if (!description || description.length > 300) {
  //     enqueueSnackbar(
  //       "Please enter a description with less than 300 characters.",
  //       { variant: "error" }
  //     );
  //     return;
  //   }

  //   const data = {
  //     date,
  //     type,
  //     subtype,
  //     amount,
  //     description,
  //     payer_payee: payerPayee,
  //     method,
  //   };

  //   setLoading(true);
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/api/salesAndFinance/finance/transaction/",
  //       data
  //     );
  //     setLoading(false);
  //     enqueueSnackbar("Transaction record has successfully saved.", {
  //       variant: "success",
  //     });
  //     navigate("/salesAndFinance/finance/transaction-display");
  //   } catch (error) {
  //     setLoading(false);
  //     enqueueSnackbar("Transaction record saving failed.", {
  //       variant: "error",
  //     });
  //     console.error(error);
  //     navigate("/salesAndFinance/finance/transaction-display");
  //   }
  // };

  const handleSaveTransactionRecord = async (e) => {
    e.preventDefault();

    // SweetAlert confirmation before saving
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (!result.isConfirmed) {
      return; // Exit if the user cancels the confirmation
    }

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
      setDisabledSave(true);
      return;
    }

    if (!amount || amount <= 0 || amount > 10000000) {
      enqueueSnackbar("Please enter a valid amount between 0 and 10 million.", {
        variant: "error",
      });
      setDisabledSave(true);
      return;
    }

    if (!date || new Date(date) > new Date()) {
      enqueueSnackbar("Please select a date on or before today.", {
        variant: "error",
      });
      setDisabledSave(true);
      return;
    }

    if (!description || description.length > 300) {
      enqueueSnackbar(
        "Please enter a description with less than 300 characters.",
        { variant: "error" }
      );
      setDisabledSave(true);
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
        "http://localhost:5000/api/salesAndFinance/finance/minorTransactions",
        data
      );
      setLoading(false);

      // SweetAlert success notification
      Swal.fire({
        title: "Success!",
        text: "Transaction record has been successfully saved.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/salesAndFinance/finance/minortransaction-display");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Transaction record saving failed.", {
        variant: "error",
      });
      console.error(error);
      // navigate("/salesAndFinance/finance/transaction-display");
    }
  };

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
    if (e.target.value === "Select a sub type") {
      setDisabledSave(true);
      setFieldDisabled({
        ...fieldDisabled,
        date: true,
        amount: true,
        description: true,
        payerPayee: true,
        method: true,
      });
    } else {
      setFieldDisabled({
        ...fieldDisabled,
        date: false, // Enable amount when subtype is selected
      });
    }
  };

  const handleDateChange = (date) => {
    setDate(date ? date.toISOString() : "");
    if (date === null) {
      setDisabledSave(true);
      setFieldDisabled({
        ...fieldDisabled,
        amount: true,
        description: true,
        payerPayee: true,
        method: true,
      });
    } else {
      setDisabledSave(false);
      setFieldDisabled({
        ...fieldDisabled,
        amount: false, // Enable amount when date is selected
      });
    }
  };

  const validateAmount = (value) => {
    const regex = /^(?=.+)(?:[1-9]\d*|0)?(?: \d+)?$/;
    return regex.test(value) && value.trim() !== "";
  };

  const handleAmountChange = (event) => {
    let { value } = event.target;
    
    if(parseFloat(value) > 10000){
      value = value.slice(0, -1);
      setAmountError("Amount should be less than 10000");
      setDisabledSave(true);
    }else{
      setAmountError("");
      setDisabledSave(false);
    }
    const regex = /^[0-9 ]*$/;
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
      setFieldDisabled({
        ...fieldDisabled,
        description: false, // Enable description when amount is valid
      });
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
      setFieldDisabled({
        ...fieldDisabled,
        description: true,
        payerPayee: true,
        method: true,
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid description input:", value);
      setDescriptionError(
        "Invalid charactors in description input. Only letters are allowed."
      );
      setDisabledSave(true);
    } else {
      setDescriptionError("");
      setDisabledSave(false);
    }

    // Replace anything that is not a letter (a-z, A-Z) or a space with an empty string
    const filteredValue = value.replace(/[^a-zA-Z0 ]/g, "");

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
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
      setFieldDisabled({
        ...fieldDisabled,
        payerPayee: true,
        method: true,
      });
    }
  };

  const handlePayeeChange = (e) => {
    const { value } = e.target;

    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid payee input:", value);
      setPayeeError(
        "Invalid charactors in payee input. Only letters are allowed."
      );
      setDisabledSave(true);
    } else {
      setPayeeError("");
      setDisabledSave(false);
    }

    const filteredValue = value.replace(/[^a-zA-Z  ]/g, "");
    setPayerPayee(filteredValue);
    if (filteredValue.length > 0) {
      setFieldDisabled({
        ...fieldDisabled,
        method: false, // Enable method when payer/payee is filled
      });
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
      setFieldDisabled({
        ...fieldDisabled,
        method: true,
      });
    }
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setDisabledSave(false);
  };

  return (
    <SnackbarProvider>
      <form className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="w-full space-y-6">
          <h1 className="text-5xl font-bold text-center text-black mb-11">
            Add Minor Transaction
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
                 <option>Add From Account</option>
                ) : (
                  <>
                    <option>Transport Expenses</option>
                    <option>Small Equipment Purchases</option>
                    <option>Buy News Paper</option>
                    <option>Tea</option>
                    <option>Short Eats</option>
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
                disabledDate={(current) =>
                  current &&
                  (current < moment(threeWeekBefore) || current > moment())
                }
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
              {amountError && (
                <span className="text-sm text-red-500">{amountError}</span>
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
              {descriptionError && (
                <span className="text-sm text-red-500">{descriptionError}</span>
              )}
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
              {payeeError && (
                <span className="text-sm text-red-500">{payeeError}</span>
              )}
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
                <option>Select a method</option>
                <option>Cash</option>
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
              {/* disabled={loading} */}
              {/* {loading ? "Saving..." : "Save"} */}
              Save
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
