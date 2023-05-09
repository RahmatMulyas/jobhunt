import Image from "next/image";
import main from "@assets/icon/ic_main.svg";
import { useRouter } from "next/router";
const HeaderMain = () => {
  const router = useRouter();

  return (
    <>
      <section>
        <div className="tw-w-full tw-h-full">
          <div className="tw-justify-between tw-flex tw-p-6 tw-w-full">
            <div className="tw-w-full tw-pl-5">
              <Image src={main} />
            </div>
            <div className="tw-w-full tw-text-right tw-pr-5">
              <button
                className="lg:tw-w-[100px] tw-border tw-rounded-[6px] tw-font-nunito tw-text-[16px] tw-text-primary tw-font-semibold tw-border-primary lg:tw-h-[36px] tw-w-[100px] tw-h-[36px]"
                onClick={() => {
                  router.push("/login/jobhunt");
                }}
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderMain;
