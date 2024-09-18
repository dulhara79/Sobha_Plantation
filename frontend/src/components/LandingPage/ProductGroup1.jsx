import { useMemo } from "react";
import PropTypes from "prop-types";

const ProductGroup1 = ({
  className = "",
  propBackgroundImage,
  rectangle1116,
  coconutCreamIsAThickRichProd,
  rectangle1088,
}) => {
  const groupDiv2Style = useMemo(() => {
    return {
      backgroundImage: propBackgroundImage,
    };
  }, [propBackgroundImage]);

  return (
    <div
      className={`w-[503px] rounded-xl shrink-0 flex flex-row items-start justify-start pt-[167px] px-0 pb-0 box-border bg-[url('/public/rectangle-1116@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full text-left text-xl text-black font-roboto mq750:pt-[109px] mq750:box-border ${className}`}
      style={groupDiv2Style}
    >
      <img
        className="h-[488px] w-[503px] relative rounded-xl object-cover hidden max-w-full"
        alt=""
        src={rectangle1116}
      />
      <div className="w-[449px] rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 flex flex-col items-start justify-start pt-[53px] pb-[60px] pl-[42px] pr-[18px] box-border gap-[42px] max-w-full z-[1] mq450:gap-[21px] mq450:pl-5 mq450:box-border">
        <div className="w-[449px] h-[321px] relative rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 hidden max-w-full" />
        <div className="self-stretch relative z-[2] mq450:text-base">
          {coconutCreamIsAThickRichProd}
        </div>
        <div className="w-[336.2px] flex flex-row items-start justify-start py-0 px-[68px] box-border max-w-full text-center text-5xl mq450:pl-5 mq450:pr-5 mq450:box-border">
          <div className="h-[46px] flex-1 relative">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[2]"
              alt=""
              src={rectangle1088}
            />
            <div className="absolute top-[9px] left-[48.2px] font-semibold inline-block w-[120.1px] h-7 z-[3] mq450:text-lgi">{`Read more `}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductGroup1.propTypes = {
  className: PropTypes.string,
  rectangle1116: PropTypes.string,
  coconutCreamIsAThickRichProd: PropTypes.string,
  rectangle1088: PropTypes.string,

  /** Style props */
  propBackgroundImage: PropTypes.any,
};

export default ProductGroup1;
