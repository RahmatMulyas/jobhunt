import Image from "next/image";
import main from "@assets/icon/ic_main.svg";
import { useRouter } from "next/router";
import { getToken } from "@helpers/token";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

const HeaderEmployee = ({ logoutHanlder }) => {
  const cookies = new Cookies();
  const router = useRouter();
  const token = getToken();
  const { query } = useRouter();
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      // router.push("/mitra/daftarkonsultasi");
      router.push("/");
    }

    // console.log("router change");
  }, [router]);

  return (
    <>
      <section>
        <div className="tw-w-full tw-h-full">
          <div className="tw-justify-between tw-flex tw-p-6 tw-w-full tw-items-center">
            <div className="tw-w-full tw-pl-5">
              <Image src={main} />
            </div>
            <div className="tw-w-full tw-text-center tw-pt-2">
              <h1 className="tw-text-[20px] tw-font-semibold tw-text-[#414141] tw-font-nunito">
                Data Pegawai
              </h1>
            </div>
            <div className="tw-w-full tw-text-right tw-pr-5">
              <button
                className="lg:tw-w-[100px] tw-border-none tw-rounded-[6px] tw-font-nunito tw-text-[16px] tw-text-primary tw-font-semibold  lg:tw-h-[36px] tw-w-[100px] tw-h-[36px]"
                onClick={logoutHanlder}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderEmployee;
