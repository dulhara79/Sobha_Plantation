import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { message, DatePicker } from "antd";
import moment from "moment";
import jsPDF from "jspdf";

export default function SalaryProcessingSection() {
  const [emp_name, setEmpName] = useState(""); 
  const [payment_date, setPaymentDate] = useState("");
  const [type, setType] = useState("permanent");
  const [basic_days, setBasicDays] = useState(0);
  const [basic_rate, setBasicRate] = useState(0);
  const [bonus_salary, setBonusSalary] = useState(0);
  const [saturday_hours, setSaturdayHours] = useState(0);
  const [sunday_hours, setSundayHours] = useState(0);
  const [after_hours, setAfterHours] = useState(0);
  const [epf_etf, setEpfEtf] = useState(0);
  const [description, setDescription] = useState("");
  const [salary_start_date, setSalaryStartDate] = useState(null);
  const [salary_end_date, setSalaryEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch employee data
  const [RegistrationRecords, setRegistrationRecords] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/employee`)
      .then((response) => {
        setRegistrationRecords(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleRadioChange = (id) => {
    const selectedEmployee = RegistrationRecords.find((person) => person._id === id);
    const fullName = selectedEmployee
      ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
      : "";

    setEmpName(fullName);
    setType(selectedEmployee ? selectedEmployee.employeeType : "");
    setBasicRate(selectedEmployee ? selectedEmployee.hourlyRate : "");
  };

  // Fetch EPF/ETF rates based on employee type
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/employee/${id}`)
      .then((response) => 
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Calculate total salary
  const calculateTotalSalary = () => {
    const basicSalary = parseFloat(basic_days) * parseFloat(basic_rate);
    const saturdayOT = parseFloat(saturday_hours) * parseFloat(basic_rate) * 1.5;
    const sundayOT = parseFloat(sunday_hours) * parseFloat(basic_rate) * 2;
    const afterHoursOT = parseFloat(after_hours) * parseFloat(basic_rate) * 1.5;
    const totalOT = saturdayOT + sundayOT + afterHoursOT;
    const totalSalary = basicSalary + parseFloat(bonus_salary) + totalOT;

    const epfEtfDeduction = (totalSalary * parseFloat(epf_etf)) / 100;
    const netSalary = totalSalary - epfEtfDeduction;

    return netSalary;
  };

  // Save salary record
  const handleSaveSalaryRecord = async (e) => {
    e.preventDefault();

    if (!payment_date || !emp_name || !type || !basic_days || !basic_rate || !bonus_salary || !description) {
      message.error("Please fill in all fields.");
      return;
    }

    const data = {
      payment_date,
      emp_name,
      salary_start_date,
      salary_end_date,
      type,
      basic_days,
      basic_rate,
      bonus_salary,
      saturday_hours,
      sunday_hours,
      after_hours,
      epf_etf,
      description,
    };

    const netSalary = calculateTotalSalary();

    setLoading(true);
    axios
      .post("http://localhost:5000/api/salesAndFinance/finance/salary", data)
      .then(() => {
        setLoading(false);
        message.success("Salary record has successfully saved.");

        const transactionData = {
          date: data.payment_date,
          type: "expense",
          subtype: "Salary payment",
          amount: netSalary,
          description: `Salary from ${data.salary_start_date} to ${data.salary_end_date}`,
          payer_payee: data.emp_name,
          method: "Automated Entry",
        };

        handleSaveTransactionRecord(transactionData);
        navigate("/salesAndFinance/finance/employeeSalary");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Salary record saving failed.");
        console.error("Error occurred while saving salary record:", error);
      });
  };

  const handleSaveTransactionRecord = (transactionData) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/salesAndFinance/finance/transaction", transactionData)
      .then(() => {
        setLoading(false);
        message.success("Transaction record has automatically saved.");
      })
      .catch((error) => {
        setLoading(false);
        message.error("Automatic Transaction record saving failed.");
        console.error("Transaction auto save error:", error);
      });
  };

  const generatePayslipPDF = () => {
    // Validation for empty fields
    const missingFields = [];
    if (!payment_date) missingFields.push("Payment Date");
    if (!salary_start_date) missingFields.push("Salary Start Date");
    if (!salary_end_date) missingFields.push("Salary End Date");
    if (!basic_days) missingFields.push("Basic Days");
    if (!basic_rate) missingFields.push("Basic Rate");
    if (!bonus_salary) missingFields.push("Bonus Salary");
    if (!ot_hours) missingFields.push("OT Hours");
    if (!ot_rate) missingFields.push("OT Rate");
    if (!epf_etf) missingFields.push("EPF/ETF");
    if (!description) missingFields.push("Description");

    if (missingFields.length > 0) {
      message.error(
        `Please fill in the following fields: ${missingFields.join(", ")}.`
      );
      return;
    }

    // Validation checks
    if (
      basic_days < 0 ||basic_rate <= 0 ||basic_rate < 0 ||bonus_salary < 0 ||ot_hours < 0 ||ot_rate < 0 ||epf_etf < 0 ||isNaN(basic_days) ||isNaN(basic_rate) ||isNaN(bonus_salary) ||isNaN(ot_hours) ||isNaN(ot_rate) ||isNaN(epf_etf)
    ) {
      message.error(
        "Please enter valid positive values for days, rates, and amounts."
      );
      return;
    }

    if (new Date(payment_date) > new Date()) {
      message.error("Payment date cannot be in the future.");
      return;
    }

    if (description.length > 100) {
      message.error("Description should be shorter than 100 characters.");
      return;
    }

    // Calculate total pay
    const basicDaysValue = parseFloat(basic_days);
    const basicRateValue = parseFloat(basic_rate);
    const bonusSalaryValue = parseFloat(bonus_salary);
    const otHoursValue = parseFloat(ot_hours);
    const otRateValue = parseFloat(ot_rate);
    const epfEtfValue = parseFloat(epf_etf);

    // Check if any input value is NaN and replace it with 0
    const validBasicDays = isNaN(basicDaysValue) ? 0 : basicDaysValue;
    const validBasicRate = isNaN(basicRateValue) ? 0 : basicRateValue;
    const validBonusSalary = isNaN(bonusSalaryValue) ? 0 : bonusSalaryValue;
    const validOtHours = isNaN(otHoursValue) ? 0 : otHoursValue;
    const validOtRate = isNaN(otRateValue) ? 0 : otRateValue;
    const validEpfEtf = isNaN(epfEtfValue) ? 0 : epfEtfValue;

    // Calculate basic salary
    const basicSalary = validBasicDays * validBasicRate;

    // Calculate OT salary
    const otSalary = validOtHours * validOtRate;

    // Calculate total salary
    const totalSalary = basicSalary + validBonusSalary + otSalary;

    // Calculate EPF/ETF deduction
    const epfEtfDeduction = (totalSalary * validEpfEtf) / 100;

    // Calculate net salary
    const netSalary = totalSalary - epfEtfDeduction;

    // Create a new PDF document in landscape orientation
    const doc = new jsPDF({});

    // Set monospace font
    doc.setFont("courier");

    // Add company information
    doc.setFontSize(18);
    doc.text("Elemahana Plantations", 10, 10);
    doc.text("Kotawehera, Nikaweratiya", 10, 20);

    // Add title for the payslip
    doc.setFontSize(12);
    doc.text("Salary Payslip", 10, 40);

    // Create table headers
    const headers = [["Description", "Amount"]];
    const data = [
      ["Employee Name", emp_name],
      ["NIC", nic],
      ["Date Range", `${salary_start_date} - ${salary_end_date}`],
      ["Basic Days", `${basic_days}`],
      ["Payment Date", payment_date],
      ["Type", type],
      ["Basic Salary", basicSalary.toFixed(2)],
      ["Bonus Salary", validBonusSalary.toFixed(2)],
      ["OT Salary", otSalary.toFixed(2)],
      ["Total Salary", totalSalary.toFixed(2)],
      ["EPF/ETF Deduction", epfEtfDeduction.toFixed(2)],
      // Set 'Net Salary' with different font color
      [
        { content: "Net Salary", styles: { textColor: [0, 0, 255] } },
        { content: netSalary.toFixed(2), styles: { textColor: [0, 0, 255] } },
      ],
    ];

    // Set table width and align headers to center
    const tableWidth = 170;
    const cellWidth = tableWidth / 2;
    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
      margin: { left: 10, right: 10 },
      columnStyles: {
        0: { cellWidth: cellWidth, fontStyle: "bold" },
        1: { cellWidth: cellWidth },
      },
    });

    // Save the PDF
    doc.save("payslip.pdf");
    message.success("Pay slip generated.");
  };

  console.log("registration records", RegistrationRecords);

  return (
    <div className="border-t ">
      <div className="flex flex-row">
        <div
          className="w-1/3 h-screen overflow-scroll border-r bg-gray-50 mb-14 overscroll-auto bottom-14"
          id="employeelist"
        >
          <ul role="list" className="divide-y divide-gray-300">
            {RegistrationRecords.map((person) => (
              <li key={person._id} className={``}>
                <label
                  htmlFor={person._id}
                  className={`py-3 px-4 flex hover:bg-lime-50 transition-all hover:shadow-xl duration-200  justify-between gap-x-4 ${
                    selectedID === person._id
                      ? "bg-lime-100 border-l-4 border-lime-600 shadow-xl"
                      : ""
                  }`}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {person.firstName} {person.lastName}
                      </p>
                      {/* <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {person.nic}
                      </p> */}
                    </div>
                  </div>
                  {/* <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.employeeType}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Rs.{person.hourlyRate.toLocaleString()}
                    </p>
                  </div> */}
                  <input
                    type="radio"
                    id={person._id}
                    name="employee"
                    className="self-center border border-gray-400 size-4 focus:ring-white focus:ring-0 text-lime-600 checked:border-gray-500 checked:border checked::bg-lime-700"
                    value={person.nic}
                    checked={selectedID === person._id}
                    onChange={() => handleRadioChange(person._id)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-screen max-w-4xl p-6 mx-auto mb-96">
      <form onSubmit={handleSaveSalaryRecord} className="space-y-6">
        {/* Row 1: Employee Name, Type */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Employee Name */}
          <div>
            <label htmlFor="emp_name" className="block mb-1 text-sm font-medium text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              name="emp_name"
              value={emp_name}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>
          {/* Type */}
          <div>
            <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={type}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>
        </div>

            {/* Row 2: Date Range, Basic Days */}
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/*<div>
                <label
                  htmlFor="salary_range"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Date Range
                </label>
                <DatePicker.RangePicker
                  value={
                    salary_start_date && salary_end_date
                      ? [moment(salary_start_date), moment(salary_end_date)]
                      : null
                  }
                  onChange={(dates) => {
                    if (dates && dates.length === 2) {
                      setSalaryStartDate(dates[0].format("YYYY-MM-DD"));
                      setSalaryEndDate(dates[1].format("YYYY-MM-DD"));
                    } else {
                      setSalaryStartDate(null);
                      setSalaryEndDate(null);
                    }
                  }}
                  disabledDate={(current) => current > moment()}
                  className="w-full"
                />
                <p className="mt-1 text-xs text-green-600">
                  Please select the range of dates for which you wish to find
                  the present days and half-days of the selected employee.
                </p>
              </div> */}
              <div>
                <label
                  htmlFor="basic_days"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Basic Days
                </label>
                <input
                  type="number"
                  name="basic_days"
                  value={basic_days}
                  onChange={(e) => setBasicDays(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                />
                <p className="mt-1 text-xs text-orange-600">
                  Calculated by analyzing attendance records. Do not change
                  unless the employee failed to mark attendance on a present
                  day.
                </p>
              </div>
            </div>

            {/* Row 3: Basic Rate, Bonus Salary, OT Hours */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="basic_rate"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Basic Rate
                </label>
                <input
                  type="number"
                  name="basic_rate"
                  value={basic_rate}
                  onChange={(e) => setBasicRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="bonus_salary"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Bonus Salary
                </label>
                <input
                  type="number"
                  name="bonus_salary"
                  value={bonus_salary}
                  onChange={(e) => setBonusSalary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
              <div>
                <label
                  htmlFor="ot_hours"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  OT Hours
                </label>
                <input
                  type="number"
                  name="ot_hours"
                  value={ot_hours}
                  onChange={(e) => setOtHours(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
            </div>

            {/* Row 4: OT Rate, EPF/ETF, Payment Date */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="ot_rate"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  OT Rate
                </label>
                <input
                  type="number"
                  name="ot_rate"
                  value={ot_rate}
                  onChange={(e) => setOtRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
              <div>
                <label
                  htmlFor="epf_etf"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  EPF/ETF (%)
                </label>
                <input
                  type="number"
                  name="epf_etf"
                  value={epf_etf}
                  onChange={(e) => setEpfEtf(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="payment_date"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Payment Date
                </label>
                <DatePicker
                  value={payment_date}
                  onChange={(date) => setPaymentDate(date)}
                  format="YYYY-MM-DD"
                  disabledDate={(current) => current > moment()}
                  className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
                />
              </div>
            </div>

            {/* Row 5: Remarks */}
            <div>
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Remarks
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
          </form>
        </div>

        <div className="relative flex" id="controlbar">
          <div
            className="fixed bottom-0 right-0 z-0 w-full bg-gray-100 bg-opacity-50 border-t border-b h-14 backdrop-blur"
            id="savebar"
          >
            <div className="z-30 flex items-center justify-between h-full gap-2 pr-8 text-sm font-semibold align-middle">
              <div className="px-6 py-1 mx-8 text-base font-semibold border border-gray-500 rounded-full">
                Total Salary:{" "}
                {calculateTotalSalary() <= 0 || calculateTotalSalary() > 1000000 ? (
                  <span className="text-red-500">Invalid salary</span>
                ) : (
                  <span className="text-xl text-lime-600">{calculateTotalSalary().toFixed(2)}</span>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              >
                Save Salary Record
              </button>
            </div>
          </div>

              <button
                onClick={generatePayslipPDF}
                className="px-4 py-1 rounded-full bg-amber-200 hover:bg-amber-300"
              >
                Generate Receipt
              </button>
              <Link
                className="px-4 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                to="/salesAndFinance/finance/"
              >
                Cancel
              </Link>

              <div className="flex items-center gap-4">
                <label className="py-1 pl-4 bg-gray-200 rounded-full">
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
                  onClick={handleSaveSalaryRecord}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
    // </div>
  );
}
