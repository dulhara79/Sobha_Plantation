import { useCallback } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import Template from "../../components/Template";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";

const FinanceBudgetDashboardTempl = () => {
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
      <main className="w-[1331px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border relative gap-[115px] max-w-full mq1050:pl-5 mq1050:box-border mq450:gap-[29px] mq750:gap-[57px]">
        <Menu customerIcons="/vector-61.svg" />
        <img
          className="h-[35px] w-[38px] absolute !m-[0] top-[29px] left-[363px] overflow-hidden shrink-0 cursor-pointer"
          loading="lazy"
          alt=""
          src="/ionchevronbackcircle.svg"
          onClick={onIonchevronBackCircleIconClick}
        />
        <section className="flex-1 flex flex-col items-start justify-start pt-[31px] px-0 pb-0 box-border max-w-[calc(100%_-_421px)] text-left text-5xl text-white font-roboto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[67px] max-w-full mq1050:gap-[33px] mq450:gap-[17px]">
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
            <div className="flex flex-row items-start self-stretch justify-end max-w-full text-center text-black text-9xl">
              <div className="w-[848px] flex flex-col items-start justify-start py-0 pl-5 pr-0 box-border gap-[61px] max-w-full mq1050:gap-[30px] mq450:gap-[15px]">
                <div className="self-stretch shadow-[0px_4px_4px_2px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(90deg,_#fff,_rgba(195,_255,_196,_0.5)_22.92%,_rgba(183,_255,_156,_0.5)_38.72%,_rgba(183,_255,_156,_0.5)_52.21%,_rgba(183,_255,_156,_0.5)_67.02%,_rgba(253,_158,_158,_0.5)_87.43%,_#fff)] overflow-x-auto flex flex-row items-end justify-between pt-[92px] pb-[34px] pl-[73px] pr-[19px] gap-5 mq1050:pl-9 mq1050:box-border">
                  <div className="h-[244px] w-[828px] relative shadow-[0px_4px_4px_2px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(90deg,_#fff,_rgba(195,_255,_196,_0.5)_22.92%,_rgba(183,_255,_156,_0.5)_38.72%,_rgba(183,_255,_156,_0.5)_52.21%,_rgba(183,_255,_156,_0.5)_67.02%,_rgba(253,_158,_158,_0.5)_87.43%,_#fff)] shrink-0 hidden" />
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[67px] gap-[54px]">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 140000
                    </div>
                    <div className="flex flex-row items-start justify-start px-px py-0 text-5xl">
                      <div className="w-[137px] relative font-medium inline-block z-[1] mq450:text-lgi">
                        Total Budget
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-14">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 40000
                    </div>
                    <div className="flex flex-row items-start justify-start px-10 py-0 text-5xl">
                      <div className="relative font-medium inline-block min-w-[52px] z-[1] mq450:text-lgi">
                        Save
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-14">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 100000
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 pl-[51px] pr-[57px] text-5xl">
                      <div className="relative font-medium inline-block min-w-[55px] z-[1] mq450:text-lgi">
                        Used
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[730px] flex flex-row items-start justify-start py-0 px-[74px] box-border max-w-full mq750:pl-[37px] mq750:pr-[37px] mq750:box-border">
                  <form className="m-0 flex-1 shadow-[0px_4px_20px_4px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white flex flex-col items-start justify-start pt-[22px] pb-[42.5px] pl-[73px] pr-[41px] box-border gap-[22px] max-w-full mq450:pt-5 mq450:pb-7 mq450:box-border mq750:pl-9 mq750:box-border">
                    <div className="w-[582px] h-[441px] relative shadow-[0px_4px_20px_4px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white hidden max-w-full" />
                    <div className="w-[269px] flex flex-col items-start justify-start pt-0 px-0 pb-2.5 box-border gap-[11px]">
                      <div className="w-[178px] relative text-xl font-medium font-roboto text-black text-center inline-block z-[1] mq450:text-base">
                        Department Name
                      </div>
                      <TextField
                        className="[border:none] bg-[transparent] self-stretch h-[26px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] z-[1]"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <img
                              width="24px"
                              height="20.6px"
                              src="/dropdownarrow.svg"
                            />
                          ),
                        }}
                        sx={{
                          "& fieldset": { borderColor: "#a0a0a0" },
                          "& .MuiInputBase-root": {
                            height: "26px",
                            backgroundColor: "#fff",
                            paddingRight: "15px",
                            borderRadius: "30px",
                          },
                        }}
                      />
                    </div>
                    <div className="w-[219px] flex flex-row items-start justify-start py-0 px-0.5 box-border">
                      <div className="flex-1 flex flex-col items-start justify-start gap-[13px]">
                        <div className="w-[119.2px] relative text-xl font-medium font-roboto text-black text-center inline-block [transform:_rotate(-0.6deg)] min-w-[119.2px] z-[1] mq450:text-base">
                          Product Type
                        </div>
                        <div className="self-stretch h-[26px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] rounded-11xl bg-white border-darkgray border-[1px] border-solid box-border z-[1]" />
                      </div>
                    </div>
                    <div className="w-[150px] flex flex-col items-start justify-start pt-0 px-0 pb-2.5 box-border gap-3.5">
                      <div className="relative text-xl font-medium font-roboto text-black text-center inline-block min-w-[119px] z-[1] mq450:text-base">
                        Allocate date
                      </div>
                      <TextField
                        className="[border:none] bg-[transparent] self-stretch h-[26px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] z-[1]"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <img
                              width="24px"
                              height="20.6px"
                              src="/calendar.svg"
                            />
                          ),
                        }}
                        sx={{
                          "& fieldset": { borderColor: "#a0a0a0" },
                          "& .MuiInputBase-root": {
                            height: "26px",
                            backgroundColor: "#fff",
                            paddingRight: "7px",
                            borderRadius: "30px",
                          },
                        }}
                      />
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-2.5">
                      <div className="w-[119px] relative text-xl font-medium font-roboto text-black text-center inline-block min-w-[119px] z-[1] mq450:text-base">
                        Total amount
                      </div>
                      <div className="flex flex-col items-start self-stretch justify-start">
                        <TextField
                          className="[border:none] bg-[transparent] w-[150px] h-[25px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] z-[1]"
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#a0a0a0" },
                            "& .MuiInputBase-root": {
                              height: "25px",
                              backgroundColor: "#fff",
                              borderRadius: "30px",
                            },
                            width: "150px",
                          }}
                        />
                        <div className="flex flex-row items-start self-stretch justify-end">
                          <div className="w-[201px] flex flex-row items-start justify-start gap-[25px]">
                            <button className="cursor-pointer [border:none] py-3 px-3.5 bg-mediumspringgreen rounded-lg flex flex-row items-start justify-start z-[1] hover:bg-forestgreen">
                              <div className="h-10 w-[88px] relative rounded-lg bg-mediumspringgreen hidden" />
                              <div className="relative text-base leading-[100%] font-semibold font-roboto text-white text-left inline-block min-w-[60px] z-[1]">
                                Allocate
                              </div>
                            </button>
                            <Button
                              className="h-10 flex-1 z-[1]"
                              disableElevation
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                color: "#fff",
                                fontSize: "16",
                                background: "#282828",
                                borderRadius: "8px",
                                "&:hover": { background: "#282828" },
                                height: 40,
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinanceBudgetDashboardTempl;
