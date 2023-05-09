import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Delete from "@assets/icon/deletedata.svg";

export const PopupSuccessDelete = ({ show = false, onNo = () => {} }) => {
  return (
    <Modal
      show={show}
      onHide={onNo}
      contentClassName="lg:tw-w-[464px] tw-w-[270px] tw-rounded-[8px] tw-mx-auto tw-mt-[100px] tw-h-[300px] lg:tw-h-[444px] tw-border-none"
    >
      <Modal.Body className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-[40px] tw-text-[#414141]">
        <div className="tw-flex lg:tw-mb-[32px] tw-mb-6 lg:tw-h-[140px] lg:tw-w-[140px] tw-bg-primary tw-rounded-full tw-items-center tw-justify-center">
          <Image src={Delete} alt="image success" width="90px" height="90px" />
        </div>
        <p className=" tw-mb-[10px] lg:tw-mb-[3px] tw-font-semibold lg:tw-text-[24px] tw-font-nunito tw-text-center">
          Data berhasil dihapus
        </p>
      </Modal.Body>
    </Modal>
  );
};
