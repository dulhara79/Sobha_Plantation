import { useMemo } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const Template = ({
  className = "",
  rectangleDivAlignSelf,
  rectangleDivWidth,
  image13,
}) => {
  const templateStyle = useMemo(() => {
    return {
      alignSelf: rectangleDivAlignSelf,
      width: rectangleDivWidth,
    };
  }, [rectangleDivAlignSelf, rectangleDivWidth]);

  return (
    <header
      className={`self-stretch shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row items-start justify-center pt-[11px] px-5 pb-2.5 box-border gap-[287px] top-[0] z-[99] sticky max-w-full lg:gap-[143px] mq450:gap-9 mq750:gap-[72px] ${className}`}
      style={templateStyle}
    >
      <div className="h-[63px] w-[1535px] relative shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] bg-white hidden max-w-full" />
      <img
        className="self-stretch w-[153px] relative max-h-full object-cover min-h-[42px] z-[1]"
        loading="lazy"
        alt=""
        src={image13}
      />
      <nav className="m-0 flex flex-row items-start justify-start gap-[18px] max-w-full text-left text-5xl text-black font-roboto mq750:hidden">
        <div className="shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver flex flex-row items-start justify-start pt-1.5 pb-[7px] pl-[22px] pr-[21px] z-[1] font-single-line-body-base">
          <div className="h-[42px] w-[117px] relative shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver hidden" />
          <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[74px] z-[1]">
            Home
          </a>
        </div>
        <div className="flex flex-col items-start justify-start py-0 pl-0 pr-2">
          <div className="shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver flex flex-row items-start justify-start py-[7px] pl-5 pr-2.5 z-[1]">
            <div className="h-[42px] w-[127px] relative shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver hidden" />
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[97px] z-[2]">
              Products
            </a>
          </div>
        </div>
        <div className="shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver flex flex-row items-start justify-start pt-2.5 pb-1 pl-[19px] pr-[11px] whitespace-nowrap z-[1]">
          <div className="h-[42px] w-[117px] relative shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-31xl bg-silver hidden" />
          <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[87px] z-[1]">
            Visit Us
          </a>
        </div>
      </nav>
      <div className="w-[182.5px] flex flex-row items-start justify-start gap-[23px]">
        <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
          <img
            className="w-9 h-[35px] relative z-[1]"
            loading="lazy"
            alt=""
            src="/iconoirprofilecircle.svg"
          />
        </div>
        <Button
          className="h-[42px] flex-1 shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] z-[1]"
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "24",
            background: "#3acc63",
            borderRadius: "50px",
            "&:hover": { background: "#3acc63" },
            height: 42,
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

Template.propTypes = {
  className: PropTypes.string,
  image13: PropTypes.string,

  /** Style props */
  rectangleDivAlignSelf: PropTypes.any,
  rectangleDivWidth: PropTypes.any,
};

export default Template;
