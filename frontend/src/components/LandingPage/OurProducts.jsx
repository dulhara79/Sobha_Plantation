// import ProductGroup from "./ProductGroup";
// import ProductGroup1 from "./ProductGroup1";
import PropTypes from "prop-types";
import ProductGroup from "./ProductGroup";
import ProductGroup1 from "./ProductGroup1";



const OurProducts = ({ className = "" }) => {
  return (
    <div
      className={`w-[1499px] flex flex-row items-start justify-start py-0 px-[25px] box-border max-w-full text-left text-xl text-black font-roboto ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-center py-0 pl-[34px] pr-5 box-border relative max-w-full">
        <img
          className="h-[45px] w-[45px] absolute !m-[0] top-[209px] right-[0px] overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/oouinextltr.svg"
        />
        <img
          className="h-[45px] w-[45px] absolute !m-[0] top-[211px] left-[0px] overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/oouinextrtl.svg"
        />
        <div className="w-[1289px] overflow-x-auto shrink-0 flex flex-row items-start justify-start gap-[55px] max-w-full mq750:gap-[27px]">
          <ProductGroup
            rectangle1108="/rectangle-1108@2x.png"
            coconutsAreAVersatileFruit="Coconuts are a versatile fruit, providing nutritious water, oil, and flesh, used globally in food, cosmetics, and health products. Known for their hard shell and tropical origins, they thrive in coa"
            rectangle1088="/rectangle-1088-2.svg"
          />
          <ProductGroup
            propBackgroundImage="url('/rectangle-1112@2x.png')"
            rectangle1108="/rectangle-1112@2x.png"
            coconutsAreAVersatileFruit="Coconut oil is derived from the meat of mature coconuts. It's valued for its versatility in cooking, skincare, and haircare, known for its moisturizing properties and health benefits. "
            rectangle1088="/rectangle-1088-2.svg"
          />
          <div className="w-[503px] rounded-xl shrink-0 flex flex-row items-start justify-start pt-[167px] px-0 pb-0 box-border bg-[url('/public/rectangle-1114@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full mq750:pt-[109px] mq750:box-border">
            <img
              className="h-[488px] w-[503px] relative rounded-xl object-cover hidden max-w-full"
              alt=""
              src="/rectangle-1114@2x.png"
            />
            <div className="h-[321px] w-[307px] relative">
              <div className="absolute h-full top-[0px] bottom-[0px] left-[0px] rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 w-[449px] z-[1]" />
              <div className="absolute top-[53px] left-[42px] inline-block w-[389px] h-[120px] z-[2] mq450:text-base">{`Coconut water is the clear liquid inside young coconuts. It's a natural, hydrating drink, rich in electrolytes and low in calories, making it a popular beverage for athletes and health enthusiasts. `}</div>
              <div className="absolute top-[215px] left-[110px] w-[200.2px] h-[46px] text-center text-5xl">
                <img
                  className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[2]"
                  alt=""
                  src="/rectangle-1088-2.svg"
                />
                <div className="absolute top-[9px] left-[48.2px] font-semibold inline-block w-[120.1px] h-7 z-[3] mq450:text-lgi">{`Read more `}</div>
              </div>
            </div>
          </div>
          <ProductGroup1
            rectangle1116="/rectangle-1116@2x.png"
            coconutCreamIsAThickRichProd="Coconut cream is a thick, rich product made from coconut milk. It’s used in cooking and baking to add a creamy texture and coconut flavor to dishes like curries, desserts, and beverages."
            rectangle1088="/rectangle-1088-2.svg"
          />
          <ProductGroup1
            propBackgroundImage="url('/rectangle-1118@2x.png')"
            rectangle1116="/rectangle-1118@2x.png"
            coconutCreamIsAThickRichProd="Coconut milk is a creamy liquid extracted from grated coconut meat. It’s widely used in cooking, adding rich flavor to soups, curries, and desserts, and is a popular dairy alternative."
            rectangle1088="/rectangle-1088-2.svg"
          />
          <div className="w-[475px] rounded-tl-none rounded-tr-xl rounded-b-none shrink-0 flex flex-row items-start justify-start pt-[167px] px-0 pb-0 box-border bg-[url('/public/rectangle-1120@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full mq750:pt-[109px] mq750:box-border">
            <img
              className="h-[488px] w-[475px] relative rounded-tl-none rounded-tr-xl rounded-b-none object-cover hidden max-w-full"
              alt=""
              src="/rectangle-1120@2x.png"
            />
            <div className="w-[424px] rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 flex flex-col items-start justify-start pt-[53px] pb-[60px] pl-[39px] pr-[17px] box-border gap-[42px] max-w-full z-[1] mq450:gap-[21px]">
              <div className="w-[424px] h-[321px] relative rounded-tl-none rounded-tr-xl rounded-b-none bg-gray-1400 hidden max-w-full" />
              <div className="self-stretch relative z-[2] mq450:text-base">
                Coir is a natural fiber extracted from the husk of coconuts.
                It's used in products like ropes, mats, brushes, and as a
                growing medium in horticulture due to its durability and water
                retention properties.
              </div>
              <div className="w-[317.2px] flex flex-row items-start justify-start py-0 px-16 box-border text-center text-5xl mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="h-[46px] flex-1 relative">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[2]"
                    alt=""
                    src="/rectangle-1088-10.svg"
                  />
                  <div className="absolute top-[9px] left-[32.1px] font-semibold inline-block w-[125px] h-7 z-[3] mq450:text-lgi">{`Read more `}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OurProducts.propTypes = {
  className: PropTypes.string,
};

export default OurProducts;
