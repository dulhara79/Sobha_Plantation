import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import GroupComponent from "../../components/GroupComponent";
import { useNavigate } from "react-router-dom";

const FinanceAddRecordDashboard = () => {
  const navigate = useNavigate();

  const onIonchevronBackCircleIconClick = useCallback(() => {
    navigate("/finance-dashboard-template");
  }, [navigate]);

  const onRectangleClick = useCallback(() => {
    navigate("/sales-and-finance-dashboard-template");
  }, [navigate]);

  const onSalesTextClick = useCallback(() => {
    navigate("/sales-dashboard-template");
  }, [navigate]);

  const onAddRecordBttnClick = useCallback(() => {
    navigate("/finance-view-all-record-dashboard-template");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <GroupComponent
        navigationMarginTop="unset"
        navigationTop="0"
        image14="/image-12@2x.png"
      />
      <main className="w-[1427px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border gap-[57px] max-w-full text-left text-9xl text-gray-1700 font-roboto mq750:gap-7 mq1050:pl-5 mq1050:box-border">
        <div className="w-[306px] shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke flex flex-col items-start justify-start pt-[88px] px-2 pb-[240.3px] box-border relative gap-[39.7px] mq750:pt-[37px] mq750:pb-[101px] mq750:box-border mq1050:hidden mq1050:pt-[57px] mq1050:pb-[156px] mq1050:box-border mq450:gap-5">
          <div className="w-[306px] h-[961px] relative shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke hidden z-[0]" />
          <div className="w-[279px] flex flex-col items-start justify-start gap-[21px]">
            <div className="w-[206px] flex flex-row items-start justify-start py-0 px-[21px] box-border text-center">
              <div className="flex flex-row items-start justify-between flex-1 gap-5">
                <img
                  className="self-stretch w-[47px] relative rounded-31xl max-h-full min-h-[38px] z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
                <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                  <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[75px] z-[1] mq450:text-3xl">
                    Home
                  </a>
                </div>
              </div>
            </div>
            <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-limegreen flex flex-row items-start justify-start py-[11px] px-[29px] gap-[48.2px] z-[1] text-black mq450:gap-6">
              <div className="h-[55px] w-[279px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-limegreen hidden" />
              <img
                className="h-[32.5px] w-[32.5px] relative min-h-[33px] z-[1]"
                loading="lazy"
                alt=""
                src="/vector-11.svg"
              />
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[114px] z-[1] mq450:text-3xl">
                Finances
              </a>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[26px] pr-8">
              <div className="flex flex-row items-end justify-between flex-1 gap-5">
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.3px]">
                  <div className="flex flex-col items-start justify-start gap-[47.8px]">
                    <div className="flex flex-col items-end justify-start gap-8">
                      <div className="flex flex-row items-start justify-end py-0 pl-0 pr-px">
                        <img
                          className="h-[38px] w-[38px] relative shrink-0 z-[1]"
                          loading="lazy"
                          alt=""
                          src="/vector-2.svg"
                        />
                      </div>
                      <img
                        className="w-[31.3px] h-[36.2px] relative shrink-0 z-[1]"
                        loading="lazy"
                        alt=""
                        src="/group-2644.svg"
                      />
                    </div>
                    <img
                      className="w-9 h-9 relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/vector-3.svg"
                    />
                  </div>
                </div>
                <div className="w-[138px] flex flex-col items-start justify-start gap-[35.8px]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[41px]">
                    <div className="flex flex-row items-start justify-start px-px py-0">
                      <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[124px] z-[1] mq450:text-3xl">
                        Inventory
                      </a>
                    </div>
                    <a className="[text-decoration:none] h-11 relative font-bold text-[inherit] text-center inline-block shrink-0 z-[1] mq450:text-3xl">
                      Employees
                    </a>
                  </div>
                  <div className="flex flex-row items-start justify-start px-px py-0">
                    <b className="relative inline-block min-w-[106px] z-[1] mq450:text-3xl">
                      Harvest
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[263px] flex flex-row items-start justify-start py-0 px-[23px] box-border">
            <div className="flex flex-row items-end justify-between flex-1 gap-5">
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.7px]">
                <div className="flex flex-col items-start justify-start gap-[42.2px]">
                  <div className="flex flex-row items-start justify-start py-0 pl-[3px] pr-[5px]">
                    <img
                      className="h-[36.8px] w-[37.8px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/vector-4.svg"
                    />
                  </div>
                  <div className="flex flex-col items-end justify-start gap-[38.3px]">
                    <div className="flex flex-col items-start justify-start gap-[33.8px]">
                      <div className="w-[32.5px] h-[35.2px] relative shrink-0">
                        <img
                          className="absolute top-[0px] left-[0px] w-[32.5px] h-[34.2px] z-[1]"
                          alt=""
                          src="/vector-6.svg"
                        />
                        <img
                          className="absolute top-[9.7px] left-[8.8px] w-[14.4px] h-[8.5px] z-[2]"
                          alt=""
                          src="/vector-61.svg"
                        />
                        <img
                          className="absolute top-[18.2px] left-[23.2px] w-[3.8px] h-[17px] z-[3]"
                          loading="lazy"
                          alt=""
                          src="/vector-71.svg"
                        />
                        <img
                          className="absolute top-[5.4px] left-[16px] w-[14.4px] h-[8.5px] z-[5]"
                          alt=""
                          src="/vector-81.svg"
                        />
                      </div>
                      <div className="flex flex-row items-start justify-start py-0 pl-0.5 pr-0">
                        <img
                          className="h-[33.7px] w-[37px] relative shrink-0 z-[1]"
                          loading="lazy"
                          alt=""
                          src="/group-2645.svg"
                        />
                      </div>
                    </div>
                    <img
                      className="w-[45px] h-[45px] relative overflow-hidden shrink-0 z-[1]"
                      loading="lazy"
                      alt=""
                      src="/raphaelcustomer.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[131px] flex flex-col items-start justify-start gap-[48.2px]">
                <b className="relative z-[1] mq450:text-3xl">Crop Care</b>
                <div className="self-stretch flex flex-col items-start justify-start gap-[42.5px]">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-[5px]">
                    <b className="flex-1 relative z-[1] mq450:text-3xl">
                      Products
                    </b>
                  </div>
                  <b className="self-stretch relative leading-[28px] text-center z-[1] mq450:text-3xl mq450:leading-[22px]">
                    Field View
                  </b>
                  <div className="w-[100px] flex flex-row items-start justify-start py-0 px-px box-border">
                    <b className="flex-1 relative z-[1] mq450:text-3xl">
                      Buyers
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="w-[14.4px] h-[8.5px] absolute !m-[0] bottom-[409.8px] left-[60.5px] z-[4]"
            loading="lazy"
            alt=""
            src="/vector-91.svg"
          />
        </div>
        <section className="flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border max-w-[calc(100%_-_363px)] text-left text-5xl text-white font-roboto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[110px] max-w-full mq750:gap-[27px] mq1050:gap-[55px]">
            <div className="flex flex-row items-start justify-start max-w-full gap-5 mq450:flex-wrap">
              <img
                className="h-[35px] w-[38px] relative overflow-hidden shrink-0 min-h-[35px] cursor-pointer"
                loading="lazy"
                alt=""
                src="/ionchevronbackcircle.svg"
                onClick={onIonchevronBackCircleIconClick}
              />
              <div className="w-[113px] flex flex-col items-start justify-start pt-0.5 pb-0 pl-0 pr-[9px] box-border">
                <div className="self-stretch h-[31px] relative">
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
              </div>
              <div className="flex flex-col items-start justify-start pt-0.5 pb-0 pl-0 pr-[9px]">
                <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex flex-row items-start justify-start pt-0 px-[18px] pb-[3px]">
                  <img
                    className="h-[31px] w-[98px] relative rounded-41xl hidden"
                    alt=""
                    src="/rectangle-10836.svg"
                  />
                  <a
                    className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[62px] cursor-pointer z-[1] mq450:text-lgi"
                    onClick={onSalesTextClick}
                  >
                    Sales
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
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
            </div>
            <div className="box-border flex flex-row items-start self-stretch justify-start max-w-full py-0 pl-8 pr-0 text-center text-black">
              <div className="flex-1 flex flex-col items-end justify-start gap-[43px] max-w-full mq750:gap-[21px]">
                <div className="w-[632px] flex flex-row items-start justify-end py-0 px-[27px] box-border max-w-full">
                  <div className="flex flex-row items-start justify-between flex-1 max-w-full gap-5 mq750:flex-wrap">
                    <div className="relative font-semibold mq450:text-lgi">
                      Add Transaction Record
                    </div>
                    <div className="w-[120px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                      <button
                        className="cursor-pointer [border:none] py-[5px] pl-1.5 pr-1 bg-mediumspringgreen self-stretch rounded-21xl flex flex-row items-start justify-start whitespace-nowrap hover:bg-forestgreen"
                        onClick={onAddRecordBttnClick}
                      >
                        <div className="h-[27px] w-[120px] relative rounded-21xl bg-mediumspringgreen hidden" />
                        <a className="[text-decoration:none] flex-1 relative text-mini font-medium font-roboto text-white text-center inline-block min-w-[110px] z-[1]">
                          View all records
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="self-stretch shadow-[0px_4px_20px_4px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white flex flex-col items-start justify-start pt-[40.4px] pb-[60px] pl-[89px] pr-[29px] box-border gap-[40.3px] max-w-full text-lg mq750:gap-5 mq750:pl-[22px] mq750:pt-[26px] mq750:pb-[39px] mq750:box-border mq1050:pl-11 mq1050:box-border">
                  <div className="w-[1012px] h-[648px] relative shadow-[0px_4px_20px_4px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white hidden max-w-full" />
                  <div className="self-stretch flex flex-row items-start justify-start pt-0 pb-[3.4px] pl-[3px] pr-0 box-border max-w-full">
                    <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[77.4px] max-w-full mq1050:gap-[39px] mq450:gap-[19px]">
                      <div className="flex-1 flex flex-row items-start justify-start gap-11 max-w-full mq750:flex-wrap mq750:gap-[22px] mq750:min-w-full">
                        <div className="flex-1 flex flex-col items-start justify-start gap-[9.8px] min-w-[183px]">
                          <div className="w-[135.8px] flex flex-row items-start justify-start py-0 px-1.5 box-border">
                            <div className="flex-1 relative font-semibold inline-block min-w-[123.5px] shrink-0 z-[1]">
                              Transaction ID
                            </div>
                          </div>
                          <TextField
                            className="[border:none] bg-[transparent] self-stretch h-[32.7px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] shrink-0 z-[1]"
                            variant="outlined"
                            sx={{
                              "& fieldset": { borderColor: "#a0a0a0" },
                              "& .MuiInputBase-root": {
                                height: "32.7px",
                                backgroundColor: "#fff",
                                borderRadius: "30px",
                              },
                            }}
                          />
                        </div>
                        <div className="w-[206.2px] flex flex-col items-start justify-start gap-[9.8px]">
                          <div className="w-[145.5px] relative font-semibold inline-block shrink-0 z-[1]">
                            Transaction Type
                          </div>
                          <div className="self-stretch shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid flex flex-row items-start justify-end py-0.5 px-[9px] shrink-0 z-[1]">
                            <div className="h-[32.7px] w-[206.2px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid box-border hidden" />
                            <img
                              className="h-[26.2px] w-[25.1px] relative z-[2]"
                              alt=""
                              src="/dropdownarrow1.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[281.5px] flex flex-col items-start justify-start gap-[9.8px]">
                        <div className="w-[179px] relative font-semibold inline-block shrink-0 z-[1]">
                          Transaction category
                        </div>
                        <TextField
                          className="[border:none] bg-[transparent] self-stretch h-[32.7px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] shrink-0 z-[1]"
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#a0a0a0" },
                            "& .MuiInputBase-root": {
                              height: "32.7px",
                              backgroundColor: "#fff",
                              borderRadius: "30px",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[672.5px] flex flex-row items-start justify-start pt-0 px-[9px] pb-[7.8px] box-border max-w-full">
                    <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[63.8px] max-w-full mq750:gap-8 mq450:gap-4">
                      <div className="w-[157px] flex flex-col items-start justify-start gap-[16.3px]">
                        <div className="w-[39.8px] relative font-semibold inline-block min-w-[39.8px] shrink-0 z-[1]">{`Date `}</div>
                        <TextField
                          className="[border:none] bg-[transparent] self-stretch h-[32.7px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] shrink-0 z-[1]"
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <img
                                width="25.1px"
                                height="26.2px"
                                src="/calendar.svg"
                              />
                            ),
                          }}
                          sx={{
                            "& fieldset": { borderColor: "#a0a0a0" },
                            "& .MuiInputBase-root": {
                              height: "32.7px",
                              backgroundColor: "#fff",
                              paddingRight: "23.1px",
                              borderRadius: "30px",
                            },
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-row items-start justify-center gap-[51.3px] min-w-[281px] max-w-full mq750:flex-wrap mq450:gap-[26px]">
                        <div className="flex-1 flex flex-col items-start justify-start gap-[16.3px] min-w-[146px]">
                          <div className="w-[150.5px] flex flex-row items-start justify-start py-0 px-[3px] box-border">
                            <div className="flex-1 relative font-semibold shrink-0 z-[1]">
                              Payment Method
                            </div>
                          </div>
                          <div className="self-stretch shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid flex flex-row items-start justify-end pt-px px-[15px] pb-[3px] shrink-0 z-[1]">
                            <div className="h-[32.7px] w-[225px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid box-border hidden" />
                            <img
                              className="h-[26.2px] w-[25.1px] relative z-[2]"
                              alt=""
                              src="/dropdownarrow-1.svg"
                            />
                          </div>
                        </div>
                        <div className="w-[157px] flex flex-col items-start justify-start gap-[16.3px]">
                          <div className="w-[121px] flex flex-row items-start justify-start py-0 px-[7px] box-border">
                            <div className="flex-1 relative font-semibold inline-block min-w-[106.7px] shrink-0 z-[1]">
                              Payer/Payee
                            </div>
                          </div>
                          <div className="self-stretch shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid flex flex-row items-start justify-end py-0.5 px-2 shrink-0 z-[1]">
                            <div className="h-[32.7px] w-[157px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid box-border hidden" />
                            <img
                              className="h-[26.2px] w-[25.1px] relative z-[2]"
                              alt=""
                              src="/dropdownarrow-2.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[420.7px] flex flex-col items-start justify-start gap-[13.1px] max-w-full">
                    <div className="w-[132px] flex flex-row items-start justify-start py-0 px-[17px] box-border">
                      <div className="flex-1 relative font-semibold inline-block min-w-[97.3px] shrink-0 z-[1]">
                        Description
                      </div>
                    </div>
                    <textarea
                      className="border-darkgray border-[1px] border-solid bg-white h-[129.8px] w-auto [outline:none] self-stretch relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl box-border shrink-0 z-[1]"
                      rows={6}
                      cols={21}
                    />
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[17px] pr-[19px] box-border max-w-full">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[13.1px] max-w-full">
                      <div className="w-[73.2px] flex flex-row items-start justify-start py-0 px-[3px] box-border">
                        <div className="flex-1 relative font-semibold inline-block min-w-[67px] shrink-0 z-[1]">
                          Amount
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-start gap-[0.1px] shrink-0">
                        <TextField
                          className="[border:none] bg-[transparent] w-[157px] h-[32.7px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] shrink-0 z-[1]"
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#a0a0a0" },
                            "& .MuiInputBase-root": {
                              height: "32.7px",
                              backgroundColor: "#fff",
                              borderRadius: "30px",
                            },
                            width: "157px",
                          }}
                        />
                        <div className="flex flex-row items-start self-stretch justify-end">
                          <div className="w-[190.5px] flex flex-row items-start justify-start gap-[29.3px] shrink-0">
                            <Button
                              className="h-[43.6px] flex-1 shrink-0 z-[1]"
                              disableElevation
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                color: "#fff",
                                fontSize: "16",
                                background: "#3acc63",
                                borderRadius: "8px",
                                "&:hover": { background: "#3acc63" },
                                height: 43.6,
                              }}
                            >
                              Add
                            </Button>
                            <button className="cursor-pointer [border:none] pt-[13.1px] pb-[13px] pl-3.5 pr-[13px] bg-gray-500 rounded-lg flex flex-row items-start justify-start shrink-0 z-[1] hover:bg-dimgray">
                              <div className="h-[43.6px] w-[80.6px] relative rounded-lg bg-gray-500 hidden" />
                              <div className="relative text-base leading-[17.5px] font-semibold font-roboto text-white text-left inline-block min-w-[52.3px] z-[1]">
                                Cancel
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default FinanceAddRecordDashboard;
