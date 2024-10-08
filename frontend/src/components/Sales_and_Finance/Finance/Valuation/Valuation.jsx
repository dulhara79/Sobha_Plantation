import React, { useEffect, useState } from "react";
// import SideBar from "../../../components/SideBar";
// import Navbar from "../../../../components/Sales_and_Finance/NavigationButtons";
// import FinanceNavigation from "../../../components/finances/FinanceNavigation";
// import BackButton from "../../../components/utility/BackButton";
// import Breadcrumb from "../../../components/utility/Breadcrumbs";

import {
  ArrowDownTrayIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  ChevronDownIcon,
  HomeModernIcon,
  RectangleGroupIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import {
  GiFruitBowl,
  GiPayMoney,
  GiReceiveMoney,
  GiTwoCoins,
  GiWaterTank,
} from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { Button, DatePicker, message, Popover, Radio } from "antd";
import FinanceValuationStatBar from "../../../../components/Sales_and_Finance/Finance/FinanceValuationStatusBar";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import {useKindeAuth} from "@kinde-oss/kinde-auth-react";

export default function Valuation() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [ValuationRecords, setValuationRecords] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // const {getPermission, getPermissions} = useKindeAuth();
  const [machineRecords, setMachineRecords] = useState([]);

  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedDates, setSelectedDates] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const breadcrumbItems = [
    { name: "Finance", href: "/finances" },
    { name: "Valuation", href: "/finances/valuation" },
  ];

  const formattedDate = (date) => new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/salesAndFinance/finance/valuation/")
      .then((response) => {
        setValuationRecords(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteValuation = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this valuation record?"
    );
    if (confirmDelete) {
      setLoading(true);
      axios
        .delete(
          `http://localhost:5000/api/salesAndFinance/finance/valuation/${id}`
        )
        .then(() => {
          setValuationRecords((prevRecords) =>
            prevRecords.filter((record) => record._id !== id)
          );
          message.success("Valuation record has been successfully deleted.");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error("Valuation record deletion failed.");
          console.log(error);
        });
    }
  };

  const subtypeBorderColorMap = {
    Land: "border-lime-400",
    Machinery: "border-green-400",
    Crops: "border-teal-400",
    Infrastructure: "border-cyan-400",
    Utilities: "border-sky-400",
    Water: "border-blue-400",
    Loans: "border-rose-400",
    Debts: "border-red-400",
    Leases: "border-pink-400",
    Taxes: "border-violet-400",
  };

  function getBorderColorClass(subtype) {
    return subtypeBorderColorMap[subtype] || "border-gray-200"; // Default color
  }

  const sortedRecords = [...ValuationRecords].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  const filteredValuationRecords = sortedRecords.filter((record) => {
    // Convert all values to lowercase for case-insensitive search
    const searchTerm = searchQuery;

    // Check if any field in the record contains the search query
    return Object.values(record).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchTerm)
    );
  });

  const handleSortBy = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("date");
    setSortOrder("asc");
  };

  const handleClearSorting = () => {
    setSearchQuery(""); // Reset search query
    setSortBy("");
    setSortOrder("asc");
  };

  const handleDownloadPDF = () => {
    const sortedRecords = ValuationRecords.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
    });

    const filteredRecords = sortedRecords.filter((valuation) => {
      const transactionDate = new Date(valuation.date);
      return (
        transactionDate >= selectedDates[0] &&
        transactionDate <= selectedDates[1]
      );
    });

    const doc = new jsPDF();
    doc.text("Valuation Records Report", 10, 10);

    const headers = [
      [
        "Date",
        "Type",
        "Subtype",
        "Quantity",
        "Price",
        "Description",
        "Payer Payee",
        "Percentage %",
        "Value",
      ],
    ];
    const data = filteredRecords.map((valuation) => [
      valuation.date,
      valuation.type,
      valuation.subtype,
      valuation.quantity,
      valuation.price,
      valuation.description,
      valuation.payer_payee,
      valuation.appreciationOrDepreciation,
      valuation.quantity * valuation.price,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save("valuation_records_report.pdf");
  };

  return (
    <div className={`w-[1219px]`}>
      {/* Navbar */}
      <div className="sticky top-0 z-10"></div>
      <div className="">
        <div className="grid sm:grid-cols-6 ">
          <div className="sticky top-0 left-0 col-span-1 "></div>

          <div className="flex flex-col w-full col-span-5 ">
            <div className="flex flex-row ">
              {/* <BackButton/> */}
              {/* <Breadcrumb items={breadcrumbItems}/> */}
            </div>
            <FinanceValuationStatBar />

            <div>
              <div className="flex flex-row items-center justify-between px-8 py-4">
                <div>
                  <h1 className="text-lg font-semibold text-left ">
                    Valuation records
                  </h1>
                  <p className="mt-1 text-sm font-normal text-gray-500 0">
                    Browse a list of all assets and liabilities stored in the
                    system
                  </p>
                </div>

                <div>
                  <Link
                    to="/salesAndFinance/finance/add-new-valuation"
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Add new record <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex flex-row w-full bg-gray-200 h-72">
                <button
                  value="land"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden h-full bg-lime-100 flex flex-col justify-between items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle">
                    <div className="w-8 h-8">
                      <RectangleGroupIcon />
                    </div>
                    <dd className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Land
                    </dd>
                  </div>
                </button>
                <button
                  value="machinery"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className=" w-full overflow-hidden bg-green-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <span className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <TruckIcon />
                    </div>

                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Machinery
                    </div>
                  </span>
                </button>
                <button
                  value="crops"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-teal-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <GiFruitBowl className="w-full h-full" />
                    </div>

                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Crops
                    </div>
                  </div>
                </button>
                <button
                  value="infrastructure"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-cyan-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <HomeModernIcon />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Infrastructure
                    </div>
                  </div>
                </button>
                <button
                  value="utilities"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-sky-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <MdElectricalServices className="w-full h-full" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Utilities
                    </div>
                  </div>
                </button>
                <button
                  value="loans"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-rose-200 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <GiReceiveMoney className="w-full h-full" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Loans
                    </div>
                  </div>
                </button>
                <button
                  value="debts"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-red-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <GiPayMoney className="w-full h-full" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Debts
                    </div>
                  </div>
                </button>
                <button
                  value="leases"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-pink-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <FaMoneyCheck className="w-full h-full" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Leases
                    </div>
                  </div>
                </button>
                <button
                  value="taxes"
                  onClick={(e) => setSearchQuery(e.target.value)}
                  className="w-full overflow-hidden bg-violet-100 flex justify-center items-center hover:w-[120%] hover:h-[105%] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center content-center justify-between h-full pt-8 pb-8 align-middle ">
                    <div className="w-8 h-8">
                      <GiTwoCoins className="w-full h-full" />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 sm:text-xl [writing-mode:vertical-lr] rotate-180">
                      Taxes
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex justify-start w-full px-8 py-4 ">
                <div className="relative py-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search all records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 pl-10 pr-4 text-sm border border-gray-300 rounded-full w-fit"
                    style={{ paddingRight: "" }}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setSearchQuery("")}
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                    </button>
                  )}
                </div>

                <div className="relative flex items-center px-4 space-x-4">
                  <button
                    className="flex items-center px-4 py-1 space-x-1 rounded-full cursor-pointer bg-lime-200 hover:bg-lime-400"
                    onClick={() => handleSortBy("date")}
                  >
                    <span className="text-sm text-gray-600">Date</span>
                    {sortBy === "date" &&
                      (sortOrder === "asc" ? (
                        <ChevronUpIcon className="w-4 h-4 text-white bg-green-800 rounded-full stroke-2" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-white bg-green-800 rounded-full stroke-2" />
                      ))}
                  </button>

                  <button
                    className="flex items-center p-1 space-x-1 rounded-full cursor-pointer bg-rose-200 hover:bg-red-400"
                    onClick={handleClearSorting}
                  >
                    <XMarkIcon className="w-4 h-4 " />
                  </button>

                  <div>
                    <Button
                      shape="round"
                      className="flex flex-row items-center gap-2 font-semibold text-gray-700 border-none bg-amber-200 hover:bg-amber-500"
                      onClick={() => setPopoverVisible(true)}
                    >
                      Download PDF Report{" "}
                      <ArrowDownTrayIcon className="self-center w-4 h-4" />
                    </Button>
                    <Popover
                      content={
                        <div className="text-gray-600">
                          <DatePicker.RangePicker
                            onChange={(dates) => setSelectedDates(dates)}
                          />
                          <div className="flex flex-col py-4 space-y-4">
                            <span>Select sorting criteria:</span>
                            <Radio.Group
                              onChange={(e) => setSortBy(e.target.value)}
                              value={sortBy}
                            >
                              <Radio value="date">Date</Radio>
                            </Radio.Group>
                            <span>Select sorting order:</span>
                            <Radio.Group
                              onChange={(e) => setSortOrder(e.target.value)}
                              value={sortOrder}
                            >
                              <Radio value="asc">Ascending</Radio>
                              <Radio value="desc">Descending</Radio>
                            </Radio.Group>
                          </div>
                          <Button
                            shape="round"
                            className="text-white border-none bg-lime-600 hover:text-lime-600"
                            onClick={handleDownloadPDF}
                          >
                            Download
                          </Button>
                        </div>
                      }
                      title="Select Date Range and Sorting"
                      trigger="click"
                      visible={popoverVisible}
                      onVisibleChange={setPopoverVisible}
                    />
                  </div>
                </div>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-l-4 border-gray-500 shadow-md ">
                <tr className="">
                  <th></th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subtype
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payer/Payee
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Percentage
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Value
                  </th>
                  <th scope="col" className="py-3 ">
                    <span className="sr-only">Info</span>
                  </th>
                  <th scope="col" className="py-3 ">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="py-3 ">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="border-b border-gray-200">
                {filteredValuationRecords.length > 0 ? (
                  filteredValuationRecords.map((record, index) => (
                    <tr
                      key={record._id}
                      className={`divide-y border-l-4 ${getBorderColorClass(
                        record.subtype
                      )}`}
                    >
                      <td></td>
                      <td className="px-6 py-4">
                        {formattedDate(record.date)}
                      </td>
                      <td className="px-6 py-4">{record.type}</td>
                      <td className="px-6 py-4">{record.subtype}</td>
                      <td className="px-6 py-4">{record.quantity}</td>
                      <td className="px-6 py-4">
                        Rs.{record.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{record.description}</td>
                      <td className="px-6 py-4">{record.payer_payee}</td>
                      <td className="px-6 py-4">
                        {record.appreciationOrDepreciation}
                      </td>
                      <td className="px-4 py-4">
                        <div className="py-1 text-center text-black rounded-full bg-zinc-200 hover:bg-zinc-400">
                          Rs.{(record.quantity * record.price).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 text-right ">
                        <Link
                          to={`/finances/valuation/viewValuation/${record._id}`}
                        >
                          <InformationCircleIcon
                            className="flex-none w-6 h-6 p-1 text-gray-800 bg-gray-200 rounded-full hover:bg-gray-500"
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                      {/* { getPermission("update:records").isGranted ? ( */}
                      <td className="py-4 text-right ">
                        <Link to={`/salesAndFinance/finance/edit-valuation/${record._id}`}>
                          <PencilSquareIcon
                            className="flex-none w-6 h-6 p-1 text-gray-800 bg-blue-200 rounded-full hover:bg-blue-500"
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                      {/* ) : null
                                    } */}
                      {/* { getPermission("update:records").isGranted ? ( */}
                      <td className="">
                        <Button
                          shape="circle"
                          type="text"
                          onClick={() => {
                            handleDeleteValuation(record._id);
                          }}
                        >
                          <TrashIcon
                            className="flex-none w-6 h-6 p-1 text-gray-800 bg-red-200 rounded-full hover:bg-red-500"
                            aria-hidden="true"
                          />
                        </Button>
                      </td>

                      {/* ) : null
                                        } */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="py-4 text-center">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
