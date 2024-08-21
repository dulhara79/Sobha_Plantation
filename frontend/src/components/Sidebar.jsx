import PropTypes from "prop-types";

const Sidebar = ({ className = "" }) => {
  return (
    <div
      className={`w-[306px] shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke flex flex-col items-start justify-start pt-[88px] px-2 pb-[240.3px] box-border relative gap-[39.7px] text-left text-9xl text-gray-1700 font-roboto mq1050:hidden mq1050:pt-[57px] mq1050:pb-[156px] mq1050:box-border mq450:gap-5 mq750:pt-[37px] mq750:pb-[101px] mq750:box-border ${className}`}
    >
      <div className="w-[306px] h-[961px] relative shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-31xl rounded-br-31xl rounded-bl-none bg-whitesmoke hidden z-[0]" />
      <div className="w-[279px] flex flex-col items-start justify-start gap-[21px]">
        <div className="w-[206px] flex flex-row items-start justify-start py-0 px-[21px] box-border text-center">
          <div className="flex-1 flex flex-row items-start justify-between gap-5">
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
          <h1 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[114px] z-[1] mq450:text-3xl">
            Finances
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[26px] pr-8">
          <div className="flex-1 flex flex-row items-end justify-between gap-5">
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
                <div className="flex flex-row items-start justify-start py-0 px-px">
                  <h1 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[124px] z-[1] mq450:text-3xl">
                    Inventory
                  </h1>
                </div>
                <h1 className="m-0 h-11 relative text-inherit font-bold font-[inherit] text-center inline-block shrink-0 z-[1] mq450:text-3xl">
                  Employees
                </h1>
              </div>
              <div className="flex flex-row items-start justify-start py-0 px-px">
                <h1 className="m-0 relative text-inherit font-bold font-[inherit] inline-block min-w-[106px] z-[1] mq450:text-3xl">
                  Harvest
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[263px] flex flex-row items-start justify-start py-0 px-[23px] box-border">
        <div className="flex-1 flex flex-row items-end justify-between gap-5">
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
            <h1 className="m-0 relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
              Crop Care
            </h1>
            <div className="self-stretch flex flex-col items-start justify-start gap-[42.5px]">
              <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-[5px]">
                <h1 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
                  Products
                </h1>
              </div>
              <h1 className="m-0 self-stretch relative text-inherit leading-[28px] font-bold font-[inherit] text-center z-[1] mq450:text-3xl mq450:leading-[22px]">
                Field View
              </h1>
              <div className="w-[100px] flex flex-row items-start justify-start py-0 px-px box-border">
                <h1 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] z-[1] mq450:text-3xl">
                  Buyers
                </h1>
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
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
