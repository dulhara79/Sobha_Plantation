import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, Card } from "antd";
import moment from "moment";

const EditSalaryRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [bonusError, setBonusError] = useState("");
  const [remarkError, setRemarkError] = useState("");
  const [date, setDate] = useState("");

  // Fetch Salary Record by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/salesAndFinance/finance/salary/${id}`)
      .then((response) => {
        setRecord(response.data);
        setDate(moment(response.data.payment_date));
        setIsLoading(false);
      })
      .catch((error) => {
        message.error("Error fetching record");
        console.error(error);
      });
  }, [id]);

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  // Define date boundaries
  const savedDate = record ? moment(record.payment_date) : null;
  const oneWeekBefore = savedDate
    ? moment(savedDate).subtract(7, "days")
    : null;
  const today = moment();

  console.log("savedDate", savedDate);
  console.log("oneWeekBefore", oneWeekBefore);
  console.log("today", today);

  const disabledDate = (currentDate) => {
    if (!savedDate) return true; // Block all dates until savedDate is loaded
    return (
      currentDate > savedDate ||
      currentDate < oneWeekBefore ||
      currentDate >= today
    );
  };

  // Handle date change for payment_date
  const handleDateChange = (date) => {
    setDate(date ? date.toISOString() : "");
    // setRecord((prevState) => ({ ...prevState, payment_date: date }));
  };

  const updateRecord = {
    ...record,
    payment_date: date,
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/salesAndFinance/finance/salary/${id}`,
        updateRecord
      );
      message.success("Record updated successfully");
      navigate("/salesAndFinance/finance/viewSalaryRecord"); // Redirect to the records list page
    } catch (error) {
      message.error("Error updating record");
      console.error(error);
    }
  };

  const handleBonusSalaryChange = (e) => {
    const input = e.target.value;

    console.log("input", input);

    // Remove non-numeric and negative characters
    const filteredValue = input.replace(/[^0-9.]/g, "");
    const bonusValue = parseFloat(filteredValue);

    if (bonusValue === null || bonusValue === "") {
      setRecord(() => ({ ...record, bonus_salary: 0 }));
      setDisplayError(false);
      setBonusError("");
    }
    // Check for invalid input and set errors
    /*if (isNaN(bonusValue)) {
      setRecord(prevState => ({ ...prevState, bonus_salary: 0 }));
      setDisplayError(true);
      setBonusError("Please enter a valid number.");
    } else */
    if (bonusValue < 0) {
      setDisplayError(true);
      setBonusError("Bonus salary cannot be negative.");
    } else if (bonusValue > 30000) {
      setDisplayError(true);
      setBonusError("Bonus salary cannot exceed 30,000.");
    } else {
      // Clear errors if the input is valid
      setDisplayError(false);
      setBonusError("");
      setRecord(() => ({ ...record, bonus_salary: bonusValue }));
    }
  };

  const handleRemarkChange = (e) => {
    const input = e.target.value;

    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(input)) {
      setDisplayError(true);
      setRemarkError("Remark will accept only letters.");
    } else {
      setDisplayError(false);
      setRemarkError("");
      let filteredValue = input.replace(/[^a-zA-Z\s]/g, "");
      filteredValue = filteredValue.substring(0, 100);
      if (filteredValue.length >= 100) {
        setDisplayError(true);
        setRemarkError("Remark should be shorter than 100 characters.");
      } else {
        setDisplayError(false);
        setRemarkError("");
        setRecord((prevState) => ({
          ...prevState,
          description: filteredValue,
        }));
      }
    }
  };
  console.log(record);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-4 font-semibold">Edit Salary Record</h1>
      <div className="justify-center w-2/3 p-4 mb-4 bg-white shadow-lg">
        <hr className="mb-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Name (Display Only) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                name="emp_name"
                value={record.emp_name}
                disabled
                className="w-full px-4 py-2 text-base text-black border rounded-md"
              />
            </div>

            {/* Type (Display Only) */}
            <div>
              <label className="block font-medium text-gray-700">Type</label>
              <input
                type="text"
                name="type"
                value={record.type}
                disabled
                className="w-full px-4 py-2 text-base text-black border rounded-md"
              />
            </div>
          </div>

          {/* Editable Fields */}
          <div>
            <label className="block font-medium text-gray-700">
              Basic Days
            </label>
            <input
              type="number"
              name="basic_days"
              value={record.basic_days}
              onChange={(date) => handleChange(date)}
              className="w-full px-4 py-2 text-base text-black border rounded-md"
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Basic Salary
              </label>
              <input
                type="number"
                name="basic_salary"
                value={parseFloat(record.basic_rate).toFixed(2)}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-black border rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Bonus Salary
              </label>
              <input
                type="number"
                name="bonus_salary"
                value={record.bonus_salary}
                onChange={handleBonusSalaryChange}
                className="w-full px-4 py-2 text-base text-black border rounded-md"
              />
              {displayError && (
                <p className="mt-1 text-xs text-red-600">{bonusError}</p>
              )}
            </div>
          </div>

          {/* OT Hours */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Weekday OT Hours
              </label>
              <input
                type="number"
                name="ot_hours"
                value={record.week_hours != 0 ? parseFloat(record.week_hours).toFixed(2) : 0}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-black border rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Saturday OT Hours
              </label>
              <input
                type="number"
                name="saturday_hours"
                value={record.saturday_hours != 0 ? parseFloat(record.saturday_hours).toFixed(2) : 0}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-black border rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Sunday OT Hours
              </label>
              <input
                type="number"
                name="sunday_hours"
                value={parseFloat(record.sunday_hours).toFixed(2)}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-black border rounded-md"
                disabled
              />
            </div>
          </div>

          {/* EPF/ETF */}
          <div>
            <label className="block font-medium text-gray-700">
              EPF/ETF (%)
            </label>
            <input
              type="number"
              name="epf_etf"
              value={parseFloat(record.epf_etf).toFixed(2)}
              onChange={handleChange}
              className="w-full px-4 py-2 text-base text-black border rounded-md"
              disabled
            />
          </div>

          {/* Payment Date */}
          <div>
            <label className="block font-medium text-gray-700">
              Payment Date
            </label>
            <DatePicker
              value={date ? moment(date) : null}
              onChange={(date) => handleDateChange(date)}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
              className="w-full px-4 py-2 text-base text-black border rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">Remarks</label>
            <input
              type="text"
              name="description"
              value={record.description || ""}
              onChange={handleRemarkChange}
              className="w-full px-4 py-2 text-base text-black border rounded-md"
            />
            {displayError && (
              <p className="mt-1 text-xs text-red-600">{remarkError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className={`relative flex ml-[300px]`} id="controlbar">
            <div
              className={`fixed bottom-0 right-0 z-0 w-full bg-gray-100 bg-opacity-50 border-t border-b h-14 backdrop-blur `}
              id="savebar"
            >
              <div
                className={`z-30 flex items-center justify-between h-full gap-2 pr-8 text-sm font-semibold align-middle ml-[300px]`}
              >
                <button
                  type="submit"
                  className={`float-right px-6 py-2 font-semibold text-white rounded-lg shadow-md bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800 ml-[630px]`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalaryRecord;
