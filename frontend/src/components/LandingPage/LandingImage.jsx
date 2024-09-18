import PropTypes from "prop-types";

const LandingImage = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-10 box-border max-w-full shrink-0 text-left text-76xl text-white font-roboto-serif ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start pt-12 px-[200px] pb-[83px] box-border gap-[31px] bg-[url('/public/rectangle-1104@2x.png')] bg-cover bg-no-repeat bg-[top] min-h-[600px] max-w-full z-[2] mq750:gap-[15px] mq750:pt-[31px] mq750:px-[50px] mq750:pb-[54px] mq750:box-border mq1050:pl-[100px] mq1050:pr-[100px] mq1050:box-border">
        <img
          className="w-[1535px] h-[600px] relative object-cover hidden max-w-full"
          alt=""
          src="/rectangle-1104@2x.png"
        />
        <div className="w-[580px] flex flex-row items-start justify-start py-0 px-[5px] box-border max-w-full">
          <h1 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] inline-block max-w-full z-[1] mq450:text-9xl mq750:text-28xl">
            Sobha Plantations
          </h1>
        </div>
        <div className="w-[577px] flex flex-col items-start justify-start gap-[23px] max-w-full text-center text-5xl font-roboto">
          <div className="self-stretch relative font-medium z-[1] mq450:text-lgi">
            Welcome to Sobha Plantation: Your trusted partner in premium coconut
            cultivation, ensuring quality and sustainability. Discover
            transparency, real-time updates, and the best coconut products
            straight from Kurunegala.
          </div>
          <div className="w-[564.5px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-black">
            <div className="h-[46px] w-[252.5px] relative">
              <img
                className="absolute top-[0px] left-[0px] rounded-xl w-full h-full z-[1]"
                loading="lazy"
                alt=""
                src="/rectangle-1088.svg"
              />
              <a className="[text-decoration:none] absolute top-[9px] left-[49.5px] font-semibold text-[inherit] inline-block w-[151.5px] h-7 whitespace-nowrap z-[2] mq450:text-lgi">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

LandingImage.propTypes = {
  className: PropTypes.string,
};

export default LandingImage;
