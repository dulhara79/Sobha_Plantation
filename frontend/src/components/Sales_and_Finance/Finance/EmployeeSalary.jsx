// payment working and save transactions
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { message, DatePicker, Button } from "antd";
import moment from "moment";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

export default function SalaryProcessingSection() {
  const [emp_name, setEmpName] = useState("");
  const [payment_date, setPaymentDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [type, setType] = useState("permanent");
  const [basic_days, setBasicDays] = useState(0);
  const [basic_rate, setBasicRate] = useState(0);
  const [bonus_salary, setBonusSalary] = useState(0);
  const [saturday_hours, setSaturdayHours] = useState(0);
  const [sunday_hours, setSundayHours] = useState(0);
  const [after_hours, setAfterHours] = useState(0);
  const [epf_etf, setEpfEtf] = useState(8);
  const [description, setDescription] = useState("");
  const [salary_start_date, setSalaryStartDate] = useState(null);
  const [salary_end_date, setSalaryEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [RegistrationRecords, setRegistrationRecords] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const oneWeekBefore = moment().subtract(7, "days").format("YYYY-MM-DD");
  const [autoSaveTransaction, setAutoSaveTransaction] = useState(false);
  const [nic, setNic] = useState("");
  const [ot_hours, setOtHours] = useState(0);
  const calculateEpfEtf = (basicSalary) => {
    const employeeEpf = (basicSalary * 8) / 100;
    return { employeeEpf };
  };
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  // Fetch Employee Data
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        setRegistrationRecords(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Select Employee
  const handleRadioChange = (id) => {
    const selectedEmployee = RegistrationRecords.find(
      (person) => person._id === id
    );
    const fullName = selectedEmployee
      ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
      : "";
    setSelectedID(id);
    setEmpName(fullName);
    setType(selectedEmployee ? selectedEmployee.employeeType : "");
    setBasicRate(selectedEmployee ? selectedEmployee.hourlyRate : "");
    setNic(selectedEmployee ? selectedEmployee.nic : "");
  };

  useEffect(() => {
    if (emp_name && payment_date) {
      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

      axios
        .get(
          `http://localhost:5000/api/salesAndFinance/finance/salary/attendance/${emp_name}?startDate=${startOfMonth}&endDate=${endOfMonth}`
        )
        .then((response) => {
          const { isPaid, message } = response.data;
          console.log("isPaid", isPaid);
          console.log("startOfMonth", startOfMonth);
          console.log("endOfMonth", endOfMonth);
          if (isPaid) {
            setAlreadyPaid(true);
            console.log("Salary status:", message);
          } else {
            setAlreadyPaid(false);
          }
        })
        .catch((error) =>
          console.error("Error fetching salary record:", error)
        );
    }
  }, [emp_name, payment_date]);

  // Calculate Worked Dates and OT
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/attendance/employee/${emp_name}`)
      .then((response) => {
        const attendanceData = response.data || [];
        let workHours = 0,
          saturdayOT = 0,
          sundayOT = 0,
          afterHoursOT = 0;
        let daysPresentInMonth = 0;

        attendanceData.forEach((entry) => {
          const entryDate = new Date(entry.date);
          const dayOfWeek = entryDate.getDay();
          const inTime = new Date(entry.createdAt);
          const outTime = new Date(entry.updatedAt);
          const hoursWorked = (outTime - inTime) / (1000 * 60 * 60);

          if (
            entryDate.getMonth() + 1 === new Date().getMonth() + 1 &&
            (entry.status === "Attend" || entry.status === "Leave")
          ) {
            daysPresentInMonth++;
          }

          if (
            entryDate.getMonth() + 1 === new Date().getMonth() + 1 &&
            entry.status === "Leave"
          ) {
            workHours += hoursWorked;
            if (dayOfWeek === 6) {
              saturdayOT += hoursWorked;
            } else if (dayOfWeek === 0) {
              sundayOT += hoursWorked;
            } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
              if (hoursWorked > 8) afterHoursOT += hoursWorked - 8;
            }
          } else {
            console.log("No attendance record found for this month.");
          }
        });

        setBasicDays(daysPresentInMonth);
        setAfterHours(afterHoursOT);
        setSaturdayHours(saturdayOT);
        setSundayHours(sundayOT);
      })
      .catch((error) => {
        setBasicDays(0);
        setAfterHours(0);
        setSaturdayHours(0);
        setSundayHours(0);

        console.error(error);
      });
  }, [selectedID, payment_date]);

  const calculateTotalSalary = () => {
    const basicSalary = basic_rate;
    const hourlyRate = basic_rate / 240;
    const saturdayOT = saturday_hours * hourlyRate * 1.5;
    const sundayOT = sunday_hours * hourlyRate * 2;
    const afterHoursOT = after_hours * hourlyRate * 1.5;
    const totalOT = saturdayOT + sundayOT + afterHoursOT;
    const totalSalary = basicSalary + Number(bonus_salary) + totalOT;
    const { employeeEpf } = calculateEpfEtf(basicSalary);
    return totalSalary - employeeEpf;
  };

  const handleSaveSalaryRecord = async (e) => {
    e.preventDefault();
    if (alreadyPaid) {
      enqueueSnackbar("Salary already paid for this period.", {
        variant: "warning",
      });
      return;
    }
    if (!payment_date || !emp_name || !type || !basic_days || !basic_rate) {
      message.error("Please fill in all fields.");
      return;
    }

    Swal.fire({
      title: "Confirm Salary Payment",
      text: "Are you sure you want to proceed with the salary payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          payment_date,
          emp_name,
          salary_start_date: moment(payment_date)
            .startOf("month")
            .format("YYYY-MM-DD"),
          salary_end_date: moment(payment_date)
            .endOf("month")
            .format("YYYY-MM-DD"),
          nic,
          type,
          basic_days,
          basic_rate,
          bonus_salary: Number(bonus_salary),
          after_hours,
          saturday_hours: saturday_hours,
          sunday_hours: sunday_hours,
          ot_rate: basic_rate / 240,
          epf_etf,
          description,
          isPaid: true,
        };

        const netSalary = calculateTotalSalary();

        setLoading(true);
        console.log("Salary record data:", data);
        axios
          .post(
            "http://localhost:5000/api/salesAndFinance/finance/salary",
            data
          )
          .then(() => {
            setLoading(false);
            Swal.fire(
              "Success!",
              "Salary record has been successfully saved.",
              "success"
            );
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
            setAlreadyPaid(true);
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire("Error!", "Salary record saving failed.", "error");
            console.error("Error occurred while saving salary record:", error);
          });
      } else {
        Swal.fire("Cancelled", "Salary payment was not processed", "info");
      }
    });
  };

  const handleSaveTransactionRecord = (transactionData) => {
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/salesAndFinance/finance/transaction",
        transactionData
      )
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
      basic_days < 0 ||
      basic_rate <= 0 ||
      basic_rate < 0 ||
      bonus_salary < 0 ||
      ot_hours < 0 ||
      // ot_rate < 0 ||
      epf_etf < 0 ||
      isNaN(basic_days) ||
      isNaN(basic_rate) ||
      isNaN(bonus_salary) ||
      isNaN(ot_hours) ||
      // isNaN(ot_rate) ||
      isNaN(epf_etf)
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
    // const otRateValue = parseFloat(ot_rate);
    const epfEtfValue = parseFloat(epf_etf);

    // Check if any input value is NaN and replace it with 0
    const validBasicDays = isNaN(basicDaysValue) ? 0 : basicDaysValue;
    const validBasicRate = isNaN(basicRateValue) ? 0 : basicRateValue;
    const validBonusSalary = isNaN(bonusSalaryValue) ? 0 : bonusSalaryValue;
    const validOtHours = isNaN(otHoursValue) ? 0 : otHoursValue;
    // const validOtRate = isNaN(otRateValue) ? 0 : otRateValue;
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

  // console.log("registration records", RegistrationRecords);

  return (
    <div>
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
          {alreadyPaid ? (
            <p className="text-lg text-red-600">
              Salary already paid for this month
            </p>
          ) : (
            <div className="w-full h-screen max-w-4xl p-6 mx-auto mb-96">
              <form onSubmit={handleSaveSalaryRecord} className="space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Salary Processing Section
                </h1>
                <p className="text-sm text-gray-500">
                  Fill in the details to process the salary for the selected
                  employee.
                </p>
                <Link to="/salesAndFinance/finance/viewSalaryRecord">
                  <Button className="float-right pl-8 pr-8 text-white rounded-lg bg-lime-600 text-md hover:bg-lime-400">
                    View Salary Records
                  </Button>
                </Link>
                <hr className="border-gray-300" />
                {/* Row 1: Employee Name, Type */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Employee Name */}
                  <div>
                    <label
                      htmlFor="emp_name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="type"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
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
                      readOnly
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
                      Basic Salary
                    </label>
                    <input
                      type="number"
                      name="basic_rate"
                      value={basic_rate.toFixed(2)}
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
                      Week days OT Hours
                    </label>
                    <input
                      type="number"
                      name="ot_hours"
                      value={after_hours.toFixed(2)}
                      onChange={(e) => setOtHours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 4: Saturday and Sunday OT Hours */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="saturday_hours"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Saturday OT Hours
                    </label>
                    <input
                      type="number"
                      name="saturday_hours"
                      value={saturday_hours.toFixed(2)}
                      onChange={(e) => setSaturdayHours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sunday_hours"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Sunday OT Hours
                    </label>
                    <input
                      type="number"
                      name="sunday_hours"
                      value={sunday_hours.toFixed(2)}
                      onChange={(e) => setSundayHours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 5: EPF/ETF, Payment Date */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                      value={payment_date ? moment(payment_date) : null}
                      onChange={(date) => setPaymentDate(date)}
                      format="YYYY-MM-DD"
                      disabledDate={(current) =>
                        current &&
                        (current < moment(oneWeekBefore) || current > moment())
                      }
                      className="block w-full h-8 p-2 mt-2 text-black bg-white border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
                    />
                  </div>
                </div>

                {/* Row 6: Remarks */}
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

                {/* Control Bar */}
                <div className={`relative flex ml-[300px]`} id="controlbar">
                  <div
                    className={`fixed bottom-0 right-0 z-0 w-full bg-gray-100 bg-opacity-50 border-t border-b h-14 backdrop-blur `}
                    id="savebar"
                  >
                    <div
                      className={`z-30 flex items-center justify-between h-full gap-2 pr-8 text-sm font-semibold align-middle ml-[300px]`}
                    >
                      <div className="px-6 py-1 mx-8 text-base font-semibold border border-gray-500 rounded-full">
                        Total Salary:{" "}
                        {calculateTotalSalary() <= 0 ||
                        calculateTotalSalary() > 1000000 ? (
                          <span className="text-red-500">Invalid salary</span>
                        ) : (
                          <span className="text-xl text-lime-600">
                            {calculateTotalSalary().toFixed(2)}
                          </span>
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
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
