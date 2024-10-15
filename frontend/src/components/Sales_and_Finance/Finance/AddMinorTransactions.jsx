import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { RightCircleOutlined } from "@ant-design/icons";

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

    if (parseFloat(value) > 10000) {
      value = value.slice(0, -1);
      setAmountError("Amount should be less than 10000");
      setDisabledSave(true);
    } else {
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
    // <SnackbarProvider>
    //   <form className="flex flex-col items-center justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
    //     <div className="w-full space-y-6">
    //       <h1 className="text-5xl font-bold text-center text-black mb-11">
    //         Add Minor Transaction
    //       </h1>
    //       <div>
    //               <Link
    //                 to="/salesAndFinance/finance/minortransaction-display"
    //                 className="flex-none rounded-full bg-lime-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black float-right"
    //               >
    //                 View All record <span aria-hidden="true">&rarr;</span>
    //               </Link>
    //             </div>
    //       <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
    //         <fieldset className="sm:col-span-4">
    //           <legend className="text-base font-medium text-black">
    //             Transaction Type
    //           </legend>
    //           <div className="flex gap-4 mt-4">
    //             <div className="flex items-center gap-x-3">
    //               <input
    //                 id="income"
    //                 name="type"
    //                 type="radio"
    //                 value="income"
    //                 checked={type === "income"}
    //                 onChange={handleTypeChange}
    //                 className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
    //               />
    //               <label
    //                 htmlFor="income"
    //                 className="text-base font-medium text-gray-700"
    //               >
    //                 Income
    //               </label>
    //             </div>
    //             <div className="flex items-center gap-x-3">
    //               <input
    //                 id="expense"
    //                 name="type"
    //                 type="radio"
    //                 value="expense"
    //                 checked={type === "expense"}
    //                 onChange={handleTypeChange}
    //                 className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
    //               />
    //               <label
    //                 htmlFor="expense"
    //                 className="text-base font-medium text-gray-700"
    //               >
    //                 Expense
    //               </label>
    //             </div>
    //           </div>
    //         </fieldset>

    //         <div className="sm:col-span-2">
    //           <label
    //             htmlFor="subtype"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Sub Type
    //           </label>
    //           <select
    //             name="subtype"
    //             onChange={handleSubTypeChange}
    //             value={subtype}
    //             required
    //             id="subtype"
    //             disabled={fieldDisabled.subtype}
    //             className="block w-full h-8 p-2 mt-2 text-base text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
    //           >
    //             <option>Select a sub type</option>
    //             {type === "income" ? (
    //              <option>Add From Account</option>
    //             ) : (
    //               <>
    //                 <option>Transport Expenses</option>
    //                 <option>Small Equipment Purchases</option>
    //                 <option>Buy News Paper</option>
    //                 <option>Tea</option>
    //                 <option>Short Eats</option>
    //                 <option>Other</option>
    //               </>
    //             )}
    //           </select>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="date"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Date
    //           </label>
    //           <DatePicker
    //             name="date"
    //             value={date ? moment(date) : null}
    //             onChange={(date) => handleDateChange(date)}
    //             format="YYYY-MM-DD"
    //             disabledDate={(current) =>
    //               current &&
    //               (current < moment(threeWeekBefore) || current > moment())
    //             }
    //             className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
    //             disabled={fieldDisabled.date}
    //           />
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="amount"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Amount
    //           </label>
    //           <input
    //             type="text"
    //             value={amount}
    //             onChange={handleAmountChange}
    //             required
    //             id="amount"
    //             placeholder="LKR"
    //             disabled={fieldDisabled.amount}
    //             className={`block w-full h-8 p-2 mt-2 text-black border ${
    //               validation.amount ? "border-gray-900" : "border-red-500"
    //             } rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600`}
    //           />
    //           {!validation.amount && (
    //             <span className="text-sm text-red-500">
    //               Invalid amount. Please enter a number.
    //             </span>
    //           )}
    //           {amountError && (
    //             <span className="text-sm text-red-500">{amountError}</span>
    //           )}
    //         </div>

    //         <div className="sm:col-span-6">
    //           <label
    //             htmlFor="description"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Description
    //           </label>
    //           <input
    //             type="text"
    //             value={description}
    //             onChange={handleDescriptionChange}
    //             required
    //             id="description"
    //             disabled={fieldDisabled.description}
    //             placeholder="Maximum 300 characters"
    //             className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
    //           />
    //           {descriptionError && (
    //             <span className="text-sm text-red-500">{descriptionError}</span>
    //           )}
    //         </div>

    //         <div className="sm:col-span-6">
    //           <label
    //             htmlFor="payer_payee"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Payer/Payee
    //           </label>
    //           <input
    //             type="text"
    //             value={payerPayee}
    //             onChange={handlePayeeChange}
    //             required
    //             id="payer_payee"
    //             disabled={fieldDisabled.payerPayee}
    //             placeholder="Alphabetical characters only"
    //             className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
    //           />
    //           {payeeError && (
    //             <span className="text-sm text-red-500">{payeeError}</span>
    //           )}
    //         </div>

    //         <div className="sm:col-span-6">
    //           <label
    //             htmlFor="method"
    //             className="block text-base font-medium text-gray-700"
    //           >
    //             Method
    //           </label>
    //           <select
    //             name="method"
    //             // onChange={(e) => setMethod(e.target.value)}
    //             onChange={handleMethodChange}
    //             value={method}
    //             required
    //             id="method"
    //             disabled={fieldDisabled.method}
    //             className="block w-full h-8 p-2 mt-2 text-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
    //           >
    //             <option>Select a method</option>
    //             <option>Cash</option>
    //           </select>
    //         </div>
    //       </div>

    //       <div className="flex justify-center gap-5 mt-10">
    //         <button
    //           onClick={handleSaveTransactionRecord}
    //           type="button"
    //           className="px-6 py-3 text-lg font-medium text-white border border-transparent rounded-lg shadow-sm bg-lime-700 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
    //           disabled={disabledSave}
    //         >
    //           {/* disabled={loading} */}
    //           {/* {loading ? "Saving..." : "Save"} */}
    //           Save
    //         </button>
    //         <button
    //           onClick={handleCancel}
    //           className="px-6 py-3 text-lg font-medium text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </SnackbarProvider>
    <SnackbarProvider>
      <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-extrabold text-gray-700">
          Add Minor Transaction
        </h1>
        <div className="max-w-3xl mx-auto">
          <form className="overflow-hidden bg-white rounded-lg shadow-xl">
            <div className="mt-8 mr-4">
              <Link
                to="/salesAndFinance/finance/minortransaction-display"
                className="flex-none rounded-full bg-lime-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black float-right mb-4"
              >
                View All record <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="px-6 py-8 sm:p-10">

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Transaction Type
                  </label>
                  <div className="flex gap-4">
                    {["income", "expense"].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={option}
                          checked={type === option}
                          onChange={handleTypeChange}
                          className="w-5 h-5 form-radio text-lime-600"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subtype"
                    className="block mb-2 text-lg font-medium text-gray-700"
                  >
                    Sub Type
                  </label>
                  <select
                    id="subtype"
                    name="subtype"
                    onChange={handleSubTypeChange}
                    value={subtype}
                    disabled={fieldDisabled.subtype}
                    className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
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

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 text-lg font-medium text-gray-700"
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
                        (current < moment(threeWeekBefore) ||
                          current > moment())
                      }
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                      disabled={fieldDisabled.date}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-lg font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">LKR</span>
                      </div>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={fieldDisabled.amount}
                        className={`mt-1 block w-full pl-12 pr-3 py-2 sm:text-sm border-gray-300 rounded-md ${
                          !validation.amount
                            ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            : "focus:ring-lime-500 focus:border-lime-500"
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {!validation.amount && (
                      <p className="mt-2 text-sm text-red-600">
                        Invalid amount. Please enter a number.
                      </p>
                    )}
                    {amountError && (
                      <p className="mt-2 text-sm text-red-600">{amountError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-lg font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    disabled={fieldDisabled.description}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                    placeholder="Maximum 300 characters"
                  />
                  {descriptionError && (
                    <p className="mt-2 text-sm text-red-600">
                      {descriptionError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="payer_payee"
                    className="block mb-2 text-lg font-medium text-gray-700"
                  >
                    Payer/Payee
                  </label>
                  <input
                    type="text"
                    name="payer_payee"
                    id="payer_payee"
                    value={payerPayee}
                    onChange={handlePayeeChange}
                    disabled={fieldDisabled.payerPayee}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                    placeholder="Alphabetical characters only"
                  />
                  {payeeError && (
                    <p className="mt-2 text-sm text-red-600">{payeeError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="method"
                    className="block mb-2 text-lg font-medium text-gray-700"
                  >
                    Method
                  </label>
                  <select
                    id="method"
                    name="method"
                    onChange={handleMethodChange}
                    value={method}
                    disabled={fieldDisabled.method}
                    className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                  >
                    <option>Select a method</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 space-x-3 border-t border-gray-200 bg-gray-50 sm:px-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTransactionRecord}
                disabled={disabledSave || loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 ${
                  (disabledSave || loading) && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SnackbarProvider>
  );
}
