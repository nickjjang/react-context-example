import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { Button, FormGroup, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./QRScannerModal.scss";

interface QRScannerProps {
  isOpen: boolean;
  toggle: () => void;
  onQRScanned: (qrcode: string | null) => void;
}
const QRScannerModal = ({
  isOpen,
  toggle,
  onQRScanned,
}: QRScannerProps): React.ReactElement => {
  const [result, setResult] = useState("" as string | null);

  const handleQRScanned = (qrcode: string | null) => {
    if (qrcode) {
      setResult(qrcode);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setResult("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onQRScanned(result);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="qrscanner-modal">
      <ModalHeader toggle={toggle}>QR Scanner</ModalHeader>
      <ModalBody>
        <FormGroup>
          <QrReader
            onError={(error) => {
              console.log(error);
            }}
            onScan={handleQRScanned}
          />
        </FormGroup>
        <FormGroup>Scanned QRCode: {result} </FormGroup>
        <FormGroup className="text-right">
          <Button type="button" onClick={toggle} className="mr-2">
            Cancel
          </Button>
          <Button
            type="button"
            color="success"
            onClick={handleConfirm}
            disabled={!result}
          >
            <FontAwesomeIcon
              icon={result ? faCheck : faSpinner}
              spin={!result}
            ></FontAwesomeIcon>{" "}
            OK
          </Button>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};

export default QRScannerModal;
