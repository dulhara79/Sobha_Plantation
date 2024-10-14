import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { message, DatePicker, Button } from "antd";
import moment from "moment";
import Swal from "sweetalert2";

export default function SalaryProcessingSection() {
  const [emp_name, setEmpName] = useState("");
  const [payment_date, setPaymentDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [type, setType] = useState("");
  const [basic_days, setBasicDays] = useState(0);
  const [basic_rate, setBasicRate] = useState(0);
  const [bonus_salary, setBonusSalary] = useState(0);
  const [saturday_hours, setSaturdayHours] = useState(0);
  const [sunday_hours, setSundayHours] = useState(0);
  const [after_hours, setAfterHours] = useState(0);
  // const [epf_etf, setEpfEtf] = useState(8);
  const [description, setDescription] = useState("");
  const [RegistrationRecords, setRegistrationRecords] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const oneWeekBefore = moment().subtract(7, "days").format("YYYY-MM-DD");
  const [nic, setNic] = useState("");
  const [ot_hours, setOtHours] = useState(0);
  const [displayError, setDisplayError] = useState(false);
  const [bonusError, setBonusError] = useState("");
  const [remarkError, setRemarkError] = useState("");
  const [blockFields, setBlockFields] = useState({
    emp_name: true,
    payment_date: false,
    type: true,
    basic_days: true,
    basic_rate: true,
    bonus_salary: true,
    saturday_hours: true,
    sunday_hours: true,
    after_hours: true,
    epf_etf: true,
    description: true,
    submit: true,
  });

  const [partialPayment, setPartialPayment] = useState(false);
  const [empSalID, setEmpSalID] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  // const [fullMonthSalary, setFullMonthSalary] = useState(0);
  // const [epfDeduction, setEpfDeduction] = useState(0);
  // const [etfContribution, setEtfContribution] = useState(0);
  // const [isEarlyPayment, setIsEarlyPayment] = useState(false);
  const [salaryDetails, setSalaryDetails] = useState({
    fullMonthSalary: 0,
    epfDeduction: 0,
    etfContribution: 0,
    netSalary: 0,
  });

  const [epfRate, setEpfRate] = useState(0.08); // 8% for employee contribution
  const [etfRate, setEtfRate] = useState(0.03); // 3% for employer contribution

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch Employee Data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        setRegistrationRecords(response.data || []);
      })
      .catch((error) => {
        console.error(error);
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
          const { message } = response.data;
          console.log("Salary status:", response);
          const partialPayment = response.data.data.partialPayment;
          setPaidAmount(response.data.data.netSalary);
          const isPaid = response.data.data.isPaid;
          if (isPaid) {
            setAlreadyPaid(true);
            console.log("Salary status:", message);
          } else {
            setAlreadyPaid(false);
          }
          if (partialPayment) {
            setPartialPayment(true);
          } else {
            setPartialPayment(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching salary record:", error);
          setAlreadyPaid(false);
          setPartialPayment(false);
        });
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

  // const calculateSalaryDetails = useCallback(() => {
  //   const today = moment(payment_date);
  //   const isBeforeMiddleOfMonth = today.date() < 15;
  //   const isBefore25th = today.date() < 25;

  //   const hourlyRate = basic_rate / (25*8);
  //   const basicSalary = basic_rate;
  //   const saturdayOT = saturday_hours * hourlyRate * 1.5;
  //   const sundayOT = sunday_hours * hourlyRate * 2;
  //   const afterHoursOT = after_hours * hourlyRate * 1.5;
  //   const totalOT = saturdayOT + sundayOT + afterHoursOT;
  //   const fullMonthTotal = basicSalary + Number(bonus_salary) + totalOT;

  //   let epfDeduction = 0;
  //   let etfContribution = 0;
  //   let netSalary = fullMonthTotal;

  //   if (!isBefore25th || (partialPayment && !isBeforeMiddleOfMonth)) {
  //     epfDeduction = (basicSalary * 8) / 100;
  //     etfContribution = (basicSalary * 12) / 100;
  //     netSalary -= epfDeduction;
  //   }

  //   if (isBefore25th) {
  //     if (isBeforeMiddleOfMonth) {
  //       const daysInMonth = today.daysInMonth();
  //       const daysPassed = today.date();
  //       netSalary = (fullMonthTotal / daysInMonth) * daysPassed;
  //     } else {
  //       netSalary = Math.min(netSalary, basicSalary / 2);
  //     }
  //   }

  //   if (partialPayment) {
  //     netSalary = fullMonthTotal - paidAmount - epfDeduction;
  //   }

  //   return {
  //     fullMonthSalary: fullMonthTotal,
  //     epfDeduction,
  //     etfContribution,
  //     netSalary,
  //   };
  // }, [
  //   payment_date,
  //   basic_rate,
  //   saturday_hours,
  //   sunday_hours,
  //   after_hours,
  //   bonus_salary,
  //   partialPayment,
  //   paidAmount,
  // ]);

  // useEffect(() => {
  //   const details = calculateSalaryDetails();
  //   setSalaryDetails(details);
  //   setIsEarlyPayment(moment(payment_date).date() < 25);
  // }, [calculateSalaryDetails, payment_date]);

  // // const handleSaveSalaryRecord = async (e) => {
  // //   e.preventDefault();
  // //   const today = moment(payment_date);
  // //   const isBefore25th = today.date() < 25;

  // //   if (alreadyPaid && !isBefore25th) {
  // //     enqueueSnackbar("Salary already paid for this period.", {
  // //       variant: "warning",
  // //     });
  // //     return;
  // //   } else if (alreadyPaid && isBefore25th) {
  // //     enqueueSnackbar(
  // //       "Early salary payment has already been processed this month.",
  // //       { variant: "warning" }
  // //     );
  // //     return;
  // //   }

  // //   Swal.fire({
  // //     title: "Confirm Salary Payment",
  // //     text: "Are you sure you want to proceed with the salary payment?",
  // //     icon: "warning",
  // //     showCancelButton: true,
  // //     confirmButtonText: "Yes, proceed!",
  // //     cancelButtonText: "No, cancel!",
  // //   }).then((result) => {
  // //     if (result.isConfirmed) {
  // //       const salaryStartDate = moment(payment_date)
  // //         .startOf("month")
  // //         .format("YYYY-MM-DD");
  // //       const salaryEndDate = moment(payment_date)
  // //         .endOf("month")
  // //         .format("YYYY-MM-DD");

  // //       const netSalary = calculateSalaryDetails();

  // //       const data = {
  // //         payment_date,
  // //         emp_name,
  // //         salary_start_date: salaryStartDate,
  // //         salary_end_date: salaryEndDate,
  // //         nic,
  // //         type,
  // //         basic_days,
  // //         basic_rate,
  // //         bonus_salary: Number(bonus_salary),
  // //         after_hours,
  // //         saturday_hours,
  // //         sunday_hours,
  // //         ot_rate: basic_rate / 240,
  // //         epf_deduction: epfDeduction,
  // //         etf_contribution: etfContribution,
  // //         description,
  // //         isPaid: !isBefore25th,
  // //         netSalary: netSalary.netSalary,
  // //         partialPayment: isBefore25th,
  // //         fullMonthSalary: fullMonthSalary,
  // //       };

  // //       console.log("Salary data:", data);

  // //       axios
  // //         .post(
  // //           "http://localhost:5000/api/salesAndFinance/finance/salary",
  // //           data
  // //         )
  // //         .then((response) => {
  // //           setEmpSalID(response.data.id);
  // //           Swal.fire(
  // //             "Success!",
  // //             "Salary record has been successfully saved.",
  // //             "success"
  // //           );

  // //           // Save salary payment transaction
  // //           handleSaveTransactionRecord({
  // //             date: data.payment_date,
  // //             type: "expense",
  // //             subtype: "Salary payment",
  // //             amount: netSalary.netSalary,
  // //             description: `${data.emp_name}'s salary from ${data.salary_start_date} to ${data.salary_end_date}`,
  // //             payer_payee: data.emp_name,
  // //             method: "Automated Entry",
  // //           });

  // //           // Save ETF contribution transaction if applicable
  // //           if (etfContribution > 0) {
  // //             handleSaveTransactionRecord({
  // //               date: data.payment_date,
  // //               type: "expense",
  // //               subtype: "ETF Contribution",
  // //               amount: etfContribution,
  // //               description: `ETF Contribution for ${data.emp_name}`,
  // //               payer_payee: "ETF Board",
  // //               method: "Automated Entry",
  // //             });
  // //           }

  // //           navigate("/salesAndFinance/finance/employeeSalary");
  // //           setAlreadyPaid(!isBefore25th);
  // //         })
  // //         .catch((error) => {
  // //           Swal.fire("Error!", "Salary record saving failed.", "error");
  // //           console.error("Error occurred while saving salary record:", error);
  // //         });
  // //     } else {
  // //       Swal.fire("Cancelled", "Salary payment was not processed", "info");
  // //     }
  // //   });
  // // };

  // const handleSaveSalaryRecord = async (e) => {
  //   e.preventDefault();
  //   const today = moment(payment_date);
  //   const dayOfMonth = today.date();
  //   const isMiddleOfMonth = dayOfMonth >= 15;
  //   const is25thOrLater = dayOfMonth >= 25;

  //   if (alreadyPaid && !is25thOrLater) {
  //     enqueueSnackbar(
  //       "Early salary payment has already been processed this month.",
  //       { variant: "warning" }
  //     );
  //     return;
  //   }

  //   Swal.fire({
  //     title: "Confirm Salary Payment",
  //     text: "Are you sure you want to proceed with the salary payment?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, proceed!",
  //     cancelButtonText: "No, cancel!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const salaryStartDate = moment(payment_date)
  //         .startOf("month")
  //         .format("YYYY-MM-DD");
  //       const salaryEndDate = moment(payment_date)
  //         .endOf("month")
  //         .format("YYYY-MM-DD");

  //       let netSalary = 0;
  //       let epfDeduction = 0;
  //       let etfContribution = 0;
  //       let fullMonthSalary = basic_rate + Number(bonus_salary);

  //       // Calculate OT
  //       const hourlyRate = basic_rate / 240;
  //       const saturdayOT = saturday_hours * hourlyRate * 1.5;
  //       const sundayOT = sunday_hours * hourlyRate * 2;
  //       const afterHoursOT = after_hours * hourlyRate * 1.5;
  //       const totalOT = saturdayOT + sundayOT + afterHoursOT;

  //       fullMonthSalary += totalOT;

  //       if (is25thOrLater) {
  //         // Full salary payment on or after the 25th
  //         epfDeduction = (basic_rate * 8) / 100;
  //         etfContribution = (basic_rate * 12) / 100;
  //         netSalary = fullMonthSalary - epfDeduction - paidAmount;
  //       } else if (isMiddleOfMonth) {
  //         // Half salary payment after middle of the month
  //         netSalary = basic_rate / 2;
  //       } else {
  //         // Pro-rata salary payment before middle of the month
  //         const daysInMonth = today.daysInMonth();
  //         const daysPassed = dayOfMonth;
  //         netSalary = (fullMonthSalary / daysInMonth) * daysPassed;
  //       }

  //       const data = {
  //         payment_date,
  //         emp_name,
  //         salary_start_date: salaryStartDate,
  //         salary_end_date: salaryEndDate,
  //         nic,
  //         type,
  //         basic_days,
  //         basic_rate,
  //         bonus_salary: Number(bonus_salary),
  //         after_hours,
  //         saturday_hours,
  //         sunday_hours,
  //         ot_rate: hourlyRate,
  //         epf_deduction: epfDeduction,
  //         etf_contribution: etfContribution,
  //         description,
  //         isPaid: is25thOrLater,
  //         netSalary: netSalary,
  //         partialPayment: !is25thOrLater,
  //         fullMonthSalary: fullMonthSalary,
  //       };

  //       console.log("Salary data:", data);

  //       axios
  //         .post(
  //           "http://localhost:5000/api/salesAndFinance/finance/salary",
  //           data
  //         )
  //         .then((response) => {
  //           setEmpSalID(response.data.id);
  //           Swal.fire(
  //             "Success!",
  //             "Salary record has been successfully saved.",
  //             "success"
  //           );

  //           // Save salary payment transaction
  //           handleSaveTransactionRecord({
  //             date: data.payment_date,
  //             type: "expense",
  //             subtype: "Salary payment",
  //             amount: netSalary,
  //             description: `${data.emp_name}'s salary from ${data.salary_start_date} to ${data.salary_end_date}`,
  //             payer_payee: data.emp_name,
  //             method: "Automated Entry",
  //           });

  //           // Save ETF contribution transaction if applicable
  //           if (etfContribution > 0) {
  //             handleSaveTransactionRecord({
  //               date: data.payment_date,
  //               type: "expense",
  //               subtype: "ETF Contribution",
  //               amount: etfContribution,
  //               description: `${data.emp_name}'s ETF Contribution for ${data.emp_name}`,
  //               payer_payee: "ETF Board",
  //               method: "Automated Entry",
  //             });
  //           }

  //           navigate("/salesAndFinance/finance/employeeSalary");
  //           setAlreadyPaid(is25thOrLater);
  //         })
  //         .catch((error) => {
  //           Swal.fire("Error!", "Salary record saving failed.", "error");
  //           console.error("Error occurred while saving salary record:", error);
  //         });
  //     } else {
  //       Swal.fire("Cancelled", "Salary payment was not processed", "info");
  //     }
  //   });
  // };

  const calculateSalaryDetails = useCallback(() => {
    const today = moment(payment_date);
    const isBeforeMiddleOfMonth = today.date() < 15;
    const isBefore25th = today.date() < 25;

    const hourlyRate = basic_rate / (25 * 8);
    const basicSalary = basic_rate;
    const saturdayOT = saturday_hours * hourlyRate * 1.5;
    const sundayOT = sunday_hours * hourlyRate * 2;
    const afterHoursOT = after_hours * hourlyRate * 1.5;
    const totalOT = saturdayOT + sundayOT + afterHoursOT;
    const fullMonthTotal = basicSalary + Number(bonus_salary) + totalOT;

    let epfDeduction = 0;
    let etfContribution = 0;
    let netSalary = fullMonthTotal;

    if (!isBefore25th || (partialPayment && !isBeforeMiddleOfMonth)) {
      epfDeduction = basicSalary * epfRate;
      etfContribution = basicSalary * etfRate;
      netSalary -= epfDeduction;
    }

    if (isBefore25th) {
      if (isBeforeMiddleOfMonth) {
        const daysInMonth = today.daysInMonth();
        const daysPassed = today.date();
        netSalary = (fullMonthTotal / daysInMonth) * daysPassed;
      } else {
        netSalary = Math.min(netSalary, basicSalary / 2);
      }
    }

    if (partialPayment) {
      netSalary = fullMonthTotal - paidAmount - epfDeduction;
    }

    return {
      fullMonthSalary: fullMonthTotal,
      epfDeduction,
      etfContribution,
      netSalary,
    };
  }, [
    payment_date,
    basic_rate,
    saturday_hours,
    sunday_hours,
    after_hours,
    bonus_salary,
    partialPayment,
    paidAmount,
    epfRate,
    etfRate,
  ]);

  // Add this useEffect to update salaryDetails when relevant inputs change
  useEffect(() => {
    const newSalaryDetails = calculateSalaryDetails();
    setSalaryDetails(newSalaryDetails);
  }, [
    calculateSalaryDetails,
    payment_date,
    basic_rate,
    saturday_hours,
    sunday_hours,
    after_hours,
    bonus_salary,
    partialPayment,
    paidAmount,
    epfRate,
    etfRate,
  ]);

  const handleSaveSalaryRecord = async (e) => {
    e.preventDefault();
    const today = moment(payment_date);
    const dayOfMonth = today.date();
    const isMiddleOfMonth = dayOfMonth >= 15;
    const is25thOrLater = dayOfMonth >= 25;

    if (alreadyPaid && !is25thOrLater) {
      enqueueSnackbar(
        "Early salary payment has already been processed this month.",
        { variant: "warning" }
      );
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
        const salaryDetails = calculateSalaryDetails();

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
          saturday_hours,
          sunday_hours,
          ot_rate: basic_rate / 240,
          epf_deduction: salaryDetails.epfDeduction,
          etf_contribution: salaryDetails.etfContribution,
          description,
          isPaid: is25thOrLater,
          netSalary: salaryDetails.netSalary,
          partialPayment: !is25thOrLater,
          fullMonthSalary: salaryDetails.fullMonthSalary,
        };

        console.log("Salary data:", data);

        axios
          .post(
            "http://localhost:5000/api/salesAndFinance/finance/salary",
            data
          )
          .then((response) => {
            setEmpSalID(response.data.id);
            Swal.fire(
              "Success!",
              "Salary record has been successfully saved.",
              "success"
            );

            // Save salary payment transaction
            handleSaveTransactionRecord({
              date: data.payment_date,
              type: "expense",
              subtype: "Salary payment",
              amount: salaryDetails.netSalary,
              description: `${data.emp_name}'s salary from ${data.salary_start_date} to ${data.salary_end_date}`,
              payer_payee: data.emp_name,
              method: "Automated Entry",
            });

            // Save ETF contribution transaction
            handleSaveTransactionRecord({
              date: data.payment_date,
              type: "expense",
              subtype: "ETF Contribution",
              amount: salaryDetails.etfContribution,
              description: `ETF Contribution for ${data.emp_name}`,
              payer_payee: "ETF Board",
              method: "Automated Entry",
            });

            navigate("/salesAndFinance/finance/employeeSalary");
            setAlreadyPaid(is25thOrLater);
          })
          .catch((error) => {
            Swal.fire("Error!", "Salary record saving failed.", "error");
            console.error("Error occurred while saving salary record:", error);
          });
      } else {
        Swal.fire("Cancelled", "Salary payment was not processed", "info");
      }
    });
  };

  const handleSaveTransactionRecord = (transactionData) => {
    axios
      .post(
        "http://localhost:5000/api/salesAndFinance/finance/transaction",
        transactionData
      )
      .then(() => {
        message.success("Transaction record has automatically saved.");
      })
      .catch((error) => {
        message.error("Automatic Transaction record saving failed.");
        console.error("Transaction auto save error:", error);
      });
  };

  const handleBonusSalaryChange = (e) => {
    const input = e.target.value;

    console.log("input", input);

    // Remove non-numeric and negative characters
    const filteredValue = input.replace(/[^0-9.]/g, "");
    const bonusValue = parseFloat(filteredValue);

    // Check for invalid input and set errors
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
      setBonusSalary(bonusValue);
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
        setBlockFields({
          ...blockFields,
          bonus_salary: true,
          submit: true,
        });
      } else {
        setDisplayError(false);
        setRemarkError("");
        setDescription(filteredValue);
        setBlockFields({
          ...blockFields,
          bonus_salary: false,
          submit: false,
        });
      }
    }
  };

  const handleDateChange = (date) => {
    setPaymentDate(date.format("YYYY-MM-DD"));
    setBlockFields({
      ...blockFields,
      description: false,
    });
  };

  return (
    <div className="flex flex-row border-t">
      <div
        className="w-2/5 h-screen overflow-scroll bg-white border-r rounded-md mb-14 overscroll-auto bottom-14 scroll-smooth"
        id="employeelist"
      >
        <h1 className="pl-8 mt-0 text-2xl font-semibold text-black">
          Employee List
        </h1>
        <ul role="list" className="divide-y divide-gray-300">
          {RegistrationRecords.map((person) => (
            <li key={person._id} className={``}>
              <label
                htmlFor={person._id}
                className={`py-1 px-4 flex hover:bg-lime-200 transition-all hover:shadow-xl duration-200 justify-between gap-x-4 gap-y-4 rounded-full ${
                  selectedID === person._id
                    ? "bg-lime-300 border-l-4 border-lime-600 shadow-xl rounded-full"
                    : ""
                }`}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex-auto min-w-0">
                    <p className="font-semibold leading-6 text-black text-md">
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

      <div className="w-full h-screen max-w-4xl p-6 mx-auto mb-96">
        <form onSubmit={handleSaveSalaryRecord} className="space-y-6">
          <h1 className="font-semibold text-black ">
            Salary Processing Section
          </h1>
          <p className="text-sm text-gray-500">
            Fill in the details to process the salary for the selected employee.
          </p>
          <Link to="/salesAndFinance/finance/viewSalaryRecord">
            <button className="float-right pt-2 pb-2 pl-8 pr-8 text-white rounded-lg bg-lime-600 text-md hover:bg-lime-700">
              View Salary Records
            </button>
          </Link>
          <hr className="border-gray-300" />

          {alreadyPaid && partialPayment ? (
            <p className="w-full ml-8 text-lg text-red-600">
              Salary already paid for this month
            </p>
          ) : (
            <div className="grid w-full gap-4 gid-cols-1 md:grid-cols-2">
              {partialPayment && (
                <p className="w-full ml-5 text-lg text-orange-600">
                  Early salary payment of {paidAmount.toFixed(2)} has already
                  been processed this month. Remaining salary will be adjusted
                  accordingly.
                </p>
              )}
              {/* Row 1: Employee Name, Type */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                {/* Employee Name */}
                <div>
                  <label
                    htmlFor="emp_name"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="emp_name"
                    value={emp_name}
                    disabled
                    className="w-full px-4 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                {/* Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={type}
                    disabled
                    className="w-full px-4 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
              </div>

              {/* Row 2: Date Range, Basic Days */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
                  />
                  <p className="mb-0 text-xs text-orange-600">
                    Calculated by analyzing attendance records. Do not change
                    unless the employee failed to mark attendance on a present
                    day.
                  </p>
                </div>
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
                  // onChange={(date) => setPaymentDate(date)}
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current &&
                    (current < moment(oneWeekBefore) || current > moment())
                  }
                  className="block w-full h-8 p-2 mt-2 text-base text-black bg-white border-black border-gray-900 rounded-md shadow-sm focus:ring-lime-600 focus:border-lime-600"
                />
              </div>

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
                  onChange={handleRemarkChange}
                  className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  disabled={blockFields.description}
                />
                {displayError && (
                  <p className="mt-1 text-xs text-red-600">{remarkError}</p>
                )}
              </div>

              {/* Row 3: Basic Rate, Bonus Salary */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
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
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
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
                    // onChange={(e) => setBonusSalary(e.target.value)}
                    onChange={handleBonusSalaryChange}
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled={blockFields.bonus_salary}
                  />
                  {displayError && (
                    <p className="mt-1 text-xs text-red-600">{bonusError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
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
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
                  />
                </div>

                {/* Row 4: Saturday and Sunday OT Hours */}
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
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
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
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
                  />
                </div>
              </div>

              {/* Row 5: EPF/ETF, Payment Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="epf_etf"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    EPF (Employee Contribution)
                  </label>
                  <input
                    type="number"
                    name="epf_rate"
                    value={epfRate * 100}
                    onChange={(e) =>
                      setEpfRate(parseFloat(e.target.value) / 100)
                    }
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Employee contribution percentage (default: 8%)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="etf_rate"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    ETF (Employer Contribution)
                  </label>
                  <input
                    type="number"
                    name="etf_rate"
                    value={etfRate * 100}
                    onChange={(e) =>
                      setEtfRate(parseFloat(e.target.value) / 100)
                    }
                    className="w-full px-3 py-2 text-base text-black border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Employer contribution percentage (default: 3%)
                  </p>
                </div>
              </div>

              {/* Row 6: Remarks */}
            </div>
          )}
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
                  {salaryDetails.netSalary < 0 ||
                  salaryDetails.netSalary > 1000000 ? (
                    <span className="text-red-500">Invalid salary</span>
                  ) : (
                    <>
                      <span className="text-xl text-lime-600">
                        {salaryDetails.netSalary.toFixed(2)}
                      </span>
                      {partialPayment && (
                        <span className="ml-2 text-sm text-orange-600">
                          (Adjusted for early payment)
                        </span>
                      )}
                    </>
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
    </div>
  );
}
