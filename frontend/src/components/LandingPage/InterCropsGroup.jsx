import { useMemo } from "react";
import PropTypes from "prop-types";

const InterCropsGroup = ({
  className = "",
  propPadding,
  propWidth,
  image8,
  propHeight,
  propPadding1,
  banana,
  boostingSoilHealthAndYield,
  propWidth1,
  propAlignSelf,
  rectangle1088,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const frameDiv8Style = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const image8IconStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const fruitNameRowStyle = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const benefitButtonRowsStyle = useMemo(() => {
    return {
      width: propWidth1,
      alignSelf: propAlignSelf,
    };
  }, [propWidth1, propAlignSelf]);

  return (
    <div
      className={`flex-[0.8106] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 flex flex-col items-start justify-start pt-6 pb-[59px] pl-[41px] pr-4 box-border gap-[47px] min-w-[264px] max-w-[301px] text-center text-5xl text-black font-roboto mq450:gap-[23px] mq450:flex-1 ${className}`}
      style={groupDivStyle}
    >
      <div className="w-[301px] h-[339px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gainsboro-200 hidden" />
      <div
        className="w-[180.9px] flex flex-row items-start justify-start py-0 px-3 box-border"
        style={frameDiv8Style}
      >
        <div className="flex-1 flex flex-row items-start justify-start gap-[23.2px]">
          <img
            className="h-[49px] w-[44.6px] relative object-cover z-[1]"
            loading="lazy"
            alt=""
            src={image8}
            style={image8IconStyle}
          />
          <div
            className="flex-1 flex flex-col items-start justify-start pt-3.5 px-0 pb-0"
            style={fruitNameRowStyle}
          >
            <div className="self-stretch relative inline-block [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] min-w-[89.1px] z-[1] mq450:text-lgi">
              {banana}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[22px] text-mini">
        <div className="self-stretch relative font-light z-[1]">
          {boostingSoilHealthAndYield}
        </div>
        <div
          className="w-[222.2px] flex flex-row items-start justify-start py-0 px-[11px] box-border text-5xl"
          style={benefitButtonRowsStyle}
        >
          <div className="h-[46px] flex-1 relative">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
              alt=""
              src={rectangle1088}
            />
            <div className="absolute top-[9px] left-[48.2px] font-semibold inline-block w-[120.1px] h-7 min-w-[120.1px] z-[2] mq450:text-lgi">{`Read more `}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

InterCropsGroup.propTypes = {
  className: PropTypes.string,
  image8: PropTypes.string,
  banana: PropTypes.string,
  boostingSoilHealthAndYield: PropTypes.string,
  rectangle1088: PropTypes.string,

  /** Style props */
  propPadding: PropTypes.any,
  propWidth: PropTypes.any,
  propHeight: PropTypes.any,
  propPadding1: PropTypes.any,
  propWidth1: PropTypes.any,
  propAlignSelf: PropTypes.any,
};

export default InterCropsGroup;
