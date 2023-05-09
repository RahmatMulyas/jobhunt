import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import React, { useMemo } from "react";

import { useState } from "react";

import dialog from "@assets/icon/ic_dialogs.svg";
import { useRouter } from "next/router";

export const PopupKirim = ({
  show = false,
  onYes = () => {},
  onNo = () => {},
  onClose = () => {},
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();
  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="lg:tw-w-[400px]  tw-w-full tw-my-[100px] lg:tw-my-[20%] tw-rounded-[8px]  tw-mx-auto tw-h-full lg:tw-h-[408px] tw-border-none"
    >
      <Modal.Body>
        <div className="tw-flex  tw-items-center tw-flex-col tw-justify-center ">
          <Image src={dialog} alt="dialog" width={86} height={86} />

          <div className="tw-pt-[41px] tw-text-center">
            <h1 className="tw-text-[#414141] tw-font-nunito tw-text-[20px] tw-font-semibold">
              Kirim Data
            </h1>
            <h2 className="tw-text-[14px] tw-px-4 tw-pt-[10px] tw-font-normal tw-text-[#414141]/60">
              Sebelum anda mengirim, pastikan data yang telah anda isi benar dan
              dapat dipertanggungjawabkan. Anda tidak dapat mengubah ataupun
              mengedit data yang telah terkirim
            </h2>
          </div>
          <div className="tw-flex lg:tw-space-x-14 lg:tw-pt-[70px]">
            <Button
              // type="submit"
              id="open-btn"
              type="button"
              variant="outline-secondary"
              onClick={onClose}
              className="lg:tw-h-[38px] lg:tw-bg-white hover:tw-text-primary  tw-text-primary lg:tw-text-[14px] tw-text-[12px] lg:tw-w-[121px]  tw-h-[30px] tw-w-[100px]  tw-rounded-[4px]  tw-font-nunito   tw-border-primary"
            >
              Batal
            </Button>
            <Button
              // type="submit"
              onClick={() => {
                onYes();
              }}
              id="open-btn"
              type="button"
              className="lg:tw-h-[38px] lg:tw-text-[14px] tw-text-[12px] lg:tw-w-[121px]  tw-h-[30px] tw-w-[100px]  tw-rounded-[4px]  tw-font-nunito   tw-border-[#5C9929] tw-bg-primary"
            >
              Kirim
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
