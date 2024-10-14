import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import Swal from "sweetalert2";

const ValuationForm = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("null");
  const [subtype, setSubType] = useState();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [appreciationOrDepreciation, setAppreciationOrDepreciation] =
    useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Corrected useNavigate usage
  const [fieldDisabled, setFieldDisabled] = useState({
    subtype: true,
    date: true,
    type: true,
    quantity: true,
    price: true,
    description: true,
    payerPayee: true,
    appreciationOrDepreciation: true,
  });
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [displayErrorMassage, setDisplayErrorMassage] = useState(false);
  
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [payerPayeeError, setPayerPayeeError] = useState("");
  
  const threeWeekBefore = moment().subtract(3, "weeks");

  const handleValuationTypeChange = (e) => {
    setType(e.target.value);
    setFieldDisabled({
      ...fieldDisabled,
      subtype: false,
    });
  };

  const handleSubtypeChange = (e) => {
    setSubType(e.target.value);
    setFieldDisabled({
      ...fieldDisabled,
      date: false,
    });
  };

  const handleDateChange = (date) => {
    setDate(date);
    setFieldDisabled({
      ...fieldDisabled,
      quantity: false,
      price: false,
    });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if (
      filteredValue >= 0 ||
      !(filteredValue === "") ||
      !(filteredValue >= 1000000)
    ) {
      setQuantity(filteredValue);
      setFieldDisabled({
        ...fieldDisabled,
        price: false,
      });
      setDisplayErrorMassage(false);
    } else {
      setDisplayErrorMassage(true);
      setErrorMassage({
        ...errorMassage,
        quantity: "Quantity should be a number",
      });
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9. ]*$/;
    if (!regex.test(value)) {
      setDisplayErrorMassage(true);
      setPriceError("Price should contain only numbers");
    } else {
      setDisplayErrorMassage(false);
      setPriceError("");
    }
    const filteredValue = value.replace(/[^0-9. ]/g, "");
    parseFloat(filteredValue);

    if(filteredValue === ""){
      setDisplayErrorMassage(true);
      setPriceError("Price should not be empty");
    } else {
      setDisplayErrorMassage(false);
      setPriceError("");
    }
    
    if(filteredValue < 0){
      setDisplayErrorMassage(true);
      setPriceError("Price should be greater than 0");
    } else if (filteredValue > 10000000) {
      setDisabledSubmit(true);
      setFieldDisabled({
        ...fieldDisabled,
        description: true,
      });
      setDisplayErrorMassage(true);
      setPriceError("Price should be less than 100000");
    } else {
      setPrice(filteredValue);
      setFieldDisabled({
        ...fieldDisabled,
        description: false,
      });
      setDisplayErrorMassage(false);
      setPriceError("");
    }
    
    
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid description input:", value);
      setDescriptionError(
        "Invalid charactors in description input. Only letters and numbers are allowed."
      );
      setDisabledSubmit(true);
    } else {
      setDescriptionError("");
      setDisabledSubmit(false);
    }

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
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
      setFieldDisabled({
        ...fieldDisabled,
        payerPayee: true,
        method: true,
      });
    }
  };

  const handlePayerPayeeChange = (e) => {
    const { value } = e.target;

    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(value)) {
      console.error("Invalid payee input:", value);
      setPayerPayeeError(
        "Invalid charactors in payee input. Only letters are allowed."
      );
      setDisabledSubmit(true);
    } else {
      setPayerPayeeError("");
      setDisabledSubmit(false);
    }

    const filteredValue = value.replace(/[^a-zA-Z  ]/g, "");
    setPayerPayee(filteredValue);
    if (filteredValue.length > 0) {
      setFieldDisabled({
        ...fieldDisabled,
        method: false, // Enable method when payer/payee is filled
      });
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
      setFieldDisabled({
        ...fieldDisabled,
        method: true,
      });
    }
  };

  const handleAppreciationOrDepreciationChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if (
      filteredValue >= 0 ||
      !(filteredValue === "") ||
      !(filteredValue > 100)
    ) {
      setAppreciationOrDepreciation(filteredValue);
      setDisabledSubmit(false);
    }
  };

  const [autoSaveTransaction, setAutoSaveTransaction] = useState(true);

  const handleSaveValuationRecord = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (
      !date ||
      !type ||
      !subtype ||
      // !quantity ||
      !price ||
      !type ||
      !description ||
      !payerPayee
    ) {
      message.error("Please fill in all fields.");
      return;
    }

    if (new Date(date) > new Date()) {
      message.error("Payment date cannot be in the future.");
      return;
    }

    if (description.length > 100) {
      message.error("Description should be shorter than 100 characters.");
      return;
    }

    const transType = type === "asset" ? "income" : "expense";

    const transactionData = {
      date,
      type: transType,
      subtype,
      amount: price,
      description,
      payer_payee: payerPayee,
      method: "Automated Entry",
    };

    const data = {
      date: moment(date).format("YYYY-MM-DD"),
      type,
      subtype,
      quantity: 1,
      price: Number(price),
      description,
      payer_payee: payerPayee, // Ensure naming matches backend
      appreciationOrDepreciation: 0, // Ensure naming matches backend
    };

    console.log("Valuation Data:", data);

    axios
      .post("http://localhost:5000/api/salesAndFinance/finance/valuation", data)
      .then(() => {
        setLoading(false);

        console.log("Valuation Data:", data);

        enqueueSnackbar("Salary record has successfully saved.", {
          variant: "success",
        });

        if (autoSaveTransaction) {
          console.log("Transaction Data:", transactionData);

          // Save the transaction record
          handleSaveTransactionRecord(transactionData);
        }
        navigate("/salesAndFinance/finance/valuation-dashboard");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Salary record saving failed.", { variant: "error" });
        // message.error("Salary record saving failed.");
        console.log(error);
        console.error("Error occurred while saving salary record:", error);
        // navigate("/salesAndFinance/finance/valuation-dashboard");
      });
  };

  const handleSaveTransactionRecord = (transactionData) => {
    console.log("Transaction Data: ", transactionData);
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/salesAndFinance/finance/transaction",
        transactionData
      )
      .then(() => {
        setLoading(false);
        // message.success("Transaction record has automatically saved.");
        enqueueSnackbar("Transaction record has automatically saved.", {
          variant: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Transaction Data:", transactionData);
        // message.error("Automatic Transaction record saving failed.");
        enqueueSnackbar("Automatic Transaction record saving failed.", {
          variant: "error",
        });
        console.log("transaction auto save error: " + error);
      });
  };

  const handleCancel = () => {
    navigate(-1); // Correct navigation for cancel button
  };

  return (
    <div className="flex flex-col items-center">
      {/* View All Valuations Link */}
      <div className="flex justify-end w-full pr-8 mb-4">
        <Link
          to="/salesAndFinance/finance/valuation-dashboard"
          className="flex-none px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-gray-900 rounded-full shadow-md cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          View All Valuations
        </Link>
      </div>

      <form className="flex flex-col items-center w-full">
        <div className="w-10/12 px-4 pb-8 space-y-10">
          {/* Type Field */}
          <fieldset className="gap-y-2">
            <legend className="text-sm font-semibold leading-6 text-gray-700">
              Valuation type
            </legend>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-x-2">
                <input
                  id="asset"
                  name="type"
                  type="radio"
                  value="asset"
                  checked={type === "asset"}
                  onChange={handleValuationTypeChange}
                  className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
                  required
                />
                <span className="text-sm text-gray-700">Asset</span>
              </label>
              <label className="flex items-center gap-x-2">
                <input
                  id="liability"
                  name="type"
                  type="radio"
                  value="liability"
                  checked={type === "liability"}
                  onChange={handleValuationTypeChange}
                  className="w-4 h-4 border-gray-300 text-lime-600 focus:ring-lime-600"
                  required
                />
                <span className="text-sm text-gray-700">Liability</span>
              </label>
            </div>
          </fieldset>

          {/* Subtype Field */}
          <div>
            <label
              htmlFor="subtype"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Sub Type
            </label>
            <select
              name="subtype"
              value={subtype}
              onChange={handleSubtypeChange}
              id="subtype"
              disabled={fieldDisabled.subtype}
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            >
              {type === "asset" ? (
                <>
                  <option>Select Option</option>
                  <option>Land</option>
                  <option>Machinery</option>
                  <option>Crops</option>
                  <option>Infrastructure</option>
                  <option>Investments</option>
                  <option>Utilities</option>
                </>
              ) : (
                <>
                  <option>Select Option</option>
                  <option>Loan</option>
                  <option>Debts</option>
                  <option>Leases</option>
                  <option>Taxes</option>
                </>
              )}
            </select>
          </div>

          {/* Date, Quantity, Price */}
          <div>
            <label
              htmlFor="date"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              value={date ? moment(date) : null}
              onChange={(date) => handleDateChange(date)}
              format="YYYY-MM-DD"
              disabled={fieldDisabled.date}
              disabledDate={(current) =>
                current &&
                (current < moment(threeWeekBefore) || current > moment())
              }
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
          </div>

          {/* Hidden Quantity */}
          <div className="hidden">
            <label
              htmlFor="quantity"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={fieldDisabled.quantity}
              type="text"
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
            {/* {displayErrorMassage && (
            <span className="text-red-500">{errorMassage.quantity}</span>
          )} */}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              value={price}
              onChange={handlePriceChange}
              disabled={fieldDisabled.price}
              type="text"
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
            {displayErrorMassage && (
              <span className="text-red-500">
                {priceError}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              disabled={fieldDisabled.description}
              onChange={handleDescriptionChange}
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
            {displayErrorMassage && (
              <span className="text-red-500">{descriptionError}</span>
            )}
          </div>

          {/* Payer/Payee */}
          <div>
            <label
              htmlFor="payer_payee"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Payer/Payee
            </label>
            <input
              type="text"
              name="payer_payee"
              value={payerPayee}
              disabled={fieldDisabled.payerPayee}
              onChange={handlePayerPayeeChange}
              id="payer_payee"
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
            {displayErrorMassage && (
              <span className="text-red-500">{payerPayeeError}</span>
            )}
          </div>

          {/* Appreciation/Depreciation */}
          <div className="hidden">
            <label
              htmlFor="percentage"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Percentage
            </label>
            <input
              name="appreciationOrDepreciation"
              type="text"
              value={appreciationOrDepreciation}
              disabled={fieldDisabled.appreciationOrDepreciation}
              onChange={handleAppreciationOrDepreciationChange}
              id="appreciationOrDepreciation"
              className="block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-full pt-4">
            <div className="flex items-center gap-4 p-2 bg-gray-100 rounded-full">
              <label className="text-sm font-medium text-gray-700">
                Automatically save to transactions
                <input
                  className="ml-4 rounded form-checkbox text-lime-600 focus:ring-lime-600"
                  type="checkbox"
                  checked={autoSaveTransaction}
                  onChange={(e) => setAutoSaveTransaction(e.target.checked)}
                />
              </label>
              <button
                className="px-4 py-1.5 text-white bg-lime-500 rounded-full hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                onClick={handleSaveValuationRecord}
                disabled={disabledSubmit}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-1.5 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ValuationForm;
