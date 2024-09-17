import PropTypes from "prop-types";

const VissionMission = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[188px] box-border max-w-full shrink-0 text-left text-13xl text-gray-300 font-single-line-body-base mq450:pb-[79px] mq450:box-border mq1050:pb-[122px] mq1050:box-border ${className}`}
    >
      <div className="flex-1 shadow-[0px_4px_20px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white flex flex-row items-end justify-start pt-[22px] pb-[31px] pl-[123px] pr-[37px] box-border gap-[172px] max-w-full mq450:gap-[43px] mq450:pl-5 mq450:box-border mq750:gap-[86px] mq750:pl-[61px] mq750:pt-5 mq750:pb-5 mq750:box-border mq1225:flex-wrap">
        <div className="h-[704px] w-[1538px] relative shadow-[0px_4px_20px_rgba(0,_0,_0,_0.2)] rounded-xl bg-white hidden max-w-full" />
        <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-3.5 box-border min-w-[544px] max-w-full mq750:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[39.7px] max-w-full mq450:gap-5">
            <div className="w-[514px] flex flex-row items-start justify-start py-0 px-6 box-border max-w-full">
              <div className="flex-1 flex flex-col items-start justify-start gap-[18px] max-w-full">
                <i className="relative font-semibold z-[1] mq450:text-lgi mq750:text-7xl">
                  Our Vision
                </i>
                <div className="self-stretch relative leading-[30px] font-semibold font-roboto text-darkgreen z-[1] mq450:text-lgi mq450:leading-[18px] mq750:text-7xl mq750:leading-[24px]">
                  <p className="m-0">{`"Leading with Sustainability, `}</p>
                  <p className="m-0">Quality, and Innovation."</p>
                </div>
              </div>
            </div>
            <div className="w-[794px] relative text-lg leading-[30px] text-black inline-block max-w-full z-[1]">
              To be a leading coconut cultivation and product provider,
              recognized for our commitment to sustainability, quality and
              innovation, while fostering economic growth and improving the
              livelihoods of our community and stakeholders.
            </div>
            <div className="box-border flex flex-row items-start justify-start max-w-full px-6 py-0">
              <div className="flex flex-col items-start justify-start gap-[21px] max-w-full">
                <div className="flex flex-row items-start justify-start py-0 px-2.5">
                  <i className="relative font-semibold z-[1] mq450:text-lgi mq750:text-7xl">
                    Our Mission
                  </i>
                </div>
                <div className="relative font-semibold font-roboto text-darkgreen z-[1] mq450:text-lgi mq750:text-7xl">
                  <p className="m-0">{`"Excellence in Cultivation, `}</p>
                  <p className="m-0">Quality in Every Product."</p>
                </div>
              </div>
            </div>
            <div className="self-stretch relative text-lg leading-[30px] font-roboto text-black z-[1]">
              Our mission is to cultivate and produce the highest quality
              coconut products through sustainable practices, innovative
              solutions and efficient operations. We aim to provide our
              customers with fresh, GMO-free products while ensuring
              transparency, fostering strong buyer relationships and supporting
              environmental conservation. We strive to achieve excellence in
              every aspect of our business, from plantation management to market
              distribution, contributing to a greener and healthier planet.
            </div>
          </div>
        </div>
        <div className="w-[366px] flex flex-col items-end justify-start min-w-[366px] max-w-full mq750:min-w-full mq1225:flex-1">
          <div className="relative flex flex-row items-start self-stretch justify-start max-w-full">
            <img
              className="h-[389px] flex-1 relative max-w-full overflow-hidden object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/rectangle-1152@2x.png"
            />
            <img
              className="h-[315px] w-[223px] absolute !m-[0] bottom-[-157px] left-[-142px] object-cover z-[2]"
              alt=""
              src="/rectangle-1157@2x.png"
            />
          </div>
          <div className="w-[298px] flex flex-row items-start justify-end py-0 px-[13px] box-border">
            <img
              className="h-[262px] flex-1 relative max-w-full overflow-hidden object-cover z-[3]"
              loading="lazy"
              alt=""
              src="/rectangle-1156@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

VissionMission.propTypes = {
  className: PropTypes.string,
};

export default VissionMission;
