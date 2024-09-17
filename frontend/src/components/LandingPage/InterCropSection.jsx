// import InterCropsGroup from "./InterCropsGroup";
import PropTypes from "prop-types";
import InterCropsGroup from "./InterCropsGroup";


const InterCropSection = ({ className = "" }) => {
  return (
    <section
      className={`w-[1516px] flex flex-row items-start justify-center pt-0 px-5 pb-[18px] box-border max-w-full shrink-0 text-left text-45xl text-black font-roboto ${className}`}
    >
      <div className="w-[1340px] flex flex-col items-start justify-start gap-[29px] max-w-full">
        <div className="w-[735px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full mq750:pl-[21px] mq750:pr-[21px] mq750:box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-[11px] max-w-full">
            <div className="self-stretch h-px relative [filter:drop-shadow(0px_4px_4px_rgba(0,_0,_0,_0.25))] border-gainsboro-100 border-t-[1px] border-solid box-border" />
            <h1 className="m-0 w-[447px] relative text-inherit font-semibold font-[inherit] inline-block max-w-full mq450:text-19xl mq750:text-32xl">
              Inter-crops
            </h1>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[51px] max-w-full text-center text-5xl mq750:gap-[25px]">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[22px] pr-0 box-border max-w-full">
            <div className="flex-1 flex flex-row items-end justify-center gap-[38px] max-w-full mq750:gap-[19px] mq1225:flex-wrap">
              <div className="flex-[0.8106] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 flex flex-col items-start justify-start pt-[31px] pb-[59px] pl-[41px] pr-4 box-border gap-[49px] min-w-[264px] max-w-[301px] mq450:gap-6 mq450:flex-1">
                <div className="w-[301px] h-[339px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 hidden" />
                <div className="self-stretch flex flex-col items-start justify-start gap-[38px]">
                  <div className="w-[196px] flex flex-row items-start justify-start py-0 px-[11px] box-border">
                    <div className="flex-1 flex flex-row items-start justify-start gap-[18px]">
                      <img
                        className="h-11 w-[37px] relative z-[1]"
                        loading="lazy"
                        alt=""
                        src="/vector1.svg"
                      />
                      <div className="flex flex-col items-start justify-start flex-1 px-0 pt-3 pb-0">
                        <div className="self-stretch relative [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] z-[1] mq450:text-lgi">
                          Pineapple
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch relative text-mini font-light z-[1]">
                    Experience the finest coconuts with Sobha Plantation. Fresh,
                    sustainable, and quality-assured, straight from Kurunegala
                    to you.
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[21px] pr-[29px]">
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[46px] flex-1 relative">
                    <img
                      className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
                      alt=""
                      src="/rectangle-1088-1.svg"
                    />
                    <div className="absolute top-[9px] left-[38.1px] text-5xl font-semibold font-roboto text-black text-center inline-block w-[117px] h-[30px] min-w-[117px] z-[2] mq450:text-lgi">{`Read more `}</div>
                  </button>
                </div>
              </div>
              <InterCropsGroup
                image8="/image-8@2x.png"
                banana="Banana"
                boostingSoilHealthAndYield="Boosting soil health and yield, banana intercropping enriches Sobha Plantation. It supports ecosystem balance and maximizes land use efficiently."
                rectangle1088="/rectangle-1088-2.svg"
              />
              <InterCropsGroup
                propPadding="31px 17px 59px 40px"
                propWidth="169px"
                image8="/image-7@2x.png"
                propHeight="44px"
                propPadding1="7px 0px 0px"
                banana="Papaya"
                boostingSoilHealthAndYield="Papaya intercropping enhances biodiversity and productivity at Sobha Plantation, promoting sustainable farming practices and providing nutritional value."
                propWidth1="unset"
                propAlignSelf="stretch"
                rectangle1088="/rectangle-1088-3.svg"
              />
              <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border min-w-[264px] max-w-[301px]">
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 flex flex-col items-start justify-start pt-[33px] pb-[59px] pl-[49px] pr-2 gap-[43px] mq450:gap-[21px] mq450:pl-5 mq450:box-border">
                  <div className="w-[301px] h-[339px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 hidden" />
                  <div className="w-[174px] flex flex-row items-start justify-start py-0 px-[15px] box-border">
                    <div className="flex-1 flex flex-row items-start justify-start gap-[10.9px]">
                      <img
                        className="h-11 w-11 relative object-cover z-[1]"
                        loading="lazy"
                        alt=""
                        src="/image-9@2x.png"
                      />
                      <div className="flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                        <div className="self-stretch relative [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] z-[1] mq450:text-lgi">
                          Pepper
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[22px] text-mini">
                    <div className="self-stretch relative font-light z-[1]">
                      Enhancing soil fertility and pest control, black pepper
                      intercropping at Sobha Plantation ensures high-quality
                      spice production with sustainable agricultural methods.
                    </div>
                    <div className="w-[221.1px] flex flex-row items-start justify-start py-0 px-[9px] box-border text-5xl">
                      <div className="h-[46px] flex-1 relative">
                        <img
                          className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
                          alt=""
                          src="/rectangle-1088-4.svg"
                        />
                        <div className="absolute top-[9px] left-[39.8px] font-semibold inline-block w-[121.8px] h-7 min-w-[121.8px] z-[2] mq450:text-lgi">{`Read more `}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[323px] h-[87px] relative max-w-full">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full"
              alt=""
            />
            <button className="cursor-pointer [border:none] pt-[18px] px-[34px] pb-[15px] bg-[transparent] absolute top-[12px] left-[23px] w-[265px] flex flex-row items-start justify-start box-border">
              <i className="w-[154px] relative text-5xl inline-block font-roboto text-gray-1100 text-center shrink-0 z-[2] mq450:text-lgi">
                Place an Order
              </i>
              <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px]">
                <img
                  className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full z-[1]"
                  alt=""
                  src="/rectangle-1103.svg"
                />
                <img
                  className="absolute h-[calc(100%_-_7px)] top-[4px] bottom-[3px] left-[203px] max-h-full w-[49px] overflow-hidden z-[2]"
                  alt=""
                  src="/grommeticonslinknext.svg"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

InterCropSection.propTypes = {
  className: PropTypes.string,
};

export default InterCropSection;
