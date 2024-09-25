import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

const ValuationForm = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("null");
  const [subtype, setSubType] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [appreciationOrDepreciation, setAppreciationOrDepreciation] =
    useState("");
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
    });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if(filteredValue >= 0 || !(filteredValue === "") || !(filteredValue > 100000)) {
      setQuantity(filteredValue);
    }
    setFieldDisabled({
      ...fieldDisabled,
      price: false,
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if(filteredValue >= 0 || !(filteredValue === "") || !(filteredValue > 10000000)) {
      setPrice(filteredValue);
    }
    setFieldDisabled({
      ...fieldDisabled,
      description: false,
    });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
    if(filteredValue.length <= 100) {
      setDescription(filteredValue);
    }
    setFieldDisabled({
      ...fieldDisabled,
      payerPayee: false,
    });
  };

  const handlePayerPayeeChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z ]/g, "");
    if(filteredValue.length <= 100) {
      setPayerPayee(filteredValue);
    }
    setFieldDisabled({
      ...fieldDisabled,
      appreciationOrDepreciation: false,
    });
  };
  
  const handleAppreciationOrDepreciationChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9 ]/g, "");
    if(filteredValue >= 0 || !(filteredValue === "") || !(filteredValue > 100)) {
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
      !quantity ||
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
      date,
      type,
      subtype,
      quantity,
      price,
      description,
      payer_payee: payerPayee, // Ensure naming matches backend
      appreciationOrDepreciation, // Ensure naming matches backend
    };

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
    <div>
      <div>
        <Link
          to="/salesAndFinance/finance/valuation-dashboard"
          className={`flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ml-[660px] cursor-pointer`}
        >
          View All Valuations
        </Link>
      </div>
      {/* onSubmit={handleSubmit} */}
      <form className="flex flex-col items-center justify-center">
        <div className="w-8/12 px-0 pb-8 space-y-12">
          {/* Type Field */}
          <fieldset className="sm:col-span-4 gap-y-8">
            <legend className="text-sm font-semibold leading-6 text-black">
              Valuation type
            </legend>
            <div className="flex flex-row items-center gap-4 mt-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="asset"
                  name="type"
                  type="radio"
                  value="asset"
                  checked={type === "asset"}
                  onChange={handleValuationTypeChange}
                  className="w-4 h-4 border-gray-900 text-lime-600 focus:ring-lime-600" 
                  required
                />
                <label
                  htmlFor="asset"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Asset
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="liability"
                  name="type"
                  type="radio"
                  value="liability"
                  checked={type === "liability"}
                  onChange={handleValuationTypeChange}
                  className="w-4 h-4 border-gray-900 text-lime-600 focus:ring-lime-600" required
                />
                <label
                  htmlFor="liability"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Liability
                </label>
              </div>
            </div>
          </fieldset>

          {/* Subtype Field */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="subtype"
              className="block text-sm font-medium leading-6 text-black"
            >
              Sub Type
            </label>
            <select
              name="subtype"
              value={subtype}
              onChange={handleSubtypeChange}
              id="subtype"
              disabled={fieldDisabled.subtype}
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" required
            >
              {type === "asset" ? (
                <>
                  <option>Land</option>
                  <option>Machinery</option>
                  <option>Crops</option>
                  <option>Infrastructure</option>
                  <option>Investments</option>
                  <option>Utilities</option>
                </>
              ) : (
                <>
                  <option>Loan</option>
                  <option>Debts</option>
                  <option>Leases</option>
                  <option>Taxes</option>
                </>
              )}
            </select>
          </div>

          {/* Date, Quantity, Price */}
          <div className="sm:col-span-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-black"
            >
              Date
            </label>
            <DatePicker
              value={date ? moment(date) : null}
              onChange={(date) => handleDateChange(date)}
              format="YYYY-MM-DD"
              disabled={fieldDisabled.date}
              disabledDate={(current) => current > moment()}
              className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
              required
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium leading-6 text-black"
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
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" required
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-black"
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
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" required
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-black"
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
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:max-w-xs sm:text-sm sm:leading-6" required
            />
          </div>

          {/* Payer/Payee */}
          <div className="col-span-full">
            <label
              htmlFor="payer_payee"
              className="block text-sm font-medium leading-6 text-black"
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
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" required
            />
          </div>

          {/* Appreciation/Depreciation */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="percentage"
              className="block text-sm font-medium leading-6 text-black"
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
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6" required
            />
          </div>

          {/* Buttons */}
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
                onClick={handleSaveValuationRecord}
                disabled={disabledSubmit}
              >
                Save
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
      </form>
    </div>
  );
};

export default ValuationForm;
