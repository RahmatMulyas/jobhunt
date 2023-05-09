import HeaderMain from "../Layout/Header";
import employee from "@assets/icon/ic_employee.svg";
import Image from "next/image";
import phone from "@assets/icon/ic_phone.svg";
import premium from "@assets/icon/ic_premium.svg";

const LandingPage = () => {
  return (
    <>
      <HeaderMain />
      <section>
        <div className="tw-w-full tw-h-full">
          <div className="tw-px-6 tw-justify-between tw-p-6 tw-flex tw-items-center tw-w-full tw-h-full ">
            <div className="tw-w-full tw-pb-[300px]  tw-pl-5 tw-h-full">
              <div className="tw-w-full tw-h-full">
                <h1 className="tw-text-[46px] tw-font-nunito tw-text-[#414141] tw-font-bold">
                  Temukan Masa Depan Karirmu Sekarang
                </h1>
              </div>
              <div className="tw-w-full tw-h-full tw-pt-2">
                <h1 className="tw-font-roboto tw-font-light tw-text-[18px] tw-text-[#414141]">
                  Kami membantu menghubungkan para job seeker dengan
                  perusahaan-perusahaan terbaik di Indonesia
                </h1>
              </div>
              <div className="tw-pt-10 tw-w-full">
                <div className="tw-w-full tw-flex tw-justify-between ">
                  <div className="tw-w-12/12">
                    <button className="tw-w-[154px] tw-text-[14px] tw-font-nunito tw-text-[#ffffff] tw-rounded-[4px] tw-bg-primary tw-h-[34px]">
                      Selengkapnya
                    </button>
                  </div>
                  <div className="tw-w-full tw-pl-5  ">
                    <div>
                      <button className="tw-border tw-border-primary tw-rounded-[4px] tw-w-[154px] tw-text-primary tw-h-[34px]">
                        <div className="tw-flex tw-justify-center tw-items-center">
                          <Image src={phone} width={24} height={24} />
                          <h1 className="tw-text-[14px] tw-pt-2 tw-pl-[8px] tw-font-nunito tw-font-normal">
                            Hubungi Kami
                          </h1>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-w-full tw-float-right tw-pl-[10%] tw-justify-content-center tw-justify-end ">
              <div className="tw-text-right tw-w-full ">
                <Image className="tw-w-[100%] tw-h-auto" src={employee} />
              </div>
              <div className="tw-pt-8 tw-ml-[300px] tw-w-full tw-text-right tw-justify-end tw-content-end">
                <h1 className="tw-text-[10px]">Get Premium</h1>
                <h2 className="tw-text-[10px]">For Easy Application</h2>
                <div className="tw-rounded-[32px] tw-bg-none tw-w-[326px] tw-h-[76px] tw-flex tw-flex-row">
                  <div className="tw-rounded-[32px] tw-flex tw-bg-[#CEECFA] tw-w-[226px] tw-h-[76px]">
                    <div className="tw-pt-3 tw-animate-spin tw-bg-white tw-shadow-sm tw-pl-3 tw-rounded-[32px] tw-w-[76px] tw-h-[76px]">
                      <Image src={premium} width={50} height={50} />
                    </div>
                    <div className="tw-flex tw-flex-col tw-text-left">
                      <div className="tw-pl-3 tw-pt-3 tw-text-[12px] tw-text-[#128ECC]">
                        {" "}
                        Get Premium
                      </div>
                      <div className="tw-pl-3 tw-pt-1 tw-text-[12px] tw-text-[#414141]">
                        For easy apllication
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
