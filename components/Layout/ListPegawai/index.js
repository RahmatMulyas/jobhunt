import edit from "@assets/icon/edit.svg";
import Image from "next/image";
import deletes from "@assets/icon/delete.svg";
import { Button } from "react-bootstrap";
import add from "@assets/icon/ic_plus.svg";
import { useEffect, useState } from "react";
import { PopupDeleteDialog } from "../../Popup/DeleteDialog";
import { PopupSuccessDelete } from "../../Popup/SuccessDelete";
import MenuEmployee from "../MenuEmployee";
import axiosClient from "../../../services/Libs/axios";
import { PopupKirim } from "../../Popup/Dialog";
import { Controller, useForm } from "react-hook-form";
import { PopupSuccessData } from "../../Popup/SuccessData";
import { useRouter } from "next/router";

export const FormDataListPegawai = ({
  onYes = () => {},
  dataPegawai = [],
  handleBack = () => {},
  namaPegawai,
  tglLahir,
  alamatLengkap,
  KodeProvinsi,
  age,
  kodeKota,
  keahlian,
  levelpekerjaan,
  sertifikasi,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [dataIndexPegawai, setDataIndexPegawai] = useState([]);
  const [deleteDialohModal, setDialogDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successData, setSuccessData] = useState(false);
  const [kirimData, setKirimData] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setDataIndexPegawai(dataPegawai);
  }, [dataPegawai]);

  //State List Pegawai test
  const [DataPegawai, setDataPegawai] = useState([]);
  const [pegawaiMethod, setPegawaiMethod] = useState("");
  const [modalPegawai, setShowModalPegawai] = useState(false);
  const [dataPegawaisa, setShowDataPegawai] = useState({});
  const [pegawaiIndex, setPegawaiIndex] = useState(0);
  const [dataPegawaiSementara, setShowDataPegawaiSementara] = useState();
  const [isUbahPegawai, setIsUbahPegawai] = useState({});
  const [datapegawais, setDatapegawai] = useState([]);
  const [seeDetails, setSeeDetails] = useState(false);
  const [postData, setDataPost] = useState();
  console.log(dataIndexPegawai, "apa");

  const handleSubmitDetailPegawai = (namaPegawai) => {
    let defPegawai = dataIndexPegawai;
    if (!defPegawai) {
      defPegawai = [];
    }

    if (pegawaiMethod == "edit") {
      defPegawai[pegawaiIndex] = [
        {
          NamaLengkap: namaPegawai,
          TanggalLahir: tglLahir,
          AlamatLengkap: alamatLengkap,
          Kd_Provinsi: KodeProvinsi,
          Umur: age,
          Kd_Kota: kodeKota,
          Keahlian: keahlian.map((keahlian) => ({
            RincianDeskripsi: keahlian.RincianDeskripsi,
            Remark: keahlian.isCheck ? keahlian.Remark : "",
            isCheck: keahlian.isCheck,
          })),
          LevelPekerjaan: levelpekerjaan.map((pekerjaan) => ({
            RincianDeskripsi: pekerjaan.RincianDeskripsi,
            Remark: pekerjaan.isCheck ? pekerjaan.Remark : "",
            isCheck: pekerjaan.isCheck,
          })),
          Sertifikasi: sertifikasi,
        },
      ];
    }
    setDataPegawai(defPegawai);
    setSeeDetails(false);
  };

  const handleSubmitData = (data) => {
    setKirimData(true);
    setDataPost(data);
  };

  const handleSend = async (data) => {
    let payload = {
      Data: [
        {
          NamaLengkap: dataIndexPegawai[0]?.NamaLengkap,
          TanggalLahir: dataIndexPegawai[0]?.TanggalLahir,
          AlamatLengkap: dataIndexPegawai[0]?.AlamatLengkap,
          Kd_Provinsi: dataIndexPegawai[0]?.Kd_Provinsi,
          Kd_Kota: dataIndexPegawai[0]?.Kd_Kota,
          Keahlian: dataIndexPegawai[0]?.Keahlian,
          Sertifikasi: dataIndexPegawai[0]?.Sertifikasi,
          Umur: dataIndexPegawai[0]?.Umur,
        },
      ],
    };

    let url = "/daftar_pegawai";

    await axiosClient(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then(async (res) => {
        const resp = await res;
        if (resp?.error) {
          throw resp?.error;
        } else {
          setSuccessData(true);
          router.push("/");
          reset();
        }
      })
      .catch(async (err) => {
        const tews = await err;
        if (tews?.response?.data?.message === "Bad Request") {
          setErrorMessage(`${tews?.response?.data?.errors}`);
        } else {
          setErrorMessage(`${tews?.response?.data?.message}`);
        }
      });
  };

  if (seeDetails) {
    return (
      <>
        <MenuEmployee
          method={pegawaiMethod}
          onSuccess={handleSubmitDetailPegawai}
        />
      </>
    );
  } else {
    return (
      <>
        <PopupSuccessData
          onNo={() => {
            setSuccessData(false);
          }}
          show={successData}
        />
        <PopupSuccessDelete
          onNo={() => {
            setSuccessDelete(false);
          }}
          show={successDelete}
        />
        <PopupKirim
          show={kirimData}
          onNo={() => {
            setKirimData(false);
          }}
          onYes={() => {
            handleSend(postData);
            setKirimData(false);
          }}
        />
        <section>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="tw-justify-center tw-flex lg:tw-pt-[10px]">
              <div className="tw-flex-none tw- tw-w-full lg:tw-w-6/12">
                <ul className="tw-pl-0">
                  {dataIndexPegawai?.length > 0 &&
                    dataIndexPegawai?.map((item, key) => (
                      <div className="tw-w-full tw-h-full tw-pt-8">
                        <li className="tw-flex tw-flex-row tw-mb-4 tw-justify-between tw-w-full tw-items-center">
                          <div className="tw-flex tw-flex-row tw-mb-4 tw-justify-between tw-w-full tw-items-center">
                            <div className="tw-text-left tw-pt-2">
                              <h1 className="tw-font-nunito tw-font-normal tw-text-[14px] tw-text-[#414141]/90">
                                {item?.NamaLengkap}
                              </h1>{" "}
                            </div>

                            <div className="tw-flex tw-flex-row tw-space-x-5">
                              <button
                                type="button"
                                onClick={() => {
                                  //   setDiagnosaMethod("edit");
                                  //   setDiagnosaIndex(key);
                                  //   setShowModalDiagnosa(true);
                                  //   setIsUbahDiagnosa(true);
                                  handleBack();
                                }}
                              >
                                <Image src={edit} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const defList = dataIndexPegawai;
                                  defList.splice(key, 1);
                                  setDataIndexPegawai(defList);
                                  setSuccessDelete(true);
                                }}
                              >
                                <Image src={deletes} />
                              </button>
                            </div>
                          </div>
                        </li>
                        <hr></hr>
                      </div>
                    ))}
                </ul>

                <div className="tw-pt-7">
                  <button
                    className="tw-flex tw-border-none tw-space-x-2 tw-items-center tw-w-[179px] tw-h-[38px] tw-bg-inherit  tw-text-primary tw-text-[16px]"
                    onClick={() => {
                      setPegawaiMethod("add");
                      setSeeDetails(true);
                      setShowDataPegawai({});
                      setShowDataPegawaiSementara({});
                      setIsUbahPegawai(false);
                    }}
                  >
                    <div className=" tw-w-[38px] tw-h-[38px] tw-border tw-rounded-[4px] tw-border-[#E0E0E0]">
                      <Image src={add} />
                    </div>
                    <div className="tw-text-[#128ECC] tw-font-semibold tw-text-[16px]">
                      Tambah Pegawai
                    </div>
                  </button>
                </div>
                <div className="tw-pt-5">
                  <h1 className="tw-font-nunito tw-text-[12px] tw-text-[#414141] tw-opacity-70">
                    Tambah jika anda ingin mendaftarkan lebih dari satu pegawai
                  </h1>
                </div>

                {errorMessage !== "" && (
                  <div className="tw-col-span-2">
                    <span className="tw-text-red-500 tw-font-normal tw-text-base">
                      {errorMessage}
                    </span>
                  </div>
                )}
                <div className="lg:tw-w-full tw-pt-[100px]">
                  <Button
                    type="submit"
                    className="tw-border-none tw-w-full tw-bg-primary"
                  >
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </>
    );
  }
};
