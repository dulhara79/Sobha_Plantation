import { useCallback } from "react";
import GroupComponent from "../../components/GroupComponent";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";

const SalesDashboardTemplate = () => {
  const navigate = useNavigate();

  const onIonchevronBackCircleIconClick = useCallback(() => {
    navigate("/sales-and-finance-dashboard-template");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/finance-dashboard-template");
  }, [navigate]);

  const onRectangleClick = useCallback(() => {
    navigate("/sales-add-record-dashboard-template");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/sales-view-all-record-dashboard-template");
  }, [navigate]);

  const onAnalyticsIconBackgroundClick = useCallback(() => {
    navigate("/sales-analyse-dashboard-template");
  }, [navigate]);

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-left text-21xl text-black font-roboto">
      <GroupComponent
        image14="/image-132@2x.png"
        userIcon="/usericon4.svg"
        navigationMarginTop="unset"
        navigationTop="0"
      />
      <div className="w-[502px] h-[315px] relative hidden max-w-full">
        <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen w-full h-full" />
        <div className="absolute top-[257px] left-[148px] font-semibold mq1050:text-13xl mq450:text-5xl">
          Predictions
        </div>
        <img
          className="absolute top-[115px] left-[208px] w-[86px] h-[86px]"
          alt=""
          src="/analyse2.svg"
        />
      </div>
      <main className="w-[1448px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border relative gap-[91px] max-w-full mq750:gap-[45px] mq1050:pl-5 mq1050:box-border mq450:gap-[23px]">
        <img
          className="h-[35px] w-[38px] absolute !m-[0] top-[26px] left-[359px] overflow-hidden shrink-0 cursor-pointer"
          loading="lazy"
          alt=""
          src="/ionchevronbackcircle3.svg"
          onClick={onIonchevronBackCircleIconClick}
        />
        <Menu
          homeIcon="/vector4.svg"
          financesIcon="/vector-17.svg"
          inventoryIcon="/vector-26.svg"
          group2644="/group-26443.svg"
          employeesIcon="/vector-35.svg"
          customerRelationsIcon="/vector-45.svg"
          customerIcon="/vector-55.svg"
          customerIcons="/vector-63.svg"
          customerIcon1="/vector-73.svg"
          customerIcons1="/vector-83.svg"
          group2645="/group-26453.svg"
          raphaelcustomer="/raphaelcustomer3.svg"
          divider="/vector-93.svg"
        />
        <section className="flex-1 flex flex-col items-start justify-start pt-7 px-0 pb-0 box-border max-w-[calc(100%_-_397px)] text-left text-5xl text-white font-roboto mq1050:max-w-full">
          <div className="self-stretch flex flex-col items-end justify-start gap-[59px] max-w-full mq750:gap-[29px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[99px] max-w-full mq750:gap-[25px] mq1050:gap-[49px]">
              <div className="box-border flex flex-row items-start justify-start max-w-full px-5 py-0">
                <div className="flex flex-row items-start justify-start gap-[29px] max-w-full mq450:flex-wrap">
                  <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex flex-row items-start justify-start pt-0.5 pb-px pl-5 pr-[19px]">
                    <img
                      className="h-[31px] w-[104px] relative rounded-41xl hidden"
                      alt=""
                      src="/rectangle-1073.svg"
                    />
                    <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[65px] z-[1] mq450:text-lgi">
                      Home
                    </a>
                  </div>
                  <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-teal flex flex-row items-start justify-start pt-0 px-[18px] pb-[3px]">
                    <img
                      className="h-[31px] w-[98px] relative rounded-41xl hidden"
                      alt=""
                      src="/rectangle-1083.svg"
                    />
                    <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[62px] z-[1] mq450:text-lgi">
                      Sales
                    </a>
                  </div>
                  <div
                    className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-41xl bg-mediumspringgreen flex flex-row items-start justify-start pt-px px-5 pb-0.5 cursor-pointer"
                    onClick={onGroupContainerClick}
                  >
                    <img
                      className="h-[31px] w-[127px] relative rounded-41xl hidden"
                      alt=""
                      src="/rectangle-1083.svg"
                    />
                    <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[85px] z-[1] mq450:text-lgi">
                      Finance
                    </a>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[39px] max-w-full text-21xl text-black mq750:gap-[19px] mq1050:flex-wrap">
                <div className="w-[490px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border min-w-[490px] max-w-full mq750:min-w-full mq1050:flex-1">
                  <div className="self-stretch flex flex-col items-center justify-start pt-[115px] px-5 pb-[22px] relative gap-[43px] mq450:gap-[21px]">
                    <img
                      className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full cursor-pointer"
                      alt=""
                      src="/rectangle-1077.svg"
                      onClick={onRectangleClick}
                    />
                    <div className="flex flex-row items-start justify-start py-0 px-[62px]">
                      <img
                        className="h-[86px] w-[86px] relative z-[1]"
                        loading="lazy"
                        alt=""
                        src="/addrecord1.svg"
                      />
                    </div>
                    <h3 className="m-0 relative text-inherit font-semibold font-[inherit] z-[1] mq1050:text-13xl mq450:text-5xl">
                      Add Record
                    </h3>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-end py-[17px] pl-[99px] pr-5 box-border relative min-w-[326px] min-h-[315px] max-w-full mq450:pl-5 mq450:box-border">
                  <div className="w-full !m-[0] absolute top-[0px] left-[0px] flex flex-row items-start justify-start max-w-full h-full">
                    <img
                      className="h-[315px] flex-1 relative rounded-xl max-w-full overflow-hidden cursor-pointer"
                      alt=""
                      src="/rectangle-1072.svg"
                      onClick={onRectangleClick1}
                    />
                    <img
                      className="h-[86px] w-[86px] absolute !m-[0] bottom-[114px] left-[calc(50%_-_43px)] z-[1]"
                      loading="lazy"
                      alt=""
                      src="/allrec11.svg"
                    />
                  </div>
                  <h3 className="m-0 relative text-inherit font-semibold font-[inherit] z-[1] mq1050:text-13xl mq450:text-5xl">
                    View All Records
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-[1012px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-21xl text-black">
              <div className="w-[490px] flex flex-col items-center justify-start pt-[115px] px-5 pb-[22px] box-border relative gap-[43px] max-w-full">
                <div
                  className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-palegreen cursor-pointer"
                  onClick={onAnalyticsIconBackgroundClick}
                />
                <div className="flex flex-row items-start justify-start py-0 px-[41px]">
                  <img
                    className="h-[86px] w-[86px] relative z-[1]"
                    loading="lazy"
                    alt=""
                    src="/analyse1.svg"
                  />
                </div>
                <h3 className="m-0 relative text-inherit font-semibold font-[inherit] z-[1] mq1050:text-13xl mq450:text-5xl">
                  Analytics
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SalesDashboardTemplate;