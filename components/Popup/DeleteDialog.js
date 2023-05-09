import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export const PopupDeleteDialog = ({
  show = false,
  onNo = () => {},
  onYes = () => {},
}) => {
  return (
    <Modal
      show={show}
      onHide={onNo}
      contentClassName="lg:tw-w-[464px]  tw-w-full tw-my-[100px] lg:tw-py-auto lg:tw-my-auto tw-rounded-[8px]  tw-mx-auto tw-h-full lg:tw-h-[200px] tw-border-none"
    >
      <Modal.Body>
        <div className="tw-flex  tw-items-center tw-w-full tw-flex-col  ">
          <div className="tw-pt-[1px] tw-text-center tw-w-full  tw-px-[25px]">
            <div className="tw-pt-[4px]">
              <h1 className="tw-text-[#414141] tw-font-nunito tw-text-[18px] tw-font-semibold">
                Anda yakin ingin menghapus data ini?
              </h1>
              <h2 className="tw-text-[16px] tw-pt-[10px] tw-font-normal tw-text-[#414141]/60">
                Data yang di hapus akan hilang dan tidak dapat di akses kembali
              </h2>
            </div>
          </div>
          <div className="tw-flex lg:tw-space-x-5 lg:tw-pt-[30px]">
            <Button
              // type="submit"
              id="open-btn"
              type="submit"
              variant="outline-secondary"
              onClick={() => {
                onNo();
              }}
              className="lg:tw-h-[38px] tw-normal-case lg:tw-bg-white hover:tw-text-primary  tw-text-primary lg:tw-text-[14px] tw-text-[12px] lg:tw-w-[176px]  tw-h-[30px] tw-w-[100px]  tw-rounded-[4px]  tw-font-nunito   tw-border-[#5C9929] tw-bg-[#5C9929]"
            >
              Batal
            </Button>
            <Button
              // type="submit"
              id="open-btn"
              type="submit"
              // onClick={() => {
              //   // router.push("/mitra/daftarregismitra");
              // }}
              onClick={onYes}
              className="lg:tw-h-[38px] tw-normal-case lg:tw-text-[14px] tw-text-[12px] lg:tw-w-[176px]  tw-h-[30px] tw-w-[100px]  tw-rounded-[4px]  tw-font-nunito   tw-border-[#5C9929] tw-bg-primary"
            >
              Hapus Data
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
