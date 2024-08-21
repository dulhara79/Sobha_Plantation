import { useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import Template from "../../components/Template";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const FinanceValuationDashboardT = () => {
  const navigate = useNavigate();

  const onIonchevronBackCircleIconClick = useCallback(() => {
    navigate("/finance-dashboard-template");
  }, [navigate]);

  const onRectangleClick = useCallback(() => {
    navigate("/sales-and-finance-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/sales-dashboard-template");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <Template
        rectangleDivAlignSelf="stretch"
        rectangleDivWidth="unset"
        image13="/image-12@2x.png"
      />
      <main className="w-[1477px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border gap-[52px] max-w-full mq750:gap-[26px] mq1050:pl-5 mq1050:box-border">
        <Sidebar />
        <section className="flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border max-w-[calc(100%_-_358px)] text-center text-lg text-black font-roboto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[49px] max-w-full mq750:gap-6">
            <div className="w-[919px] flex flex-row items-start justify-start pt-0 px-[5px] pb-1.5 box-border max-w-full text-left text-5xl text-white">
              <div className="flex flex-row flex-wrap items-start justify-start flex-1 max-w-full gap-5">
                <img
                  className="h-[35px] w-[38px] relative overflow-hidden shrink-0 cursor-pointer"
                  loading="lazy"
                  alt=""
                  src="/ionchevronbackcircle.svg"
                  onClick={onIonchevronBackCircleIconClick}
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[553px] max-w-full mq750:min-w-full">
                  <div className="flex flex-col items-start self-stretch justify-start max-w-full gap-7">
                    <div className="w-[743px] flex flex-col items-start justify-start gap-[41px] max-w-full mq750:gap-5">
                      <div className="flex flex-row items-start justify-start gap-[29px] max-w-full mq450:flex-wrap">
                        <div className="h-[31px] w-[104px] relative">
                          <img
                            className="absolute top-[0px] left-[0px] rounded-41xl w-full h-full cursor-pointer"
                            loading="lazy"
                            alt=""
                            src="/rectangle-1073.svg"
                            onClick={onRectangleClick}
                          />
                          <a className="[text-decoration:none] absolute top-[2px] left-[20px] font-bold text-[inherit] inline-block min-w-[65px] z-[1] mq450:text-lgi">
                            Home
                          </a>
                        </div>
                        <div
                          className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex flex-row items-start justify-start pt-0 px-[18px] pb-[3px] cursor-pointer"
                          onClick={onGroupContainerClick}
                        >
                          <img
                            className="h-[31px] w-[98px] relative rounded-41xl hidden"
                            alt=""
                            src="/rectangle-10836.svg"
                          />
                          <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[62px] z-[1] mq450:text-lgi">
                            Sales
                          </a>
                        </div>
                        <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-teal flex flex-row items-start justify-start pt-px px-5 pb-0.5">
                          <img
                            className="h-[31px] w-[127px] relative rounded-41xl hidden"
                            alt=""
                            src="/rectangle-10837.svg"
                          />
                          <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[85px] z-[1] mq450:text-lgi">
                            Finance
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-row items-start self-stretch justify-end max-w-full text-xl text-gray-1500">
                        <div className="w-[575px] flex flex-row items-start justify-start py-0 pl-5 pr-0 box-border gap-[51px] max-w-full mq750:flex-wrap mq750:gap-[25px]">
                          <div className="flex-1 flex flex-row items-end justify-start gap-[19px] min-w-[223px] max-w-full mq450:flex-wrap">
                            <TextField
                              className="[border:none] bg-[transparent] h-[35px] flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] font-roboto text-xs text-gray-400 min-w-[195px]"
                              placeholder="Search..."
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <img
                                    width="22px"
                                    height="21px"
                                    src="/search.svg"
                                  />
                                ),
                              }}
                              sx={{
                                "& fieldset": { border: "none" },
                                "& .MuiInputBase-root": {
                                  height: "35px",
                                  backgroundColor: "rgba(234, 234, 234, 0.47)",
                                  paddingRight: "13px",
                                  borderRadius: "50px",
                                  fontSize: "12px",
                                },
                                "& .MuiInputBase-input": { color: "#868686" },
                              }}
                            />
                            <div className="flex flex-col items-start justify-end px-0 pt-0 pb-1">
                              <img
                                className="relative w-6 h-6"
                                loading="lazy"
                                alt=""
                                src="/filter.svg"
                              />
                            </div>
                          </div>
                          <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-mini bg-gray-200 overflow-x-auto flex flex-row items-start justify-start pt-[3px] pb-0.5 pl-[18px] pr-2.5 gap-[5px]">
                            <img
                              className="h-[30px] w-[30px] relative overflow-hidden shrink-0 min-h-[30px]"
                              alt=""
                              src="/bxsort.svg"
                            />
                            <div className="flex flex-col items-start justify-start px-0 pt-px pb-0">
                              <div className="relative inline-block min-w-[63px] mq450:text-base">{`Sort by `}</div>
                            </div>
                            <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
                              <img
                                className="w-[30px] h-5 relative overflow-hidden shrink-0 object-contain"
                                alt=""
                                src="/weuiarrowoutlined1@2x.png"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-start self-stretch justify-end max-w-full text-center text-black">
                      <div className="w-[759px] shadow-[0px_4px_3px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(89.88deg,_#fff_20%,_rgba(167,_255,_188,_0.8)_40%,_#fff_60%,_rgba(255,_191,_191,_0.8)_80%,_#fff)] flex flex-row items-start justify-start pt-[74px] px-[3px] pb-[27px] box-border gap-[149px] max-w-full mq450:gap-[37px] mq750:flex-wrap mq750:gap-[74px]">
                        <img
                          className="h-[193px] w-[759px] relative rounded-xl hidden max-w-full"
                          alt=""
                          src="/rectangle-10721.svg"
                        />
                        <div className="w-[367px] flex flex-row items-start justify-start gap-[49px] max-w-full mq450:flex-wrap mq450:gap-6">
                          <div className="flex-1 flex flex-col items-start justify-start gap-[33px] min-w-[103px]">
                            <div className="flex flex-row items-start justify-start py-0 px-[51px]">
                              <div className="relative font-medium inline-block min-w-[14px] z-[1] mq450:text-lgi">
                                8
                              </div>
                            </div>
                            <div className="self-stretch relative font-medium z-[1] mq450:text-lgi">
                              Total records
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col items-start justify-start gap-[33px] min-w-[103px]">
                            <div className="flex flex-row items-start justify-start px-1 py-0">
                              <div className="relative z-[1] mq450:text-lgi">
                                <b>{`LKR. `}</b>
                                <span className="font-medium">500000</span>
                              </div>
                            </div>
                            <div className="self-stretch relative font-medium z-[1] mq450:text-lgi">
                              Assets
                            </div>
                          </div>
                        </div>
                        <div className="w-[169px] flex flex-col items-start justify-start gap-[33px]">
                          <b className="relative z-[1] mq450:text-lgi">
                            LKR. 300000
                          </b>
                          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-2.5 pr-0">
                            <div className="flex-1 relative font-medium z-[1] mq450:text-lgi">
                              Liabilities
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1069px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
              <div className="w-[617px] flex flex-row items-start justify-center gap-[15.5px] max-w-full mq750:flex-wrap">
                <div className="flex-[0.8732] rounded-3xs bg-limegreen flex flex-col items-start justify-start pt-[23.6px] pb-[39.4px] pl-[25px] pr-6 box-border gap-[55px] min-w-[72px] mq450:flex-1">
                  <div className="w-[111px] h-[177px] relative rounded-3xs bg-limegreen hidden" />
                  <div className="flex flex-row items-start justify-start py-0 pl-px pr-[5px]">
                    <img
                      className="h-[49.2px] w-[55.5px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/group-2927.svg"
                    />
                  </div>
                  <div className="self-stretch h-[9.8px] relative font-semibold inline-block shrink-0 z-[1]">
                    Lands
                  </div>
                </div>
                <div className="flex-[0.8028] rounded-3xs bg-limegreen flex flex-col items-end justify-start pt-[16.7px] px-[27px] pb-[39.3px] box-border gap-[58px] min-w-[72px] mq450:flex-1">
                  <div className="w-[111px] h-[177px] relative rounded-3xs bg-limegreen hidden" />
                  <img
                    className="w-[55.5px] h-[49.2px] relative z-[1]"
                    loading="lazy"
                    alt=""
                    src="/tree.svg"
                  />
                  <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[3px] pr-px">
                    <div className="flex-1 relative leading-[13.8px] font-semibold z-[1]">
                      Crops
                    </div>
                  </div>
                </div>
                <div className="flex-[0.9577] rounded-3xs bg-pink flex flex-col items-start justify-start pt-[19.7px] pb-[40.3px] pl-[22px] pr-[21px] box-border gap-[55px] min-w-[72px] mq450:flex-1">
                  <div className="w-[111px] h-[177px] relative rounded-3xs bg-pink hidden" />
                  <div className="flex flex-row items-start justify-start py-0 pl-[5px] pr-[7px]">
                    <img
                      className="h-[49.2px] w-[55.5px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/group-2928.svg"
                    />
                  </div>
                  <div className="self-stretch h-[12.8px] relative font-semibold inline-block shrink-0 z-[1]">
                    Loans
                  </div>
                </div>
                <div className="rounded-3xs bg-pink flex flex-col items-start justify-start pt-[16.7px] pb-[43.2px] pl-7 pr-6 gap-[55.1px]">
                  <div className="w-[111px] h-[177px] relative rounded-3xs bg-pink hidden" />
                  <div className="flex flex-row items-start justify-start py-0 pl-0.5 pr-px">
                    <img
                      className="h-[49.2px] w-[55.5px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/group-2929.svg"
                    />
                  </div>
                  <div className="w-[54.4px] h-[12.8px] relative font-semibold inline-block shrink-0 z-[1]">
                    Taxes
                  </div>
                </div>
                <div className="flex-1 rounded-3xs bg-pink flex flex-col items-end justify-start pt-[20.6px] px-5 pb-[34.4px] box-border gap-[55.1px] min-w-[72px]">
                  <div className="w-[111px] h-[177px] relative rounded-3xs bg-pink hidden" />
                  <div className="flex flex-row items-start justify-end py-0 pl-[11px] pr-1">
                    <img
                      className="h-[49.2px] w-[55.5px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/group-2930.svg"
                    />
                  </div>
                  <div className="self-stretch relative leading-[17.7px] font-semibold inline-block min-w-[69.9px] z-[1]">
                    Utilities
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-end justify-start pt-[21px] pb-[190px] pl-[35px] pr-12 box-border relative gap-[29px] max-w-full lg:pr-6 lg:box-border">
              <div className="self-stretch rounded-8xs bg-gainsboro-100 flex flex-row items-start justify-between pt-1.5 pb-[5px] pl-3 pr-[23px] box-border max-w-full gap-5 z-[1] mq1050:flex-wrap mq1050:justify-center">
                <div className="h-[53px] w-[1016px] relative rounded-8xs bg-gainsboro-100 hidden max-w-full" />
                <div className="relative font-semibold z-[2]">
                  <p className="m-0">Transaction</p>
                  <p className="m-0">ID</p>
                </div>
                <div className="w-[58px] relative font-semibold inline-block z-[2]">
                  <p className="m-0">{`Date & `}</p>
                  <p className="m-0">Time</p>
                </div>
                <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[11px]">
                  <div className="relative font-semibold z-[2]">
                    <p className="m-0">Transaction</p>
                    <p className="m-0">Type</p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[11px] pb-0 pl-0 pr-3">
                  <div className="relative font-semibold inline-block min-w-[74px] z-[2]">
                    Category
                  </div>
                </div>
                <div className="relative font-semibold z-[2]">
                  <p className="m-0">Payment</p>
                  <p className="m-0">Method</p>
                </div>
                <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                  <div className="relative font-semibold inline-block min-w-[93px] z-[2]">
                    Description
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                  <div className="relative font-semibold inline-block min-w-[103px] z-[2]">
                    Payer/Payee
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
                  <div className="relative font-semibold inline-block min-w-[64px] z-[2]">
                    Amount
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[49px] pr-[41px] box-border max-w-full text-left text-xs mq1050:pl-6 mq1050:box-border">
                <div className="flex flex-row items-start justify-between flex-1 max-w-full gap-5 mq1050:flex-wrap">
                  <div className="w-[52px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                    <div className="relative inline-block min-w-[21px] z-[1]">
                      001
                    </div>
                  </div>
                  <div className="w-[174px] flex flex-row items-start justify-start py-0 pl-0 pr-[7px] box-border gap-12">
                    <div className="relative z-[1]">
                      <p className="m-0">18-12-2022</p>
                      <p className="m-0">07:13:41</p>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                      <div className="relative inline-block min-w-[58px] z-[1]">
                        expensess
                      </div>
                    </div>
                  </div>
                  <div className="w-[61px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                    <div className="relative inline-block min-w-[27px] z-[1]">
                      Loan
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                    <div className="flex flex-row items-start justify-start gap-[35px]">
                      <div className="relative inline-block min-w-[76px] z-[1]">
                        bank deposite
                      </div>
                      <div className="relative inline-block min-w-[104px] z-[1]">
                        December payment
                      </div>
                    </div>
                  </div>
                  <div className="w-40 flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border">
                    <div className="flex flex-row items-start self-stretch justify-between gap-5">
                      <div className="relative inline-block min-w-[88px] z-[1]">
                        Commarial bank
                      </div>
                      <div className="relative inline-block min-w-[41px] z-[1]">
                        120567
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[572px] absolute !m-[0] right-[0px] bottom-[-251px] left-[0px]">
                <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.2)] rounded-xl bg-snow w-full h-full" />
                <img
                  className="absolute top-[109px] left-[1059px] w-[17px] h-[17px] z-[1]"
                  loading="lazy"
                  alt=""
                  src="/info-icon.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinanceValuationDashboardT;
