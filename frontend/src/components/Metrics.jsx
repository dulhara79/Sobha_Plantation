import PropTypes from "prop-types";

const Metrics = ({ className = "", totalInspections, icons }) => {
  return (
    <div
      className={`w-[359px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-start justify-start py-[29.5px] px-[26px] box-border gap-[25px] max-w-full text-center text-9xl text-black font-roboto ${className}`}
    >
      <div className="self-stretch relative font-medium mq450:text-3xl">
        {totalInspections}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[53px] text-41xl mq450:pl-5 mq450:pr-5 mq450:box-border">
        <b className="flex-1 relative mq1050:text-29xl mq450:text-17xl">
          {icons}
        </b>
      </div>
      <input className="m-0 self-stretch h-[45px]" type="checkbox" />
    </div>
  );
};

Metrics.propTypes = {
  className: PropTypes.string,
  totalInspections: PropTypes.string,
  icons: PropTypes.string,
};

export default Metrics;
=======
import PropTypes from "prop-types";

const Metrics = ({ className = "", totalInspections, icons }) => {
  return (
    <div
      className={`w-[359px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen flex flex-col items-start justify-start py-[29.5px] px-[26px] box-border gap-[25px] max-w-full text-center text-9xl text-black font-roboto ${className}`}
    >
      <div className="self-stretch relative font-medium mq450:text-3xl">
        {totalInspections}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[53px] text-41xl mq450:pl-5 mq450:pr-5 mq450:box-border">
        <b className="flex-1 relative mq1050:text-29xl mq450:text-17xl">
          {icons}
        </b>
      </div>
      <input className="m-0 self-stretch h-[45px]" type="checkbox" />
    </div>
  );
};

Metrics.propTypes = {
  className: PropTypes.string,
  totalInspections: PropTypes.string,
  icons: PropTypes.string,
};

export default Metrics;
