import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import {
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import axios from "axios";
import {Popover} from "antd";

export default function FinanceValuationStatBar() {

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [netValue, setNetValue] = useState(0);
  const [futureNetValue, setFutureNetValue] = useState(0); // New state for future

  useEffect(() => {
      // Fetch total records from your API or set it from somewhere
      axios.get('http://localhost:5000/api/salesAndFinance/finance/valuation/')
          .then(response => {
              setTotalRecords(response.data.data);

              let assets = 0;
              let liabilities = 0;
              let futureAssets = 0;
              let futureLiabilities = 0;

              console.log('Valuation data: ', response.data.data);

              response.data.data.forEach(valuation => {
                  const currentVal = valuation.price * valuation.quantity;
                  const appreciationFactor = Math.pow(1 + valuation.appreciationOrDepreciation / 100, 5); // Compound appreciation or depreciation over 5 years

                  if (valuation.type === "asset") {
                      assets += currentVal;
                      futureAssets += currentVal * appreciationFactor;
                  } else if (valuation.type === "liability") {
                      liabilities += currentVal;
                      futureLiabilities += currentVal * appreciationFactor;
                  }
              });

              setTotalAssets(assets);
              setTotalLiabilities(liabilities);
              setNetValue(assets - liabilities);
              setFutureNetValue(futureAssets - futureLiabilities); // Calculate future net worth

              console.log('Total assets: ', assets);
                console.log('Total liabilities: ', liabilities);
                console.log('Net worth: ', assets - liabilities);
          })
          .catch(error => {
              console.error('Error fetching total records: ', error);
          });
  }, []);

  const renderProfitLoss = (profitOrLoss) => {
      // Convert the formatted string back to a number
      const profitOrLossNumber = parseFloat(profitOrLoss.replace(/,/g, ''));
      const colorClass = profitOrLossNumber >= 0 ? 'text-lime-500' : 'text-red-600';
      return <span className={`${colorClass} text- font-semibold tracking-tight sm:text-3xl`}>Rs.{profitOrLoss}</span>;
  };

  return (
      <div className="relative w-full py-10 overflow-hidden sm:py-8">
          {/* Additional divs and elements for styling omitted for brevity */}
          <div
              className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/4 transform-gpu blur-2xl"
              aria-hidden="true"
          >
              <div
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-rose-600 to-lime-400 opacity-30"
                  style={{
                      clipPath:
                          'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                  }}
              />
          </div>
          <div
              className="absolute left-[max(45rem,calc(50%+8rem))] top-1/4 -z-10 -translate-y-1/2 -translate-x-1/4 transform-gpu blur-2xl"
              aria-hidden="true"
          >
              <div
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-yellow-600 to-lime-300
       opacity-30"
                  style={{
                      clipPath:
                          'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                  }}
              />
          </div>

          <div className="flex flex-row">
              <div className="relative flex flex-row w-full px-6 mx-auto lg:px-8 ">
                  <div className="flex flex-col max-w-xs mx-auto gap-y-1">
                      {/* Transactions this week */}
                      <div className="flex flex-row items-center gap-4">
                          <dd className="text-xl text-black texttracking-tight font-emibold sm:text-3xl">
                              {totalRecords.length}
                          </dd>

                      </div>
                      <dt className="text-xl font-semibold text-black textleading-7">Total Records</dt>
                  </div>

                  <div className="flex flex-col mx-auto gap-y-1">
                      {/* Income this week */}
                      <div className="flex flex-row items-center gap-8">
                          <dd className="text-xl text-black texttracking-tight font-emibold sm:text-3xl">
                              Rs.{totalAssets.toLocaleString()}
                          </dd>

                      </div>
                      <div className="flex flex-row items-center justify-between gap-12">
                          <dt className="text-3xl font-semibold leading-7 text-lime-600">Total Assets</dt>

                      </div>

                  </div>

                  <div className="flex flex-col max-w-xs mx-auto gap-y-1">
                      {/* Expense this week */}
                      <div className="flex flex-row items-center gap-8">
                          <dd className="text-xl text-black texttracking-tight font-emibold sm:text-3xl">
                              Rs.{totalLiabilities.toLocaleString()}
                          </dd>

                      </div>
                      <div className="flex flex-row items-center gap-12">
                          <dt className="text-xl font-semibold text-red-600 textleading-7">Total Liabilities</dt>

                      </div>

                  </div>
                  <div className="flex flex-col max-w-xs mx-auto gap-y-1">
                      {/* Expense this week */}
                      <div className="flex flex-row items-center gap-4">
                          <dd className="text-xl text-black texttracking-tight font-emibold sm:text-3xl">
                              {renderProfitLoss(netValue.toLocaleString())}
                          </dd>
                          {/*{renderProfitLossIcon(profitLoss)}*/}
                      </div>
                      <dt className="text-xl font-semibold text-black textleading-7">Net Worth</dt>
                  </div>
                  {/* <div className="flex flex-col max-w-xs mx-auto gap-y-1"> */}
                      {/* Expense this week */}
                      {/* <div className="flex flex-row items-center gap-4">
                          <dd className="text-xl text-black texttracking-tight font-emibold sm:text-3xl">
                              {renderProfitLoss(Math.round(futureNetValue).toLocaleString())}
                          </dd> */}
                          {/*{renderProfitLossIcon(profitLoss)}*/}
                      {/* </div>
                      <dt className="text-xl text-black textleading-7">Net Worth in 5 Years</dt>
                  </div> */}
              </div>
          </div>

      </div>
  )
}
