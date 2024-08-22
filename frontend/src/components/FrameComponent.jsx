import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <div
      className={`w-[306px] shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke flex flex-col items-start justify-start pt-[94px] px-2 pb-[234.3px] box-border relative gap-[40.5px] text-center text-9xl text-gray-1700 font-roboto mq450:gap-5 mq750:pt-10 mq750:pb-[99px] mq750:box-border mq1050:hidden mq1050:pt-[61px] mq1050:pb-[152px] mq1050:box-border ${className}`}
    >
      <div className="w-[306px] h-[961px] relative shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke hidden z-[0]" />
      <div className="w-[279px] flex flex-col items-start justify-start gap-5">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-7 pr-[38px]">
          <div className="flex-1 flex flex-row items-end justify-between gap-5">
            <div className="flex flex-col items-end justify-start gap-[32.3px]">
              <img
                className="w-[47px] h-[38px] relative rounded-31xl z-[1]"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
              <div className="flex flex-row items-start justify-end py-0 pl-2 pr-1.5">
                <img
                  className="h-[32.5px] w-[32.5px] relative z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vector-1.svg"
                />
              </div>
              <div className="w-[47px] flex flex-row items-start justify-end py-0 pl-[5px] pr-[3px] box-border">
                <img
                  className="h-[38px] w-[38px] relative z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vector-2.svg"
                />
              </div>
            </div>
            <div className="w-[124px] flex flex-col items-start justify-start gap-8">
              <h3 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[75px] z-[1] mq450:text-3xl">
                Home
              </h3>
              <div className="self-stretch flex flex-col items-start justify-start gap-[36.5px] text-left">
                <h3 className="m-0 self-stretch relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
                  Finances
                </h3>
                <h3 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[124px] z-[1] mq450:text-3xl">
                  Inventory
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start pt-[11.5px] pb-0 pl-[53px] pr-[25px] relative gap-[31.1px] z-[2] mq450:gap-4 mq450:pl-5 mq450:box-border">
          <img
            className="h-[36.2px] w-[31.3px] relative z-[1]"
            loading="lazy"
            alt=""
            src="/group-2648.svg"
          />
          <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-limegreen" />
          <h3 className="m-0 h-11 relative text-inherit font-bold font-[inherit] inline-block z-[1] mq450:text-3xl">
            Employees
          </h3>
        </div>
      </div>
      <img
        className="w-[14.4px] h-[8.5px] absolute !m-[0] bottom-[403.8px] left-[66.7px] z-[3]"
        alt=""
        src="/vector-93.svg"
      />
      <div className="w-[277px] flex flex-row items-start justify-start py-0 px-[30px] box-border text-left">
        <div className="flex-1 flex flex-row items-end justify-between gap-5">
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.7px]">
            <div className="flex flex-col items-start justify-start gap-[43px]">
              <div className="flex flex-row items-start justify-start py-0 pl-[3px] pr-1.5">
                <img
                  className="h-9 w-9 relative z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vector-3.svg"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-[39.3px]">
                <img
                  className="w-[37.8px] h-[36.8px] relative z-[1]"
                  loading="lazy"
                  alt=""
                  src="/vector-4.svg"
                />
                <div className="flex flex-row items-start justify-start py-0 pl-1.5 pr-0">
                  <div className="flex flex-col items-start justify-start gap-[33.8px]">
                    <div className="w-[32.5px] h-[35.2px] relative">
                      <img
                        className="absolute top-[0px] left-[0px] w-[32.5px] h-[34.2px] z-[1]"
                        alt=""
                        src="/vector-6.svg"
                      />
                      <img
                        className="absolute top-[9.7px] left-[8px] w-[14.4px] h-[8.5px] z-[2]"
                        alt=""
                        src="/vector-72.svg"
                      />
                      <img
                        className="absolute top-[18.2px] left-[22.4px] w-[3.8px] h-[17px] z-[2]"
                        alt=""
                        src="/vector-82.svg"
                      />
                      <img
                        className="absolute top-[5.4px] left-[15.2px] w-[14.4px] h-[8.5px] z-[4]"
                        alt=""
                        src="/vector-92.svg"
                      />
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 pl-px pr-0">
                      <img
                        className="h-[33.7px] w-[37px] relative z-[1]"
                        loading="lazy"
                        alt=""
                        src="/group-2645.svg"
                      />
                    </div>
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
          <div className="w-[133.6px] flex flex-col items-start justify-start gap-[45.1px]">
            <div className="flex flex-row items-start justify-start py-0 px-[3px]">
              <h3 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[106px] z-[1] mq450:text-3xl">
                Harvest
              </h3>
            </div>
            <h3 className="m-0 relative text-inherit font-bold font-[inherit] text-black z-[1] mq450:text-3xl">
              Crop Care
            </h3>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0.5 pr-0">
              <div className="flex-1 flex flex-col items-start justify-start gap-[42.6px]">
                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-[5px]">
                  <h3 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
                    Products
                  </h3>
                </div>
                <h3 className="m-0 self-stretch relative text-inherit leading-[28px] font-bold font-[inherit] text-center z-[1] mq450:text-3xl mq450:leading-[22px]">
                  Field View
                </h3>
                <div className="w-[100px] flex flex-row items-start justify-start py-0 px-px box-border">
                  <h3 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
                    Buyers
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
