import theme from "@assets/images/themeRegister.png";
import main from "@assets/icon/ic_main.svg";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Form, Field, reduxForm } from "redux-form";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { PopupSuccessData } from "../../Popup/SuccessData";
import { registerUser } from "../../../services/redux/actions/LoginAction";

const state = {};

const RegisterJobhunt = (props) => {
  const router = useRouter();
  const { handleSubmit, registerUser } = props;
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  let iconStyles = { color: "#128ECC", fontSize: "1.5em" };
  // const register = (value) => {
  //   registerUser(value);
  // };

  const register = (value) => {
    registerUser(value);
  };
  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const [saveSuccessModal, setSaveSuccess] = useState(false);

  return (
    <>
      <PopupSuccessData
        show={saveSuccessModal}
        onNo={() => setSaveSuccess(false)}
      />
      <section className="tw-w-full tw-flex tw-flex-row tw-h-full">
        <div className="tw-w-full ">
          <div>
            <Image src={theme} className="tw-w-[100%] tw-h-auto" />
          </div>
        </div>
        <div className="tw-w-full tw-bg-[#ffffff]     tw-px-5 lg:tw-px-2 md:tw-px-2 tw-justify-center md:tw-w-full md:tw-items-center  tw-flex tw-flex-col tw-content-center  ">
          <div className=" lg:tw-pb-[200px] tw-my-auto tw-text-center  tw-w-[450px] lg:tw-w-[452px] tw-pt-10 lg:tw-pt-0 md:tw-pt-0  ">
            <div>
              <h1 className="tw-font-nunito tw-text-[24px] tw-text-[#414141] tw-font-semibold">
                Selamat Datang
              </h1>
            </div>
            <div>
              <h1 className="tw-font-nunito tw-font-normal tw-text-[16px] tw-text-[#414141] tw-opacity-60">
                Mulai perjalanan karirmu bersama JobHunt.id
              </h1>
            </div>
            <form onSubmit={handleSubmit(register)}>
              <div className="tw-pt-[30px]">
                <div className="input-group tw-pt-[24px] lg:tw-w-[452px] md:tw-w-[452px] tw-flex tw-items-center  tw-w-[300px]    tw-relative ">
                  <Field
                    className="tw-opacity-60 lg:tw-h-[45px] form-control  tw-font-normal lg:tw-text-[16px] tw-font-roboto tw-text-[#4C4C4C]/60 lg:tw-w-[452px] tw-h-[45px] tw-w-[300px]  tw-rounded-[4px]  tw-text-[16px]"
                    type="text"
                    title="Username"
                    name="Username"
                    component="input"
                    placeholder="Username"
                  />
                </div>
                <div className="input-group tw-pt-[24px] lg:tw-w-[452px] md:tw-w-[452px] tw-flex tw-items-center  tw-w-[300px]    tw-relative ">
                  <Field
                    className="tw-opacity-60 lg:tw-h-[45px] form-control  tw-font-normal lg:tw-text-[16px] tw-font-roboto tw-text-[#4C4C4C]/60 lg:tw-w-[452px] tw-h-[45px] tw-w-[300px]  tw-rounded-[4px]  tw-text-[16px]"
                    type="text"
                    title="Email"
                    name="Email"
                    component="input"
                    placeholder="Email"
                  />
                </div>
                <div className="input-group tw-pt-[24px] lg:tw-w-[452px] md:tw-w-[452px] tw-flex tw-items-center  tw-w-[300px]   tw-border-[#5C9929] tw-relative ">
                  <Field
                    type={showPassword ? "password" : "text"}
                    className={`form-control   tw-rounded-[4px] tw-opacity-60  tw-font-normal tw-text-[16px] tw-font-roboto  tw-h-[45px] tw-w-[300px]  tw-text-[#4C4C4C]/60 ${
                      validate.validate && validate.validate.password
                        ? "is-invalid "
                        : ""
                    }`}
                    name="Password"
                    placeholder="Kata Sandi"
                    component="input"
                  />
                  <button
                    type="button"
                    style={{ zIndex: 10 }}
                    className=" btn-sm tw-absolute tw-border tw-border-primary tw-rounded-r-[8px] tw-my-3 tw-border-none  tw-right-0 tw-mr-5"
                    onClick={(e) => togglePassword(e)}
                  >
                    {" "}
                    <i className="">
                      {showPassword ? (
                        <AiOutlineEyeInvisible style={iconStyles} />
                      ) : (
                        <AiOutlineEye style={iconStyles} />
                      )}
                    </i>{" "}
                  </button>
                </div>

                <div className="tw-pt-[50px]">
                  <Button
                    // id="open-btn"
                    type="submit"
                    className="lg:tw-h-[45px] tw-normal-case lg:tw-w-[452px] tw-h-[38px] tw-w-[300px]  tw-rounded-[4px]  tw-font-nunito tw-text-[18px]   tw-bg-primary"
                  >
                    Daftar
                  </Button>
                </div>

                <div className="tw-text-center">
                  <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-pt-[32px]">
                    <div>
                      <span className="tw-font-nunito tw-text-[16px] tw-text-[#414141]/90">
                        Sudah punya akun?
                      </span>
                    </div>

                    <div>
                      <Link
                        href="/login/jobhunt"
                        className="tw-no-underline tw-pl-2 tw-text-[16px] tw-text-primary "
                      >
                        Masuk Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (state) => ({
  data: state.authUser,
});

export default reduxForm({ form: "register", enableReinitialize: true })(
  connect(mapStateToProps, mapDispatchToProps)(RegisterJobhunt)
);
