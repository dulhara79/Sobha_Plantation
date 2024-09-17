import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const ValuationForm = () => {
  const [date, setDate] = useState("");
  const [type, setType] = useState("asset");
  const [subtype, setSubType] = useState("Land");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [payerPayee, setPayerPayee] = useState("");
  const [appreciationOrDepreciation, setAppreciationOrDepreciation] =
    useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSubType("Land");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valuationData = {
      date,
      type,
      subtype,
      quantity,
      price,
      description,
      payer_payee: payerPayee, // Ensure naming matches backend
      appreciationOrDepreciation, // Ensure naming matches backend
    };

    console.log("Sending valuation data:", valuationData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/salesAndFinance/finance/valuation",
        valuationData
      );

      enqueueSnackbar("Valuation saved successfully!", { variant: "success" });
      console.log(response.data);
    } catch (error) {
      enqueueSnackbar("Failed to save valuation", { variant: "error" });
      console.error("Error details:", error.response.data);
    }
  };

  return (
    <div>
      <button
        className={`flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ml-[660px] cursor-pointer`}
      >
        View All Valuations
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
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
                  onChange={handleTypeChange}
                  className="w-4 h-4 border-gray-900 text-lime-600 focus:ring-lime-600"
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
                  onChange={handleTypeChange}
                  className="w-4 h-4 border-gray-900 text-lime-600 focus:ring-lime-600"
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
              onChange={(e) => setSubType(e.target.value)}
              id="subtype"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
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
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
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
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
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
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:max-w-xs sm:text-sm sm:leading-6"
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
              onChange={(e) => setPayerPayee(e.target.value)}
              id="payer_payee"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
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
              type="number"
              value={appreciationOrDepreciation}
              onChange={(e) => setAppreciationOrDepreciation(e.target.value)}
              id="appreciationOrDepreciation"
              className="block w-full rounded-md border-2 border-gray-300 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-lime-600 hover:bg-lime-700"
            >
              Save Valuation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ValuationForm;
