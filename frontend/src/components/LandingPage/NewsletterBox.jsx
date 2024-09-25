import PropTypes from "prop-types";

const NewsletterBox = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-aquamarine flex flex-col items-start justify-start pt-7 px-[102px] pb-[65px] box-border gap-11 min-h-[245px] max-w-full text-center text-29xl text-black font-roboto mq750:gap-[22px] mq750:pl-[25px] mq750:pr-[25px] mq750:box-border mq1050:pl-[51px] mq1050:pr-[51px] mq1050:box-border ${className}`}
    >
      <div className="w-[1533px] h-[245px] relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-aquamarine hidden max-w-full" />
      <h1 className="m-0 w-[612.2px] relative text-inherit font-bold font-[inherit] inline-block max-w-full z-[1] mq450:text-10xl mq750:text-19xl">
        Subscribe to our newsletter.
      </h1>
      <div className="w-[817px] flex flex-row items-start justify-start py-0 px-[5px] box-border max-w-full text-5xl text-gray-1200">
        <div className="flex-1 flex flex-row items-start justify-center flex-wrap content-start gap-[56.4px] max-w-full mq450:gap-7">
          <div className="h-[50px] flex-1 relative min-w-[380px] max-w-full mq750:min-w-full">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
              loading="lazy"
              alt=""
              src="/rectangle-1100.svg"
            />
            <div className="absolute top-[11px] left-[40.5px] inline-block w-[173.1px] h-7 z-[2] mq450:text-lgi">
              Enter your email
            </div>
          </div>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[50px] w-[165.2px] relative">
            <img
              className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
              alt=""
              src="/rectangle-1102.svg"
            />
            <div className="absolute top-[13px] left-[27.7px] text-5xl font-semibold font-roboto text-white text-center inline-block w-[109px] h-[30px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] min-w-[109px] z-[2] mq450:text-lgi">
              Subscribe
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

NewsletterBox.propTypes = {
  className: PropTypes.string,
};

export default NewsletterBox;
