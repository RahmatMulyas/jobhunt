import { useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import tambah from "@assets/icon/ic_add.svg";
import Image from "next/image";
import {
  API_KOTA,
  API_PROVINSI,
  LIST_JOB,
  LIST_KEAHLIAN,
  LIST_PEKERJAAN,
  LIST_RIWAYAT_PENYAKIT,
} from "../../../services/Helpers/constant";
import { PopupAddSertifikasi } from "../../Popup/AddSertifikasi";
import { getKota } from "../../../services/Libs/hooks/Kota/useKota";
import { getKecamatan } from "../../../services/Libs/hooks/Kecamatan/useKecamatan";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { getToken } from "@helpers/token";
import axiosClient from "../../../services/Libs/axios";
import { AsyncPaginate } from "react-select-async-paginate";
import { PopupSuccessData } from "../../Popup/SuccessData";
import edit from "@assets/icon/edit.svg";
import useBidang from "../../../services/Libs/hooks/Bidang/useBidang";
import { FormDataListPegawai } from "../ListPegawai";

const MenuEmployee = ({ method = "add", onSuccess = () => {} }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();

  const cookies = new Cookies();
  const router = useRouter();
  const token = getToken();
  const { pathname } = router;
  console.log(method, "Jenis Methodnya");
  //State Pegawai

  const [age, setAge] = useState("");
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [ListKeahlian, setListKeahlian] = useState([...LIST_KEAHLIAN]);

  const [ListPekerjaan, setListPekerjaan] = useState([...LIST_JOB]);

  //Set Dropdown Paginate
  const [namaProvinsi, setNamaProvinsi] = useState("");
  const [kodeProvinsi, setKodeProvinsi] = useState("");
  const [namaKota, setNamaKota] = useState("");
  const [kodeKota, setKodeKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [value, onChange] = useState(null);
  const [previousSearch, setPreviousSearch] = useState("");
  const [previousSearchKota, setPreviousSearchKota] = useState("");
  const [seeDetail, setSeeDetail] = useState(false);

  //State Sertifikasi
  const [errorMessage, setErrorMessage] = useState("");
  const [DataSertifikasi, setDataSertifikasi] = useState([]);
  const [sertifikasiMethod, setSertifikasiMethod] = useState("");
  const [modalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [dataSertifikasi, setShowDataSertifikasi] = useState({});
  const [sertiikasiIndex, setSertifikasiIndex] = useState(0);
  const [dataSertifikasiSementara, setShowDataSertifikasiSementara] =
    useState();
  const [isChecked, setIsChecked] = useState(false);
  const [keahlians, setKeahlians] = useState([]);
  const [NamaPegawais, setNamaPegawais] = useState("");
  const [dataPegawai, setDataPegawai] = useState();
  const [isUbahSertifikasi, setIsUbahSertifikasi] = useState({});
  const [datasertifikasi, setDatasertifikasi] = useState([]);
  const [saveSuccessModal, setSaveSuccess] = useState(false);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      // router.push("/mitra/daftarkonsultasi");
      router.push("/");
    }

    // console.log("router change");
  }, [router]);

  const loadOptions = async (search, prevOptions) => {
    let url;
    let option;
    let hasMore = false;
    if (search) {
      if (search === previousSearch) {
        url = `${API_PROVINSI}?provinsi=${search}&size=5&page=${currentPage}`;
      } else {
        url = `${API_PROVINSI}?provinsi=${search}&size=5&page=1`;
      }

      setPreviousSearch(search);
    } else {
      url = `${API_PROVINSI}?&size=5page=${currentPage}`;
    }

    await axiosClient({
      url,
      method: "get",
    }).then((response) => {
      const datas = response.data.data;
      const { page, total } = response.data.meta;
      setCurrentPage(page + 1);
      hasMore = page < total;
      option = datas.map((provinsi) => ({
        value: provinsi?.Kd_Provinsi,
        label: provinsi?.NamaProvinsi,
      }));
    });

    return {
      options: option,
      hasMore,
    };
  };

  const loadOptioned = async (searchs, prevOptions) => {
    let url;
    let options;
    let hasMore = false;
    if (searchs) {
      if (searchs === previousSearchKota) {
        url = `${API_KOTA}?kota=${namaProvinsi}&size=6&page=${currentPage}`;
      } else {
        url = `${API_KOTA}?kota=${namaProvinsi}&size=6&page=1`;
      }

      setPreviousSearchKota(searchs);
    } else {
      url = `${API_KOTA}?&size=10page=${currentPage}`;
    }

    await axiosClient({
      url,
      method: "get",
    }).then((response) => {
      const datas = response.data.data;
      const { page, total } = response.data.meta;
      setCurrentPage(page + 1);
      hasMore = page < total;
      options = datas.map((kota) => ({
        value: kota?.Kd_Kota,
        label: kota?.NamaKota,
      }));
    });

    return {
      options: options,
      hasMore,
    };
  };

  useEffect(() => {
    let active = true;
    loadOptions();
    return () => {
      active = false;
    };
  }, [pathname]);
  useEffect(() => {
    let active = true;
    loadOptioned();
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (method == "add") {
      setNamaPegawais(NamaPegawais, "");
    }
  });

  const [listKeahlian, setListkeahlian] = useState({});

  const handleChangeKeahlian = (event) => {
    const { name, value, checked } = event.target;

    setListkeahlian((curr) => event.target.value);
    // console.log(Is_FollowUp);

    setListkeahlian({
      listKeahlian,
      [name]: value.toString(),
    });
    setKeahlians({
      ...dataPegawaiRekrutmen,
      [name]: name === "" ? checked : value,
    });
  };

  // if (isChecked && fitur.length < 1) {
  //   setError("please set feature for user");
  //   return;
  // } else {
  //   payload.ListFitur = fitur.map((fit) => ({
  //     Kd_SubFitur: fit,
  //   }));
  // }

  const namaPegawai = watch("NamaLengkap");
  const tglLahir = watch("TglLahir");
  const umur = age;
  const alamatLengkap = watch("AlamatLengkap");
  const KodeProvinsi = kodeProvinsi;
  const handleSubmitDetailSertifikasi = (data) => {
    let defSertifikasi = datasertifikasi;
    if (!defSertifikasi) {
      defSertifikasi = [];
    }

    if (sertifikasiMethod == "edit") {
      defSertifikasi[sertiikasiIndex] = {
        NamaLembaga: data?.NamaLembaga,
        Id_Bidang: data?.Id_Bidang,
        DokumenSertifikat: data?.DokumenSertifikat,
      };
    } else {
      defSertifikasi.push({
        NamaLembaga: data?.NamaLembaga,
        Id_Bidang: data?.Id_Bidang,
        DokumenSertifikat: data?.DokumenSertifikat,
      });
    }
    setDataSertifikasi(defSertifikasi);
    setShowModalSertifikasi(false);
    setSaveSuccess(true);
  };
  const { data: databidang } = useBidang();

  const handleSubmitData = (data) => {
    setDataPegawai(data);
    setSeeDetail(true);
  };
  const dataPegawaiRekrutmen =
    method == "add"
      ? [
          {
            NamaLengkap: namaPegawai,
            TanggalLahir: tglLahir,
            AlamatLengkap: alamatLengkap,
            Kd_Provinsi: KodeProvinsi,
            Umur: age.toString(),
            Kd_Kota: kodeKota,
            Keahlian: listKeahlian?.data,
            LevelPekerjaan: "Senior Level",
            Sertifikasi: DataSertifikasi,
          },
        ]
      : [
          {
            NamaLengkap: namaPegawai,
            TanggalLahir: tglLahir,
            AlamatLengkap: alamatLengkap,
            Kd_Provinsi: KodeProvinsi,
            Umur: age.toString(),
            Kd_Kota: kodeKota,
            Keahlian: ListKeahlian.map((keahlian) => ({
              RincianDeskripsi: keahlian.RincianDeskripsi,
              Remark: keahlian.isCheck ? keahlian.Remark : "",
              isCheck: keahlian.isCheck,
            })),
            LevelPekerjaan: ListPekerjaan.map((pekerjaan) => ({
              RincianDeskripsi: pekerjaan.RincianDeskripsi,
              Remark: pekerjaan.isCheck ? pekerjaan.Remark : "",
              isCheck: pekerjaan.isCheck,
            })),
            Sertifikasi: DataSertifikasi,
          },
          {
            NamaLengkap: namaPegawai,
            TanggalLahir: tglLahir,
            AlamatLengkap: alamatLengkap,
            Kd_Provinsi: KodeProvinsi,
            Umur: age,
            Kd_Kota: kodeKota,
            Keahlian: ListKeahlian.map((keahlian) => ({
              RincianDeskripsi: keahlian.RincianDeskripsi,
              Remark: keahlian.isCheck ? keahlian.Remark : "",
              isCheck: keahlian.isCheck,
            })),
            LevelPekerjaan: ListPekerjaan.map((pekerjaan) => ({
              RincianDeskripsi: pekerjaan.RincianDeskripsi,
              Remark: pekerjaan.isCheck ? pekerjaan.Remark : "",
              isCheck: pekerjaan.isCheck,
            })),
            Sertifikasi: DataSertifikasi,
          },
        ];

  console.log(listKeahlian, "List Pegawai Rekrutmen");

  const handleSend = async (data) => {
    let payload = [
      {
        ...data,
        Umur: age,
        Kd_Provinsi: kodeProvinsi,
        Keahlian: ListKeahlian.map((keahlian) => ({
          RincianDeskripsi: keahlian.RincianDeskripsi,
          Remark: keahlian.isCheck ? keahlian.Remark : "",
          isCheck: keahlian.isCheck,
        })),
        LevelPekerjaan: ListPekerjaan.map((pekerjaan) => ({
          RincianDeskripsi: pekerjaan.RincianDeskripsi,
          Remark: pekerjaan.isCheck ? pekerjaan.Remark : "",
          isCheck: pekerjaan.isCheck,
        })),
        Sertifikasi: DataSertifikasi,
      },
    ];

    let url = "/daftar_pegawai";
    console.log(payload, "Apa payloadnya");
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
          setSaveSuccess(true);
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

  console.log(namaProvinsi, "Pegawai");
  console.log(tglLahir, "lahir");
  console.log(umur, "umur");
  console.log(alamatLengkap, "alamat");
  console.log(KodeProvinsi, "kodeprov");
  if (seeDetail) {
    return (
      <>
        <FormDataListPegawai
          onYes={() => {
            handleSend(dataPegawai);
          }}
          dataPegawai={dataPegawaiRekrutmen}
          handleBack={() => {
            setSeeDetail(false);
          }}
          namaPegawai={namaPegawai}
          tglLahir={tglLahir}
          alamatLengkap={alamatLengkap}
          KodeProvinsi={KodeProvinsi}
          age={age}
          kodeKota={kodeKota}
          keahlian={ListKeahlian}
          levelpekerjaan={ListPekerjaan}
          sertifikasi={DataSertifikasi}
        />
      </>
    );
  } else {
    return (
      <>
        <PopupSuccessData
          show={saveSuccessModal}
          onNo={() => setSaveSuccess(false)}
        />
        <PopupAddSertifikasi
          show={modalSertifikasi}
          onNo={() => {
            setShowModalSertifikasi(false);
          }}
          data={DataSertifikasi ? DataSertifikasi[sertiikasiIndex] : {}}
          method={sertifikasiMethod}
          isUbahSertifikasi={isUbahSertifikasi}
          onSuccess={handleSubmitDetailSertifikasi}
        />
        <section>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="tw-justify-center tw-flex">
              <div className="tw-flex-none tw- tw-w-full lg:tw-w-6/12">
                <Accordion
                  className="tw-pt-5 lg:tw-pt-12    tw-flex-none tw-text-gray-700 tw-pb-3 tw-rounded-lg "
                  flush
                >
                  <style type="text/css">
                    {`
                   .accordion-button {
                      background-color: none !important;
                  }
                  
                  .accordion-button:focus {
                      box-shadow: none;
                  }
                  
                  .accordion-button:not(.collapsed) {
                      color: #128ECC !important;
                  }
                  .accordion-button{
                      color: #414141
                  }
                  .accordion-item{
                      border-top: none
                      }
          `}
                  </style>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="tw-border-b-[1px] tw-text-[40px]  tw-border-[#E0DEDE] tw-w-full">
                      Informasi Pribadi
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="tw-w-full ">
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <Controller
                                {...register("NamaLengkap")}
                                name={"NamaLengkap"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                      NamaLengkap
                                    </label>
                                    <div className="tw-pt-[6px]">
                                      <Form.Control
                                        className="tw-rounded-[4px] tw-h-[38px] tw-font-nunito tw-text-[#414141]"
                                        onChange={onChange}
                                        value={value}
                                        type="text"
                                        name="NamaLengkap"
                                      ></Form.Control>
                                    </div>

                                    {errors.NamaLengkap && (
                                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                        {errors.NamaLengkap.message}
                                      </span>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <Controller
                                {...register("TglLahir")}
                                name={"TglLahir"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                      Tanggal Lahir
                                    </label>
                                    <div className="tw-pt-[6px]">
                                      <Form.Control
                                        className="tw-rounded-[4px] tw-h-[38px] tw-font-nunito tw-text-[#414141]"
                                        onChange={(e) => {
                                          const years = moment().diff(
                                            moment(
                                              e.target.value,
                                              "YYYY-MM-DD"
                                            ),
                                            "years"
                                          );

                                          setAge(years);
                                          onChange(e.target.value);
                                        }}
                                        value={value}
                                        type="date"
                                      ></Form.Control>
                                    </div>

                                    {errors.TglLahir && (
                                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                        {errors.TglLahir.message}
                                      </span>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <div>
                                <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                  Umur
                                </label>
                                <div className="tw-pt-[6px]">
                                  <Form.Control
                                    disabled
                                    className="tw-rounded-[4px] disabled:tw-bg-[#ffffff] tw-h-[38px] tw-font-nunito tw-text-[#414141]"
                                    value={age}
                                  ></Form.Control>
                                </div>

                                {errors.Umur && (
                                  <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                    {errors.Umur.message}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <Controller
                                {...register("AlamatLengkap")}
                                name={"AlamatLengkap"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                      Alamat Lengkap
                                    </label>
                                    <div className="tw-pt-[6px]">
                                      <Form.Control
                                        className="tw-rounded-[4px] tw-h-[38px] tw-font-nunito tw-text-[#414141]"
                                        onChange={onChange}
                                        value={value}
                                      ></Form.Control>
                                    </div>

                                    {errors.AlamatLengkap && (
                                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                        {errors.AlamatLengkap.message}
                                      </span>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <Controller
                                {...register("Kd_Provinsi")}
                                name={"Kd_Provinsi"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                      Provinsi
                                    </label>
                                    <div className="tw-pt-[6px]">
                                      <AsyncPaginate
                                        value={value}
                                        placeholder="Pilih Provinsi"
                                        loadOptions={loadOptions}
                                        onChange={(e) => {
                                          onChange(e);
                                          setNamaProvinsi(e.label);
                                          setKodeProvinsi(e.value);
                                        }}
                                      />
                                    </div>

                                    {errors.Kd_Provinsi && (
                                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                        {errors.Kd_Provinsi.message}
                                      </span>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <Controller
                                {...register("Kd_Kota")}
                                name={"Kd_Kota"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                      Kota / Kabupaten
                                    </label>
                                    <div className="tw-pt-[6px]">
                                      <AsyncPaginate
                                        value={value}
                                        placeholder="Pilih Kota"
                                        loadOptions={loadOptioned}
                                        onChange={(e) => {
                                          onChange(e);
                                          setNamaKota(e.label);
                                          setKodeKota(e.value);
                                        }}
                                      />
                                    </div>

                                    {errors.Kd_Kota && (
                                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                                        {errors.Kd_Kota.message}
                                      </span>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[18px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <div>
                                <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                  Keahlian
                                </label>
                                <div className="tw-pt-[6px]">
                                  <h1 className="tw-font-roboto tw-text-[#414141]/80 tw-text-[13px] tw-font-light">
                                    Pilih keahlian / soft skill yang anda miliki
                                  </h1>
                                  <div className="tw-grid tw-grid-cols-3 tw-pt-4  tw-w-full">
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Teamwork"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Teamwork
                                      </label>
                                    </div>
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Problem Solving"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Problem Solving
                                      </label>
                                    </div>
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Creative Thingking"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Creative Thingking
                                      </label>
                                    </div>
                                  </div>
                                  <div className="tw-grid tw-grid-cols-3 tw-pt-6 tw-w-full">
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Communication"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Communication
                                      </label>
                                    </div>
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Critical Thingking"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Critical Thingking
                                      </label>
                                    </div>
                                    <div className="tw-flex  tw-flex-row tw-space-x-4">
                                      <input
                                        className="tw-bg-white tw-border-[#414141]/50 checked:tw-bg-primary tw-rounded-[4px] tw-w-[20px]  tw-h-[20px]"
                                        type="checkbox"
                                        name="data"
                                        onChange={handleChangeKeahlian}
                                        value="Time Management"
                                      ></input>
                                      <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141] tw-font-normal tw-font-nunito tw-mb-1">
                                        Time Management
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-flex-row tw-justify-between tw-space-x-8 tw-pt-[8px]">
                          <div className="tw-w-full  tw-gap-5">
                            <div className="tw-w-full">
                              <label className="tw-font-roboto tw-text-[#414141]/80 tw-text-[14px] tw-font-normal">
                                Level Pekerjaan
                              </label>
                              {ListPekerjaan?.length > 0 &&
                                ListPekerjaan?.map((ll, i) => (
                                  <div key={i}>
                                    {ll.alias !== "" && (
                                      <div className="tw-pt-[3px]">
                                        <label className="  tw-font-nunito tw-text-[#414141]/70 tw-font-light lg:tw-text-[14px] tw-text-[12px] ">
                                          {ll.alias}
                                        </label>
                                      </div>
                                    )}
                                    {ll?.tweak && (
                                      <label className="tw-pt-4  tw-font-nunito tw-text-[#414141]/70 tw-font-light lg:tw-text-[14px] tw-text-[12px] ">
                                        {ll?.tweak}
                                      </label>
                                    )}
                                    <div
                                      className={`tw-grid ${
                                        ll.tweak
                                          ? "tw-grid-cols-3"
                                          : "tw-grid-cols-1"
                                      } tw-pt-[5px]  tw-items-center tw-gap-4`}
                                    >
                                      {ll?.options?.length > 0 &&
                                        ll?.options?.map((op, n) => (
                                          <div
                                            key={n}
                                            className="tw-flex tw-justify-center tw-items-center tw-gap-2"
                                          >
                                            <div className="tw-w-full tw-col-span-4">
                                              <input
                                                type="checkbox"
                                                value={op.value}
                                                checked={op.value}
                                                onChange={(e) => {
                                                  const def = ListPekerjaan;
                                                  def[i].options = def[
                                                    i
                                                  ].options.map(
                                                    (option, index) => {
                                                      return {
                                                        ...option,
                                                        value:
                                                          n === index &&
                                                          e.target.checked ===
                                                            true
                                                            ? true
                                                            : false,
                                                      };
                                                    }
                                                  );
                                                  setListPekerjaan([...def]);
                                                }}
                                                className="w-4 h-4  checked:tw-bg-primary tw-rounded-[4px] text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                              />
                                              <label className="tw-pl-3  tw-font-nunito tw-text-[#414141]/90 tw-font-light lg:tw-text-[14px] tw-text-[12px] ">
                                                {op?.label.replaceAll(
                                                  ll.tweak,
                                                  ""
                                                )}
                                              </label>
                                            </div>
                                            {op?.withText && (
                                              <div className="tw-w-full tw-col-span-6">
                                                <Form.Control
                                                  placeholder="Keterangan"
                                                  value={op.keterangan}
                                                  onChange={(e) => {
                                                    const def = ListPekerjaan;
                                                    def[i].options[
                                                      n
                                                    ].keterangan =
                                                      e.target.value;
                                                    setListPekerjaan([...def]);
                                                  }}
                                                  className=" tw-w-full tw-placeholder-[#414141]/50 tw-font-roboto tw-font-light tw-text-[14px]  tw-h-[38px]"
                                                ></Form.Control>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion
                  className="tw-pt-5 lg:tw-pt-3  tw-flex-none tw-text-gray-700 tw-pb-10 tw-rounded-lg "
                  flush
                >
                  <style type="text/css">
                    {`
                  .accordion-button {
                  background-color: white !important;
                  }
                  
                  .accordion-button:focus {
                  box-shadow: none;
                  }
                  
                  .accordion-button:not(.collapsed) {
                  color: #128ECC !important;
                  }
                  .accordion-button{
                  color: #414141
                  }
                  .accordion-item{
                  border-top: none
                  }
            `}
                  </style>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className=" tw-border-b-[1px] tw-border-[#E0DEDE] tw-w-full">
                      Sertifikasi
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="tw-w-full">
                        <div className="tw-pt-[30px] tw-w-full tw-text-left">
                          <Button
                            className="tw-items-center tw-bg-inherit tw-w-[190px] tw-normal-case tw-h-[38px] tw-shadow tw-border tw-border-[#C4C4C4] tw-text-center tw-px-3 tw-outline-hidden tw-flex tw-rounded-[4px] hover:tw-bg-white"
                            id="open-btn"
                            variant="outline-secondary"
                            onClick={() => {
                              setSertifikasiMethod("add");
                              setShowModalSertifikasi(true);
                              setShowDataSertifikasi({});
                              setShowDataSertifikasiSementara({});
                              setIsUbahSertifikasi(false);
                            }}
                          >
                            <Image src={tambah} alt="tambah" />
                            <div className="tw-pl-2 tw-font-roboto lg:tw-text-[13px] lg:tw-pt-0 tw-pt-1 tw-text-[12px] tw-font-normal tw-text-primary">
                              Tambah Sertifikasi
                            </div>
                          </Button>
                        </div>
                        <div className="tw-pt-[30px]">
                          <ul className="tw-pl-0">
                            {DataSertifikasi?.length > 0 &&
                              DataSertifikasi?.map((item, key) => (
                                <div className="tw-w-full tw-h-full tw-pt-8">
                                  <li className="tw-flex tw-flex-row tw-mb-4 tw-justify-between tw-w-full tw-items-center">
                                    <div className="tw-flex tw-flex-row tw-mb-4 tw-justify-between tw-w-full tw-items-center">
                                      <div className="tw-flex tw-flex-col">
                                        <div className="tw-text-left">
                                          <h1 className="tw-font-nunito tw-font-normal tw-text-[14px] tw-text-[#414141]/90">
                                            {item?.NamaLembaga}
                                          </h1>{" "}
                                        </div>

                                        <div className="tw-text-left">
                                          <h1 className="tw-font-nunito tw tw-font-normal tw-text-[14px] tw-text-[#414141]/90">
                                            {
                                              databidang?.find(
                                                (dBidang) =>
                                                  dBidang?.Id_Bidang ===
                                                  item?.Id_Bidang
                                              )?.NamaBidang
                                            }
                                          </h1>
                                        </div>
                                      </div>

                                      <div className="tw-flex tw-flex-row tw-space-x-5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSertifikasiMethod("edit");
                                            setSertifikasiIndex(key);
                                            setShowModalSertifikasi(true);
                                            setIsUbahSertifikasi(true);
                                          }}
                                        >
                                          <Image src={edit} />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                </div>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {errorMessage !== "" && (
                  <div className="tw-col-span-2">
                    <span className="tw-text-red-500 tw-font-normal tw-text-base">
                      {errorMessage}
                    </span>
                  </div>
                )}
                <div className="tw-justify-end tw-w-full tw-text-right tw-rounded-[4px]">
                  <button
                    className="tw-bg-primary tw-w-[140px] tw-text-white tw-rounded-[4px] tw-normal-case tw-h-[52px]"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </>
    );
  }
};

export default MenuEmployee;
