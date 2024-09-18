import { useMemo } from "react";
import PropTypes from "prop-types";

const ProductGroup = ({
  className = "",
  propBackgroundImage,
  rectangle1108,
  coconutsAreAVersatileFruit,
  rectangle1088,
}) => {
  const groupDiv1Style = useMemo(() => {
    return {
      backgroundImage: propBackgroundImage,
    };
  }, [propBackgroundImage]);

  return (
    <div
      className={`w-[503px] rounded-xl shrink-0 flex flex-row items-start justify-start pt-[173px] px-0 pb-0 box-border bg-[url('/public/rectangle-1108@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full text-left text-xl text-black font-roboto mq750:pt-28 mq750:box-border ${className}`}
      style={groupDiv1Style}
    >
      <img
        className="h-[488px] w-[503px] relative rounded-xl object-cover hidden max-w-full"
        alt=""
        src={rectangle1108}
      />
      <div className="w-[447px] rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 flex flex-col items-start justify-start pt-[53px] pb-[54px] pl-10 pr-[18px] box-border gap-[42px] max-w-full z-[1] mq450:gap-[21px]">
        <div className="w-[447px] h-[315px] relative rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 hidden max-w-full" />
        <div className="self-stretch relative z-[2] mq450:text-base">
          {coconutsAreAVersatileFruit}
        </div>
        <div className="w-[336.2px] flex flex-row items-start justify-start py-0 px-[68px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[46px] flex-1 relative">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[2]"
              alt=""
              src={rectangle1088}
            />
            <div className="absolute top-[9px] left-[48.2px] text-5xl font-semibold font-roboto text-black text-center inline-block w-[120.1px] h-7 min-w-[120.1px] z-[3] mq450:text-lgi">{`Read more `}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductGroup.propTypes = {
  className: PropTypes.string,
  rectangle1108: PropTypes.string,
  coconutsAreAVersatileFruit: PropTypes.string,
  rectangle1088: PropTypes.string,

  /** Style props */
  propBackgroundImage: PropTypes.any,
};

export default ProductGroup;
