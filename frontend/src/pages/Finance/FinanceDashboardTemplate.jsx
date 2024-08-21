import { useCallback } from "react";
import Template from "../../components/Template";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";

const FinanceDashboardTemplate = () => {
  const navigate = useNavigate();

  const onIonchevronBackCircleIconClick = useCallback(() => {
    navigate("/sales-and-finance-dashboard-template");
  }, [navigate]);

  const onRectangleClick = useCallback(() => {
    navigate("/sales-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/finance-add-record-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/finance-valuation-dashboard-template");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/sales-view-all-record-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick2 = useCallback(() => {
    navigate("/financebudget-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick3 = useCallback(() => {
    navigate("/finance-analyse-dashboard-template");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <Template
        rectangleDivAlignSelf="stretch"
        rectangleDivWidth="unset"
        image13="/image-12@2x.png"
      />
      <main className="w-[1513px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border gap-[57px] max-w-full mq750:gap-7 mq1050:pl-5 mq1050:box-border">
        <Menu customerIcons="/vector-62.svg" />
        <section className="h-[961px] flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border max-w-[calc(100%_-_363px)] text-left text-5xl text-white font-roboto mq1050:h-auto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[35px] max-w-full mq750:gap-[17px]">
            <div className="self-stretch flex flex-row items-end justify-start gap-[88px] max-w-full lg:gap-11 mq750:gap-[22px] mq1050:flex-wrap">
              <div className="flex-1 flex flex-col items-end justify-start gap-7 min-w-[351px] max-w-full mq450:min-w-full">
                <div className="self-stretch flex flex-row items-start justify-start max-w-full [row-gap:20px] mq450:flex-wrap">
                  <img
                    className="h-[35px] w-[38px] relative overflow-hidden shrink-0 cursor-pointer"
                    loading="lazy"
                    alt=""
                    src="/ionchevronbackcircle.svg"
                    onClick={onIonchevronBackCircleIconClick}
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[326px] max-w-full">
                    <div className="flex flex-col items-start self-stretch justify-start max-w-full gap-12 mq750:gap-6">
                      <div className="box-border flex flex-row items-start justify-start max-w-full px-5 py-0">
                        <div className="flex flex-row items-start justify-start gap-[29px] max-w-full mq450:flex-wrap">
                          <div className="h-[31px] w-[104px] relative">
                            <img
                              className="absolute top-[0px] left-[0px] rounded-41xl w-full h-full cursor-pointer"
                              loading="lazy"
                              alt=""
                              src="/rectangle-1073.svg"
                              onClick={onIonchevronBackCircleIconClick}
                            />
                            <a className="[text-decoration:none] absolute top-[2px] left-[20px] font-bold text-[inherit] inline-block min-w-[65px] z-[1] mq450:text-lgi">
                              Home
                            </a>
                          </div>
                          <div className="h-[31px] w-[98px] relative">
                            <img
                              className="absolute top-[0px] left-[0px] rounded-41xl w-full h-full cursor-pointer"
                              loading="lazy"
                              alt=""
                              src="/rectangle-10835.svg"
                              onClick={onRectangleClick}
                            />
                            <a className="[text-decoration:none] absolute top-[0px] left-[18px] font-bold text-[inherit] inline-block w-[62px] min-w-[62px] z-[1] mq450:text-lgi">
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
                      <div
                        className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-center justify-start pt-[68.6px] px-5 pb-[78px] box-border gap-[27.6px] max-w-full cursor-pointer text-21xl text-black"
                        onClick={onGroupContainerClick}
                      >
                        <img
                          className="w-[502px] h-[315px] relative rounded-xl hidden max-w-full"
                          alt=""
                          src="/rectangle-1072.svg"
                        />
                        <div className="w-[302px] flex flex-row items-start justify-center">
                          <img
                            className="h-[101.8px] w-[103.7px] relative z-[1]"
                            loading="lazy"
                            alt=""
                            src="/addrecord1.svg"
                          />
                        </div>
                        <h3 className="m-0 relative text-inherit leading-[39px] font-semibold font-[inherit] z-[1] mq450:text-5xl mq450:leading-[23px] mq1050:text-13xl mq1050:leading-[31px]">
                          Add Transaction
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[510px] flex flex-row items-start justify-end py-0 px-1 box-border max-w-full text-21xl text-black">
                  <div
                    className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-center justify-start pt-[80.9px] px-5 pb-[61px] box-border gap-[15.3px] max-w-full cursor-pointer"
                    onClick={onGroupContainerClick1}
                  >
                    <div className="w-[502px] h-[315px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen hidden max-w-full" />
                    <div className="flex flex-row items-start justify-start py-0 px-[49px]">
                      <img
                        className="h-[101.8px] w-[103.7px] relative z-[1]"
                        loading="lazy"
                        alt=""
                        src="/valuation.svg"
                      />
                    </div>
                    <h3 className="m-0 w-[201px] h-14 relative text-inherit font-semibold font-[inherit] inline-block shrink-0 z-[1] mq450:text-5xl mq1050:text-13xl">
                      Valuations
                    </h3>
                  </div>
                </div>
              </div>
              <div className="w-[502px] flex flex-col items-start justify-start gap-7 min-w-[502px] max-w-full text-21xl text-black mq750:min-w-full mq1050:flex-1">
                <div className="self-stretch flex flex-col items-center justify-start pt-[80.5px] px-5 pb-[62px] relative gap-[15.7px]">
                  <img
                    className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full cursor-pointer"
                    alt=""
                    src="/rectangle-1072.svg"
                    onClick={onRectangleClick1}
                  />
                  <div className="w-[304px] flex flex-row items-start justify-center">
                    <img
                      className="h-[101.8px] w-[103.7px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/allrec11.svg"
                    />
                  </div>
                  <h3 className="m-0 h-[55px] relative text-inherit font-semibold font-[inherit] inline-block shrink-0 z-[1] mq450:text-5xl mq1050:text-13xl">
                    View All Records
                  </h3>
                </div>
                <div
                  className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-center justify-start pt-[51.2px] px-5 pb-[73px] box-border gap-[33px] max-w-full cursor-pointer"
                  onClick={onGroupContainerClick2}
                >
                  <img
                    className="w-[502px] h-[315px] relative rounded-xl hidden max-w-full"
                    alt=""
                    src="/rectangle-1072.svg"
                  />
                  <div className="flex flex-row items-start justify-start py-0 px-[13px]">
                    <img
                      className="h-[101.8px] w-[103.7px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/analyse2.svg"
                    />
                  </div>
                  <h3 className="m-0 h-14 relative text-inherit font-semibold font-[inherit] inline-block shrink-0 z-[1] mq450:text-5xl mq1050:text-13xl">
                    Budget
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-[1096px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-21xl text-black">
              <div
                className="w-[502px] flex flex-row items-start justify-start max-w-full cursor-pointer"
                onClick={onGroupContainerClick3}
              >
                <div className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-center justify-start pt-[81px] px-5 pb-[65px] box-border gap-[12.2px] max-w-full">
                  <img
                    className="w-[502px] h-[315px] relative rounded-xl hidden max-w-full"
                    alt=""
                    src="/rectangle-1072.svg"
                  />
                  <div className="flex flex-row items-start justify-start px-12 py-0">
                    <img
                      className="h-[101.8px] w-[103.7px] relative z-[1]"
                      loading="lazy"
                      alt=""
                      src="/analyse1.svg"
                    />
                  </div>
                  <h3 className="m-0 w-[200px] h-[55px] relative text-inherit font-semibold font-[inherit] inline-block shrink-0 z-[1] mq450:text-5xl mq1050:text-13xl">
                    Analytics
                  </h3>
                </div>
                <div className="h-[315px] w-[502px] relative hidden max-w-full">
                  <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen w-full h-full" />
                  <div className="absolute top-[195px] left-[127px] font-semibold inline-block w-[247px] h-[55px] mq450:text-5xl mq1050:text-13xl">
                    Predictions
                  </div>
                  <img
                    className="absolute top-[81px] left-[199px] w-[103.7px] h-[101.8px]"
                    alt=""
                    src="/analyse2-1.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinanceDashboardTemplate;
