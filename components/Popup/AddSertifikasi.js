import { Button, Form, Modal } from "react-bootstrap";
import close from "@assets/icon/Close.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import upload from "@assets/icon/uploads.svg";
import Delete from "@assets/icon/delete.svg";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { getToken } from "@helpers/token";
import { API_BIDANG } from "../../services/Helpers/constant";
import axiosClient from "../../services/Libs/axios";
import {
  AsyncPaginate,
  reduceGroupedOptions,
} from "react-select-async-paginate";
import { Controller, useForm } from "react-hook-form";

export const PopupAddSertifikasi = ({
  show = false,
  onNo = () => {},
  data = {},
  onSuccess = () => {},
  method = "add",
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const router = useRouter();
  const token = getToken();
  const { pathname } = router;

  const [file, setFile] = useState({ name: "", previewImage: "", content: "" });
  console.log(data, "apa methodnya");
  let inputElement = useRef();
  const [namaBidang, setNamaBidang] = useState("");
  const [kodeBidang, setKodeBidang] = useState("");
  //Set Dropdown Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [value, onChange] = useState(null);
  const [previousSearch, setPreviousSearch] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const LIMIT = 5;
  const url = `${API_BIDANG}`;
  const [error, setError] = useState("");
  const [namaLembaga, setNamaLembaga] = useState("");
  const chooseFilesDocument = () => {
    if (inputElement) {
      inputElement.click();
    }
  };

  useEffect(() => {
    setNamaLembaga("");
    setKodeBidang("");
    setFile({ name: "", previewImage: "", content: "" });
    if (method == "edit") {
      setNamaLembaga(data?.NamaLembaga);
      setKodeBidang(data?.Id_Bidang);
      setFile({
        name: "",
        previewImage: data?.DokumenSertifikat,
        content: "",
      });
    }
  }, [show]);

  const loadOptions = async (search, prevOptions) => {
    let url;
    let option;
    let hasMore = false;
    if (search) {
      if (search === previousSearch) {
        url = `${API_BIDANG}?bidang=${search}&size=5&page=${currentPage}`;
      } else {
        url = `${API_BIDANG}?bidang=${search}&size=5&page=1`;
      }

      setPreviousSearch(search);
    } else {
      url = `${API_BIDANG}?&size=5page=${currentPage}`;
    }

    await axiosClient({
      url,
      method: "get",
    }).then((response) => {
      const datas = response.data.data;
      const { page, total } = response.data.meta;
      setCurrentPage(page);
      hasMore = page == total;
      option = datas.map((bidang) => ({
        value: bidang?.Id_Bidang,
        label: bidang?.NamaBidang,
      }));
    });

    return {
      options: option,
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

  const previewImageDocument = (event) => {
    event.preventDefault();
    const input = event.target;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({
          name: name,
          previewImage: img.src ? img.src : "",
          content: resizeMe(img),
        });
      };

      if (input.files[0].size > 5000 * 1024) {
        setError("Foto tidak boleh lebih dari 5mb");
        return;
      }

      const _URL = window.URL || window.webkitURL;
      const img = new window.Image();
      img.onload = () => {
        const options = {
          maxWidth: 800,
          maxHeight: 800,
          quality: 0.7,
          success(result) {
            reader.readAsDataURL(result);
          },
          error(e) {
            console.error(e.message);
          },
        };
        reader.readAsDataURL(input.files[0]);
      };
      img.src = _URL.createObjectURL(input.files[0]);
      const name = input.files[0].name;
    }
  };

  const resizeMe = (img) => {
    let canvas = document.createElement("canvas");

    let max_width = 800;
    let max_height = 800;

    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > max_width) {
        height = Math.round((height *= max_width / width));
        width = max_width;
      }
    } else {
      if (height > max_height) {
        width = Math.round((width *= max_height / height));
        height = max_height;
      }
    }
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.7);
  };

  const handleSubmitData = async () => {
    onSuccess({
      NamaLembaga: namaLembaga,
      Id_Bidang: kodeBidang,
      DokumenSertifikat: file.previewImage !== "" ? file.previewImage : upload,
    });

    reset();
  };

  console.log(file.previewImage, "File linknya");

  return (
    <Modal
      show={show}
      onHide={onNo}
      contentClassName="lg:tw-w-[610px]  tw-w-full tw-my-[100px] lg:tw-my-[100px] tw-rounded-[4px]  tw-mx-auto tw-h-full lg:tw-h-full tw-border-none"
    >
      <Modal.Body className="tw-flex tw-flex-col tw-pb-12   tw-text-[#414141]">
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <div className=" tw-items-center tw-justify-between tw-flex tw-flex-row">
            <h1 className="tw-text-[18px] tw-font-nunito tw-font-semibold tw-text-[#414141]">
              Sertifikasi
            </h1>
            <div className="tw-pb-2" onClick={onNo}>
              <Image src={close} alt="close" />
            </div>
          </div>
          <div className="lg:tw-pt-[18px] tw-pt-2 ">
            <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141]/50 tw-font-normal tw-font-nunito tw-mb-1">
              Nama Lembaga
            </label>
            <Form.Control
              className=" lg:tw-h-[38px] lg:tw-w-full tw-h-[38px] tw-w-full lg:tw-text-[13px] tw-text-[12px]"
              type="text"
              value={namaLembaga}
              onChange={(e) => {
                setNamaLembaga(e.target.value);
              }}
            ></Form.Control>
          </div>
          <div className="lg:tw-pt-[10px] tw-pt-2 ">
            <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141]/50 tw-font-normal tw-font-nunito tw-mb-1">
              Bidang
            </label>
            <div className="tw-pt-[6px]">
              <AsyncPaginate
                className=" lg:tw-h-[38px] lg:tw-w-full tw-h-[38px] tw-w-full lg:tw-text-[13px] tw-text-[12px]"
                type="text"
                value={value}
                loadOptions={loadOptions}
                placeholder="Pilih Bidang"
                onChange={(e) => {
                  onChange(e);
                  setKodeBidang(e.value);
                  setNamaBidang(e.label);
                }}
              />
            </div>
          </div>
          <div className="lg:tw-pt-[10px]">
            <label className="lg:tw-text-[13px] tw-text-[12px] tw-text-[#414141]/50 tw-font-normal tw-font-nunito tw-mb-1">
              Unggah Sertifikat
            </label>
            <div className="lg:tw-pt-[0px] tw-pt-4 tw-border tw-border-[#ced4da] tw-mt-1  ">
              <div className="tw-relative tw-items-center mx-center tw-pt-4 lg:tw-w-full tw-w-full tw-h-[250px] lg:tw-h-full">
                <input
                  ref={(input) => (inputElement = input)}
                  type="file"
                  className="tw-hidden"
                  accept="image/*"
                  maxLength={300}
                  onChange={(e) => previewImageDocument(e, upload)}
                />
                <div className="tw-text-center tw-flex tw-flex-col lg:tw-pt-3 ">
                  <div className="tw-text-center tw-mx-auto">
                    <Image
                      src={
                        file.previewImage !== "" ? file.previewImage : upload
                      }
                      alt="upload"
                      width={file.previewImage !== "" ? 100 : 22}
                      height={file.previewImage !== "" ? 100 : 22}
                    />
                  </div>
                  <div className="tw-pt-[4px]">
                    <Button
                      onClick={chooseFilesDocument}
                      className="tw-w-[115px] tw-rounded-[4px] tw-h-[30px] tw-text-[13px]  tw-bg-inherit tw-border-primary"
                    >
                      <h1 className="tw-text-[13px] tw-text-primary  tw-font-nunito tw-font-normal">
                        {" "}
                        Pilih Foto
                      </h1>
                    </Button>
                  </div>
                  <div className="tw-pt-[4px]">
                    <h1 className="tw-text-[#414141]/70 tw-font-nunito tw-text-[12px]">
                      Size max. 5MB
                    </h1>
                  </div>
                  <div>
                    {error !== "" && (
                      <span className="tw-text-red-500 tw-font-normal tw-text-xs">
                        {error}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" tw-pt-[25px] lg:tw-pt-[60px] tw-flex tw-justify-between tw-items-center">
            <div className="tw-flex-col  tw-flex">
              <button className="tw-flex tw-items-center">
                <div>
                  <Image src={Delete} alt="delete" />
                </div>
                <div className="lg:tw-pt-2 lg:tw-pl-2 tw-pl-[4px]">
                  <h1 className="tw-font-nunito lg:tw-text-[14px] tw-text-[12px] tw-text-[#414141]/65 tw-font-normal">
                    Hapus
                  </h1>
                </div>
              </button>
            </div>
            <Button
              id="open-btn"
              type="submit"
              className="lg:tw-h-[38px] lg:tw-text-[14px] tw-text-[12px] lg:tw-w-[121px]  tw-h-[30px] tw-w-[100px]  tw-rounded-[4px]  tw-font-nunito   tw-border-[#5C9929] tw-bg-primary"
            >
              Simpan
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
