import { useCallback } from "react";
import Template from "../../components/Template";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const FinanceAnalyseDashboardTem = () => {
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
      <main className="w-[1460px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border relative gap-[95px] max-w-full mq1050:pl-5 mq1050:box-border mq450:gap-6 mq750:gap-[47px]">
        <Sidebar />
        <img
          className="h-[35px] w-[38px] absolute !m-[0] top-[29px] left-[363px] overflow-hidden shrink-0 cursor-pointer"
          loading="lazy"
          alt=""
          src="/ionchevronbackcircle.svg"
          onClick={onIonchevronBackCircleIconClick}
        />
        <section className="flex-1 flex flex-col items-start justify-start pt-[31px] px-0 pb-0 box-border max-w-[calc(100%_-_401px)] text-left text-5xl text-white font-roboto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[87px] max-w-full mq1050:gap-[43px] mq750:gap-[22px]">
            <div className="box-border flex flex-row items-start justify-start max-w-full px-5 py-0">
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
            </div>
            <div className="self-stretch flex flex-col items-end justify-start gap-[65px] max-w-full text-center text-9xl text-black mq1050:gap-8 mq750:gap-4">
              <div className="box-border flex flex-row items-start self-stretch justify-end max-w-full py-0 pl-0 pr-2">
                <div className="flex-1 shadow-[0px_4px_4px_2px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(90deg,_rgba(255,_255,_255,_0.5),_rgba(197,_255,_164,_0.5)_35.45%,_rgba(255,_207,_207,_0.5)_63.89%,_rgba(255,_213,_213,_0.5)_86.38%,_rgba(175,_255,_129,_0.5)_95.29%)] flex flex-row items-end justify-between pt-28 pb-[17px] pl-[35px] pr-[18px] box-border max-w-full gap-5 mq1050:flex-wrap">
                  <div className="h-[258px] w-[1031px] relative shadow-[0px_4px_4px_2px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(90deg,_rgba(255,_255,_255,_0.5),_rgba(197,_255,_164,_0.5)_35.45%,_rgba(255,_207,_207,_0.5)_63.89%,_rgba(255,_213,_213,_0.5)_86.38%,_rgba(175,_255,_129,_0.5)_95.29%)] hidden max-w-full" />
                  <div className="flex flex-col items-start justify-start gap-[72px]">
                    <div className="flex flex-row items-start justify-start py-0 px-[35px]">
                      <div className="relative font-semibold inline-block min-w-[33px] z-[1] mq450:text-3xl">
                        49
                      </div>
                    </div>
                    <h2 className="m-0 relative text-xl font-semibold font-[inherit] text-left z-[1] mq450:text-base">
                      Total transaction
                    </h2>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[9px] gap-[68px]">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 200000
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 pl-[30px] pr-4 text-left text-xl">
                      <h2 className="m-0 relative text-inherit font-semibold font-[inherit] inline-block min-w-[117px] z-[1] mq450:text-base">
                        Total Income
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[17px] gap-[70px]">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 50000
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 px-[13px] text-left text-xl">
                      <h2 className="m-0 relative text-inherit font-semibold font-[inherit] inline-block min-w-[121px] z-[1] mq450:text-base">
                        Total Outgoin
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[70px]">
                    <div className="relative font-semibold z-[1] mq450:text-3xl">
                      LKR. 150000
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 pl-[7px] pr-[9px] text-left text-xl">
                      <h2 className="m-0 relative text-inherit font-semibold font-[inherit] z-[1] mq450:text-base">
                        Total Profit/Lost
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start py-0 pl-[17px] pr-0 box-border gap-[15px] max-w-full text-right text-xs font-single-line-body-base">
                <div className="self-stretch flex flex-row items-start justify-center py-0 pl-[147px] pr-5 text-left text-5xl mq450:pl-5 mq450:box-border mq750:pl-[73px] mq750:box-border">
                  <h1 className="m-0 relative text-inherit font-bold font-[inherit] mq450:text-lgi">
                    Transaction Amount vs Date
                  </h1>
                </div>
                <div className="w-[85.7px] flex flex-col items-start justify-start pt-0 px-0 pb-[26.9px] box-border text-left">
                  <div className="relative inline-block min-w-[45px] z-[1]">
                    Amount
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[26px] pr-0 mt-[-5.6px] text-right">
                    <div className="flex-1 flex flex-row items-start justify-start gap-[7.4px]">
                      <div className="flex-1 flex flex-col items-end justify-start gap-[34.9px]">
                        <div className="self-stretch h-[25.1px] relative inline-block shrink-0">
                          1000
                        </div>
                        <div className="w-[32.4px] h-[25.1px] relative inline-block shrink-0">
                          750
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
                        <div className="flex flex-col items-start justify-start gap-[66px]">
                          <img
                            className="w-[8.8px] h-px relative z-[3]"
                            loading="lazy"
                            alt=""
                            src="/vector-10.svg"
                          />
                          <img
                            className="w-[8.8px] h-px relative z-[3]"
                            loading="lazy"
                            alt=""
                            src="/vector-111.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[120.7px] flex flex-row items-start justify-start pt-0 px-[35px] pb-[26.9px] box-border">
                  <div className="h-[25.1px] flex-1 relative">
                    <img
                      className="absolute top-[13px] left-[41.2px] w-[8.8px] h-px z-[3]"
                      loading="lazy"
                      alt=""
                      src="/vector-12.svg"
                    />
                    <div className="absolute top-[0px] left-[0px] inline-block w-[33.9px] h-[25.1px]">
                      500
                    </div>
                  </div>
                </div>
                <div className="w-[120.7px] flex flex-row items-start justify-start pt-0 px-[35px] pb-[26.9px] box-border">
                  <div className="h-[25.1px] flex-1 relative">
                    <img
                      className="absolute top-[13px] left-[41.2px] w-[8.8px] h-px z-[3]"
                      loading="lazy"
                      alt=""
                      src="/vector-12.svg"
                    />
                    <div className="absolute top-[0px] left-[0px] inline-block w-[33.9px] h-[25.1px]">
                      250
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start self-stretch justify-end max-w-full">
                  <div className="w-[984.2px] flex flex-row items-start justify-start py-0 pl-5 pr-0 box-border relative max-w-full">
                    <div className="h-[278.1px] w-[890.7px] absolute !m-[0] top-[-255px] left-[39.1px]">
                      <img
                        className="absolute top-[268px] left-[8.8px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[106.7px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-15.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[204.6px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[302.5px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[400.4px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[498.2px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[596.1px] w-px h-[10.1px] z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[694px] w-px h-[10.1px] z-[1]"
                        alt=""
                        src="/vector-21.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[791.9px] w-px h-[10.1px] z-[1]"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[889.7px] w-px h-[10.1px] z-[1]"
                        alt=""
                        src="/vector-14.svg"
                      />
                      <img
                        className="absolute top-[0px] left-[8.8px] w-px h-[268px] z-[2]"
                        loading="lazy"
                        alt=""
                        src="/vector-24.svg"
                      />
                      <img
                        className="absolute top-[268px] left-[0px] w-[8.8px] h-px z-[3]"
                        loading="lazy"
                        alt=""
                        src="/vector-25.svg"
                      />
                      <div className="absolute top-[8px] left-[8.8px] w-[880.9px] h-[261px]">
                        <img
                          className="absolute top-[0px] left-[0px] w-full h-full"
                          alt=""
                          src="/group.svg"
                        />
                        <div className="absolute top-[21.5px] left-[0px] w-[880.9px] h-[239.5px]">
                          <img
                            className="absolute top-[238.5px] left-[0px] w-[880.9px] h-px"
                            loading="lazy"
                            alt=""
                            src="/vector-26.svg"
                          />
                          <img
                            className="absolute top-[0px] left-[0px] w-full h-full"
                            loading="lazy"
                            alt=""
                            src="/group-1.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-[12.2px] max-w-full">
                      <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                        0
                      </div>
                      <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[22px] pr-0 box-border max-w-full text-center">
                        <div className="flex flex-row flex-wrap items-start justify-between flex-1 max-w-full gap-5">
                          <div className="w-[72.8px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                              0
                            </div>
                          </div>
                          <div className="w-[69.9px] flex flex-col items-start justify-start">
                            <div className="w-[8.8px] h-[25.1px] relative inline-block shrink-0 min-w-[8.8px]">
                              1
                            </div>
                          </div>
                          <div className="w-[71.4px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0">
                              2
                            </div>
                          </div>
                          <div className="w-[71.4px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                              3
                            </div>
                          </div>
                          <div className="w-[71.3px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                              4
                            </div>
                          </div>
                          <div className="w-[71.4px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0">
                              5
                            </div>
                          </div>
                          <div className="w-[72.1px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                              6
                            </div>
                          </div>
                          <div className="w-[70.7px] flex flex-col items-start justify-start">
                            <div className="w-[10.3px] h-[25.1px] relative inline-block shrink-0 min-w-[10.3px]">
                              7
                            </div>
                          </div>
                          <div className="w-[71.3px] flex flex-col items-start justify-start">
                            <div className="w-[11.8px] h-[25.1px] relative inline-block shrink-0 min-w-[11.8px]">
                              8
                            </div>
                          </div>
                          <div className="h-[25.1px] w-[11.8px] relative inline-block shrink-0 min-w-[11.8px] mq1050:w-full mq1050:h-[11.8px]">
                            9
                          </div>
                          <div className="flex flex-col items-start justify-start pt-[25.3px] px-0 pb-0 text-left">
                            <div className="relative inline-block min-w-[23px]">
                              Dae
                            </div>
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

export default FinanceAnalyseDashboardTem;
