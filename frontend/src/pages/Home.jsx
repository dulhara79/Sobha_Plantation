import PropTypes from "prop-types";
import Header from "../components/Header";
import LandingImage from "../components/LandingPage/LandingImage";
import InterCropSection from "../components/LandingPage/InterCropSection";
import NewsletterBox from "../components/LandingPage/NewsletterBox";
import OurServices from "../components/LandingPage/OurServices";
import OurProducts from "../components/LandingPage/OurProducts";
import VissionMission from "../components/LandingPage/VissionMission";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start px-0 pb-0 box-border leading-[normal] tracking-[normal] text-center text-5xl text-white font-roboto">
      <Header />
      <LandingImage />
      <img
        className="w-full h-[446px] absolute !m-[0] right-[0px] bottom-[42px] left-[0px] max-w-full overflow-hidden shrink-0"
        alt=""
        src="/rectangle-1099.svg"
      />
      <InterCropSection />
      <section className="self-stretch flex flex-col items-start justify-start pt-0 pb-[114px] pl-0 pr-0.5 box-border gap-px max-w-full shrink-0 mq750:pb-[31px] mq750:box-border mq1050:pb-12 mq1050:box-border mq1225:pb-[74px] mq1225:box-border">
        <NewsletterBox />
        <OurServices />
        <OurProducts />
      </section>
      <VissionMission />
    </div>
    <div>
    <Footer />
    </div>
    </div>
  );
};

export default Home;
