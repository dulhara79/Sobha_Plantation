import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import Template from "../../components/Template";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";

const FinanceViewAllRecordDashb = () => {
  const navigate = useNavigate();

  const onIonchevronBackCircleIconClick = useCallback(() => {
    navigate("/finance-dashboard-template");
  }, [navigate]);

  const onHomeTextClick = useCallback(() => {
    navigate("/sales-and-finance-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/sales-dashboard-template");
  }, [navigate]);

  const onGroupButtonClick = useCallback(() => {
    navigate("/finance-add-record-dashboard-template");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <Template
        rectangleDivAlignSelf="stretch"
        rectangleDivWidth="unset"
        image13="/image-12@2x.png"
      />
      <main className="self-stretch flex flex-row items-start justify-start py-0 pl-0 pr-[11px] box-border gap-[51px] max-w-full mq450:gap-[25px] mq1050:pl-5 mq1050:pr-5 mq1050:box-border">
        <Menu customerIcons="/vector-61.svg" />
        <section className="flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border max-w-[calc(100%_-_357px)] text-left text-5xl text-white font-roboto mq1050:max-w-full">
          <div className="flex flex-col items-start self-stretch justify-start max-w-full gap-7">
            <div className="w-[827px] flex flex-row items-start justify-start py-0 px-1.5 box-border max-w-full">
              <div className="flex-1 flex flex-row flex-wrap items-end justify-start gap-[51px] max-w-full mq450:gap-[25px]">
                <div className="flex flex-row items-start justify-start flex-1 max-w-full gap-5 mq450:min-w-full mq750:flex-wrap">
                  <img
                    className="h-[35px] w-[38px] relative overflow-hidden shrink-0 cursor-pointer"
                    loading="lazy"
                    alt=""
                    src="/ionchevronbackcircle.svg"
                    onClick={onIonchevronBackCircleIconClick}
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[354px] max-w-full mq450:min-w-full">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[29px] max-w-full mq450:flex-wrap">
                      <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex flex-row items-start justify-start pt-0.5 pb-px pl-5 pr-[19px]">
                        <img
                          className="h-[31px] w-[104px] relative rounded-41xl hidden"
                          alt=""
                          src="/rectangle-1073.svg"
                        />
                        <a
                          className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[65px] cursor-pointer z-[1] mq450:text-lgi"
                          onClick={onHomeTextClick}
                        >
                          Home
                        </a>
                      </div>
                      <div className="flex-1 flex flex-row items-end justify-start gap-[19px] min-w-[268px] max-w-full mq450:flex-wrap">
                        <div className="flex-1 flex flex-col items-start justify-start gap-[31px] min-w-[240px] max-w-full mq450:gap-[15px]">
                          <div className="w-[274px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border gap-[29px]">
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
                            <input
                              className="w-full [border:none] [outline:none] bg-teal h-[31px] flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl flex flex-row items-start justify-start pt-px px-5 pb-0.5 box-border font-roboto font-bold text-5xl text-white min-w-[76px]"
                              placeholder="Finance"
                              type="text"
                            />
                          </div>
                          <div className="flex flex-row items-start self-stretch justify-end">
                            <TextField
                              className="[border:none] bg-[transparent] h-[35px] w-[300px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] font-roboto text-xs text-gray-400"
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
                                width: "300px",
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-end px-0 pt-0 pb-1">
                          <img
                            className="relative w-6 h-6"
                            loading="lazy"
                            alt=""
                            src="/filter.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <TextField
                  className="h-[35px] w-[161px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] font-roboto text-xl text-gray-1500"
                  variant="standard"
                  select
                  value={1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ marginLeft: "18px", marginRight: "5px" }}
                      >
                        <img width="30px" height="30px" src="/bxsort.svg" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ marginRight: "10px" }}
                      >
                        <img
                          width="30px"
                          height="20px"
                          src="/weuiarrowoutlined.png"
                        />
                      </InputAdornment>
                    ),
                  }}
                  SelectProps={{ IconComponent: () => null }}
                  sx={{
                    borderTopWidth: "1px",
                    borderRightWidth: "1px",
                    borderBottomWidth: "1px",
                    borderLeftWidth: "1px",
                    backgroundColor: "#fafafa",
                    borderRadius: "15px",
                    width: "19.754601226993863%",
                    height: "35px",
                    "& .MuiInput-underline:before": { borderBottom: "none" },
                    "& .MuiInput-underline:after": { borderBottom: "none" },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    "& .MuiInputBase-root": { height: "100%" },
                    "& .MuiInputBase-input": {
                      color: "rgba(0, 0, 0, 0.44)",
                      fontSize: 20,
                      fontWeight: "Regular",
                      fontFamily: "Roboto",
                      textAlign: "left",
                      p: "0 !important",
                    },
                  }}
                >
                  <MenuItem value={1}>{`Sort by `}</MenuItem>
                </TextField>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-end justify-start pt-[82px] px-0 pb-0 box-border gap-[14.5px] max-w-full text-xl text-black mq450:pt-[34px] mq450:box-border mq750:pt-[53px] mq750:box-border">
              <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-mini bg-white flex flex-row items-start justify-start pt-2 pb-[7px] pl-[15px] pr-[3px] gap-[15px]">
                <img
                  className="h-[30px] w-[30px] relative overflow-hidden shrink-0 min-h-[30px]"
                  loading="lazy"
                  alt=""
                  src="/carbongeneratepdf.svg"
                />
                <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                  <div className="relative font-semibold whitespace-pre-wrap mq450:text-base">
                    Generate Receipt
                  </div>
                </div>
              </div>
              <div className="w-[271px] flex flex-row items-start justify-end py-0 px-14 box-border mq450:pl-5 mq450:pr-5 mq450:box-border">
                <button
                  className="cursor-pointer [border:none] pt-[7px] px-[9px] pb-1.5 bg-mediumspringgreen flex-1 rounded-21xl flex flex-row items-start justify-start whitespace-nowrap hover:bg-forestgreen"
                  onClick={onGroupButtonClick}
                >
                  <div className="h-[34px] w-[159px] relative rounded-21xl bg-mediumspringgreen hidden" />
                  <div className="flex-1 relative text-mini font-medium font-roboto text-white text-center z-[1]">
                    Add new transaction
                  </div>
                </button>
              </div>
              <div className="flex flex-row items-start self-stretch justify-start max-w-full text-5xl text-center">
                <div className="w-[1099px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.2)] rounded-xl bg-snow flex flex-row flex-wrap items-end justify-center pt-[21px] pb-[441px] pl-[35px] pr-[23px] box-border relative gap-2 max-w-full mq750:pt-5 mq750:pb-[287px] mq750:box-border">
                  <div className="w-[845px] !m-[0] absolute top-[-190px] left-[84px] shadow-[0px_4px_3px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(89.88deg,_rgba(255,_255,_255,_0.5),_rgba(167,_255,_188,_0.5)_41.72%,_rgba(255,_191,_191,_0.5)_67.08%,_#fff_92.87%)] flex flex-col items-end justify-start py-3 px-[26px] box-border gap-[41px] max-w-full z-[1]">
                    <img
                      className="w-[845px] h-[193px] relative rounded-xl hidden max-w-full"
                      alt=""
                      src="/rectangle-10722.svg"
                    />
                    <div className="self-stretch flex flex-row items-start justify-start py-0 px-[7px]">
                      <div className="w-[272.8px] relative font-medium inline-block shrink-0 z-[1] mq450:text-lgi">
                        Monthly Transactions
                      </div>
                    </div>
                    <div className="w-[746px] flex flex-row items-start justify-between gap-5 max-w-full mq750:flex-wrap mq750:justify-center">
                      <div className="w-[94px] flex flex-col items-start justify-start">
                        <div className="relative font-medium inline-block min-w-[28px] z-[1] mq450:text-lgi">
                          10
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start py-0 pl-0 pr-3.5">
                        <div className="relative z-[1] mq450:text-lgi">
                          <b>{`LKR. `}</b>
                          <span className="font-medium">300000</span>
                        </div>
                      </div>
                      <div className="relative inline-block min-w-[125px] z-[1] mq450:text-lgi">
                        <b>{`LKR. `}</b>
                        <span className="font-medium">60000</span>
                      </div>
                      <b className="relative z-[1] mq450:text-lgi">
                        LKR. 240000
                      </b>
                    </div>
                    <div className="flex flex-row items-start self-stretch justify-between gap-5 text-xl mq750:flex-wrap">
                      <div className="w-[163px] relative font-semibold inline-block shrink-0 z-[2] mq450:text-base">
                        Total transaction
                      </div>
                      <div className="w-[125px] relative font-semibold inline-block shrink-0 min-w-[125px] z-[2] mq450:text-base">
                        Total Income
                      </div>
                      <div className="w-[146px] relative font-semibold inline-block shrink-0 z-[2] mq450:text-base">
                        Total Expenses
                      </div>
                      <div className="w-[149px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
                        <div className="self-stretch relative font-semibold z-[2] mq450:text-base">
                          Total Profit/Lost
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[572px] w-[1099px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.2)] rounded-xl bg-snow hidden max-w-full z-[1]" />
                  <div className="flex-1 flex flex-col items-end justify-start gap-[29px] min-w-[660px] max-w-full text-lg mq1050:min-w-full">
                    <div className="self-stretch rounded-8xs bg-gainsboro-100 flex flex-row items-start justify-between pt-1.5 pb-[5px] pl-3 pr-[23px] box-border max-w-full gap-5 z-[1] mq1050:flex-wrap">
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
                    <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[49px] pr-12 box-border max-w-full text-left text-xs mq1050:pl-6 mq1050:pr-6 mq1050:box-border">
                      <div className="flex flex-row items-start justify-between flex-1 max-w-full gap-5 mq1050:flex-wrap">
                        <div className="w-[70px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                          <div className="relative inline-block min-w-[21px] z-[1]">
                            001
                          </div>
                        </div>
                        <div className="relative z-[1]">
                          <p className="m-0">18-12-2022</p>
                          <p className="m-0">07:13:41</p>
                        </div>
                        <div className="w-[83px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                          <div className="relative inline-block min-w-[58px] z-[1]">
                            expensess
                          </div>
                        </div>
                        <div className="w-[79px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                          <div className="relative inline-block min-w-[23px] z-[1]">
                            CEB
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-[18px]">
                          <div className="flex flex-row items-start justify-start gap-[35px]">
                            <div className="relative inline-block min-w-[76px] z-[1]">
                              bank deposite
                            </div>
                            <div className="relative inline-block min-w-[104px] z-[1]">
                              December payment
                            </div>
                          </div>
                        </div>
                        <div className="w-[71px] flex flex-col items-start justify-start pt-[7px] pb-0 pl-0 pr-5 box-border">
                          <div className="relative inline-block min-w-[23px] z-[1]">
                            CEB
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                          <div className="relative inline-block min-w-[34px] z-[1]">
                            12500
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[5px]">
                    <img
                      className="w-[17px] h-[17px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/info-icon.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinanceViewAllRecordDashb;
